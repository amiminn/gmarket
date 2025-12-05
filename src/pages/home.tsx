import clsx from "clsx";
import { useEffect, useState } from "preact/hooks";
import { NavLink } from "react-router";
import { Carousel } from "../components/carousel";
import PagesLayout, { BottomBar, BottomLoginBar } from "../layout/pageslayout";
import { useAuthStore } from "../lib/authstore";
import { favproduk, kategori, keranjang, listproduct } from "../lib/fetch";
import { useCartStore, useFavStore } from "../lib/productstore";
import { nominal } from "../lib/string";

export default function HomePage() {
  const [cariProduct, setCariProduct] = useState("");
  const isLogin = useAuthStore((s) => s.isLogin);
  const addToCart = useCartStore((state) => state.addCart);
  const addFav = useFavStore((s) => s.addFav);

  useEffect(() => {
    if (isLogin) {
      init();
    }
  }, []);

  async function init() {
    try {
      const reskeranjang = await keranjang();
      const resfav = await favproduk();
      const datacart = reskeranjang.data.data;
      datacart.forEach((item: any) => {
        addToCart(item.id);
      });
      const datafav = resfav.data.data;
      datafav.forEach((item: any) => {
        addFav(item.id);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const [selectedKategori, setSelectedKategori] = useState(0);

  return (
    <PagesLayout>
      <div className="sticky top-0 z-10 flex items-center py-3 bg-white">
        <input
          type="text"
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-l-full focus:outline-none"
          placeholder="Cari..."
          defaultValue={cariProduct}
          onChange={(e: any) => setCariProduct(e.target.value)}
        />
        <button className="px-4 py-2 text-white bg-gray-300 border-2 border-gray-300 rounded-r-full cursor-pointer">
          Cari
        </button>
      </div>
      <div className="my-4 mb-7">
        <Carousel>
          <img
            src="https://i.ibb.co.com/mrZrXgbS/1920x480-SECONDARYAPP-DESKTOP.jpg"
            alt="1920x480-SECONDARYAPP-DESKTOP"
          />
          <img
            src="https://i.ibb.co.com/VY7NdS7p/1920x480-arts-outdoor.gif"
            alt="1920x480-arts-outdoor"
          />
          <img
            src="https://i.ibb.co.com/TSS3ZT8/1920x480-SECONDARYAPP-DESKTOP-1.jpg"
            alt="1920x480-SECONDARYAPP-DESKTOP-1"
          />
          <img
            src="https://i.ibb.co.com/nsf02x7R/1920x480-SECONDARYAPP-DESKTOP-2.jpg"
            alt="1920x480-SECONDARYAPP-DESKTOP-2"
          />
        </Carousel>
      </div>
      <ListKategori onchange={(e) => setSelectedKategori(e)} />
      <ListProduct cari={cariProduct} kategoriSelected={selectedKategori} />
      <div className="mb-20"></div>
      {isLogin ? <BottomBar /> : <BottomLoginBar />}
    </PagesLayout>
  );
}
function ListProduct({
  cari,
  kategoriSelected,
}: {
  cari: string;
  kategoriSelected: number;
}) {
  const [allProductData, setAllProductData] = useState<any[]>([]);
  const [listProductData, setListProductData] = useState<any[]>([]);

  async function getProduct() {
    try {
      const res = await listproduct();
      const produk = res.data.data;

      setAllProductData(produk);
      setListProductData(produk);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    let filtered = allProductData;

    if (kategoriSelected !== 0) {
      filtered = filtered.filter(
        (item) => item.kategoriId === kategoriSelected
      );
    }

    if (cari.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.nama.toLowerCase().includes(cari.toLowerCase())
      );
    }

    setListProductData(filtered);
  }, [cari, kategoriSelected, allProductData]);

  return (
    <div className="grid grid-cols-2 gap-2">
      {listProductData.map((data: any, idx: number) => (
        <CardImage
          key={idx}
          url={data.gambar?.[0]?.url}
          nama={data.nama}
          harga={data.harga}
          id={data.id}
        />
      ))}
    </div>
  );
}

function CardImage({
  url,
  nama,
  harga,
  id,
}: {
  url: string;
  nama: string;
  harga: number;
  id: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-md">
      <img src={url} alt="product_" className="w-full h-[280px] object-cover" />
      <NavLink
        to={"/detail-produk/" + id}
        className="absolute bottom-0 flex justify-between w-full p-2 text-white bg-black/50 "
        viewTransition
      >
        <div>
          <div>{nama}</div>
          <div>{nominal(harga)}</div>
        </div>
      </NavLink>
    </div>
  );
}

function ListKategori({ onchange }: { onchange: (e: number) => void }) {
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

  const [idSelected, SetidSelected] = useState<number>(0);

  return (
    <div className="sticky z-10 flex gap-2 py-3 overflow-x-auto bg-white top-16">
      <button
        onClick={() => {
          SetidSelected(0);
          onchange(0);
        }}
        className={clsx(
          "px-3 py-1 rounded cursor-pointer",
          idSelected === 0 ? "bg-slate-700 text-white" : "bg-slate-100"
        )}
      >
        semua
      </button>
      {dataKategori.map((item: any) => (
        <button
          onClick={() => {
            SetidSelected(item.id);
            onchange(item.id);
          }}
          className={clsx(
            "px-3 py-1 rounded cursor-pointer flex whitespace-nowrap",
            idSelected === item.id ? "bg-slate-700 text-white" : "bg-slate-100"
          )}
          key={item.id}
        >
          {item.nama}
        </button>
      ))}
    </div>
  );
}
