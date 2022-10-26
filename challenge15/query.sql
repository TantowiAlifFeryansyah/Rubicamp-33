CREATE TABLE Jurusan (id varchar(10) primary key not null, Jurusan varchar(100) not null);
CREATE TABLE Mahasiswa (NIM varchar(20) primary key not null, Nama varchar(100) not null, Umur numeric not null, Alamat text not null, Jurusan varchar(100) not null , foreign key(Jurusan) references Jurusan(id));
CREATE TABLE Matkul (Code varchar(10) primary key not null, Nama varchar(100) not null, SKS numeric not null);
CREATE TABLE Dosen (NIP varchar(10) primary key not null, Nama varchar(100) not null, Alamat text not null);
CREATE TABLE Mengajar(id integer primary key autoincrement, NIP varchar(10) not null, Nama varchar(100) not null, Code varchar(10) not null, foreign key(NIP) references Dosen(NIP), foreign key(Code) references Matkul(Code),foreign key(Nama) references Dosen(Nama));
CREATE TABLE Mengambil(id integer primary key autoincrement, NIM varchar(10) not null, Code varchar(10) not null, Nilai varchar(5) not null, foreign key(NIM) references Mahasiswa(NIM), foreign key(Code) references Matkul(Code));
CREATE TABLE KRS(Nama varchar(100) not null, Code varchar(10)not null,SKS numeric not null, foreign key(Nama) references Mahasiswa(Nama), foreign key(Code) references Matkul(Code), foreign key(SKS) references Matkul(SKS));


INSERT INTO KRS(Nama, Code, SKS) VALUES ('Tantowi', 'MK0001',3), ('Alif', 'MK0002',3), ('Feryansyah', 'MK0003',3), ('Abi', 'MK0004',2), ('Tanaya', 'MK0005',2), ('Tantowi', 'MK0006',3), ('Alif', 'MK0007',3), ('Feryansyah', 'MK0008',3), ('Abi', 'MK0009',2), ('Tanaya', 'MK0001',2), ('Tantowi', 'MK0002',3), ('Tantowi' , 'MK0003',3), ('Alif', 'MK0009',2), ('Alif', 'MK0003',3), ('Alif', 'MK0006',3);
INSERT INTO Jurusan VALUES ('J0001', 'DKV'), ('J0002', 'Database System'), ('J0003', 'Seni Rupa');
INSERT INTO Mahasiswa VALUES ('MHS0001', 'Tantowi', 18, 'Bandung', 'DKV'), ('MHS0002', 'Alif', 19, 'Batujajar', 'Database System'), ('MHS0003', 'Feryansyah', 21, 'Cimahi', 'Seni Rupa'), ('MHS0004', 'Abi', 18, 'Padalarang', 'DKV'), ('MHS0005', 'Tanaya', 22, 'Cimahi', 'Seni Rupa');
INSERT INTO Matkul VALUES ('MK0001', 'Fotografi', 3), ('MK0002','Bahasa Inggris', 3), ('Mk0003', 'Data Mining' , 3), ('MK0004', 'Statistik', 2), ('MK0005', 'Pemrograman Web', 2), ('MK0006', 'RPL', 3), ('MK0007', 'Algoritma', 3), ('MK0008', 'Pendidikan Agama', 3), ('MK0009', 'Sistem Oprasi', 2);
INSERT INTO Dosen VALUES ('D0001', 'Eka Ramdani,SE, ME.', 'Bandung'), ('D0002', 'Ismed Sofyan, SE, MIA.', 'Jakarta'), ('D0003', 'Swita Pata, M.T.I', 'Padang'), ('D0004', 'Saktiawan Sinaga,SE, ME.', 'Medan');
INSERT INTO Mengajar(NIP,Nama,Code) VALUES ('D0001', 'Eka Ramdani,SE, ME.','MK0001'), ('D0002', 'Ismed Sofyan, SE, MIA.','MK0002'), ('D0003', 'Swita Pata, M.T.I','MK0003'), ('D0004', 'Saktiawan Sinaga,SE, ME.','MK0004'), ('D0002', 'Ismed Sofyan, SE, MIA.','MK0005'), ('D0003', 'Swita Pata, M.T.I','MK0006'), ('D0001', 'Eka Ramdani,SE, ME.','MK0007'), ('D0004', 'Saktiawan Sinaga,SE, ME.','MK0008'), ('D0003', 'Swita Pata, M.T.I','MK0009');
INSERT INTO Mengambil(NIM,Code, Nilai) VALUES('MHS0001', 'MK0001','A'), ('MHS0002', 'MK0002','B'), ('MHS0003', 'MK0003','C'), ('MHS0004', 'MK0004','D'), ('MHS0005', 'MK0005','E'), ('MHS0001', 'MK0006','A'), ('MHS0002', 'MK0007','B'), ('MHS0003', 'MK0008','C'), ('MHS0004', 'MK0009','D'), ('MHS0005', 'MK0001','E'), ('MHS0001', 'MK0002','A'), ('MHS0001' , 'MK0003','B'), ('MHS0002', 'MK0009','C'), ('MHS0002', 'MK0003','D'), ('MHS0002', 'MK0006','E');


-- 1.
SELECT Mahasiswa.*, Jurusan.id FROM Mahasiswa JOIN Jurusan on Mahasiswa.Jurusan = Jurusan.Jurusan;

-- 2.
SELECT * FROM Mahasiswa WHERE Umur < 20;

-- 3.
SELECT Mengambil.*, Mahasiswa.Nama FROM Mengambil JOIN Mahasiswa on Mahasiswa.NIM = Mengambil.NIM WHERE Nilai < 'B';

-- 4.
SELECT Nama, SUM(SKS) 'TOTAL SKS' FROM KRS GROUP BY Nama HAVING SUM(SKS) > 10;

-- 5.
SELECT Matkul.*, Mahasiswa.NIM, Mahasiswa.Nama FROM Matkul JOIN Mahasiswa WHERE Matkul.Nama = 'Data Mining';

-- 6.
SELECT Mengajar.*, Mengambil.NIM, Mahasiswa.Nama FROM Mengajar INNER JOIN Mengambil on Mengajar.Code = Mengambil.Code INNER JOIN Mahasiswa on Mahasiswa.NIM = Mengambil.NIM GROUP BY Mengajar.Code ORDER BY NIP;

SELECT Mahasiswa.Nama, Mahasiswa.Jurusan, Dosen.Nama FROM Mahasiswa INNER JOIN 

-- 7.
SELECT * FROM Mahasiswa ORDER BY Umur;
SELECT * FROM Mahasiswa ORDER BY Umur DESC;


-- 8.
SELECT Mahasiswa.Nama, Mahasiswa.Jurusan, Mengambil.Nilai, Dosen.Nama FROM Mahasiswa INNER JOIN Mengambil on Mahasiswa.NIM = Mengambil.NIM INNER JOIN Dosen WHERE Nilai > 'C';
