import clsx from "clsx";
import { Plus, Trash, Upload } from "lucide-react";
import { useEffect, useState } from "preact/hooks";
import { Alert } from "../components/alert";
import Input from "../components/input";
import InputArea from "../components/inputarea";
import { sweet } from "../components/sweet";
import DashboardLayout from "../layout/dashboardlayout";
import {
  addkategori,
  hapuskategori,
  kategori,
  updatekategori,
} from "../lib/fetch";
import { stringToJsonArray } from "../lib/string";

export default function OrderPage() {
  const [dataKategori, setDataKategori] = useState([]);

  async function getKategori() {
    try {
      const res = await kategori();
      setDataKategori(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const [kategoriSelected, setKategoriSelected] = useState("");
  const [kategoriNameSelected, setKategoriNameSelected] = useState("");
  const [listDetail, setListDetail] = useState("");

  useEffect(() => {
    getKategori();
  }, []);

  const [openForm, setOpenForm] = useState(false);
  const [nama, setNama] = useState("");
  const [detail, setDetail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function saveKategori() {
    if (nama === "" || detail === "") {
      setErrorMessage("Semua field harus diisi");
    } else {
      try {
        const res = await addkategori({ nama, detail });
        getKategori();
        setSuccessMessage(res.data.message);
        sweet.toastSuccess(res.data.message);
        setKategoriSelected("");
      } catch (error) {
        console.log(error);
        sweet.toastError("Terjadi kesalahan : " + JSON.stringify(error));
      }
    }
  }

  async function updatekategoriproduct() {
    try {
      const res = await updatekategori(kategoriSelected, {
        nama: kategoriNameSelected,
        detail: listDetail,
      });
      sweet.toastSuccess(res.data.message);
      setKategoriSelected("");
      getKategori();
    } catch (error) {
      sweet.toastError("Terjadi kesalahan : " + JSON.stringify(error));
    }
  }

  async function hapuskategoriproduct() {
    try {
      const res = await hapuskategori(kategoriSelected);
      sweet.toastSuccess(res.data.message);
      setKategoriSelected("");
      getKategori();
    } catch (error) {
      sweet.toastError("Terjadi kesalahan : " + JSON.stringify(error));
    }
  }

  return (
    <DashboardLayout text="Kategori" subtext="pengaturan kategori produk">
      <div className="grid grid-cols-2 gap-2">
        <div className="border-r border-slate-200 pr-4 mr-3 ">
          <button
            onClick={() => {
              setOpenForm(!openForm);
              setKategoriSelected("");
            }}
            className="flex justify-center bg-primary text-white rounded w-full items-center cursor-pointer gap-2 px-3 py-2 border border-slate-200"
          >
            <Plus size={20} /> {openForm ? "Batal" : "Tambah Kategori"}
          </button>
          <div className="w-full mt-3 grid grid-cols-2 gap-2">
            {dataKategori.map((item: any) => (
              <button
                onClick={() => {
                  setKategoriSelected(item.id);
                  setOpenForm(false);
                  setListDetail(item.detail);
                  setKategoriNameSelected(item.nama);
                }}
                className={clsx(
                  "p-2 border text-left my-1 w-full cursor-pointer rounded  ",
                  kategoriSelected === item.id
                    ? "bg-red-100 text-red-600 border-red-100"
                    : "border-slate-200 "
                )}
              >
                {item.nama}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full ">
          {openForm && (
            <div className="">
              {errorMessage && <Alert type="danger">{errorMessage}</Alert>}
              {successMessage && <Alert type="info">{successMessage}</Alert>}
              <Input
                label="Nama Kategori"
                onChange={(e: any) => setNama(e.target.value)}
              />
              <InputArea
                label="Detail Kategori"
                onChange={(e: any) => setDetail(e.target.value)}
              />
              <div className="text-xs my-2 italic">
                <span className="text-red-500">*</span> detail kategori berisi
                detail seperti ukuran, warna, dll. ex: S, M, L
              </div>
              <button
                className="button-primary cursor-pointer w-full"
                onClick={saveKategori}
              >
                Simpan
              </button>
            </div>
          )}
          {openForm && detail && (
            <div className="flex gap-2 ">
              {stringToJsonArray(detail).map((item: any) => (
                <div className="border bg-slate-200 border-slate-200 py-2 px-4 rounded my-2 text-sm">
                  {item}
                </div>
              ))}
            </div>
          )}

          {kategoriSelected !== "" && (
            <>
              <div>
                List detail kategori :{" "}
                <span className="font-semibold">{kategoriNameSelected}</span>
              </div>
              <InputArea
                label="detail kategori"
                value={listDetail}
                defaultValue={listDetail}
                onChange={(e: any) => setListDetail(e.target.value)}
              />
              <div className="flex gap-2 ">
                {stringToJsonArray(listDetail).map((item: any) => (
                  <div className="border bg-slate-200 border-slate-200 py-2 px-4 rounded my-2 text-sm">
                    {item}
                  </div>
                ))}
              </div>
              <button
                onClick={updatekategoriproduct}
                className="flex justify-center mt-2 items-center gap-2 py-2 rounded text-white bg-slate-600 cursor-pointer w-full"
              >
                <Upload /> Update Kategori{" "}
                <span className="font-semibold">{kategoriNameSelected}</span>
              </button>
              <button
                onClick={hapuskategoriproduct}
                className="flex justify-center mt-2 items-center gap-2 button-primary cursor-pointer w-full"
              >
                <Trash /> Hapus Kategori{" "}
                <span className="font-semibold">{kategoriNameSelected}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
