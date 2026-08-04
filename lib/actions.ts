"use server";

export interface AuthResult {
  ok: boolean;
  error?: string;
}

export async function signInAction(
  _prev: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { ok: false, error: "Email and password are required." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  // TODO: verify against real auth provider.
  return { ok: true };
}

export async function signUpAction(
  _prev: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const confirm = String(formData.get("confirm") || "");

  if (!email || !password) {
    return { ok: false, error: "All fields are required." };
  }
  if (password.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters." };
  }
  if (password !== confirm) {
    return { ok: false, error: "Passwords do not match." };
  }
  // TODO: create the user in a real backend.
  return { ok: true };
}

export async function cartDetailAction(
  _prev: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const productId = Number(formData.get("productId"));
  const quantity = Number(formData.get("quantity"));

  if (!productId || !quantity) {
    return { ok: false, error: "Product ID and quantity are required." };
  }
  if (quantity < 1) {
    return { ok: false, error: "Quantity must be at least 1." };
  } 
  return { ok: true };
}
