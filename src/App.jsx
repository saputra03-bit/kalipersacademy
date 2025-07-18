// Web permintaan barang Kalipers Academy (Dashboard Karyawan & Admin)
// Dibuat oleh Risky Saputra

import React, { useState, useEffect } from "react";
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
    jabatan: "",
    namaBarang: "",
    jumlah: "",
    satuan: "",
    harga: "",
    urgent: false,
    metodePembelian: "offline",
    linkToko: "",
    estimasiTiba: "",
    keterangan: "",
    foto: null,
    accStatus: "Menunggu",
  });

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("requests");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests));
  }, [requests]);

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
    const newRequest = {
      ...form,
      id: Date.now(),
      urgentLabel: form.urgent ? "URGENT" : "Normal",
      tanggal: new Date().toLocaleString("id-ID"),
    };
    setRequests([newRequest, ...requests]);
    alert("Permintaan berhasil dikirim!");
    setForm({
      nama: "",
      jabatan: "",
      namaBarang: "",
      jumlah: "",
      satuan: "",
      harga: "",
      urgent: false,
      metodePembelian: "offline",
      linkToko: "",
      estimasiTiba: "",
      keterangan: "",
      foto: null,
      accStatus: "Menunggu",
    });
  };

  const handleAcc = (id, status) => {
    const updated = requests.map((r) => (r.id === id ? { ...r, accStatus: status } : r));
    setRequests(updated);
  };

  const downloadExcel = () => {
    const data = requests.map((r) => ({
      Tanggal: r.tanggal,
      Nama: r.nama,
      Jabatan: r.jabatan,
      Barang: r.namaBarang,
      Jumlah: r.jumlah,
      Satuan: r.satuan,
      Harga: r.harga,
      Urgensi: r.urgentLabel,
      Metode: r.metodePembelian,
      LinkToko: r.linkToko,
      EstimasiTiba: r.estimasiTiba,
      Keterangan: r.keterangan,
      Status: r.accStatus,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekapan");
    XLSX.writeFile(workbook, "Rekapan_Permintaan_Kalipers.xlsx");
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      <motion.div className="max-w-5xl mx-auto p-6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Kalipers Logo" className="h-24" />
        </div>

        <Card className="rounded-2xl shadow-xl border mb-10">
          <CardContent className="p-8">
            <h1 className="text-3xl font-extrabold text-green-700 mb-6 text-center">Formulir Permintaan Barang (Karyawan)</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Nama Karyawan</Label>
                <Input name="nama" onChange={handleChange} required value={form.nama} />
              </div>
              <div>
                <Label>Jabatan</Label>
                <select name="jabatan" className="w-full p-2 rounded border" value={form.jabatan} onChange={handleChange}>
                  <option>House Keeping</option>
                  <option>Laundry</option>
                  <option>Electric</option>
                  <option>Driver</option>
                  <option>Medis</option>
                  <option>Office Boy/Girl</option>
                  <option>Gardener</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div>
                <Label>Nama Barang</Label>
                <Input name="namaBarang" onChange={handleChange} required value={form.namaBarang} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Jumlah</Label>
                  <Input name="jumlah" onChange={handleChange} required value={form.jumlah} />
                </div>
                <div>
                  <Label>Satuan</Label>
                  <select name="satuan" className="w-full p-2 rounded border" value={form.satuan} onChange={handleChange}>
                    <option>Pcs</option>
                    <option>Dus</option>
                    <option>Kotak</option>
                    <option>Lusin</option>
                    <option>Set</option>
                  </select>
                </div>
              </div>
              <div>
                <Label>Harga (Rp)</Label>
                <Input name="harga" onChange={handleChange} required value={form.harga} />
              </div>
              <div>
                <Label>Metode Pembelian</Label>
                <select name="metodePembelian" className="w-full p-2 rounded border" value={form.metodePembelian} onChange={handleChange}>
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                </select>
              </div>
              {form.metodePembelian === "online" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkToko">Link Toko Online</Label>
                    <Input name="linkToko" placeholder="https://..." value={form.linkToko} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="estimasiTiba">Estimasi Tiba</Label>
                    <Input name="estimasiTiba" placeholder="Misal: 3 hari" value={form.estimasiTiba} onChange={handleChange} />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Checkbox name="urgent" onCheckedChange={(checked) => setForm({ ...form, urgent: checked })} checked={form.urgent} />
                <Label>Urgent</Label>
              </div>
              <div>
                <Label>Keterangan</Label>
                <Textarea name="keterangan" onChange={handleChange} value={form.keterangan} />
              </div>
              <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700">Kirim Permintaan</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-green-700">Dashboard Admin</h2>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button onClick={downloadExcel} className="bg-green-500 text-white">Download Excel</Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Jabatan</TableCell>
                  <TableCell>Barang</TableCell>
                  <TableCell>Jumlah</TableCell>
                  <TableCell>Satuan</TableCell>
                  <TableCell>Harga</TableCell>
                  <TableCell>Urgent</TableCell>
                  <TableCell>Metode</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>ACC</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req, index) => (
                  <TableRow key={req.id} className="hover:bg-green-50">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{req.tanggal}</TableCell>
                    <TableCell>{req.nama}</TableCell>
                    <TableCell>{req.jabatan}</TableCell>
                    <TableCell>{req.namaBarang}</TableCell>
                    <TableCell>{req.jumlah}</TableCell>
                    <TableCell>{req.satuan}</TableCell>
                    <TableCell>{req.harga}</TableCell>
                    <TableCell>{req.urgentLabel}</TableCell>
                    <TableCell>{req.metodePembelian}</TableCell>
                    <TableCell>{req.accStatus}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button onClick={() => handleAcc(req.id, "Disetujui")} className="bg-green-500 text-white px-2">✅</Button>
                        <Button onClick={() => handleAcc(req.id, "Ditolak")} className="bg-red-500 text-white px-2">❌</Button>
                      </div>
                    </TableCell>
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
