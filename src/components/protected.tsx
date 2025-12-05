import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/authstore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const isLogin = useAuthStore((s) => s.isLogin);

  useEffect(() => {
    async function check() {
      if (isLogin) {
        setAllowed(true);
        setLoading(false);
      } else {
        navigate("/app-login");
        setLoading(false);
      }
    }

    check();
  }, []);

  if (loading) return <p>Loading...</p>;

  return allowed ? children : null;
}
