
import type { ApiPost } from "../types/apiPost";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getAnnouncements(): Promise<ApiPost[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Unexpected API response format.");
  }

  return data as ApiPost[];
}
