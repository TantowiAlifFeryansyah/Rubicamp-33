CREATE TABLE Mahasiswa (NIM varchar(20) primary key not null, Nama varchar(100) not null, 'Tanggal Lahir' varchar not null, Alamat text not null, 'Kode Jurusan' char(4) not null);
INSERT INTO Mahasiswa(NIM, Nama, 'Tanggal Lahir', Alamat, 'Kode Jurusan') VALUES ('2022070001', 'Tantowi', '1997-09-15','Bandung', 'J001'), ('2022070002', 'Yaqin', '1998-09-25','Bogor', 'J002'), ('2022070003', 'Fajar', '2004-07-02','Jambi', 'J003'), ('2022070004', 'Bagas', '1996-01-30','Bandung', 'J004'), ('2022070005', 'Ferry', '2001-11-01','Tangerang', 'J005'), ('2022070006', 'Faras', '1994-05-28','Jakarta', 'J006');

CREATE TABLE Jurusan ('Kode Jurusan' char(4) primary key not null, 'Nama Jurusan' varchar(100) not null, foreign key('Kode Jurusan') references Mahasiswa('Kode Jurusan'));
INSERT INTO Jurusan('Kode Jurusan', 'Nama Jurusan') VALUES ('J001','Fabrikasi Logam'), ('J002','Listrik tenaga'), ('J003','Elektronika'), ('J004','Mekatronika'), ('J005','Otomotif'), ('J006','Informatika');


CREATE TABLE Kontrak (ID integer primary key autoincrement, NIM varchar(20) not null, Nama varchar(100) not null, 'Mata Kuliah' varchar(100) not null, Dosen varchar(100) not null, Nilai varchar(100) not null, foreign key(NIM) references Mahasiswa(NIM), foreign key(Nama) references Mahasiswa(Nama));

CREATE TABLE Matkul ('Kode Matkul' varchar(4) primary key not null, 'Nama Matkul' varchar(100) not null, SKS numeric not null, foreign key('Nama Matkul') references Kontrak('Mata Kuliah'));

CREATE TABLE Dosen (NIP char(5) primary key not null, 'Nama Dosen' varchar(100) not null, foreign key('Nama Dosen') references Kontrak(Dosen));




INSERT INTO Kontrak (NIM, Nama, 'Mata Kuliah', Dosen, Nilai) VALUES ('2022070001', 'Tantowi', 'data mining', 'Rubi', 'C'), ('2022070002', 'Yaqin', 'data mining', 'Rubi', 'A+'), ('2022070003', 'Fajar', 'matematika', 'Hilmi', 'B'), ('2022070004', 'Bagas', 'basic', 'Wildan', 'B+'), ('2022070005', 'Ferry', 'kerja bengkel', 'Bambang', 'A'), ('2022070006', 'Faras', 'matematika', 'Hilmi', 'A++');

INSERT INTO Matkul ('Kode Matkul', 'Nama Matkul', SKS) VALUES ('MK01', 'data mining', 20), ('MK02', 'basic', 20), ('MK03', 'kerja bengkel', 20), ('MK04', 'matematika', 15); 

INSERT INTO Dosen (NIP, 'Nama Dosen') VALUES ('D2201', 'Rubi'), ('D2202', 'Wildan'), ('D2203', 'Hilmi'), ('D2204', 'Bambang');





INSERT INTO Dosen (NIP, 'Nama Dosen') VALUES ('D2205', 'Emir'), ('D2206', 'Budi'), ('D2207', 'Rafi'), ('D2208', 'Ahmad');

INSERT INTO Matkul ('Kode Matkul', 'Nama Matkul', SKS) VALUES ('MK05', 'Bahasa Indonesia', 15), ('MK06', 'Pendidikan Agama', 10), ('MK07', 'Biologi', 20), ('MK08', 'Fisika', 15); 

INSERT INTO Kontrak (NIM, Nama, 'Mata Kuliah', Dosen, Nilai) VALUES ('2022070007', 'Alif', 'Bahasa Indonesia', 'Emir', 'A'), ('2022070008', 'Feryansyah', 'Pendidikan Agama', 'Budi', 'B+');



SELECT Mahasiswa.*, Jurusan.'Nama Jurusan' FROM Mahasiswa JOIN Jurusan ON Mahasiswa.'Kode Jurusan' = Jurusan.'Kode Jurusan';


