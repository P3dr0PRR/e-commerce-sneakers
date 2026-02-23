import { apiFetch } from "./api";

export async function loginUser(email: string, password: string) {
  return apiFetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  return apiFetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
}
