import { db } from "../challenge18.js";

export default class ModelKontrak {
    static daftarKontrak(callback) {
        db.all(`SELECT Kontrak.ID, Kontrak.NIM, Mahasiswa.Nama, Matkul.'Nama Matkul' as 'Mata Kuliah', Dosen.'Nama Dosen' as Dosen, Kontrak.Nilai FROM Kontrak INNER JOIN Mahasiswa ON Kontrak.NIM = Mahasiswa.NIM INNER JOIN Matkul ON Kontrak.'Kode Matkul' = Matkul.'Kode Matkul' INNER JOIN Dosen ON Kontrak.NIP = Dosen.NIP`, (err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            callback(err)
        })
    }

    static cariKontrak(ketikan, callback) {
        rl.question('Masukan NIM Mahasiswa : ', (ketikan) => {
            const sql = (`SELECT * FROM Kontrak WHERE NIM = ?`)
            db.all(sql, [ketikan], (err, row) => {
                callback(err, row)
            })
        })
    }

    static tambahKontrak(ketikan, ketikan2, ketikan3, ketikan4, callback) {
        console.log(`Lengkapi data di bawah ini :`);
        db.all(`SELECT Kontrak.ID, Kontrak.NIM, Mahasiswa.Nama, Matkul.'Nama Matkul' as 'Mata Kuliah', Dosen.'Nama Dosen' as Dosen, Kontrak.Nilai FROM Kontrak INNER JOIN Mahasiswa ON Kontrak.NIM = Mahasiswa.NIM INNER JOIN Matkul ON Kontrak.'Kode Matkul' = Matkul.'Kode Matkul' INNER JOIN Dosen ON Kontrak.NIP = Dosen.NIP`, (err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            var kontrak = new Table({
                head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
                , colWidths: [5, 15, 15, 20, 15, 7]
            });
            rows.forEach((item, index) => {
                kontrak.push(
                    [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
            })
            console.log(kontrak.toString());
            rl.question(`Kode NIM : `, (ketikan) => {
                db.all('SELECT * FROM Matkul', (err, rows) => {
                    if (err) return console.log('gagal ambil data', err);
                    var matkul = new Table({
                        head: ['Kode Matkul', 'Nama Matkul', 'SKS']
                        , colWidths: [15, 20, 5]
                    });
                    rows.forEach((item, index) => {
                        matkul.push(
                            [item['Kode Matkul'], item['Nama Matkul'], item.SKS])
                    })
                    console.log(matkul.toString());
                    rl.question(`Masukan Kode Mata Kuliah : `, (ketikan2) => {
                        db.all('SELECT * FROM Dosen', (err, rows) => {
                            if (err) return console.log('gagal ambil data', err);
                            var dosen = new Table({
                                head: ['NIP', 'Nama Dosen']
                                , colWidths: [10, 20]
                            });
                            rows.forEach((item, index) => {
                                dosen.push(
                                    [item.NIP, item['Nama Dosen']])
                            })
                            console.log(dosen.toString());
                            rl.question(`Masukan NIP Dosen : `, (ketikan3) => {
                                rl.question(`Masukan Nilai : `, (ketikan4) => {
                                    const sql = (`INSERT INTO Kontrak ('NIM', 'Kode Matkul', 'NIP','NILAI') VALUES (?,?,?,?)`)
                                    db.run(sql, [ketikan, ketikan2, ketikan3, ketikan4], (err) => {
                                        if (err) return console.log('gagal ambil data', err);
                                        console.log(`Kontrak telah ditambahkan`);
                                        db.all(`SELECT Kontrak.ID, Kontrak.NIM, Mahasiswa.Nama, Matkul.'Nama Matkul' as 'Mata Kuliah', Dosen.'Nama Dosen' as Dosen, Kontrak.Nilai FROM Kontrak INNER JOIN Mahasiswa ON Kontrak.NIM = Mahasiswa.NIM INNER JOIN Matkul ON Kontrak.'Kode Matkul' = Matkul.'Kode Matkul' INNER JOIN Dosen ON Kontrak.NIP = Dosen.NIP`, (err, rows) => {
                                            if (err) return console.log('gagal ambil data', err);
                                            callback(err)
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    static hapusKontrak(ketikan, callback) {
        rl.question('Masukan ID Kontrak : ', (ketikan) => {
            const sql = (`DELETE FROM Kontrak WHERE ID = ?`);
            db.run(sql, [ketikan], (err) => {
                callback(err)
            })
        })
    }

    static updateKontrak(ketikan3, ketikan2, callback) {
        db.all(`SELECT Kontrak.ID, Kontrak.NIM, Mahasiswa.Nama, Matkul.'Nama Matkul' as 'Mata Kuliah', Dosen.'Nama Dosen' as Dosen, Kontrak.Nilai FROM Kontrak INNER JOIN Mahasiswa ON Kontrak.NIM = Mahasiswa.NIM INNER JOIN Matkul ON Kontrak.'Kode Matkul' = Matkul.'Kode Matkul' INNER JOIN Dosen ON Kontrak.NIP = Dosen.NIP`, (err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            var kontrak = new Table({
                head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
                , colWidths: [5, 15, 15, 20, 15, 7]
            });
            rows.forEach((item, index) => {
                kontrak.push(
                    [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
            })
            console.log(kontrak.toString());
            rl.question(`Masukan nim Mahasiswa : `, (ketikan) => {
                const sql = (`SELECT * FROM Kontrak WHERE NIM = ?`)
                db.all(sql, [ketikan], (err, row) => {
                    if (err) return console.log('gagal ambil data', err);
                    var kontrak = new Table({
                        head: ['ID', 'NIM', 'Kode Matkul', 'NIP', 'Nilai']
                        , colWidths: [5, 15, 15, 10, 7]
                    });
                    row.forEach((item, index) => {
                        kontrak.push(
                            [item.ID, item.NIM, item['Kode Matkul'], item.NIP, item.Nilai])
                    })
                    console.log(`==============================================================================================`)
                    console.log(`Detail Mahasiswa dengan NIM '${ketikan}' :`);
                    console.log(kontrak.toString());

                    rl.question(`Masukan ID yang akan dirubah nilainya : `, (ketikan2) => {
                        console.log(`==============================================================================================`)

                        rl.question(`tulis nilai yang baru : `, (ketikan3) => {
                            console.log(`==============================================================================================`)

                            const sql = (`UPDATE Kontrak SET Nilai = ? WHERE ID = ?`)
                            db.run(sql, [ketikan3, ketikan2], (err) => {
                                if (err) return console.log('gagal ambil data', err);
                                console.log(`Nilai telah di update`);
                                db.all(`SELECT Kontrak.ID, Kontrak.NIM, Mahasiswa.Nama, Matkul.'Nama Matkul' as 'Mata Kuliah', Dosen.'Nama Dosen' as Dosen, Kontrak.Nilai FROM Kontrak INNER JOIN Mahasiswa ON Kontrak.NIM = Mahasiswa.NIM INNER JOIN Matkul ON Kontrak.'Kode Matkul' = Matkul.'Kode Matkul' INNER JOIN Dosen ON Kontrak.NIP = Dosen.NIP`, (err, rows) => {
                                    if (err) return console.log('gagal ambil data', err);
                                    callback(err)
                                })
                            })
                        })
                    })
                })
            })
        })
    }
}