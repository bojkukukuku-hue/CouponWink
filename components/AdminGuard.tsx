import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "../services/supabaseApi";

export default function AdminGuard({ children }: { children: JSX.Element }) {
  const [status, setStatus] = useState<"loading" | "allowed" | "denied">("loading");

  useEffect(() => {
    (async () => {
      try {
        const ok = await isAdmin();
        setStatus(ok ? "allowed" : "denied");
      } catch {
        setStatus("denied");
      }
    })();
  }, []);

  if (status === "loading") return <div className="p-6">Checking admin permission…</div>;
  if (status === "denied") return <Navigate to="/admin/login" replace />;

  return children;
}
