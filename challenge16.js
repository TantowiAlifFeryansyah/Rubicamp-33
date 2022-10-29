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
        this.brand = brand;
        this.size = size;
    }

}
// const agya = new Tyre('dunlop',15);
// const rush = new Tyre('Bridgestone',17);
// console.log(agya);
// console.log(rush);
// console.log(`tyre : ${agya.brand} ${agya.size} inch`);
// console.log(`tyre : ${rush.brand} ${rush.size} inch`);


class Car extends Tyre{
    constructor(varian, sn, door, seat, year, brand, size, warranty){
        super(brand, size);

        this.varian = varian;
        this.sn = sn;
        this.door = door;
        this.seat = seat;
        this.year = year;
        this.warranty = warranty;
    }
    atribut(){
        console.log(`Varian : ${this.varian} \n sn : ${this.sn} \n door : ${this.door} \n seat : ${this.seat} seater \n tyre : ${this.brand} ${this.size} inch \n waranty : ${this.warranty} year`);
    }
}


var agya = new Car('Agya', 'sn', 5, 5, 2020,'dunlop',15, 1);
var rush = new Car('Rush', 'sn', 5, 5, 2020, 'Bridgestone', 17, 3);
agya.atribut();
rush.atribut();


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
// toyota.produce(2020)
// toyota.produce(2022)
// toyota.result()
// toyota.guaranteeSimulation(2025)