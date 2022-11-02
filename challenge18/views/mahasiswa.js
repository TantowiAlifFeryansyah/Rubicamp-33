import Table from 'cli-table';

export function drawMahasiswa(rows){
// instantiate
var mahasiswa = new Table({
    head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
  , colWidths: [13, 10, 15, 15, 15,20]
});
// table is an Array, so you can `push`, `unshift`, `splice` and friends
rows.forEach((item, index) => {
    mahasiswa.push(
        [item.NIM, item.Nama, item['Tanggal Lahir'], item.Alamat, item['Kode Jurusan'], item['Nama Jurusan']])
})
console.log(mahasiswa.toString());
}
