import { useEffect, useState } from "preact/hooks";
import PagesLayout, { BottomBar } from "../layout/pageslayout";
import { selforder } from "../lib/fetch";

export default function SekfOrderPage() {
  const [dataOrder, setDataOrder] = useState([]);

  async function getDataOrder() {
    const res = await selforder();
    setDataOrder(res.data.data);
  }

  useEffect(() => {
    getDataOrder();
  }, []);
  return (
    <PagesLayout>
      <header className="flex justify-center px-3 my-2 text-xl text-center">
        Riwayat Invoice
      </header>
      <OrderTable data={dataOrder} />
      <BottomBar />
    </PagesLayout>
  );
}

type Order = {
  id: number;
  userId: number;
  invoice: string;
  total: number;
  status: string;
  token: string;
  createdAt: string;
  updatedAt: string;
};

export function OrderTable({ data }: { data: Order[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-gray-700 bg-gray-100">
          <tr>
            <th className="px-4 py-5">Invoice</th>
            <th className="px-4 py-5">Total</th>
            <th className="px-4 py-5">Status</th>
            <th className="px-4 py-5">Tanggal</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="transition border-t hover:bg-gray-50">
              <td className="px-4 py-5 font-medium">{item.invoice}</td>

              <td className="px-4 py-5">
                Rp {item.total.toLocaleString("id-ID")}
              </td>

              <td className="px-4 py-5">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold
                    ${
                      item.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : item.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }
                  `}
                >
                  {item.status}
                </span>
              </td>

              <td className="px-4 py-5">
                {new Date(item.createdAt).toLocaleString("id-ID")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-20"></div>
    </div>
  );
}
