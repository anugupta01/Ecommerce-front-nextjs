"use client";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpAction, type AuthResult } from "@/lib/actions";

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState<AuthResult | null, FormData>(
    signUpAction, null
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.ok) router.push("/signin");
  }, [state, router]);

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h2 className="mb-4">Sign Up</h2>
      {state?.error && <div className="alert alert-danger">{state.error}</div>}
      <form action={formAction}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input name="confirm" type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={pending}>
          {pending ? "Creating account…" : "Sign Up"}
        </button>
      </form>
      <p className="mt-3 text-center">
        Have an account? <Link href="/signin">Sign in</Link>
      </p>
    </div>
  );
}
