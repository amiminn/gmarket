import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "preact/hooks";
import Input from "../components/input";
import InputArea from "../components/inputarea";
import DashboardLayout from "../layout/dashboardlayout";
import { addproduct, kategori } from "../lib/fetch";

export default function ProductPage() {
  const [dataKategori, setDataKategori] = useState([]);

  async function getKategori() {
    try {
      const res = await kategori();
      setDataKategori(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getKategori();
  }, []);

  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategoriSelected, setKategoriSelected] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [gambar, setGambar] = useState<File[]>([]);

  const handleSetGambar = (file: File) => {
    setGambar((prev) => [...prev, file]);
  };

  const route = useNavigateTransition();

  const [loadingButton, setLoadingButton] = useState(false);

  async function addProduk() {
    setLoadingButton(true);
    try {
      const formData = new FormData();

      formData.append("nama", nama);
      formData.append("harga", harga);
      formData.append("stok", stok);
      formData.append("deskripsi", deskripsi);
      formData.append("kategoriId", kategoriSelected);

      gambar.forEach((file) => {
        formData.append("gambar", file);
      });

      const res = await addproduct(formData);

      setSuccessMessage(res.data.message);
      setLoadingButton(false);
      sweet.toastSuccess(res.data.message);

      setTimeout(() => {
        route("/produk");
      }, 3000);
    } catch (err) {
      console.error("Error addProduk:", err);
      setErrorMessage(
        "Terjadi kesalahan saat menambahkan produk. err: " + JSON.stringify(err)
      );
      setLoadingButton(false);
    }
  }

  return (
    <DashboardLayout text="Tambah Produk" subtext="data produk">
      <div className="grid gap-4">
        {successMessage && <Alert type="success">{successMessage}</Alert>}
        {errorMessage && <Alert type="danger">{errorMessage}</Alert>}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nama Produk"
            defaultValue={nama}
            onChange={(e: any) => setNama(e.target.value)}
          />
          <Input
            label="Harga Produk"
            defaultValue={harga}
            type="number"
            onChange={(e: any) => setHarga(e.target.value)}
          />
          <Input
            label="Stok Produk"
            defaultValue={stok}
            onChange={(e: any) => setStok(e.target.value)}
          />
          <div></div>
          <div className="grid col-span-2">
            <div className="font-semibold ">Kategori Produk</div>
            <div className="grid grid-cols-4 gap-2">
              {dataKategori.map((item: any) => {
                return (
                  <button
                    onClick={() => setKategoriSelected(item.id)}
                    className={clsx(
                      "border-2 rounded p-2 cursor-pointer",
                      kategoriSelected === item.id
                        ? "bg-red-100 border-red-100 text-red-500"
                        : "bg-slate-200 border-slate-200 "
                    )}
                  >
                    {item.nama}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="col-span-2">
            <InputArea
              label="Deskripsi Produk"
              rows={5}
              value={deskripsi}
              onChange={(e: any) => setDeskripsi(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6 font-semibold">Thumbnail Produk</div>
          <div></div>
          <div className="col-span-2">
            <ImageUploader
              label="Upload Thumbnail 1"
              onFileSelected={handleSetGambar}
            />
          </div>
          <div className="col-span-2">
            <ImageUploader
              label="Upload Thumbnail 2"
              onFileSelected={handleSetGambar}
            />
          </div>
        </div>
        <div></div>

        <button
          className="mb-5 cursor-pointer button-primary"
          disabled={loadingButton}
          onClick={addProduk}
        >
          {loadingButton ? "Loading.." : "Tambah Produk"}
        </button>
        {successMessage && <Alert type="success">{successMessage}</Alert>}
        {errorMessage && <Alert type="danger">{errorMessage}</Alert>}
      </div>
    </DashboardLayout>
  );
}

import { useRef } from "react";
import { Alert } from "../components/alert";
import { sweet } from "../components/sweet";
import { useNavigateTransition } from "../lib/navigate";

type Props = {
  label: string;
  // onChange?: (file: File | null) => void;
  onFileSelected: (file: File) => void;
};

export function ImageUploader({ label, onFileSelected }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => fileRef.current?.click();

  const handleFile = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    onFileSelected(file); // 🔥 kirim file ke parent
  };

  return (
    <div
      onClick={handleClick}
      className="h-[60vh] border-2 border-slate-200 border-dashed text-slate-500 italic flex justify-center items-center cursor-pointer rounded-lg overflow-hidden relative"
    >
      {/* Hidden input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      {/* Preview image (cover full div) */}
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="absolute inset-0 object-cover w-full h-full"
        />
      ) : (
        <div className="flex items-center text-slate-500">
          Click <ArrowRight size={18} className="mx-2" /> {label}
        </div>
      )}
    </div>
  );
}
