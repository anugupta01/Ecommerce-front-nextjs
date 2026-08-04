"use client";
import { useRouter } from "next/navigation";
import { ArrowBack } from "@mui/icons-material";

export default function BackButton({
  href = "/",
  label = <ArrowBack />,
}: {
  href?: string;
  label?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      style={{ color: "black" }}
      className="btn btn-link text-decoration-none ps-0 mb-3"
      aria-label={typeof label === 'string' ? label : undefined}
    >
      <span aria-hidden="true">‹</span> {label}
    </button>
  );
}