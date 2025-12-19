import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded w-full mb-4"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded w-full mb-6"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white p-3 rounded-lg"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="text-sm text-center mt-4">
          No account?{" "}
          <Link to="/register" className="text-emerald-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
