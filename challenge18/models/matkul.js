import { db } from "../challenge18.js"


export default class ModelMatkul {
    static daftarMatkul(callback) {
        db.all('SELECT * FROM Matkul', (err, rows) => {
            callback(err, rows)
        })
    }

    static cariMataKuiah(ketikan, callback) {
        rl.question('Masukan Kode Mata Kuliah : ', (ketikan) => {
            const sql = (`SELECT * FROM Matkul WHERE "Kode Matkul" = ?`)
            db.get(sql, [ketikan], (err, row) => {
                callback(err, row)
            })
        })
    }

    static tambahMataKuliah(ketikan, ketikan2, ketikan3, callback) {
        console.log(`Lengkapi data di bawah ini :`);
        rl.question(`Kode Mata Kuliah : `, (ketikan) => {
            rl.question(`Nama Mata Kuliah : `, (ketikan2) => {
                rl.question(`SKS : `, (ketikan3) => {
                    const sql = (`INSERT INTO Matkul ('Kode Matkul', 'Nama Matkul', 'SKS') VALUES (?,?,?)`)
                    db.run(sql, [ketikan, ketikan2, ketikan3], (err) => {
                        callback(err)
                    })
                })
            })
        })
    }

    static hapusMataKuliah(ketikan, callback) {
        rl.question('Masukan Kode Mata Kuliah : ', (ketikan) => {
            const sql = (`DELETE FROM Matkul WHERE "Kode Matkul" = ?`);
            db.run(sql, [ketikan], (err) => {
                callback(err)
            })
        })
    }
}