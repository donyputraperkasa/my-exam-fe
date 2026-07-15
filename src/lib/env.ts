const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:4000";

function normalizeApiBaseUrl(value: string) {
  const normalized = value.trim().replace(/\/$/, "");

  if (/^https?:\/\//i.test(normalized)) return normalized;

  const protocol = /^(localhost|127\.0\.0\.1)(:|$)/i.test(normalized)
    ? "http://"
    : "https://";

  return `${protocol}${normalized}`;
}

export const env = {
  apiBaseUrl: normalizeApiBaseUrl(apiBaseUrl),
  itWhatsappUrl:
    process.env.NEXT_PUBLIC_IT_WHATSAPP_URL ??
    "https://wa.me/6282236343404?text=Halo%20masdon%2C%20saya%20butuh%20bantuan.",
};
