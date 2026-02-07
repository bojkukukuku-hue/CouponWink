import { useEffect, useState } from "react";
import { isAdmin } from "../services/supabaseApi";
import { useNavigate } from "react-router-dom";

export default function AdminGuard({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      const ok = await isAdmin();
      if (!ok) navigate("/admin/login");
      setLoading(false);
    }
    check();
  }, []);

  if (loading) return <div className="p-6">Checking admin permission…</div>;

  return children;
}
