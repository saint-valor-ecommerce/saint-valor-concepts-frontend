import api from "../axios";
import { Address } from "@/types/address";

type LoginProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

function saveToken(token: string) {
  localStorage.setItem("token", token);
  document.cookie = `token=${token}; path=/`;
}

export function clearToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("firstName");
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export async function login({ email, password }: LoginProps, isAdminLogin = false) {
  const { data } = await api.post("/auth/login", { email, password });

  const profileRes = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${data.token}` },
  });
  const user = profileRes.data.data.user;

  if (isAdminLogin && user.role?.toLowerCase() !== "admin") {
    throw new Error("Access denied. You do not have administrator permissions.");
  }

  saveToken(data.token);
  const firstName = user.firstName;
  localStorage.setItem("firstName", firstName);
  document.cookie = `userRole=${user.role}; path=/;`;

  return { firstName };
}

export async function signUp({
  email,
  password,
  firstName,
  lastName,
}: SignUpProps) {
  const { data } = await api.post("/auth/signup", {
    email,
    password,
    firstName,
    lastName,
  });
  saveToken(data.token);
}

export async function logout() {
  clearToken();
  try {
    await api.post("/auth/logout");
  } catch {
    // Backend notification failed — user is already logged out locally
  }
}

export async function getUserProfile() {
  const res = await api.get("/auth/me");
  return res.data.data.user;
}

export async function updateProfile(data: {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  address?: Address;
}) {
  const res = await api.put("/auth/profile", data);
  return res.data.data.user;
}

export async function sendResetLink(email: string) {
  await api.post("/auth/send-reset-link", { email });
}

export async function resetPassword(token: string, newPassword: string, confirmPassword: string) {
  await api.post("/auth/reset-password", {
    token,
    newPassword,
    confirmPassword,
  });
}
