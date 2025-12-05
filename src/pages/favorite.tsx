import { useEffect, useState } from "preact/hooks";
import { NavLink } from "react-router";
import PagesLayout, { BottomBar } from "../layout/pageslayout";
import { favproduk } from "../lib/fetch";
import { nominal } from "../lib/string";

export default function ComponentNamePage() {
  const [dataFavProduk, setDataFavProduk] = useState([]);
  async function getDataFavProduk() {
    try {
      const res = await favproduk();
      setDataFavProduk(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataFavProduk();
  }, []);
  return (
    <PagesLayout>
      <header className="my-2 flex text-xl text-center justify-center">
        Wishlistku
      </header>
      <div className="grid grid-cols-2 gap-2">
        {dataFavProduk.length > 0 &&
          dataFavProduk.map((item: CardImageParent, idx: number) => (
            <CardImage
              key={idx}
              url={item.gambar[0].url}
              nama={item.nama}
              harga={item.harga}
              id={item.id}
            />
          ))}
      </div>
      <BottomBar />
    </PagesLayout>
  );
}

type CardImageParent = {
  nama: string;
  harga: number;
  gambar: { url: string }[];
  id: number;
};

type CardImage = {
  nama: string;
  harga: number;
  url: string;
  id: number;
};

function CardImage({ url, nama, harga, id }: CardImage) {
  return (
    <div className="overflow-hidden rounded-md relative">
      <img src={url} alt="product_" className="w-full h-[280px] object-cover" />
      <NavLink
        to={"/detail-produk/" + id}
        className="flex absolute bottom-0  justify-between bg-black/50 text-white p-2 w-full "
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
