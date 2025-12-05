import axios from "axios";
import { API } from "./config";
const saved = localStorage.getItem("auth-storage");
const auth: AuthStateJSON | null = saved ? JSON.parse(saved) : null;

export interface AuthProfile {
  username: string;
  email: string;
  alamat: string;
  role: string;
}

export interface AuthStateJSON {
  state: {
    profile: AuthProfile;
    token: string;
    role: string;
    isLogin: boolean;
  };
  version: number;
}

export const api = axios.create({
  baseURL: API,
  withCredentials: false, // WAJIB untuk cookie-based auth
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth?.state.token}`,
  },
});

export function login(data: { username: string; password: string }) {
  return api.post("/api/auth/login", data);
}

export function firstprofile(token: string) {
  return api.get("/api/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function register(data: {
  username: string;
  password: string;
  email: string;
  alamat: string;
}) {
  return api.post("/api/auth/register", data);
}

export function kategori() {
  return api.get("/api/kategori");
}

export function addkategori(data: { nama: string; detail: string }) {
  return api.post("/api/kategori", data);
}

export function updatekategori(
  id: string,
  data: { nama: string; detail: string }
) {
  return api.put("/api/kategori/" + id, data);
}

export function hapuskategori(id: string) {
  return api.delete("/api/kategori/" + id);
}

export function addproduct(data: any) {
  return api.post("/api/produk", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function updateproduct(id: string, data: any) {
  return api.put("/api/produk/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function listproduct() {
  return api.get("/api/produk");
}

export function detailproduct(id: string | number) {
  return api.get("/api/produk/" + id);
}

export function deleteproduct(id: string | number) {
  return api.delete("/api/produk/" + id);
}

export function addfavotite(id: string) {
  return api.post("/api/favorite", {
    productId: parseInt(id),
  });
}

export function addkeranjang({ id, ukuran }: { id: string; ukuran: string }) {
  return api.post("/api/cart/addcart", {
    productId: parseInt(id),
    ukuran,
  });
}

export function keranjang() {
  return api.get("/api/cart");
}

export function updateqtykeranjang({ id, qty }: { id: number; qty: number }) {
  return api.post("/api/cart/updateqty", {
    id,
    qty,
  });
}
export function deletekeranjang(id: string) {
  return api.delete("/api/cart/deletecart/" + id);
}

export function favproduk() {
  return api.get("/api/favorite");
}

export function profile() {
  return api.get("/api/auth/profile");
}

export function updateprofile({
  email,
  alamat,
}: {
  email: string;
  alamat: string;
}) {
  return api.put("/api/auth/profile", {
    email,
    alamat,
  });
}

export function checkout(data: { productId: number; qty: number }[]) {
  return api.post("/api/order/new-order", {
    listOrder: data,
  });
}

export function bayarsekarang({
  invoice,
  token,
}: {
  invoice: string;
  token: string;
}) {
  return api.get(
    `/api/order/proccess-payment?invoice=${invoice}&token=${token}`
  );
}

export function detailinvoice(invoice: string) {
  return api.get("/api/order/detail-order/" + invoice);
}

export function selforder() {
  return api.get("/api/order/self-order");
}

export function orderadmin() {
  return api.get("/api/order");
}

export function users() {
  return api.get("/api/users");
}

export function deleteuser(id: string) {
  return api.delete("/api/users/" + id);
}

export function dashboard() {
  return api.get("/api/dashboard");
}
