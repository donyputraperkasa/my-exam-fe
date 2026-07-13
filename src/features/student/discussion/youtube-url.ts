export function toYoutubeEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace("www.", "");
    let id = "";
    if (host === "youtu.be") id = url.pathname.split("/")[1] ?? "";
    if (host.endsWith("youtube.com")) {
      id = url.searchParams.get("v") ?? getPathVideoId(url.pathname);
    }
    return id ? `https://www.youtube.com/embed/${id}` : "";
  } catch {
    return "";
  }
}

function getPathVideoId(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  return ["embed", "shorts", "live"].includes(parts[0]) ? (parts[1] ?? "") : "";
}
