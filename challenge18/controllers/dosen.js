import {read} from '../models/dosen.js'
import {drawDosen} from '../views/dosen.js'


export function showDosen(){
    read(function(data){ // anonymours function
    drawDosen(data)
})
}