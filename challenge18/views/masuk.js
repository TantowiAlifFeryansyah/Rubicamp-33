export default class ViewMasuk {
    static logout() {
        console.log(`Anda telah keluar`)
        console.log(`==============================================================================================`)
    }

    static home() {
        console.log(`==============================================================================================`)
        console.log('silahkan pilih opsi dibawah ini :');
        console.log('[1] Mahasiswa');
        console.log('[2] Jurusan');
        console.log('[3] Dosen');
        console.log('[4] Mata Kuliah');
        console.log('[5] Kontrak');
        console.log('[6] Keluar');
        console.log(`==============================================================================================`)
    }

    static welcome() {
        console.log(`==============================================================================================`)
        console.log(`Welcome to Universitas Pendidikan Indonesia`)
        console.log(`Jl. Setiabudhi no. 255`)
        console.log(`==============================================================================================`)
    }
}