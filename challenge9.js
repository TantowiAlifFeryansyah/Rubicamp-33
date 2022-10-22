/*
buatlah sebuah function bernama spiral yang memiliki sebuah parameter (asumsi nama parameter adalah param1) yang berisi angka. Setelah itu, generate secara otomatis array sebanyak param1 x param1 dan menampilkan juga urutan angka sesuai dengan pola spiral. Lihatlah contoh di bawah ini: Driver code:
*/

/*
function spiral(param1){
    //your code here
}
 Contoh 1 :
 spiral(5)
 Ilustrasi :
 0, 1, 2, 3, 4
 5, 6, 7, 8, 9
 10, 11, 12, 13, 14
 15, 16, 17, 18, 19
 20, 21, 22, 23, 24
 Tampilan result nya :
 [0, 1, 2, 3, 4, 9, 14, 19, 24, 23, 22, 22, 21, 20, 15, 10, 5, 6, 8, 13, 18, 17, 16, 11, 12]

 Contoh 2 :
 spiral(6)
 Ilustrasi :
 0, 1, 2, 3, 4, 5
 6, 7, 8, 9, 10, 11
 12, 13, 14, 15, 16, 17
 18, 19, 20, 21, 22, 23
 24, 25, 26, 27, 28, 29
 30, 31, 32, 33, 34, 35
 Tampilan result nya :
 [0, 1, 2, 3, 4, 5, 11, 17, 23, 29, 35, 34, 33, 32, 31, 30, 24, 18, 12, 6, 7, 8, 9, 10, 16, 22, 28, 27, 26, 25, 19, 13, 14, 15, 21, 20 ]

 Contoh 3 :
 spiral(7)
 Ilustrasi :
 0, 1, 2, 3, 4, 5, 6
 7, 8, 9, 10, 11, 12, 13
 14, 15, 16, 17, 18, 19, 20
 21, 22, 23, 24, 25, 26, 27
 28, 29, 30, 31, 32, 33, 34
 35, 36, 37, 38, 39, 40, 41
 42, 43, 44, 45, 46, 47, 48
 Tampilan result nya :
[0, 1, 2, 3,4, 5, 6, 13, 20, 27, 34, 41, 48, 47, 46, 45, 44, 43, 42, 35, 28, 21, 14, 7, 8, 9, 10, 11, 12, 19, 26, 33, 40, 39, 38, 37, 36, 29, 22, 15, 16, 17, 18, 25, 32, 31, 30, 23, 24]
*/

function spiral(param1) {
    // your code here

    let matrix = [];
    let count = 0;

    for (let i = 0; i < param1; i++) {
        matrix[i] = []
        for (let j = 0; j < param1; j++) {
            matrix[i][j] = count
            count++
        }
    }

    // let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    let top = 0;
    let left = 0;
    let bottom = matrix.length - 1;
    let right = matrix[0].length - 1;
    let result = [];
    let cek = "right";

    while (left <= right && top <= bottom) {
        if (cek === "right") {
            for (let i = left; i <= right; i += 1) {
                result.push(matrix[top][i])
            }
            top += 1
            cek = "down"
        }
        else if (cek === "down") {
            for (let i = top; i <= bottom; i += 1) {
                result.push(matrix[i][right])
            }
            right -= 1
            cek = "left"
        }
        else if (cek === "left") {
            for (let i = right; i >= left; i -= 1) {
                result.push(matrix[bottom][i])
            }
            bottom -= 1
            cek = "up"
        }
        else if (cek === "up") {
            for (let i = bottom; i >= top; i -= 1) {
                result.push(matrix[i][left])
            }
            left += 1
            cek = "right"
        }

    }
    console.log(result)
}

spiral(5)
spiral(6)
spiral(7)

/*
OUTPUT
[0, 1, 2, 3, 4, 9, 14, 19, 24, 23, 22, 22, 21, 20, 15, 10, 5, 6, 8, 13, 18, 17, 16, 11, 12]

[0, 1, 2, 3, 4, 5, 11, 17, 23, 29, 35, 34, 33, 32, 31, 30, 24, 18, 12, 6, 7, 8, 9, 10, 16, 22, 28, 27, 26, 25, 19, 13, 14, 15, 21, 20 ]

[0, 1, 2, 3,4, 5, 6, 13, 20, 27, 34, 41, 48, 47, 46, 45, 44, 43, 42, 35, 28, 21, 14, 7, 8, 9, 10, 11, 12, 19, 26, 33, 40, 39, 38, 37, 36, 29, 22, 15, 16, 17, 18, 25, 32, 31, 30, 23, 24]
*/

/*
Keyword
recursive
*/
