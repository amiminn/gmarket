import {
  Box,
  CheckCheck,
  CreditCard,
  Loader,
  ShoppingBag,
  User,
  UserRoundX,
} from "lucide-react";
import { useEffect, useState } from "preact/hooks";
import DashboardLayout from "../layout/dashboardlayout";
import { dashboard } from "../lib/fetch";
import { nominal } from "../lib/string";

export default function DashboardPage() {
  const [customerActive, setCustomerActive] = useState(0);
  const [customerInactive, setCustomerInactive] = useState(0);

  const [orderAll, setOrderAll] = useState(0);
  const [orderPending, setOrderPending] = useState(0);
  const [orderPaid, setOrderPaid] = useState(0);

  const [totalProduk, setTotalProduk] = useState(0);
  const [totalPendapatan, setTotalPendapatan] = useState<number>(0);

  async function getDataDashboard() {
    const res = await dashboard();
    console.log(res.data.data);
    setCustomerActive(res.data.data.customer_active);
    setCustomerInactive(res.data.data.customer_inactive);
    setOrderAll(res.data.data.order_all);
    setOrderPending(res.data.data.order_pending);
    setOrderPaid(res.data.data.order_paid);
    setTotalProduk(res.data.data.product);
    setTotalPendapatan(res.data.data.total_pendapatan);
  }

  useEffect(() => {
    getDataDashboard();
  }, []);

  return (
    <DashboardLayout text="Dashboard" subtext="Overview data internal">
      <div className="grid grid-cols-4 gap-3">
        <Card
          name="Customer Active"
          total={customerActive}
          icon={<User size={40} />}
        />
        <Card
          name="Customer Inactive"
          total={customerInactive}
          icon={<UserRoundX size={40} />}
        />
        <Card
          name="Order All"
          total={orderAll}
          icon={<ShoppingBag size={40} />}
        />
        <Card
          name="Order Pending"
          total={orderPending}
          icon={<Loader size={40} />}
        />
        <Card
          name="Order Paid"
          total={orderPaid}
          icon={<CheckCheck size={40} />}
        />
        <Card name="Produk" total={totalProduk} icon={<Box size={40} />} />
        <div className="col-span-2">
          <Card
            name="Total Pendapatan Diterima"
            total={nominal(totalPendapatan)}
            icon={<CreditCard size={40} />}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

function Card({
  name,
  total,
  icon,
}: {
  name: string;
  total: number | string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-3 border rounded">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div>{icon}</div>
        <div className="text-3xl font-semibold">{total}</div>
      </div>
      <div>{name}</div>
    </div>
  );
}
