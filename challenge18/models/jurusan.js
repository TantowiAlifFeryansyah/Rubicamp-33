import { db } from "../challenge18.js";

export default class ModelJurusan {
    static daftarJurusan(callback) {
        db.all('SELECT * FROM Jurusan', (err, rows) => {
            callback(err, rows)
        })
    }

    static cariJurusan(kodeJurusan, callback) {
        db.get(`SELECT * FROM Jurusan WHERE "Kode Jurusan" = ?`, [kodeJurusan], (err, rows) => {
            callback(err, rows)
        })
    }

    static tambahJurusan(kodeJurusan, namaJurusan, callback) {
        db.run(`INSERT INTO Jurusan ("Kode Jurusan", "Nama Jurusan") VALUES (?,?)`, [kodeJurusan, namaJurusan], (err) => {
            callback(err)
        })
    }

    static hapusJurusan(kodeJurusan, callback) {
        db.run(`DELETE FROM Jurusan WHERE "Kode Jurusan" = ?`, [kodeJurusan], (err) => {
            callback(err)
        })
    }
}