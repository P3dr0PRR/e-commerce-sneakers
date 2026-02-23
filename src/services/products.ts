import { apiFetch } from "./api";

export async function createSneaker(
  name: string,
  price: number,
  token: string,
) {
  return apiFetch("/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, price }),
  });
}

export async function getSneakers(token: string) {
  return apiFetch("/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteSneakers(id: number, token: string) {
  return apiFetch(`/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
