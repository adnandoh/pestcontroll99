/** Person-name helpers: letters + spaces only (no digits). */

const LETTERS_AND_SPACES = /^[\p{L}\s]+$/u;

/** Strip digits and other non-letter characters while typing. */
export function sanitizePersonNameInput(raw: string): string {
  return String(raw || '')
    .replace(/[0-9]/g, '')
    .replace(/[^\p{L}\s]/gu, '')
    .replace(/\s{2,}/g, ' ');
}

/**
 * Validate a person name. Empty is allowed when `required` is false
 * (silent mobile-only Website Lead upsert).
 */
export function personNameValidationError(
  name: string | undefined | null,
  options?: { required?: boolean; minLength?: number },
): string | null {
  const required = options?.required !== false;
  const minLength = options?.minLength ?? 2;
  const trimmed = String(name || '').trim();

  if (!trimmed) {
    return required ? 'Name is required' : null;
  }
  if (/\d/.test(trimmed)) {
    return 'Name can only contain letters and spaces';
  }
  if (!LETTERS_AND_SPACES.test(trimmed)) {
    return 'Name can only contain letters and spaces';
  }
  if (trimmed.length < minLength) {
    return `Name must be at least ${minLength} characters`;
  }
  return null;
}

export function isValidPersonName(
  name: string | undefined | null,
  options?: { required?: boolean; minLength?: number },
): boolean {
  return personNameValidationError(name, options) === null;
}
