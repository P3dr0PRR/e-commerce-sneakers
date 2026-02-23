export const API_URL = "https://api.abracops.info";

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${endpoint}`, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro na requisição da API");
  }
  return response.json();
}
