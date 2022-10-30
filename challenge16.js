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
    constructor(brand, size) {
        this.brand = brand;
        this.size = size;
    }
}

class Car extends Tyre{
    constructor(varian, door, seat, year, warranty) {
        super()
        this.varian = varian;
        this.door = door;
        this.seat = seat;
        this.year = year;
        this.warranty = warranty;
        // this.sn = sn;
    }
}

class Agya extends Car {
    constructor(){
        super('Agya', 5, 5, 2022)
        this.brand = 'dunlop'
        this.size = 15;
    }

}

class Rush extends Car {
    constructor(){
        super('Rush', 5, 5,2020)
        this.brand = 'Bridgestone'
        this.size = 17;
    }
}

class CarFactory{
    constructor() {
        this.cars = []
        this.sn = ''
        this.snumber = [];
    }

    serial() {
        let characters = '1234567890abcdefghijklmnopqrstuABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let charsCount = 12;
        let randomSerial1 = '';
        let randomSerial2 = '';
        let randomSerial3 = '';
        let randomSerial4 = '';
        let randomSerial5 = '';

        for (let i = 0; i < charsCount; i++) {
            randomSerial1 += characters[Math.floor(Math.random() * characters.length)];
        }
        
        for (let i = 0; i < charsCount; i++) {
            randomSerial2 += characters[Math.floor(Math.random() * characters.length)];
        }

        for (let i = 0; i < charsCount; i++) {
            randomSerial3 += characters[Math.floor(Math.random() * characters.length)];
        }
        
        for (let i = 0; i < charsCount; i++) {
            randomSerial4 += characters[Math.floor(Math.random() * characters.length)];
        }

        for (let i = 0; i < charsCount; i++) {
            randomSerial5 += characters[Math.floor(Math.random() * characters.length)];
        }

        this.sn = (`${randomSerial1.substring(0,8)} - ${randomSerial2.substring(0,4)} - ${randomSerial3.substring(0,4)} - ${randomSerial4.substring(0,4)} - ${randomSerial5}`)

        console.log(this.sn);
    }

    produce(year) { 
        for (let i = 0; i < Math.random() * 6; i++ ){
            this.cars.push(new Agya(year));
            this.snumber.push(this.sn)
        }
        for (let i = 0; i < Math.random() * 6; i++ ){
            this.cars.push(new Rush(year));
            this.snumber.push(this.sn)
        }
    }

    guaranteeSimulation(simulationYear) {
        let count = 0;
        let angka = Math.random() * 5
        let nambah = Math.ceil(angka)
        for(let i = 0; i < this.cars.length; i++){
             if (simulationYear > this.cars[i].year){
                if (this.cars[i].year + nambah >= simulationYear){
                    count++
                    console.log(`\nno. ${count}`);
                    console.log(`Varian : ${this.cars[i].varian}\nDorr : ${this.cars[i].door}\nSeat : ${this.cars[i].seat} seater\nTyre : ${this.cars[i].brand} ${this.cars[i].size} inch\nYear : ${this.cars[i].year}\nWarranty : ${nambah} year\nSn : ${this.snumber[i]}`);
                    console.log(`Status on 2025 this guarantee status active`);
                }
                else {
                    count++
                    console.log(`\nno. ${count}`);
                    console.log(`Varian : ${this.cars[i].varian}\nDorr : ${this.cars[i].door}\nSeat : ${this.cars[i].seat} seater\nTyre : ${this.cars[i].brand} ${this.cars[i].size} inch\nYear : ${this.cars[i].year}\nWarranty : ${nambah} year\nSn : ${this.snumber[i]}`);
                    console.log(`Status on 2025 this guarantee status expired`);
                }

            }
        }

    }

}

const toyota = new CarFactory()
toyota.serial()
toyota.produce(2020)
toyota.produce(2022)
toyota.guaranteeSimulation(2025)