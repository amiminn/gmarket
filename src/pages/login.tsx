import clsx from "clsx";
import { Home, LogIn, NotepadText } from "lucide-react";
import { useState } from "preact/hooks";
import { Link } from "react-router";
import { Alert } from "../components/alert";
import Input from "../components/input";
import InputArea from "../components/inputarea";
import { sweet } from "../components/sweet";
import PagesLayout from "../layout/pageslayout";
import { useAuthStore } from "../lib/authstore";
import { firstprofile, login, register } from "../lib/fetch";

export default function LoginPage() {
  const [page, setPage] = useState<"login" | "register">("login");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loginstore = useAuthStore((s) => s.login);

  const [isLoading, setIsLoading] = useState(false);

  async function submitregister() {
    setIsLoading(true);
    const data = {
      username,
      email,
      alamat,
      password,
    };
    try {
      await register(data);
      setErrorMessage("");
      setSuccessMessage("Berhasil mendaftar");
      submitlogin();
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Terjadi kesalahan");
    }
  }

  async function submitlogin() {
    setIsLoading(true);
    const data = {
      username,
      password,
    };
    try {
      const res = await login(data);
      setSuccessMessage("Berhasil login");
      setErrorMessage("");
      const resfirstlogin = await firstprofile(res.data.token);
      const dataprofile = resfirstlogin.data.data;

      if (resfirstlogin) {
        setIsLoading(false);
        loginstore(res.data.token, dataprofile, dataprofile.role);
        window.location.href = "/";
      }
    } catch (error: any) {
      setIsLoading(false);
      sweet.toastError(error.response.data.message);
      setErrorMessage("Terjadi kesalahan, " + error.response.data.message);
    }
  }

  return (
    <PagesLayout>
      <div className="flex justify-center my-8">
        <div className="flex items-center justify-center text-6xl font-bold text-center text-white capitalize rounded-full h-28 w-28 bg-slate-800">
          {page === "login" ? "L" : "R"}
        </div>
      </div>
      {errorMessage && <Alert type="danger">{errorMessage}</Alert>}
      {successMessage && <Alert type="success">{successMessage}</Alert>}
      {page === "login" && (
        <Card>
          <div className="grid gap-2 px-5 py-3">
            <Input
              label="username"
              placeholder="username"
              onChange={(e: any) => setUsername(e.target.value)}
            />
            <Input
              label="password"
              placeholder="password"
              type="password"
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <button
              onClick={submitlogin}
              disabled={isLoading}
              className="w-full py-2 text-white rounded cursor-pointer bg-slate-800"
            >
              {isLoading ? "loading.." : "Login"}
            </button>
          </div>
        </Card>
      )}
      {page === "register" && (
        <Card>
          <div className="grid gap-2 px-5 py-3">
            <Input
              label="username"
              placeholder="username"
              onChange={(e: any) => setUsername(e.target.value)}
            />
            <Input
              label="email"
              placeholder="email"
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <InputArea
              label="alamat"
              placeholder="alamat"
              onChange={(e: any) => setAlamat(e.target.value)}
            />
            <Input
              label="password"
              placeholder="password"
              type="password"
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <button
              onClick={submitregister}
              className="w-full py-2 text-white rounded cursor-pointer bg-slate-800"
            >
              {isLoading ? "loading.." : "Register"}
            </button>
          </div>
        </Card>
      )}
      <div className="fixed bottom-0 max-w-[480px] mx-auto left-0 right-0 font-normal rounded-t bg-white drop-shadow">
        <div className="grid w-full h-16 grid-cols-3 gap-3 p-2">
          <button
            className={clsx(
              "flex justify-center cursor-pointer items-center rounded-lg  gap-2",
              page === "login" && "bg-slate-800 text-white"
            )}
            onClick={() => setPage("login")}
          >
            <LogIn size={20} />
            Login
          </button>
          <Link
            to={"/"}
            className="flex items-center justify-center gap-2 cursor-pointer "
          >
            <Home size={20} />
            Home
          </Link>
          <button
            className={clsx(
              "flex justify-center cursor-pointer items-center rounded-lg  gap-2",
              page === "register" && "bg-slate-800 text-white"
            )}
            onClick={() => setPage("register")}
          >
            <NotepadText size={20} />
            Register
          </button>
        </div>
      </div>
    </PagesLayout>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="p-3">{children}</div>;
}
