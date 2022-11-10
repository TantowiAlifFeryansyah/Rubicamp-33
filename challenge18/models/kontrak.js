import { db } from "../challenge18.js";

export default class ModelKontrak {
    static daftarKontrak(callback) {
        db.all(`SELECT Kontrak.ID, Kontrak.NIM, Mahasiswa.Nama, Matkul.'Nama Matkul' as 'Mata Kuliah', Dosen.'Nama Dosen' as Dosen, Kontrak.Nilai FROM Kontrak INNER JOIN Mahasiswa ON Kontrak.NIM = Mahasiswa.NIM INNER JOIN Matkul ON Kontrak.'Kode Matkul' = Matkul.'Kode Matkul' INNER JOIN Dosen ON Kontrak.NIP = Dosen.NIP`, (err, rows) => {
            callback(err, rows)
        })
    }

    static cariKontrak(nim, callback) {
        db.all(`SELECT * FROM Kontrak WHERE NIM = ?`, [nim], (err, rows) => {
            callback(err, rows)
        })
    }

    static tambahKontrak(nim, kodeMatkul, nip, nilai, callback) {
        db.run(`INSERT INTO Kontrak ('NIM', 'Kode Matkul', 'NIP','NILAI') VALUES (?,?,?,?)`, [nim, kodeMatkul, nip, nilai], (err) => {
            callback(err)
        })
    }

    static hapusKontrak(id, callback) {
        db.run(`DELETE FROM Kontrak WHERE ID = ?`, [id], (err) => {
            callback(err)
        })
    }

    static updateKontrak(nilai, id, callback) {
        db.run(`UPDATE Kontrak SET Nilai = ? WHERE ID = ?`, [nilai, id], (err) => {
            callback(err)
        })
    }
}