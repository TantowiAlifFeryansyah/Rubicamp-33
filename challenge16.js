/*
SIMPLE OOP
buatlah class class untuk mengolah proses pembuatan mobil di sebuah pabrik mobil.
data yang diolah adalah sebagai berikut:

    1. tiap varian mobil dibuat perkelas, ambil contoh pabrik toyota yang memiliki varian seperti rush, agya dsb.
    2. dari satu mobil terdapat atribut seperti ban, kursi, pintu dsb.
    3. buatlah fungsi untuk melakukan proses produksi didalam pabrik tersebut per tahun, gunakan algoritma random di javascript untuk jumlahnya.
    4. buatlah fungsi untuk melakukan perhitungan garansi setiap mobilnya dengan melakukan simulasi penambahan umur mobil. yang menghasilkan status garansi untuk setiap mobil yang telah diproduksi.
*/

/*
OUTPUT
total mobil yang ada adalah 12 mobil hasil dari dua kali produksi, dan ketika melakukan simulasi garansi ke 12 mobil dilakukan perhitungan status gransi pada tahun 2025.
*/

/*
KEYWORD
OOP, inheritance, class, composition, aggregation, static method, prototype method
*/

class Tyre {
    constructor(brand, size){

    }
}

class Car {

}

class CarFactory {
    constructor() {
        this.cars = []
    }

    produce(year) {

    }

    guaranteeSimulation(simulationYear) {

    }

}

const toyota = new CarFactory()
toyota.produce(2020)
toyota.produce(2022)
toyota.result()
toyota.guaranteeSimulation(2025)