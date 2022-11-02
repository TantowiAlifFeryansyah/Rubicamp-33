import {read} from '../models/matkul.js'
import {drawMatkul} from '../views/matkul.js'


export function showMatkul(){
    read(function(data){ // anonymours function
    drawMatkul(data)
})
}