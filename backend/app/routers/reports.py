from fastapi import APIRouter

router = APIRouter(prefix="/reports", tags=["reports"])

@router.get("")
def get_reports_catalog():
    return [
        {
            "id": "rep-1",
            "title": "FY 2024-25 National Longitudinal Skilling Outcome Synthesis Report",
            "type": "Executive Brief (PDF)",
            "date": "Q2 Audit 2024",
            "size": "2.4 MB",
            "downloadUrl": "/api/v1/reports/rep-1/download",
        },
        {
            "id": "rep-2",
            "title": "Provider Longitudinal Accreditation & Audit Data Export",
            "type": "Raw Dataset (CSV / Excel)",
            "date": "Monthly Snapshot",
            "size": "18.2 MB",
            "downloadUrl": "/api/v1/reports/rep-2/download",
        },
        {
            "id": "rep-3",
            "title": "Before / After Intervention Impact Evaluation Report",
            "type": "Policy Document (PDF)",
            "date": "Bi-Annual Evaluation",
            "size": "3.1 MB",
            "downloadUrl": "/api/v1/reports/rep-3/download",
        },
    ]

@router.get("/{id}/download")
def download_report(id: str):
    return {"status": "success", "reportId": id, "message": "Report generated and streamed successfully."}
