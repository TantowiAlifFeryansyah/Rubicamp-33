import Table from 'cli-table';

export function drawDosen(rows){
// instantiate
var dosen = new Table({
    head: [ 'NIP', 'Nama Dosen']
  , colWidths: [10, 20]
});
// table is an Array, so you can `push`, `unshift`, `splice` and friends
rows.forEach((item, index) => {
    dosen.push(
        [item.NIP, item['Nama Dosen']])
})
console.log(dosen.toString());
}
