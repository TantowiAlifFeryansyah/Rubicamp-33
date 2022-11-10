import { db } from "../challenge18.js";

export default class ModelJurusan {
    static daftarJurusan(callback) {
        db.all('SELECT * FROM Jurusan', (err, rows) => {
            callback(err, data)
        })
    }

    static cariJurusan(ketikan, callback) {
        rl.question('Masukan Kode Jurusan : ', (ketikan) => {
            const sql = (`SELECT * FROM Jurusan WHERE "Kode Jurusan" = ?`)
            db.get(sql, [ketikan], (err, row) => {
                callback(err, row)
            })
        })
    }

    static tambahJurusan(ketikan, ketikan2, callback) {
        console.log(`Lengkapi data di bawah ini :`);
        db.all('SELECT * FROM Jurusan', (err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            var jurusan = new Table({
                head: ['Kode Jurusan', 'Nama Jurusan']
                , colWidths: [15, 20]
            });
            rows.forEach((item, index) => {
                jurusan.push(
                    [item['Kode Jurusan'], item['Nama Jurusan']])
            })
            console.log(jurusan.toString());
            rl.question(`Kode Jurusan : `, (ketikan) => {
                rl.question(`Nama Jurusan : `, (ketikan2) => {
                    const sql = (`INSERT INTO Jurusan ("Kode Jurusan", "Nama Jurusan") VALUES (?,?)`)
                    db.run(sql, [ketikan, ketikan2], (err) => {
                        callback(err)
                    })
                })
            })
        })
    }

    static hapusJurusan(ketikan, callback) {
        rl.question('Masukan Kode Jurusan : ', (ketikan) => {
            const sql = (`DELETE FROM Jurusan WHERE "Kode Jurusan" = ?`);
            db.run(sql, [ketikan], (err) => {
                callback(err)
            })
        })
    }
}