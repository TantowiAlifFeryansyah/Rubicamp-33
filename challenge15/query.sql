CREATE TABLE Jurusan (id varchar(10) primary key not null, Jurusan varchar(100) not null);
CREATE TABLE Mahasiswa (NIM varchar(20) primary key not null, Nama varchar(100) not null, Umur numeric not null, Alamat text not null, Jurusan varchar(100) not null , foreign key(Jurusan) references Jurusan(id));
CREATE TABLE Mengambil(id integer primary key autoincrement, NIM varchar(10) not null,Code varchar(10) not null, Nilai varchar(5) not null, foreign key(NIM) references Mahasiswa(NIM), foreign key(Code) references Matkul(Code));
CREATE TABLE Matkul (Code varchar(10) primary key not null, Nama varchar(100) not null, SKS numeric not null);
CREATE TABLE Mengajar(id integer primary key autoincrement, NIP varchar(10) not null, Nama varchar(100) not null, Code varchar(10) not null, foreign key(NIP) references Dosen(NIP), foreign key(Code) references Matkul(Code),foreign key(Nama) references Dosen(Nama));
CREATE TABLE Dosen (NIP varchar(10) primary key not null, Nama varchar(100) not null, Alamat text not null);


INSERT INTO Jurusan VALUES ('J0001', 'DKV'), ('J0002', 'Database System'), ('J0003', 'Seni Rupa');
INSERT INTO Mahasiswa VALUES ('MHS0001', 'Tantowi', 18, 'Bandung', 'DKV'), ('MHS0002', 'Alif', 19, 'Batujajar', 'Database System'), ('MHS0003', 'Feryansyah', 21, 'Cimahi', 'Seni Rupa'), ('MHS0004', 'Abi', 18, 'Padalarang', 'DKV'), ('MHS0005', 'Tanaya', 22, 'Cimahi', 'Seni Rupa');
INSERT INTO Mengambil(NIM,Code,Nilai) VALUES ('MHS0001', 'MK0001','A'), ('MHS0002', 'MK0002','B'), ('MHS0003', 'MK0003','C'), ('MHS0004', 'MK0001','D'), ('MHS0005', 'MK0002','E'),('MHS0001', 'MK0003','A'),('MHS0002', 'MK0001','B'),('MHS0002', 'MK0003','C'),('MHS0001', 'MK0004','B'), ('MHS0002', 'MK0004','E'),('MHS0002', 'MK0005','C');
INSERT INTO Matkul (Code, Nama, SKS) VALUES ('MK0001', 'Fotografi', 3), ('MK0002','Bahasa Inggris', 3), ('MK0003', 'Data Mining' , 2), ('MK0004', 'Bahasa Indonesia' , 2),('MK0005', 'Pendidikan Agama' , 3);
INSERT INTO Dosen VALUES ('DS001', 'Eka Ramdani,SE, ME.', 'Bandung'), ('DS002', 'Ismed Sofyan, SE, MIA.', 'Jakarta'), ('DS003', 'Swita Pata, M.T.I', 'Padang'), ('DS004', 'Saktiawan Sinaga,SE, ME.', 'Medan');
INSERT INTO Mengajar(NIP,Nama,Code) VALUES ('DS001', 'Eka Ramdani,SE, ME.','MK0001'), ('DS002', 'Ismed Sofyan, SE, MIA.','MK0002'), ('DS003', 'Swita Pata, M.T.I','MK0003'), ('DS004', 'Saktiawan Sinaga,SE, ME.','MK0004'), ('DS002', 'Ismed Sofyan, SE, MIA.','MK0005');


-- 1.
SELECT Mahasiswa.*, Jurusan.id FROM Mahasiswa JOIN Jurusan on Mahasiswa.Jurusan = Jurusan.Jurusan;

-- 2.
SELECT * FROM Mahasiswa WHERE Umur < 20;

-- 3.
SELECT Mengambil.*, Mahasiswa.Nama FROM Mengambil JOIN Mahasiswa on Mahasiswa.NIM = Mengambil.NIM WHERE Nilai <= 'B';

-- 4.

SELECT Matkul.Code, Mahasiswa.NIM, Mahasiswa.Nama, SUM(SKS) 'TOTAL SKS' FROM Mengambil INNER JOIN Mahasiswa on Mengambil.NIM = Mahasiswa.NIM INNER JOIN Matkul on Matkul.Code = Mengambil.Code GROUP BY Mahasiswa.Nama HAVING SUM(SKS) > 10;

-- 5.
SELECT Mengambil.Code, Matkul.Nama, Mahasiswa.NIM, Mahasiswa.Nama FROM Mengambil INNER JOIN Mahasiswa on Mengambil.NIM = Mahasiswa.NIM INNER JOIN Matkul on Matkul.Code = Mengambil.Code WHERE Matkul.Nama = 'Data Mining' ORDER BY Mahasiswa.NIM;

-- 6.
SELECT Dosen.Nama,(COUNT(Mahasiswa.Nama)) as 'Total Mahasiswa' FROM Mahasiswa INNER JOIN Mengambil on Mahasiswa.NIM = Mengambil.NIM INNER JOIN Mengajar on Mengajar.Code = Mengambil.Code INNER JOIN Dosen on Dosen.NIP = Mengajar.NIP GROUP BY Dosen.NIP;

-- 7.
SELECT * FROM Mahasiswa ORDER BY Umur;
SELECT * FROM Mahasiswa ORDER BY Umur DESC;

-- 8.
SELECT Mahasiswa.Nama, Mahasiswa.Jurusan, Mengambil.Nilai, Dosen.Nama FROM Mahasiswa INNER JOIN Mengambil on Mahasiswa.NIM = Mengambil.NIM INNER JOIN Mengajar on Mengajar.Code = Mengambil.Code INNER JOIN Dosen on Dosen.NIP = Mengajar.NIP WHERE Nilai > 'C';



