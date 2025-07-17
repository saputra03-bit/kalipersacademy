// Web permintaan barang Kalipers Academy (Dashboard Karyawan & Admin)
// Dibuat oleh Risky Saputra

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { motion } from "framer-motion";
import saveAs from "file-saver";
import * as XLSX from "xlsx";
import logo from "./assets/1-removebg-preview.png";

function App() {
  const [form, setForm] = useState({
    nama: "",
    namaBarang: "",
    jumlah: "",
    satuan: "",
    urgent: false,
    keterangan: "",
    foto: null,
    metode: "offline",
    linkToko: "",
    estimasiTiba: "",
    status: "Menunggu",
  });
  const [requests, setRequests] = useState([]);

  const handleChange = (e) => {
    if (!e || !e.target) return;
    const { name, value, type, checked, files } = e.target;
    const newValue = type === "checkbox" ? checked : type === "file" ? files?.[0] || null : value;
    setForm({
      ...form,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdAt = new Date().toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" });
    const newRequest = {
      ...form,
      id: Date.now(),
      urgentLabel: form.urgent ? "URGENT" : "Normal",
      createdAt,
    };
    setRequests([newRequest, ...requests]);
    alert("Permintaan berhasil dikirim!");
    setForm({
      nama: "",
      namaBarang: "",
      jumlah: "",
      satuan: "",
      urgent: false,
      keterangan: "",
      foto: null,
      metode: "offline",
      linkToko: "",
      estimasiTiba: "",
      status: "Menunggu",
    });
  };

  const updateStatus = (id, status) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status } : req
    );
    setRequests(updated);
  };

  const downloadExcel = () => {
    const header = [["No", "Nama", "Barang", "Jumlah", "Satuan", "Urgensi", "Keterangan", "Metode", "Link Toko", "Estimasi Tiba", "Status", "Tanggal"]];
    const data = requests.map((r, index) => [
      index + 1,
      r.nama,
      r.namaBarang,
      r.jumlah,
      r.satuan,
      r.urgentLabel,
      r.keterangan,
      r.metode,
      r.linkToko,
      r.estimasiTiba,
      r.status,
      r.createdAt,
    ]);
    const worksheet = XLSX.utils.aoa_to_sheet([...header, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekapan");
    XLSX.writeFile(workbook, "Rekapan_Permintaan.xlsx");
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      <motion.div
        className="max-w-5xl mx-auto p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
      <div className="flex justify-center mb-10">
  <img src={logo} alt="Kalipers Logo" className="h-32 md:h-40 object-contain" />
</div>

        <Card className="rounded-2xl shadow-xl border border-green-100 mb-10 bg-white">
          <CardContent className="p-8">
            <h1 className="text-3xl font-extrabold text-green-700 mb-6 text-center">
              Formulir Permintaan Barang (Karyawan)
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label htmlFor="nama">Nama Karyawan</Label><Input name="nama" onChange={handleChange} required value={form.nama} /></div>
              <div><Label htmlFor="namaBarang">Nama Barang</Label><Input name="namaBarang" onChange={handleChange} required value={form.namaBarang} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="jumlah">Jumlah</Label><Input name="jumlah" onChange={handleChange} required value={form.jumlah} /></div>
                <div>
                  <Label htmlFor="satuan">Satuan</Label>
                  <select name="satuan" className="w-full border p-2 rounded" value={form.satuan} onChange={handleChange}>
                    <option value="">Pilih</option>
                    <option value="pcs">pcs</option>
                    <option value="kotak">kotak</option>
                    <option value="dus">dus</option>
                    <option value="liter">liter</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox name="urgent" onCheckedChange={(checked) => setForm({ ...form, urgent: checked })} checked={form.urgent} />
                <Label>Urgent</Label>
              </div>
              <div>
                <Label htmlFor="metode">Metode Pembelian</Label>
                <select name="metode" className="w-full border p-2 rounded" value={form.metode} onChange={handleChange}>
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                </select>
              </div>
              {form.metode === "online" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label htmlFor="linkToko">Link Toko</Label><Input name="linkToko" value={form.linkToko} onChange={handleChange} /></div>
                  <div><Label htmlFor="estimasiTiba">Estimasi Tiba</Label><Input name="estimasiTiba" value={form.estimasiTiba} onChange={handleChange} /></div>
                </div>
              )}
              <div><Label htmlFor="keterangan">Keterangan (Opsional)</Label><Textarea name="keterangan" onChange={handleChange} value={form.keterangan} /></div>
              <div><Label htmlFor="foto">Upload Foto Barang (Opsional)</Label><Input name="foto" type="file" accept="image/*" onChange={handleChange} /></div>
              <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700">Kirim Permintaan</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg border border-green-100 bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-green-700">Dashboard Admin</h2>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button onClick={downloadExcel} className="bg-green-500 text-white hover:bg-green-600">Download Excel</Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Barang</TableCell>
                  <TableCell>Jumlah</TableCell>
                  <TableCell>Satuan</TableCell>
                  <TableCell>Keterangan</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Approval</TableCell>
                  <TableCell>Waktu</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req, index) => (
                  <TableRow key={req.id} className="hover:bg-green-50">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{req.nama}</TableCell>
                    <TableCell>{req.namaBarang}</TableCell>
                    <TableCell>{req.jumlah}</TableCell>
                    <TableCell>{req.satuan}</TableCell>
                    <TableCell>{req.keterangan}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${req.urgent ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {req.urgentLabel}
                      </span>
                    </TableCell>
                    <TableCell>
                      <select
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                        className="border p-1 rounded"
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="ACC">ACC</option>
                        <option value="Tolak">Tolak</option>
                      </select>
                    </TableCell>
                    <TableCell>{req.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <p className="text-center text-sm mt-6 text-gray-500">
          &copy; 2025 Kalipers Academy | Dibuat oleh <span className="text-green-700 font-medium">Risky Saputra</span>
        </p>
      </motion.div>
    </div>
  );
}

export default App;
