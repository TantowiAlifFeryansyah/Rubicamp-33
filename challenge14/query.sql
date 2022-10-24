CREATE TABLE Jurusan (id varchar(10) primary key not null, Jurusan varchar(100) not null);
INSERT INTO Jurusan VALUES ('J0001', 'DKV'), ('J0002', 'Database System'), ('J0003', 'Seni Rupa');

CREATE TABLE Mahasiswa (nim varchar(20) primary key not null, Nama varchar(100) not null, Alamat text not null, Jurusan varchar(100) not null , foreign key(Jurusan) references Jurusan(id));
INSERT INTO Mahasiswa VALUES ('M0001', 'Tantowi', 'Bandung', 'DKV'), ('M0002', 'Alif', 'Batujajar', 'Database System'), ('M0003', 'Feryansyah', 'Cimahi', 'Seni Rupa');

CREATE TABLE Matkul (id varchar(10) primary key not null, Nama varchar(100) not null, SKS numeric not null);
INSERT INTO Matkul VAlues ('MK0001', 'Fotografi', 50), ('MK0002','Bahasa Inggris', 80), ('Mk0003', 'Bahasa Indonesia' , 114), ('MK0004', 'Statistik', 80), ('MK0005', 'Pemrograman Web', 100), ('MK0006', 'RPL', 114);

CREATE TABLE Dosen (id varchar(10) primary key not null, Nama varchar(100) not null, Alamat text not null);
INSERT INTO Dosen VALUES ('D0001', 'Eka Ramdani,SE, ME.', 'Bandung'), ('D0002', 'Ismed Sofyan, SE, MIA.', 'Jakarta'), ('D0003', 'Swita Pata, M.T.I', 'Padang');