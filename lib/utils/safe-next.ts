/**
 * Safe redirect validator to prevent Open Redirect attacks.
 * Accepts only internal relative paths starting with a single '/'
 * and explicitly rejects protocol-relative URLs ('//') or external protocols ('http:', 'https:', etc.).
 */
export function getSafeNextUrl(nextParam: string | null | undefined, fallback: string = '/home'): string {
  if (!nextParam) return fallback;

  const trimmed = nextParam.trim();

  // Reject empty string
  if (!trimmed) return fallback;

  // Must begin with a single '/' and not with '//' (protocol-relative) or backslash
  if (!trimmed.startsWith('/') || trimmed.startsWith('//') || trimmed.startsWith('/\\')) {
    return fallback;
  }

  // Reject explicit protocols or schemes
  if (/^([a-z0-9+.-]+:|\/\/)/i.test(trimmed)) {
    return fallback;
  }

  return trimmed;
}
