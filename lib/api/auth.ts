import api from "../axios";

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
}

export async function login({ email, password }: LoginProps) {
  const { data } = await api.post("/api/v1/auth/login", { email, password });
  saveToken(data.token);

  const profileRes = await api.get("/api/v1/auth/me");
  const firstName = profileRes.data.data.user.firstName;
  localStorage.setItem("firstName", firstName);

  return { firstName };
}

export async function signUp({
  email,
  password,
  firstName,
  lastName,
}: SignUpProps) {
  const { data } = await api.post("/api/v1/auth/signup", {
    email,
    password,
    firstName,
    lastName,
  });
  saveToken(data.token);
}

export async function logout() {
  await api.post("/api/v1/auth/logout");
  clearToken();
}

export async function getUserProfile() {
  const res = await api.get("/api/v1/auth/me");
  return res.data.data.user;
}

export async function updateProfile(data: {
  email?: string;
  password?: string;
}) {
  const res = await api.put("/api/v1/auth/profile", data);
  return res.data.data.user;
}

export async function deleteAccount() {
  await api.delete("/api/v1/auth/profile");
}
