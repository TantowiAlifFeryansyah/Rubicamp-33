import { db } from "../challenge18.js";

export default class ModelMatkul {
    static daftarMatkul(callback) {
        db.all('SELECT * FROM Matkul', (err, rows) => {
            callback(err, rows)
        })
    }

    static cariMataKuiah(kodeMatkul, callback) {
        db.get(`SELECT * FROM Matkul WHERE "Kode Matkul" = ?`, [kodeMatkul], (err, rows) => {
            callback(err, rows)
        })
    }

    static tambahMataKuliah(kodeMatkul, namaMatkul, sks, callback) {
        db.run(`INSERT INTO Matkul ('Kode Matkul', 'Nama Matkul', 'SKS') VALUES (?,?,?)`, [kodeMatkul, namaMatkul, sks], (err) => {
            callback(err)
        })
    }

    static hapusMataKuliah(kodeMatkul, callback) {
        db.run(`DELETE FROM Matkul WHERE "Kode Matkul" = ?`, [kodeMatkul], (err) => {
            callback(err)
        })
    }
}