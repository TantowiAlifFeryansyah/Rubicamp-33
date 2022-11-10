import Utama, {rl} from "../challenge18.js"
import { db } from "../challenge18.js";
import { convert } from "../challenge18.js";

export default class User {
    static username() {
        rl.question('Username : ', (nama) => {
            if (nama.toLocaleLowerCase() != convert[0].term) {
                console.log(`tidak terdaftar`);
                rl.close()
            }
            else {
                rl.question('Password : ', (password) => {
                    console.log(`==============================================================================================`)
                    console.log(`Welcome, ${nama}. Yout access is level : ADMIN`);
                    console.log(`==============================================================================================`)
                    console.log('\n');
                    Utama.menuUtama();
                })
            }
        })
    }
}