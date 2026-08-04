"use client";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { signInAction, type AuthResult } from "@/lib/actions";

export default function SignInPage() {
  const [state, formAction, pending] = useActionState<AuthResult | null, FormData>(
    signInAction, null
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.ok) router.push("/");
  }, [state, router]);

  return (
    <div className="container-fluid">
      <div className="row min-vh-400">
        <div className="col-lg-6 d-flex flex-column px-4 py-4">

          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="btn btn-link p-0 mb-5 align-self-start"
            style={{ color: "black", fontSize: "1.5rem", textDecoration: "none", marginLeft: "100px" }}
          >
            <ArrowBackIcon />
          </button>

          <div className="mx-auto w-100" style={{ maxWidth: 420, position: "relative", left: "6rem" }}>
            <h2 className="fw-bold mb-4" style={{ color: "#3b3b98" }}>
              Welcome to Shop Market
            </h2>

            {state?.error && (
              <div className="alert alert-danger py-2">{state.error}</div>
            )}

            <form action={formAction} noValidate>
              <div className="mb-3">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                />
              </div>
              <div className="mb-2">
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                />
              </div>

              <div className="text-end mb-3">
                <Link href="/forgot-password" className="small text-decoration-none text-muted">
                  Forgot Password ?
                </Link>
              </div>

              <button
                type="submit"
                disabled={pending}
                className="btn btn-outline-primary rounded-pill w-100 py-2"
              >
                {pending ? "Signing in…" : "Sign in"}
              </button>
            </form>

            <div className="d-flex justify-content-center gap-6 mt-4">
              <button
                type="button"
                className="btn btn-link text-primary p-0"
                aria-label="Sign in with Facebook"
                onClick={() => {/* TODO: wire OAuth */ }}
              >
                <span style={{ fontWeight: 700, fontFamily: "Georgia, serif" }}>f</span>
              </button>
              <button
                type="button"
                className="btn btn-link p-0"
                aria-label="Sign in with Google"
                onClick={() => {/* TODO: wire OAuth */ }}
              >
                <img src="/assets/gmail.png" alt="" width={22} height={22} />
              </button>
            </div>

            <p className="mt-4 text-center small">
              No account? <Link href="/signup">Sign up</Link>
            </p>
          </div>
        </div>

        <div
          className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
          <img
            src="/assets/image_sign_in.png"
            alt="Shopping illustration"
            className="img-fluid"
            style={{ maxHeight: "90%", marginLeft: "283px" }}
          />
        </div>
      </div>
    </div>
  );
}