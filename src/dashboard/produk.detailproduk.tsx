import clsx from "clsx";
import { Upload } from "lucide-react";
import { useEffect, useState } from "preact/hooks";
import { useNavigate, useParams } from "react-router";
import { Alert } from "../components/alert";
import Input from "../components/input";
import InputArea from "../components/inputarea";
import { sweet } from "../components/sweet";
import DashboardLayout from "../layout/dashboardlayout";
import {
  deleteproduct,
  detailproduct,
  kategori,
  updateproduct,
} from "../lib/fetch";
import { ImageUploader } from "./produk.tambahproduk";

export default function ProductDetailPage() {
  const [dataKategori, setDataKategori] = useState([]);
  const [failedFetch, setFailedFetch] = useState("");

  async function getKategori() {
    try {
      const res = await kategori();
      setDataKategori(res.data.data);
    } catch (error) {
      console.log(error);
      setFailedFetch("Oops, sepertinya ada kesalahan saat memuat data.");
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
  const [previewA, setPreviewA] = useState("");
  const [previewB, setPreviewB] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [gambar, setGambar] = useState<File[]>([]);

  const handleSetGambar = (file: File) => {
    setGambar((prev) => [...prev, file]);
  };

  const [loadingButton, setLoadingButton] = useState(false);

  const [isNewUpload, setIsNewUpload] = useState(false);

  const { id } = useParams<{ id: string }>();
  async function getProduct() {
    try {
      const res = await detailproduct(id as string);
      const dataproduk = res.data.data[0];
      setKategoriSelected(dataproduk.kategoriId);
      setNama(dataproduk.nama);
      setHarga(dataproduk.harga);
      setStok(dataproduk.stok);
      setDeskripsi(dataproduk.deskripsi);
      setGambar(dataproduk.gambar);
      setPreviewA(dataproduk.gambar[0].url);
      setPreviewB(dataproduk.gambar[1].url);
    } catch (error) {
      console.log(error);
      setFailedFetch("Oops, sepertinya ada kesalahan saat memuat data.");
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  async function updateProduct() {
    const result = await sweet.confirm({
      title: "Update produk?",
      text: "Data perubahan saat update tidak dapat dikembalikan!",
      confirmButtonText: "Update",
    });

    if (result.isConfirmed) {
      setLoadingButton(true);
      try {
        const formData = new FormData();

        formData.append("nama", nama);
        formData.append("harga", harga);
        formData.append("stok", stok);
        formData.append("deskripsi", deskripsi);
        formData.append("kategoriId", kategoriSelected);
        formData.append("isUpdateThumbnail", String(isNewUpload));

        if (isNewUpload) {
          gambar.forEach((file) => {
            formData.append("gambar", file);
          });
        }

        const res = await updateproduct(id as string, formData);

        setSuccessMessage(res.data.message);
        setLoadingButton(false);
        sweet.toastSuccess(res.data.message);
      } catch (err) {
        console.error("Error addProduk:", err);
        setErrorMessage(
          "Terjadi kesalahan saat menambahkan produk. err: " +
            JSON.stringify(err)
        );
        setLoadingButton(false);
      }
    }
  }

  const route = useNavigate();

  async function deteleProduct() {
    const result = await sweet.confirm({
      title: "Hapus produk?",
      text: "Data tidak bisa dikembalikan!",
      confirmButtonText: "Hapus",
    });

    if (result.isConfirmed) {
      setLoadingButton(true);
      try {
        const res = await deleteproduct(id as string);
        sweet.toastSuccess(res.data.message);
        setLoadingButton(false);
        route("/produk");
      } catch (error) {
        sweet.toastError("Terjadi kesalahan : " + JSON.stringify(error));
        setLoadingButton(false);
        console.log(error);
      }
    }
  }

  return (
    <DashboardLayout text="Detail Produk" subtext="detail data produk">
      {failedFetch ? (
        <Alert type="danger">{failedFetch}</Alert>
      ) : (
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
              onChange={(e: any) => setHarga(e.target.value)}
            />
            <Input
              label="Stok Produk"
              defaultValue={stok}
              onChange={(e: any) => setStok(e.target.value)}
            />
            <div></div>
            <div className="grid col-span-2">
              <div className=" font-semibold">Kategori Produk</div>
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
            <div className="col-span-6 font-semibold flex gap-3">
              <div>Thumbnail Produk</div>
              <button
                className="cursor-pointer flex gap-2"
                onClick={() => {
                  setIsNewUpload(!isNewUpload);
                  setGambar([]);
                }}
              >
                <Upload />{" "}
                <span className="font-normal italic">
                  {!isNewUpload ? "Upload Ulang" : "Batal"}
                </span>
              </button>
            </div>
            <div></div>
            <div className="col-span-2">
              {isNewUpload ? (
                <ImageUploader
                  label="Upload Thumbnail 1"
                  onFileSelected={handleSetGambar}
                />
              ) : (
                <div className="h-[60vh] border-2 border-slate-200 border-dashed text-slate-500 italic flex justify-center items-center cursor-pointer rounded-lg overflow-hidden relative">
                  <img
                    src={previewA}
                    alt="preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="col-span-2">
              {isNewUpload ? (
                <ImageUploader
                  label="Upload Thumbnail 2"
                  onFileSelected={handleSetGambar}
                />
              ) : (
                <div className="h-[60vh] border-2 border-slate-200 border-dashed text-slate-500 italic flex justify-center items-center cursor-pointer rounded-lg overflow-hidden relative">
                  <img
                    src={previewB}
                    alt="preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          <div></div>
          <div className="flex justify-end gap-1">
            <button
              className="py-2 bg-red-600 text-white rounded cursor-pointer px-6 mb-5"
              disabled={loadingButton}
              onClick={deteleProduct}
            >
              Hapus Produk
            </button>
            <button
              className="py-2 bg-slate-600 text-white rounded cursor-pointer px-6 mb-5"
              disabled={loadingButton}
              onClick={updateProduct}
            >
              {loadingButton ? "Loading.." : "Update Produk"}
            </button>
          </div>
          {successMessage && <Alert type="success">{successMessage}</Alert>}
          {errorMessage && <Alert type="danger">{errorMessage}</Alert>}
        </div>
      )}
    </DashboardLayout>
  );
}
