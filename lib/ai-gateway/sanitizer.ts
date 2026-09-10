/**
 * PII Sanitization Utility for AI/ML Gateway
 * Ensures compliance with data privacy guidelines and government data protection standards.
 * Redacts Aadhaar numbers, Indian mobile numbers, email addresses, and personal identities
 * before any feature vector or context is passed to analytical models or LLMs.
 */

const AADHAAR_REGEX = /\b\d{4}[ -]?\d{4}[ -]?\d{4}\b/g;
const PHONE_REGEX = /\b(?:\+91|91)?[ -]?[6-9]\d{9}\b/g;
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

export class DataSanitizer {
  /**
   * Sanitizes a string by replacing PII patterns with redacted placeholders.
   */
  static sanitizeText(text: string): string {
    if (!text) return '';
    return text
      .replace(AADHAAR_REGEX, '[REDACTED_AADHAAR]')
      .replace(PHONE_REGEX, '[REDACTED_PHONE]')
      .replace(EMAIL_REGEX, '[REDACTED_EMAIL]');
  }

  /**
   * Anonymizes an object by recursively sanitizing string fields and stripping known PII fields.
   */
  static anonymizePayload<T>(payload: T): T {
    if (payload === null || payload === undefined) return payload;

    if (typeof payload === 'string') {
      return this.sanitizeText(payload) as unknown as T;
    }

    if (Array.isArray(payload)) {
      return payload.map((item) => this.anonymizePayload(item)) as unknown as T;
    }

    if (typeof payload === 'object') {
      const sanitized: Record<string, any> = {};
      const sensitiveKeys = new Set([
        'aadhaar',
        'aadhaar_hash',
        'phone',
        'mobile',
        'email',
        'contact_number',
        'bank_account',
        'ifsc',
        'guardian_name',
      ]);

      for (const [key, value] of Object.entries(payload as Record<string, any>)) {
        if (sensitiveKeys.has(key.toLowerCase())) {
          sanitized[key] = '[REDACTED_PII]';
        } else if (typeof value === 'string') {
          sanitized[key] = this.sanitizeText(value);
        } else if (typeof value === 'object') {
          sanitized[key] = this.anonymizePayload(value);
        } else {
          sanitized[key] = value;
        }
      }

      return sanitized as T;
    }

    return payload;
  }
}
