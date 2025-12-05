import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import herosection from "../assets/13818773_5358810-CpCm1xZd.jpg";
import { Alert } from "../components/alert";
import { sweet } from "../components/sweet";
import { useAuthStore } from "../lib/authstore";
import { firstprofile, login } from "../lib/fetch";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const route = useNavigate();
  const loginstore = useAuthStore((s) => s.login);

  async function toLogin(e: any) {
    e.preventDefault();

    const data = {
      username,
      password,
    };
    try {
      const res = await login(data);
      setErrorMessage("");
      const resfirstlogin = await firstprofile(res.data.token);
      const dataprofile = resfirstlogin.data.data;

      if (resfirstlogin) {
        loginstore(res.data.token, dataprofile, dataprofile.role);
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      sweet.toastError(error.response.data.message);
      setErrorMessage("Terjadi kesalahan, " + error.response.data.message);
    }
  }

  const isLogin = useAuthStore((s) => s.isLogin);
  const role = useAuthStore((s) => s.role);

  useEffect(() => {
    if (isLogin) {
      if (role === "admin") {
        route("/dashboard");
      } else {
        route("/");
      }
    }
  }, []);

  return (
    <div className="mx-auto flex h-screen max-w-[1000px] items-center">
      <div className="grid w-full grid-cols-2 overflow-hidden rounded bg-slate-50">
        {/* LEFT */}
        <div className="p-10">
          <div className="my-6 text-4xl font-bold text-center text-red-500 font-fredoka">
            Login
          </div>

          {errorMessage !== "" ? (
            <Alert type="danger">{errorMessage}</Alert>
          ) : (
            <></>
          )}

          <form onSubmit={toLogin} className="grid gap-3">
            {/* EMAIL */}
            <div className="grid gap-1 my-1">
              <label htmlFor="username" className="label-app">
                username
              </label>
              <input
                name="username"
                type="text"
                id="username"
                onChange={(e: any) => setUsername(e.target.value)}
                placeholder="username"
                className="form-input-app"
              />
            </div>

            {/* PASSWORD */}
            <div className="grid gap-1 my-1">
              <label htmlFor="password" className="label-app">
                password
              </label>

              <div className="relative w-full max-w-md">
                <input
                  onChange={(e: any) => setPassword(e.target.value)}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="password"
                  className="form-input-app"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-500 -translate-y-1/2 cursor-pointer right-3 top-1/2 hover:text-gray-700"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="px-5 cursor-pointer button-primary"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-5">
            <hr className="border-t border-gray-300 grow" />
          </div>

          <div>
            <button className="text-red-500">Lupa password?</button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <img
          src={herosection}
          alt="simbol login screen"
          className="h-[570px] w-[600px]"
        />
      </div>
    </div>
  );
}
