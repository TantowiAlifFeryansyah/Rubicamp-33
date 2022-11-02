import Table from 'cli-table';

export function drawMatkul(rows){
// instantiate
var matkul = new Table({
    head: ['Kode Matkul', 'Nama Matkul', 'SKS']
  , colWidths: [15, 20, 5]
});
// table is an Array, so you can `push`, `unshift`, `splice` and friends
rows.forEach((item, index) => {
    matkul.push(
        [item['Kode Matkul'], item['Nama Matkul'], item.SKS])
})
console.log(matkul.toString());
}
