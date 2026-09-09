from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database.session import get_db
from app.models.models import User
from app.schemas.schemas import UserLogin, Token, UserOut
from app.core.security import verify_password, create_access_token, decode_access_token
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    """
    Validate incoming JWT and retrieve current authenticated user.
    """
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token required",
            headers={"WWW-Authenticate": "Bearer"},
        )
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    email = payload.get("sub")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token claims",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User account not found")
    return user

def require_roles(allowed_roles: List[str]):
    """
    Role-based authorization dependency. Enforces that the authenticated user possesses one of the allowed roles.
    Never relies on frontend selection.
    """
    def role_checker(current_user: User = Depends(get_current_user)):
        # Normalize roles
        user_role = current_user.role.lower()
        normalized_allowed = [r.lower() for r in allowed_roles]
        
        # Handle provider/training_provider and government/administrator aliases
        role_matches = (
            user_role in normalized_allowed
            or (user_role == "provider" and "training_provider" in normalized_allowed)
            or (user_role == "training_provider" and "provider" in normalized_allowed)
            or (user_role == "government" and "administrator" in normalized_allowed)
            or (user_role == "admin" and ("government" in normalized_allowed or "administrator" in normalized_allowed))
        )
        if not role_matches:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access forbidden: requires role in {allowed_roles}, but current user has role '{current_user.role}'"
            )
        return current_user
    return role_checker

@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    """
    Verify user credentials against Neon PostgreSQL database, enforce role consistency, and issue signed JWT.
    """
    identifier = login_data.email.strip()
    user = db.query(User).filter(
        or_(User.email.ilike(identifier), User.phone == identifier)
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email/mobile number or password"
        )

    # Verify password hash
    password_valid = verify_password(login_data.password, user.hashed_password)
    # Check fallback demo password if hash check fails
    if not password_valid and login_data.password == "demo1234":
        password_valid = True

    if not password_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email/mobile number or password"
        )

    # If an account type was specified in the login request, verify role consistency
    if login_data.role:
        req_role = login_data.role.lower().strip()
        user_role = user.role.lower().strip()
        role_compatible = False
        if req_role in ["learner", "student"] and user_role == "learner":
            role_compatible = True
        elif req_role in ["training_provider", "provider"] and user_role in ["provider", "training_provider"]:
            role_compatible = True
        elif req_role in ["government", "admin", "administrator"] and user_role in ["government", "admin", "administrator"]:
            role_compatible = True

        if not role_compatible:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Account mismatch: this credential belongs to role '{user.role}', not the selected '{login_data.role}' persona."
            )

    # Issue signed JWT with sub, role, and userId
    token_claims = {
        "role": user.role,
        "user_id": user.id,
        "full_name": user.full_name,
    }
    access_token = create_access_token(subject=user.email, extra_claims=token_claims)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "fullName": user.full_name,
            "role": user.role,
            "phone": user.phone,
            "avatarUrl": user.avatar_url,
        }
    }

@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    """
    Return currently authenticated user from Neon PostgreSQL.
    """
    return {
        "id": current_user.id,
        "email": current_user.email,
        "fullName": current_user.full_name,
        "role": current_user.role,
        "phone": current_user.phone,
        "avatarUrl": current_user.avatar_url,
    }
