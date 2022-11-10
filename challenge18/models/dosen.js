import { db } from "../challenge18.js";


export default class ModelDosen {
    static daftarDosen(callback) {
        db.all('SELECT * FROM Dosen', (err, rows) => {
            callback(err, rows)
        })
    }

    static cariDosen(nip, callback) {
        db.get(`SELECT * FROM Dosen WHERE NIP = ?`, [nip], (err, rows) => {
            callback(err, rows)
        })
    }

    static tambahDosen(nip,namaDosen, callback) {
        db.run(`INSERT INTO Dosen (NIP, 'Nama Dosen') VALUES (?,?)`, [nip, namaDosen], (err) => {
            callback(err)
        })
    }

    static hapusDosen(nip, callback) {
        db.run(`DELETE FROM Dosen WHERE NIP = ?`, [nip], (err) => {
            callback(err)
        })
    }
}