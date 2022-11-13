/*
buatlah sebuah aplikasi yang dapat mendata daftar pekerjaan kamu.
*/
/*
KEYWORD
process.argv, file system, array dan json
*/

const fs = require("fs")
const params = process.argv
const todos = JSON.parse(fs.readFileSync("todo.json", "utf-8"));


switch (params[2]) {
    case "list":
        console.log("Daftar Pekerjaan")
        todos.forEach((item, index) => {
            console.log(`${index + 1}. ${item.complete ? '[x]' : '[ ]'} ${item.task}`);
        });
        break;
    case "task":
        break;
    case "add":
        todos.push({ task: params[3], complete: false })
        let data = JSON.stringify(todos);
        let nulis = fs.writeFileSync('todo.json', data)
        console.log(`'${params[3]}' telah ditambahkan.`);
        // cara panggil memakai string contoh ==> git challenge13 add "saya pergi ke pasar"
        break;
    case "delete":
        todos.splice(0, params[3])
        let data1 = JSON.stringify(todos);
        let nulis1 = fs.writeFileSync('todo.json', data1)
        console.log(`'${todos[0].task}' telah dihapus dari daftar.`);
        break;
    case "complete":
        todos[params[3] - 1].complete = true
        console.log(`'${todos[params[3] - 1].task}' telah selesai.`);
        let data2 = JSON.stringify(todos);
        let nulis2 = fs.writeFileSync('todo.json', data2)
        break;
    case "uncomplete":
        todos[+params[3] - 1].complete = false
        let data3 = JSON.stringify(todos);
        let nulis3 = fs.writeFileSync('todo.json', data3)
        console.log(`'${todos[+params[3]].task}' status selesai dibatalkan.`);
        break;
    case "list:outstanding":
        console.log("Daftar Pekerjaan")
        let terakhir = todos.slice(-1)
        terakhir.forEach((item, index) => {
            console.log(`${index + 1}. ${item.complete ? '[x]' : '[ ]'} ${item.task}`);
        });
        break;
    case "list:completed":
        todos.forEach((item, index) => {
            if (item.complete == true) {
                console.log(`${index}. [x] ${item.task}`);
            }
        });
        break;
    case "tag":
        todos[params[3] - 1].tag = `${params[4]}`;
        todos[params[3] - 1].tag1 = `${params[5]}`;
        let data4 = JSON.stringify(todos);
        let nulis4 = fs.writeFileSync('todo.json', data4)
        console.log(`Tag '${params[4]},${params[5]}' telah ditambahkan ke daftar '${todos[params[3] - 1].task}'`);
        break;
    case "filter":
        console.log('Daftar Pekerjaan');
        for (let i = 0; i < todos.length; i++) {
            if (params[3] == todos[i].tag || params[3] == todos[i].tag1) {
                console.log(todos[i].task);
            }
        }
        // contoh cara panggil ==> node challenge13.js filter masak 
        break;
    default:
        console.log(`>>> JS TODO <<<`);
        console.log(`node todo.js <command>`);
        console.log(`node todo.js list`);
        console.log(`node todo.js task <task_id`);
        console.log(`node todo.js add <task_content>`);
        console.log(`node todo.js delete <task_id>`);
        console.log(`node todo.js complete <task_id>`);
        console.log(`node todo.js uncomplete <task_id>`);
        console.log(`node todo.js list:outstanding asc|desc`);
        console.log(`node todo.js list:completed asc|desc`);
        console.log(`node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>`);
        console.log(`node todo.js filter:<tag_name>`);


}