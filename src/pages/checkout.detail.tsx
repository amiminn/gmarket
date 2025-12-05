import { useEffect, useState } from "preact/hooks";
import QRCode from "react-qr-code";
import { useParams } from "react-router";
import { sweet } from "../components/sweet";
import PagesLayout, { BottomBar } from "../layout/pageslayout";
import { bayarsekarang, detailinvoice } from "../lib/fetch";

export default function CheckoutDetailPage() {
  const { invoice, token } = useParams();

  async function bayarSekarang() {
    try {
      const res = await bayarsekarang({
        invoice: invoice as string,
        token: token as string,
      });

      sweet.alert({
        title: "Berhasil",
        text: res.data.message,
        icon: "success",
      });
      detailinvoiceorder();
    } catch (error) {
      console.log(error);
    }
  }

  const [statusInvoice, setStatusInvoice] = useState<string>("");

  async function detailinvoiceorder() {
    const res = await detailinvoice(invoice as string);
    setStatusInvoice(res.data.data.status);
  }

  useEffect(() => {
    detailinvoiceorder();
  }, []);

  return (
    <PagesLayout>
      <header className="flex justify-center my-4 text-xl text-center">
        Bayar sekarang?
      </header>
      <div className="flex justify-center my-10">
        <QRCode value={token as string} />
      </div>
      <div className="my-3">
        <p className="text-lg font-semibold text-center">Invoice: {invoice}</p>
      </div>
      <div className="my-3">
        <p className="text-3xl font-semibold text-center">{statusInvoice}</p>
      </div>
      {statusInvoice === "PENDING" && (
        <div className="w-full px-4">
          <button
            onClick={bayarSekarang}
            className="w-full py-2 text-white rounded cursor-pointer bg-slate-800"
          >
            Bayar Sekarang (free)
          </button>
        </div>
      )}
      <BottomBar />
    </PagesLayout>
  );
}
