import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin, isAdmin } from "../../services/supabaseApi";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const ok = await isAdmin();
      if (ok) navigate("/admin/dashboard", { replace: true });
    })();
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await adminLogin(email, password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white w-80 p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>

        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

        <input
          className="w-full border p-2 mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full border p-2 mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-black text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
