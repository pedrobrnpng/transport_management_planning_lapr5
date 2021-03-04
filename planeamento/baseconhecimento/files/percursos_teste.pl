percurso(1, false).
percurso(3, false).
percurso(5, false).
percurso(8, false).
percurso(9, false).
percurso(11, false).
%percurso(13, false).
% percurso(18, false).
percurso(20, false).
percurso(22, false).
percurso(24, false).
percurso(26, false).
percurso(34, true).
percurso(35, true).
percurso(36, true).
percurso(37, true).
percurso(38, true).
percurso(39, true).

no_percurso(1,'AGUIA','RECAR',600,5000).
no_percurso(1,'RECAR','PARAD',360,3200).
no_percurso(1,'PARAD','CETE',360,3000).
no_percurso(1,'CETE','PARED',540,4500).
no_percurso(3,'PARED','CEDE',540,4500).
no_percurso(3,'CETE','PARAD',360,3000).
no_percurso(3,'PARAD','RECAR',360,3200).
no_percurso(3,'RECAR','AGUIA',600,5000).
no_percurso(5,'GAND','VANDO',600,5000).
no_percurso(5,'VANDO','BALTR',240,2000).
no_percurso(5,'BALTR','MOURZ',240,2000).
no_percurso(5,'MOURZ','PARED',480,4000).
no_percurso(8,'PARED','MOURZ',480,4000).
no_percurso(8,'MOURZ','BALTR',240,2000).
no_percurso(8,'BALTR','VANDO',240,2000).
no_percurso(8,'VANDO','GAND',600,5000).
no_percurso(9,'LORDL','VANDO',780,6300).
no_percurso(9,'VANDO','BALTR',240,2000).
no_percurso(9,'BALTR','MOURZ',240,2000).
no_percurso(9,'MOURZ','PARED',480,4000).
no_percurso(11,'PARED','MOURZ',480,4500).
no_percurso(11,'MOURZ','BALTR',240,2000).
no_percurso(11,'BALTR','VANDO',240,2000).
no_percurso(11,'VANDO','LORDL',780,4000).
% no_percurso(13,'PARED',0,0).
% no_percurso(13,'CEDE',540,4500).
% no_percurso(13,'PARAD',360,3000).
% no_percurso(13,'RECAR',360,3200).
% no_percurso(13,'AGUIA',600,5000).
% no_percurso(18,'PARED',0,0).
% no_percurso(18,'CEDE',540,4500).
% no_percurso(18,'PARAD',360,3000).
% no_percurso(18,'RECAR',360,3200).
% no_percurso(18,'AGUIA',600,5000).
no_percurso(20,'CETE','MOURZ',300,2500).
no_percurso(20,'MOURZ','VCCAR',360,2000).
no_percurso(20,'VCCAR','BESTR',360,2000).
no_percurso(20,'BESTR','CRIST',600,3000).
no_percurso(20,'CRIST','SOBRO',600,2000).
no_percurso(22,'SOBRO','CRIST',540,2000).
no_percurso(22,'CRIST','BESTR',360,3000).
no_percurso(22,'BESTR','VCCAR',360,2000).
no_percurso(22,'VCCAR','MOURZ',600,2000).
no_percurso(22,'MOURZ','CETE',300,2500).
no_percurso(24,'LORDL','DIGRJ',300,2500).
no_percurso(24,'DIGRJ','CRIST',240,2000).
no_percurso(24,'CRIST','VCCAR',240,2000).
no_percurso(24,'VCCAR','BALTR',240,2000).
no_percurso(24,'BALTR','PARAD',300,2500).
no_percurso(26,'PARED','BALTR',300,2500).
no_percurso(26,'BALTR','VCCAR',240,2000).
no_percurso(26,'VCCAR','CRIST',240,2000).
no_percurso(26,'CRIST','DIGRJ',240,2000).
no_percurso(26,'DIGRJ','LORDL',300,2500).
no_percurso(34,'ESTLO','LORDL',120,1500).
no_percurso(35,'LORDL','ESTLO',120,1500).
no_percurso(36,'ESTLO','SOBRO',300,1500).
no_percurso(37,'SOBRO','ESTLO',300,1500).
no_percurso(38,'ESTPA','PARED',120,1500).
no_percurso(39,'PARED','ESTPA',120,1500).


