const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:4000";

export const env = {
  apiBaseUrl: apiBaseUrl.replace(/\/$/, ""),
  itWhatsappUrl:
    process.env.NEXT_PUBLIC_IT_WHATSAPP_URL ??
    "https://wa.me/6282236343404?text=Halo%20masdon%2C%20saya%20butuh%20bantuan.",
};
