import { useEffect, useState } from "preact/hooks";
import DashboardLayout from "../layout/dashboardlayout";
import { orderadmin } from "../lib/fetch";

export default function OrderPage() {
  const [dataOrder, setDataOrder] = useState([]);

  async function getDataOrder() {
    const res = await orderadmin();
    setDataOrder(res.data.data);
  }

  useEffect(() => {
    getDataOrder();
  }, []);

  return (
    <DashboardLayout text="List Order" subtext="penjualan produk">
      <TableOrder data={dataOrder} />
      <></>
    </DashboardLayout>
  );
}

type OrderItem = {
  id: number;
  invoice: string;
  total: number;
  createdAt: string;
  status: string;
  username: string;
};

export function TableOrder({ data }: { data: OrderItem[] }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-sm font-semibold text-left border-b bg-gray-50">
          <th className="p-3">No</th>
          <th className="p-3">Invoice</th>
          <th className="p-3">Total</th>
          <th className="p-3">Customer</th>
          <th className="p-3">Tanggal</th>
          <th className="p-3 text-center">Status</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} className="transition border-b hover:bg-gray-50">
            <td className="p-3 text-sm text-gray-700">{index + 1}</td>

            <td className="p-3 text-sm font-medium text-gray-800">
              {item.invoice}
            </td>

            <td className="p-3 text-sm font-semibold text-gray-800">
              Rp {item.total.toLocaleString("id-ID")}
            </td>

            <td className="p-3 text-sm">{item.username}</td>

            <td className="p-3 text-sm text-gray-600">
              {new Date(item.createdAt).toLocaleString("id-ID")}
            </td>

            <td className="p-3 text-center">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full 
                  ${
                    item.status === "PAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
