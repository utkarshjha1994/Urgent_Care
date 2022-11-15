show databases;
create database if not exists Health_v2;
use Health_v2;
show tables;

create table if not exists patients (
patient_id int primary key auto_increment,
patient_name varchar(255),
patient_gender varchar(255),
patient_dob date,
patient_email varchar(255) unique key,
patient_phone varchar(255),
patient_address varchar(255),
patient_insuranceNo varchar(255),
patient_username varchar(255),
patient_password varchar(255)
);
desc patients;
select * from patients;
drop table patients;

create table if not exists doctors (
doctor_id int primary key auto_increment,
doctor_name varchar(255),
doctor_gender varchar(255),
doctor_dob date,
doctor_email varchar(255) unique key,
doctor_phone varchar(255),
doctor_address varchar(255),
doctor_speciality varchar(255),
doctor_username varchar(255),
doctor_password varchar(255),
doctor_estatus varchar(255)
);
desc doctors;
select * from doctors;
insert into doctors(doctor_name,doctor_gender,doctor_dob,doctor_email,doctor_phone,doctor_address,doctor_speciality,doctor_username,doctor_password,doctor_estatus) 
values('Dr. John','Male','1991-11-11','drjohn@uc.com','(732)-123-4567','21 Jump St, New Brunswick, New Jersey','family medicine physician','drjohn@uc.com','unhashedTestPassword1','Active');
insert into doctors(doctor_name,doctor_gender,doctor_dob,doctor_email,doctor_phone,doctor_address,doctor_speciality,doctor_username,doctor_password,doctor_estatus) 
values('Dr. Jane','Female','1992-12-21','drjane@uc.com','(732)-890-4567','22 Jump St, New Brunswick, New Jersey','internal medicine physician','drjane@uc.com','unhashedTestPassword2','Active');
insert into doctors(doctor_name,doctor_gender,doctor_dob,doctor_email,doctor_phone,doctor_address,doctor_speciality,doctor_username,doctor_password,doctor_estatus) 
values('Dr. Jill','Female','1990-10-11','drjill@uc.com','(732)-623-4567','23 Jump St, New Brunswick, New Jersey','sports medicine physician','drjill@uc.com','unhashedTestPassword3','Active');
insert into doctors(doctor_name,doctor_gender,doctor_dob,doctor_email,doctor_phone,doctor_address,doctor_speciality,doctor_username,doctor_password,doctor_estatus) 
values('Dr. James','Male','1980-10-11','drjames@uc.com','(732)-653-1267','24 Jump St, New Brunswick, New Jersey','emergency medicine physician','drjames@uc.com','unhashedTestPassword4','Active');
insert into doctors(doctor_name,doctor_gender,doctor_dob,doctor_email,doctor_phone,doctor_address,doctor_speciality,doctor_username,doctor_password,doctor_estatus) 
values('Dr. Jonah','Male','1992-06-23','drjonah@uc.com','(732)-563-4437','25 Jump St, New Brunswick, New Jersey','sports medicine physician','drjonah@uc.com','unhashedTestPassword5','Not Active');



create table if not exists labtechs (
labtech_id int primary key auto_increment,
labtech_name varchar(255),
labtech_gender varchar(255),
labtech_dob date,
labtech_email varchar(255) unique key,
labtech_phone varchar(255),
labtech_address varchar(255),
labtech_speciality varchar(255),
labtech_username varchar(255),
labtech_password varchar(255),
labtech_estatus varchar(255)
);
desc labtechs;
select * from labtechs;

create table if not exists appointments (
appt_id int primary key auto_increment,
appt_date date,
patient_id int, 
FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
doctor_id int, 
FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
doctor_notes text,
test_name varchar(255),
test_report text,
test_status varchar(255),
total_payment decimal(5,2),
pending_payment decimal(5,2)
);
desc appointments;
select * from appointments;
drop table appointments;
Update appointments set total_payment="30", pending_payment="15" where appt_id="1";
Update appointments set test_status="Pending" where appt_id="4";
Update appointments set test_name="Flu Test" where appt_id="3";


create table if not exists UCusers (
id int primary key auto_increment,
username varchar(255),
password varchar(255),
email varchar(255) unique key,
user_role varchar(255),
status varchar(255)
);
desc UCusers;
select * from UCusers;
drop table UCusers;
insert into UCusers(username,password,email,user_role) values('drjohn@uc.com','unhashedTestPassword1','drjohn@uc.com','ROLE.DOCTOR');

create table if not exists insuranceNW (
id int primary key auto_increment,
insurance_company varchar(255),
coverage_description varchar(255),
coverage_amount decimal(5,2)
);
desc insuranceNW;
select * from insuranceNW;
insert into insuranceNW(insurance_company,coverage_description,coverage_amount) values('GHI','family medicine physician',9);
insert into insuranceNW(insurance_company,coverage_description,coverage_amount) values('GHI','internal medicine physician',12);
insert into insuranceNW(insurance_company,coverage_description,coverage_amount) values('GHI','sports medicine physician',16);
insert into insuranceNW(insurance_company,coverage_description,coverage_amount) values('GHI','emergency medicine physician',30);
insert into insuranceNW(insurance_company,coverage_description,coverage_amount) values('GHI','COVID Test',10);
insert into insuranceNW(insurance_company,coverage_description,coverage_amount) values('GHI','Blood Test',40);
insert into insuranceNW(insurance_company,coverage_description,coverage_amount) values('GHI','STD Test',50);
insert into insuranceNW(insurance_company,coverage_description,coverage_amount) values('GHI','Urinalysis Test',75);
insert into insuranceNW(insurance_company,coverage_description,coverage_amount) values('GHI','Drug Test',100);
insert into insuranceNW(insurance_company,coverage_description,coverage_amount) values('GHI','Flu Test',50);
insert into insuranceNW(insurance_company,coverage_description,coverage_amount) values('GHI','Strep Test',40);
insert into insuranceNW(insurance_company,coverage_description,coverage_amount) values('GHI','PT-INR Test',150);
