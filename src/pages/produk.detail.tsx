import { useEffect, useState } from "preact/hooks";
import { useParams } from "react-router";
import PagesLayout from "../layout/pageslayout";
import { addfavotite, addkeranjang, detailproduct } from "../lib/fetch";

export default function DetailProdukPage() {
  const { id } = useParams<{ id: string }>();
  const isLogin = useAuthStore((s) => s.isLogin);

  const [nama, setNama] = useState("");
  const [gambar, setGambar] = useState<{ url: string }[]>([]);

  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [detailKatgeori, setDetailKatgeori] = useState<string[]>([]);
  const [ukuran, setUkuran] = useState("");

  async function getProduct() {
    try {
      const res = await detailproduct(id as string);
      const resdata = res.data.data[0];
      setNama(resdata.nama);
      setHarga(resdata.harga);
      setStok(resdata.stok);
      setDetailKatgeori(stringToJsonArray(resdata.detail_kategori as string));
      setDeskripsi(resdata.deskripsi);
      setGambar(resdata.gambar);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!isLogin) {
      route("/login");
    }
    getProduct();
  }, []);

  const addToCart = useCartStore((state) => state.addCart);
  const cart = useCartStore((state) => state.cart);

  async function tambahKeTas() {
    if (ukuran === "") {
      sweet.toastError("Pilih ukuran terlebih dahulu");
    } else {
      try {
        const res = await addkeranjang({ ukuran, id: id as string });
        addToCart(parseInt(id as string));
        sweet.toastSuccess(res.data.message);
      } catch (error) {
        sweet.toastError(
          "Oops, sepertinya ada kesalahan sistem. " + JSON.stringify(error)
        );
      }
    }
  }

  const route = useNavigateTransition();

  const addFav = useFavStore((s) => s.addFav);
  const removeFav = useFavStore((s) => s.removeFav);
  const fav = useFavStore((state) => state.fav);

  async function addFavorite() {
    try {
      const res = await addfavotite(id as string);
      if (res.data.message === "Produk favorite berhasil ditambah.") {
        addFav(parseInt(id as string));
      }
      if (res.data.message === "Produk favorite berhasil dihapus.") {
        removeFav(parseInt(id as string));
      }
    } catch (error) {
      sweet.toastError(
        "Oops, sepertinya ada kesalahan sistem. " + JSON.stringify(error)
      );
    }
  }

  return (
    <PagesLayout>
      <button
        className="absolute z-10 p-2 bg-white rounded-full cursor-pointer top-5 left-5 text-slate-800"
        onClick={() => route(-1)}
        title="Kembali"
      >
        <ArrowLeft />
      </button>
      <Carousel>
        {(gambar?.length ?? 0) > 0 ? (
          gambar!.map((g, i) => {
            const src = g?.url ?? ""; // fallback kosong
            const altText = nama || "_thumbnail";

            return (
              <div key={i} className="h-[500px] rounded overflow-hidden">
                <img
                  src={src}
                  alt={altText}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src = "/fallback.jpg"; // optional jika img broken
                  }}
                />
              </div>
            );
          })
        ) : (
          <div className="h-[480px] w-full flex items-center justify-center bg-gray-200 text-gray-500">
            Tidak ada gambar
          </div>
        )}
      </Carousel>

      {nama && <div className="py-2 mt-3 text-2xl font-semibold">{nama}</div>}
      <div className="italic">Pilih Ukuran: </div>
      <div className="flex gap-2">
        {detailKatgeori.length > 0 &&
          detailKatgeori.map((item, idx) => {
            return (
              <button
                onClick={() => setUkuran(item)}
                key={idx}
                className={clsx(
                  "py-2 px-4  rounded cursor-pointer",
                  ukuran === item ? "bg-slate-700 text-white" : "bg-slate-100"
                )}
              >
                {item}
              </button>
            );
          })}
      </div>
      {harga && (
        <div className="mt-3 text-lg font-semibold">
          <span className=""> Harga: </span>
          <span className="text-2xl">{nominal(parseInt(harga))}</span>
        </div>
      )}
      {stok && (
        <div className="mt-3 text-lg font-semibold">
          <span className=""> Sisa Stok: </span>
          <span className="text-2xl">{stok}</span>
        </div>
      )}
      {deskripsi && (
        <div className="px-1 py-2 mt-3 text-xl bg-slate-50">{deskripsi}</div>
      )}

      <div className="mb-20"></div>
      <div className="fixed bottom-0 max-w-[480px] mx-auto left-0 right-0 font-normal rounded-t bg-white drop-shadow">
        <div className="flex w-full h-16 gap-3 p-2">
          <button
            onClick={() => route("/cart")}
            className="relative px-1 mx-2 rounded-lg cursor-pointer"
            aria-label="Go To Cart"
            data-test-id="cartLink"
          >
            {cart.length > 0 && (
              <span className="absolute right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-600 rounded-full top-2">
                {cart.length}
              </span>
            )}
            <ShoppingBag />
          </button>

          <button
            className="px-0 m-auto mx-2 bg-white cursor-pointer disabled:bg-white"
            onClick={addFavorite}
            data-test-id="mobileMainWishlistBtn"
            aria-label="Add To Wishlist"
          >
            <Heart
              fill={
                fav.find((f) => f === parseInt(id as string))
                  ? "#e7000b"
                  : "none"
              }
              className={clsx(
                fav.find((f) => f === parseInt(id as string)) && "text-red-600"
              )}
            />
          </button>

          <button
            className="flex-1 text-white bg-black rounded-lg cursor-pointer"
            aria-labelledby="AddToCart"
            id="AddToCart"
            onClick={tambahKeTas}
            data-test-id="addToCartButton"
          >
            Masukkan ke Tas
          </button>
        </div>
      </div>
    </PagesLayout>
  );
}

import clsx from "clsx";
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import { Carousel } from "../components/carousel";
import { sweet } from "../components/sweet";
import { useAuthStore } from "../lib/authstore";
import { useNavigateTransition } from "../lib/navigate";
import { useCartStore, useFavStore } from "../lib/productstore";
import { nominal, stringToJsonArray } from "../lib/string";
