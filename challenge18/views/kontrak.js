import Table from 'cli-table';

export function drawKontrak(rows){
// instantiate
var kontrak = new Table({
    head: ['ID','NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
  , colWidths: [5, 15, 15, 15, 15,7]
});
// table is an Array, so you can `push`, `unshift`, `splice` and friends
rows.forEach((item, index) => {
    kontrak.push(
        [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
})
console.log(kontrak.toString());
}
