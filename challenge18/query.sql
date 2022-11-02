CREATE TABLE Mahasiswa (NIM varchar(20) primary key not null, Nama varchar(100) not null, 'Tanggal Lahir' varchar not null, Alamat text not null, 'Kode Jurusan' char(3),'Nama Jurusan' varchar(100) not null) ;

CREATE TABLE Jurusan (KodeJurusan (4) primary key not null, 'Nama Jurusan' varchar(100) not null, foreign key('Kode Jurusan') references Mahasiswa('Kode Jurusan'), foreign key('Nama Jurusan') references Mahasiswa('Nama Jurusan'));

CREATE TABLE Kontrak (ID integer primary key autoincrement, NIM varchar(20) not null, Nama varchar(100) not null, 'Mata Kuliah' varchar(100) not null, Dosen varchar(100) not null, Nilai varchar(100) not null, foreign key(NIM) references Mahasiswa(NIM), foreign key(Nama) references Mahasiswa(Nama));

CREATE TABLE Matkul ('Kode Matkul' varchar(4) primary key not null, 'Nama Matkul' varchar(100) not null, SKS numeric not null, foreign key('Nama Matkul') references Kontrak('Mata Kuliah'));

CREATE TABLE Dosen (NIP char(5) primary key not null, 'Nama Dosen' varchar(100) not null, foreign key('Nama Dosen') references Kontrak(Dosen));


INSERT INTO Mahasiswa(NIM, Nama, 'Tanggal Lahir', Alamat, 'Kode Jurusan', 'Nama Jurusan') VALUES ('2022070001', 'Tantowi', '1997-09-15','Bandung', 'J001', 'Fabrikasi Logam'), ('2022070002', 'Yaqin', '1998-09-25','Bogor', 'J002', 'Listrik Tenaga'), ('2022070003', 'Fajar', '2004-07-02','Jambi', 'J003', 'Elektronika'), ('2022070004', 'Bagas', '1996-01-30','Bandung', 'J004', 'Mekatronika'), ('2022070005', 'Ferry', '2001-11-01','Tangerang', 'J005', 'Otomotif'), ('2022070006', 'Faras', '1994-05-28','Jakarta', 'J006', 'Informatika');

INSERT INTO Jurusan(Kode Jurusan, Nama Jurusan) VALUES ('J001','Fabrikasi Logam'), ('J002','Listrik tenaga'), ('J003','Elektronika'), ('J004','Mekatronika'), ('J005','Otomotif'), ('J006','Informatika');


INSERT INTO Kontrak (NIM, Nama, Mata Kuliah, Dosen, Nilai) VALUES ('2022070001', 'Tantowi', 'data mining', 'Rubi', 'C'), ('2022070002', 'Yaqin', 'data mining', 'Rubi', 'A+'), ('2022070003', 'Fajar', 'matematika', 'Hilmi', 'B'), ('2022070004', 'Bagas', 'basic', 'Wildan', 'B+'), ('2022070005', 'Ferry', 'kerja bengkel', 'Bambang', 'A'), ('2022070006', 'Faras', 'matematika', 'Hilmi', 'A++');