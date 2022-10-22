function sum(){
    let total = 0;
    for (let i = 0; i < arguments.length; i++){
        let hasil = arguments[i]
        total += hasil
    }
    return total;
}

console.log(sum(1,2,7));
console.log(sum(1,4));
console.log(sum(11));
console.log(sum(10,3,6,7,9));

/*
output
10
5
11
35
*/






















// while (angka){
//     angka++
//     // console.log(angka)
//     cek = true;
//     for (let i = 2; i < angka; i++){
//         if (angka % i === 0){
//             cek = false;
//             // console.log("prima")
//         }
//         // else {
//         //     cek = true;
//         // }
//     }
//     if (cek) {
//         arr.push(angka); //bilangan prima masuk ke array
//         // console.log(arr)
//     }
//     if (arr.length === param1){
//         // console.log("prima")
//         // console.log(arr.length)
//         break; // jika panjang length sudah sesuai jumlah param maka berhenti mencari
//     }
// }
// let result = arr[arr.length - 1] //hasil akhir ada di array index akhir, -1 untuk mengurangi index terakhir
// return result



// let cek = true;
// let arr = [];
// let angka = 1;
// while (arr.length < param1 +1){
//         cek = true;
//         for(let i = 2; i < angka; i++ ){
//             if(angka % i === 0 ){
//                 cek = false
//             }
//         }
//         if(cek === true){
//             arr.push(angka)
//         }
//         angka++;
// }
// return arr[param1]




