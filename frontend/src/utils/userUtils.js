/**
 * Computes user initials from their full name (first letter of first and last name),
 * falling back to the email handle if the name is unavailable.
 * Never returns static "SS".
 *
 * @param {string|null|undefined} name - User's full name
 * @param {string|null|undefined} email - User's registered email
 * @returns {string} 1-2 character initials in uppercase
 */
export function getUserInitials(name, email) {
  const cleanName = typeof name === 'string' ? name.trim() : '';

  if (cleanName) {
    const parts = cleanName.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      // First letter of first name + first letter of last name
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    if (parts.length === 1 && parts[0].length >= 2) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (parts.length === 1 && parts[0].length === 1) {
      return parts[0].toUpperCase();
    }
  }

  // Fallback to email handle if name is missing
  if (email && typeof email === 'string') {
    const handle = email.split('@')[0].trim();
    if (handle.length >= 2) {
      return handle.slice(0, 2).toUpperCase();
    }
    if (handle.length === 1) {
      return handle.toUpperCase();
    }
  }

  return 'U';
}
