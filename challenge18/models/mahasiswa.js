import { db } from "../challenge18.js";

export default class ModelMahasiswa {
    static daftarMahasiswa(callback) {
        db.all(`SELECT Mahasiswa.*, Jurusan.'Nama Jurusan' FROM Mahasiswa JOIN Jurusan ON Mahasiswa.'Kode Jurusan' = Jurusan.'Kode Jurusan'`, (err, rows) => {
            callback(err, rows)
        })
    }

    static cariMahasiswa(nim, callback) {
        db.get(`SELECT Mahasiswa.*, Jurusan.'Nama Jurusan' FROM Mahasiswa JOIN Jurusan ON Mahasiswa.'Kode Jurusan' = Jurusan.'Kode Jurusan' WHERE NIM = ?`, [nim], (err, rows) => {
            callback(err, rows)
        })
    }

    static tambahMahasiswa(nim, nama, ttl, alamat, kodeJurusan, callback) {
        db.run(`INSERT INTO Mahasiswa (NIM, Nama, 'Tanggal Lahir', Alamat, 'Kode Jurusan') VALUES (?,?,?,?,?)`, [nim, nama, ttl, alamat, kodeJurusan], (err) => {
            callback(err)
        })
    }

    static hapusMahasiswa(nim, callback) {
        db.run(`DELETE FROM Mahasiswa WHERE NIM = ?`, [nim], (err) => {
            callback(err)
        })
    }
}