import Table from 'cli-table';

export function drawJurusan(rows){
// instantiate
var jurusan = new Table({
    head: ['Kode Jurusan','Nama Jurusan']
  , colWidths: [15, 20]
});
// table is an Array, so you can `push`, `unshift`, `splice` and friends
rows.forEach((item, index) => {
    jurusan.push(
        [item['Kode Jurusan'], item['Nama Jurusan']])
})
console.log(jurusan.toString());
}
