import { ChevronRight, Plus } from "lucide-react";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router";
import DashboardLayout from "../layout/dashboardlayout";
import { listproduct } from "../lib/fetch";
import { nominal } from "../lib/string";

export default function ProductPage() {
  const [listProductData, setListProductData] = useState([]);
  async function getProduct() {
    try {
      const res = await listproduct();
      setListProductData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <DashboardLayout
      text="Produk"
      subtext="data produk"
      component={<AddProduk />}
    >
      <div className="grid grid-cols-5 gap-3">
        {listProductData.map((data: any, idx: number) => {
          return (
            <CardImage
              url={data.gambar[0].url}
              key={idx}
              nama={data.nama}
              harga={data.harga}
              id={data.id}
            />
          );
        })}
      </div>
    </DashboardLayout>
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
    <>
      <div className="overflow-hidden rounded-md relative">
        <img
          src={url}
          alt="product_"
          className="w-full h-[300px] object-cover"
        />
        <Link
          to={"/produk/detail-produk/" + id}
          className="flex absolute bottom-0  justify-between bg-black/50 text-white p-2 w-full "
        >
          <div>
            <div>{nama}</div>
            <div>{nominal(harga)}</div>
          </div>
          <div>
            <ChevronRight size={40} />
          </div>
        </Link>
      </div>
    </>
  );
}

function AddProduk() {
  return (
    <Link
      to="/produk/tambah-produk"
      className="button-primary flex items-center cursor-pointer"
    >
      <Plus /> Tambah Produk
    </Link>
  );
}
