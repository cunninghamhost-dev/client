import { FieldErrors, FieldError } from 'react-hook-form';

export function getFormErrorMessages(errors: FieldErrors): string[] {
  const messages: string[] = [];

  function traverse(value: unknown): void {
    if (!value) return;

    // Case 1: Direct field error
    if (isFieldError(value) && value.message) {
      messages.push(String(value.message));
      return;
    }

    // Case 2: Nested error object
    if (typeof value === 'object') {
      Object.values(value).forEach(traverse);
    }
  }

  traverse(errors);
  return messages;
}

function isFieldError(error: unknown): error is FieldError {
  return typeof error === 'object' && error !== null && 'message' in error;
}
