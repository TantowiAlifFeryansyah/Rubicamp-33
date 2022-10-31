/*
buatlah class yang berfungsi sebagai mesin hitung, memiliki kemampuan seperti di bawah ini:

    1. initial number
    2. penambahan
    3. pengurangan
    4. pembagian
    5. perkalian
    6. akar pangkat 2
    7. exponent
    8. dapat menghitung keliling dan luas lingkaran
*/

/*
gunakan import export ES6 untuk menggunakan 2 file javascript.

KEYWORD
method chaining, class, import, export, ES6
*/

export const PI = 22 / 7

export default class Calculator {
    constructor() {
        this.number = 1;
    }

    add(value) {
        this.number = this.number + value;
        return this;
    }

    substract(value) {
        this.number = this.number - value;
        return this;
    }

    devide(value) {
        this.number = this.number / value;
        return this;
    }

    // tambahkan method lain yang perlu

    multiply(value) {
        this.number = this.number * value;
        return this;
    }

    square(value){
        this.number = 7 ** 2;
        return this;
    }

    exponent(value){
        this.number = this.number ** value;
        return this;
    }

    squareRoot(value){
        this.number = Math.sqrt(this.number)
        return this;
    }

    result() {
        console.log(this.number);
    }
}


// export default Calculator
// export default const PI = 22 / 7
