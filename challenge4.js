/*
Buatlah sebuah function bernama indexPrime yang memliki sebuah parameter (asumsi nama parameter adalah param1) yang berisi sebuah angka. Buat code di dalam function indexPrima yang menampilkan angka prima urutan ke param1

extra: Gunakan hanya 1 function saja.
*/

// prima 2, 3, 5 ,7 ,11 ,13, 17, 19, 23, 29

function indexPrime(param1) {
    // console.log(param1)
    //write your code here
    let angka = 1;
    let arr = [];
    let cek = false; //false karena tugas belum selsai

    while(angka){
        angka++ 
        cek = true;
        
        //untuk mencari angka pprima
        for(let i = 2; i < angka; i++){
            if (angka % i === 0){
                cek = false;
            }
        }
        if (cek){
            arr.push(angka);
        }
        if (arr.length === param1){
            break; //agar tidak invinite loop
        }
    }
    let hasil = arr[arr.length - 1]
    return hasil
}

console.log(indexPrime(4)); //result => 7
console.log(indexPrime(500)); //result => 3571
console.log(indexPrime(37789)); //result => 450881

/*
OUTPUT
berupa array
*/

/*
7
3571
450881
*/

/*
KEYWOARD
Modulus, Array
*/