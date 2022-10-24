CREATE TABLE Jurusan (id varchar(10) primary key not null, Jurusan varchar(100) not null);
INSERT INTO Jurusan VALUES ('J0001', 'DKV'), ('J0002', 'Database System'), ('J0003', 'Seni Rupa');

CREATE TABLE Mahasiswa (nim varchar(20) primary key not null, Nama varchar(100) not null, Alamat text not null, Jurusan varchar(100) not null , foreign key(Jurusan) references Jurusan(id));
INSERT INTO Mahasiswa VALUES ('M0001', 'Tantowi', 'Bandung', 'DKV'), ('M0002', 'Alif', 'Batujajar', 'Database System'), ('M0003', 'Feryansyah', 'Cimahi', 'Seni Rupa');

CREATE TABLE Matkul (Code varchar(10) primary key not null, Nama varchar(100) not null, SKS numeric not null);
INSERT INTO Matkul VALUES ('MK0001', 'Fotografi', 50), ('MK0002','Bahasa Inggris', 80), ('Mk0003', 'Bahasa Indonesia' , 114), ('MK0004', 'Statistik', 80), ('MK0005', 'Pemrograman Web', 100), ('MK0006', 'RPL', 114);

CREATE TABLE Dosen (NIP varchar(10) primary key not null, Nama varchar(100) not null, Alamat text not null);
INSERT INTO Dosen VALUES ('D0001', 'Eka Ramdani,SE, ME.', 'Bandung'), ('D0002', 'Ismed Sofyan, SE, MIA.', 'Jakarta'), ('D0003', 'Swita Pata, M.T.I', 'Padang');

CREATE TABLE Mengajar(id integer primary key autoincrement, NIP varchar(10) not null, Code varchar(10) not null, foreign key(NIP) references Dosen(NIP),  foreign key(Code) references Matkul(Code));
INSERT INTO Mengajar(NIP, Code) VALUES ('D0001', 'MK0001'), ('D0002', 'MK0002'), ('D0003', 'MK0003'), ('D0001', 'MK0004'), ('D0002', 'MK0005'), ('D0003', 'MK0006');

CREATE TABLE Mengambil(id integer primary key autoincrement, nim varchar(10) not null, Code varchar(10) not null, foreign key(nim) references Mahasiswa(nim), foreign key(Code) references Matkul(Code));
INSERT INTO Mengambil(NIM,Code) VALUES ('M0001', 'MK0001'), ('M0002', 'MK0002'), ('M0003', 'MK0001'), ('M0001', 'MK0003');