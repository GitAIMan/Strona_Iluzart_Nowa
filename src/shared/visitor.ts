const COOKIE_NAME = "iluzart_vid";
const LS_KEY = "iluzart_vid";

function generateId(): string {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 6)
  );
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

export function getVisitorId(): string {
  // Try cookie first
  let id = getCookie(COOKIE_NAME);
  if (id) {
    // Ensure localStorage is in sync
    try { localStorage.setItem(LS_KEY, id); } catch {}
    return id;
  }

  // Try localStorage
  try {
    id = localStorage.getItem(LS_KEY);
    if (id) {
      setCookie(COOKIE_NAME, id, 365);
      return id;
    }
  } catch {}

  // Generate new
  id = generateId();
  setCookie(COOKIE_NAME, id, 365);
  try { localStorage.setItem(LS_KEY, id); } catch {}
  return id;
}
