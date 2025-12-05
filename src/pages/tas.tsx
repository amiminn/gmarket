import { ScrollText } from "lucide-react";
import { useEffect, useState } from "preact/hooks";
import { NavLink } from "react-router";
import { sweet } from "../components/sweet";
import PagesLayout, { BottomBar } from "../layout/pageslayout";
import {
  checkout,
  deletekeranjang,
  keranjang,
  updateqtykeranjang,
} from "../lib/fetch";
import { useNavigateTransition } from "../lib/navigate";
import { useCartStore } from "../lib/productstore";

export default function ComponentNamePage() {
  const [dataCart, setDataCart] = useState([]);
  const reset = useCartStore((s) => s.resetCart);
  const addCart = useCartStore((s) => s.addCart);

  async function getCart() {
    reset();
    try {
      const res = await keranjang();
      res.data.data.forEach((item: any) => {
        addCart(item.id);
      });
      setDataCart(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  const route = useNavigateTransition();
  const removeFromCart = useCartStore((state) => state.removeCart);

  async function addQtyCart(id: number, qty: number) {
    try {
      await updateqtykeranjang({ id, qty });
      getCart();
    } catch (error) {
      sweet.toastError("Terjadi kesalahan : " + JSON.stringify(error));
    }
  }

  async function subQtyCart(id: number, qty: number) {
    if (qty === 0) {
      deleteCart(id);
    } else {
      try {
        await updateqtykeranjang({ id, qty });
        getCart();
      } catch (error) {
        sweet.toastError("Terjadi kesalahan : " + JSON.stringify(error));
      }
    }
  }

  async function deleteCart(id: number) {
    try {
      await deletekeranjang(id.toString());
      getCart();
      removeFromCart(id);
    } catch (error) {
      sweet.toastError("Terjadi kesalahan : " + JSON.stringify(error));
    }
  }

  async function checkoutProduct() {
    const data = dataCart.map((item: any) => {
      return {
        productId: item.productId,
        qty: item.qty,
      };
    });
    try {
      const res = await checkout(data);
      sweet.toastSuccess(res.data.message);

      route("/checkout/" + res.data.data.invoice + "/" + res.data.data.token);
    } catch (error: any) {
      sweet.toastError("Terjadi kesalahan : " + error.response.data.message);
    }
  }

  return (
    <PagesLayout>
      <header className="flex justify-between px-3 my-2 text-xl text-center">
        <span>isi tasku</span>
        <NavLink
          to={"/self-order"}
          viewTransition
          className="flex justify-center gap-2 cursor-pointer"
        >
          <ScrollText size={26} />
        </NavLink>
      </header>

      {dataCart.length === 0 && (
        <div className="flex items-center justify-center h-full my-20">
          <p className="text-xl text-center text-gray-500">
            Belum ada produk di keranjang
          </p>
        </div>
      )}

      <div className="grid gap-2">
        {dataCart.map((item: any) => {
          const firstImage = item.gambar?.[0]?.url;

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border-b border-gray-200"
            >
              {/* Gambar produk */}
              <img
                onClick={() => route("/detail-produk/" + item.productId)}
                src={firstImage}
                alt={item.nama}
                className="object-cover w-20 h-24 rounded-md cursor-pointer"
              />

              {/* Detail produk */}
              <div className="flex flex-col flex-1 gap-1">
                {/* Nama Produk */}
                <h2 className="font-semibold text-[15px] leading-5 line-clamp-2">
                  {item.nama}
                </h2>

                {/* Harga Satuan */}
                <p className="text-red-600 font-semibold text-[14px]">
                  {item.harga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>

                {/* Stok info */}
                {item.stok <= 5 && (
                  <span className="text-xs font-medium text-orange-600">
                    Stok tersisa {item.stok}
                  </span>
                )}

                {/* Qty Controller */}
                <div className="flex items-center gap-3 mt-1">
                  <button
                    onClick={() => subQtyCart(item.id, item.qty - 1)}
                    className="flex items-center justify-center transition bg-gray-200 rounded cursor-pointer w-7 h-7 hover:bg-gray-300 active:scale-95"
                  >
                    -
                  </button>

                  <span className="w-8 font-medium text-center">
                    {item.qty}
                  </span>

                  <button
                    onClick={() => addQtyCart(item.id, item.qty + 1)}
                    className="flex items-center justify-center transition bg-gray-200 rounded cursor-pointer w-7 h-7 hover:bg-gray-300 active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total harga */}
              <div className="font-semibold text-right">
                {(item.qty * item.harga).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </div>
            </div>
          );
        })}
      </div>
      <br />

      {/* Total Harga */}
      {dataCart.length !== 0 && (
        <div className="flex items-center justify-between w-full p-4 mb-4 bg-white rounded-lg shadow-md">
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-xl font-bold text-red-600">
              {dataCart
                .reduce(
                  (acc, item: { qty: number; harga: number }) =>
                    acc + item.qty * item.harga,
                  0
                )
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
            </p>
          </div>
        </div>
      )}

      {/* Tombol Checkout Paling Bawah */}
      {dataCart.length !== 0 && (
        <button
          onClick={checkoutProduct}
          className="w-full py-3 mb-20 text-white transition rounded-lg shadow-lg cursor-pointer bg-slate-900 hover:bg-slate-800 active:scale-95"
        >
          Checkout
        </button>
      )}

      <BottomBar />
    </PagesLayout>
  );
}
