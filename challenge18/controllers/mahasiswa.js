import {read} from '../models/mahasiswa.js'
import {drawMahasiswa} from '../views/mahasiswa.js'


export function showMahasiswa(){
    read(function(data){ // anonymours function
    drawMahasiswa(data)
})
}