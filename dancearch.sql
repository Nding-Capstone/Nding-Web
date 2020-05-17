/* 이름: demo_madang.sql */
/* 설명 */
 
/* root 계정으로 접속, madang 데이터베이스 생성, madang 계정 생성 */
/* MySQL Workbench에서 초기화면에서 +를 눌러 root connection을 만들어 접속한다. */
DROP DATABASE IF EXISTS  dancearch;
DROP USER IF EXISTS  dancearch@localhost;
create user dancearch@localhost identified WITH mysql_native_password  by 'dancearch';
create database dancearch;
grant all privileges on dancearch.* to dancearch@localhost with grant option;
commit;

/* madang DB 자료 생성 */
/* 이후 실습은 MySQL Workbench에서 초기화면에서 +를 눌러 madang connection을 만들어 접속하여 사용한다. */
 
USE dancearch;

CREATE TABLE Song (
id int(11) NOT NULL ,
title varchar(30) NOT NULL,
singer varchar(30) NOT NULL,
album varchar(30) NOT NULL,
link     varchar(100) NOT NULL,
   PRIMARY KEY (id)
);

INSERT INTO Song VALUES (0,'16shots','Stefflon Don ','16shots 이미지','www.youtube.com');
INSERT INTO Song VALUES (1,'가시나','선미','가시나 이미지','www.youtube.com');
INSERT INTO Song VALUES (2,'강남스타일','싸이','강남스타일 이미지','www.youtube.com');
INSERT INTO Song VALUES (3,'나야 나','워너원','나야나이미지','www.youtube.com');
INSERT INTO Song VALUES (4,'뉴페이스','싸이','뉴페이스 이미지','www.youtube.com');
INSERT INTO Song VALUES (5,'러브잇','싸이','러브잇 이미지','www.youtube.com');
INSERT INTO Song VALUES (6,'문을 여시오','임창정','문을 여시오 이미지','www.youtube.com');
INSERT INTO Song VALUES (7,'백팩키드','Russell Horning','백팩키드 이미지','www.youtube.com');
INSERT INTO Song VALUES (8,'불장난','블랙핑크','불장난 이미지','www.youtube.com');
INSERT INTO Song VALUES (9,'빨간맛','레드벨벳','빨간맛 이미지','www.youtube.com');
INSERT INTO Song VALUES (10,'뿜뿜','모모랜드','뿜뿜 이미지','www.youtube.com');
INSERT INTO Song VALUES (11,'아무노래','지아코','아무노래 이미지','www.youtube.com');
INSERT INTO Song VALUES (12,'위 아래','EXID','위 아래 이미지','www.youtube.com');
INSERT INTO Song VALUES (13,'Hip','마마무','Hip 이미지','www.youtube.com');
INSERT INTO Song VALUES (14,'Not today','방탄소년단','Not today 이미지','www.youtube.com');
INSERT INTO Song VALUES (15,'Pick Me','I.O.I','Pick Me 이미지','www.youtube.com');
INSERT INTO Song VALUES (16,'Roly Poly','티아라','Roly Poly 이미지','www.youtube.com');
INSERT INTO Song VALUES (17,'Snapping','청하','Snapping 이미지','www.youtube.com');
INSERT INTO Song VALUES (18,'TT','트와이스','TT 이미지','www.youtube.com');
INSERT INTO Song VALUES (19,'Yes or Yes','트와이스','Yes or Yes 이미지','www.youtube.com');

commit;