import { Trash } from "lucide-react";
import { useEffect, useState } from "preact/hooks";
import { sweet } from "../components/sweet";
import DashboardLayout from "../layout/dashboardlayout";
import { deleteuser, users } from "../lib/fetch";

export default function CustomerPage() {
  const [dataUsers, setDataUsers] = useState([]);

  async function getDataUsers() {
    const res = await users();
    setDataUsers(res.data.data);
  }

  useEffect(() => {
    getDataUsers();
  }, []);

  async function deleteUserAdmin(id: number) {
    const result = await sweet.confirm({
      text: "Data yang terhapus mungkin tidak dapat dipulihkan.",
      confirmButtonText: "Hapus",
      title: "Hapus User?",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteuser(id.toString());
        sweet.toastSuccess(res.data.message);
        getDataUsers();
      } catch (error) {
        sweet.toastError("Terjadi kesalahan : " + JSON.stringify(error));
      }
    }
  }

  function TableCustomer({ data }: { data: Customer[] }) {
    return (
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-sm font-semibold text-left text-gray-700 border-b bg-gray-50">
            <th className="p-3">No</th>
            <th className="p-3">Username</th>
            <th className="p-3">Email</th>
            <th className="p-3">Jumlah Order</th>
            <th className="p-3">Status</th>
            <th className="p-3">Role</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((cust, index) => (
            <tr key={cust.id} className="transition border-b hover:bg-gray-50">
              <td className="p-3 text-sm">{index + 1}</td>
              <td className="p-3 text-sm font-medium text-gray-800">
                {cust.username}
              </td>
              <td className="p-3 text-sm ">{cust.email}</td>
              <td className="p-3 text-sm font-semibold">
                <span className="text-red-600">{cust.total_order}</span>
              </td>
              <td className="p-3 text-sm">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    cust.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {cust.status}
                </span>
              </td>
              <td className="p-3 text-center">{cust.role}</td>
              <td className="p-3 text-center">
                {cust.role !== "ADMIN" && (
                  <button
                    className="px-3 py-1 text-xs font-medium text-white transition bg-red-600 rounded-md cursor-pointer hover:bg-red-700"
                    onClick={() => deleteUserAdmin(cust.id)}
                  >
                    <Trash size={18} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <DashboardLayout text="Customer" subtext="data customer">
      <TableCustomer data={dataUsers} />
    </DashboardLayout>
  );
}
type Customer = {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  total_order: number;
};
