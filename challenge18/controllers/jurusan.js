import {read} from '../models/jurusan.js'
import {drawJurusan} from '../views/jurusan.js'


export function showJurusan(){
    read(function(data){ // anonymours function
    drawJurusan(data)
})
}