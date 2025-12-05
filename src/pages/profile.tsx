import { LogOut } from "lucide-react";
import { useEffect, useState } from "preact/hooks";
import Input from "../components/input";
import InputArea from "../components/inputarea";
import { sweet } from "../components/sweet";
import PagesLayout, { BottomBar } from "../layout/pageslayout";
import { profile, updateprofile } from "../lib/fetch";

export default function ComponentNamePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");

  async function getDataProfile() {
    try {
      const res = await profile();
      const dataprofile = res.data.data;
      setUsername(dataprofile.username);
      setEmail(dataprofile.email);
      setAlamat(dataprofile.alamat);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataProfile();
  }, []);

  async function updateProfileUser() {
    try {
      const res = await updateprofile({
        email,
        alamat,
      });
      sweet.toastSuccess(res.data.message);
      getDataProfile();
    } catch (error) {
      console.log(error);
      sweet.toastError("Terjadi kesalahan : " + JSON.stringify(error));
    }
  }

  async function logoutApp() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <PagesLayout>
      <header className="flex justify-center my-2 text-xl text-center">
        Profile
      </header>
      <div className="flex justify-center my-5">
        <div className="flex items-center justify-center text-6xl font-bold text-center text-white capitalize rounded-full h-28 w-28 bg-slate-800">
          {username.slice(0, 1)}
        </div>
      </div>
      <div className="grid gap-2 p-3 border rounded border-slate-200">
        <Input label="username" disabled defaultValue={username} />
        <Input
          label="email"
          defaultValue={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <InputArea
          label="alamat"
          rows={6}
          defaultValue={alamat}
          onChange={(e: any) => setAlamat(e.target.value)}
        />
        <button
          onClick={updateProfileUser}
          className="w-full py-2 mt-2 text-white rounded bg-slate-800"
        >
          Update Profile
        </button>
      </div>
      <button
        className="flex justify-center w-full gap-2 py-2 mt-5 text-white capitalize bg-red-600 rounded cursor-pointer"
        onClick={logoutApp}
      >
        <LogOut /> Logout
      </button>
      <div className="mb-20"></div>
      <BottomBar />
    </PagesLayout>
  );
}
