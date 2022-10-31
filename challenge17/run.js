import Calculator, {PI} from "./calculator.js";

const calc = new Calculator()

calc.add(10).substract(5).result() //1 + 10 - 5 = 6
calc.add(3).multiply(4).devide(6).result() // 6 + 3 * 4 / 6 = 6
calc.number = 7 // set jari jari 7
console.log(`nilai sekarang : ${calc.number}`);
calc.multiply(2).multiply(PI).result() // keliling lingkaran dengan jari jari 7 => 2 x Pi x r = 44
calc.number = 7 // set jari jari 7
calc.square().multiply(PI).result() // luas lingkaran dengan jari jari 7 => PI x r pangkat 2 = 154
calc.number = 4
calc.exponent(3).result() // 4 pangkat 3 = 64
calc.squareRoot().result() // akar pangkat 2 dari 64 = 8