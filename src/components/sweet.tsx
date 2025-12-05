import type { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ToastBase = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export const sweet = {
  // ============================
  // 🔥 TOAST NOTIFICATIONS
  // ============================
  toastSuccess: (message: string) => {
    return ToastBase.fire({
      icon: "success",
      title: message,
    });
  },

  toastError: (message: string) => {
    return ToastBase.fire({
      icon: "error",
      title: message,
    });
  },

  toastInfo: (message: string) => {
    return ToastBase.fire({
      icon: "info",
      title: message,
    });
  },

  toastWarning: (message: string) => {
    return ToastBase.fire({
      icon: "warning",
      title: message,
    });
  },

  // ============================
  // ❓ CONFIRM DIALOG
  // ============================
  confirm: async ({
    title = "Apakah Anda yakin?",
    text = "Tindakan ini tidak dapat dibatalkan!",
    confirmButtonText = "Ya",
    cancelButtonText = "Batal",
    icon = "warning",
  }: {
    title?: string;
    text?: string;
    icon?: SweetAlertIcon;
    confirmButtonText?: string;
    cancelButtonText?: string;
  }) => {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
      cancelButtonText,
    });
  },

  // ============================
  // ⚡ GENERAL ALERT
  // ============================
  alert: (options: SweetAlertOptions) => {
    return Swal.fire(options);
  },
};

/**
 * Cara Pakai di Komponen TSX
 * 
✅ Toast Success
import { sweet } from "../libs/sweet";

sweet.toastSuccess("Berhasil disimpan!");

❗ Toast Error
sweet.toastError("Gagal menyimpan data.");

🔔 Info
sweet.toastInfo("Ini informasi penting.");

❓ Confirm Dialog
const onDelete = async () => {
  const result = await sweet.confirm({
    title: "Hapus produk?",
    text: "Data tidak bisa dikembalikan!",
    confirmButtonText: "Hapus",
  });

  if (result.isConfirmed) {
    console.log("User setuju");
  }
};

⚡ Custom Alert
sweet.alert({
  title: "Welcome!",
  text: "Akun berhasil dibuat",
  icon: "success",
});
 */
