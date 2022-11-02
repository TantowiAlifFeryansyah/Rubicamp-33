import {read} from '../models/kontrak.js'
import {drawKontrak} from '../views/kontrak.js'


export function showKontrak(){
    read(function(data){ // anonymours function
    drawKontrak(data)
})
}