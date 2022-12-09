const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require("mysql");
const { randomUUID } = require("crypto");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

const connection = mysql.createConnection({
  host: "urgentcare.c1ssetuk2fby.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Urgent_6",
  database: "Urgent_Care",
  port: 3306,
});

//Code for appointments table

app.post("/appointments/book", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("appointments");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  //console.log(req.body);

  const date =
    "DATE '" +
    req.body.date +
    "'," +
    req.body.patient_id +
    "," +
    req.body.doctor_id +
    ",'" +
    req.body.total_payment +
    "'";

  query =
    "insert into Appointments (date,patient_id,doctor_id,total_payment) Values (" +
    date +
    ")";
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.get("/appointments/view/patient", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("appointments");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  //console.log(req.body);

  query =
    "select * from Appointments where patient_id = " + req.body.patient_id;
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.get("/appointments/view/doctor", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("appointments");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  //console.log(req.body);

  query =
    "select * from Appointments where doctor_id = " +
    req.body.doctor_id +
    " order by date desc";
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.put("/appointments/modify", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("appointments");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  //console.log(req.body);

  query =
    "update Appointments set date =" +
    "'" +
    req.body.date +
    "' where id=" +
    req.body.id;
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.delete("/appointments/delete", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("appointments");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  //console.log(req.body);

  query = "delete from Appointments  where id=" + req.body.id;
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.get("/Lab_Technician/Tests", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("appointments");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  //console.log(req.body);

  query = "select * from Appointments where Test_Status = 'pending'";
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.put("/Prescription", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("appointments");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  //console.log(req.body);

  query =
    "update Appointments set presciption =" +
    "'" +
    req.body.pre +
    "',pending_payment = " +
    req.body.pending_payment +
    ",test_name = '" +
    req.body.test_name +
    "',Test_Status = 'pending' where id=" +
    req.body.id;
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.put("/Test_Result", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("appointments");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  //console.log(req.body);

  query =
    "update Appointments set test_report =" +
    "'" +
    req.body.report +
    "',Test_Status = '" +
    req.body.test_status +
    "' where id=" +
    req.body.id;
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.put("/Payment", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("appointments");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  //console.log(req.body);
  payment = parseInt(req.body.payment);
  payment += parseInt(req.body.paid);
  query =
    "update Appointments set total_payment =" +
    payment +
    ",pending_payment =0  where id=" +
    req.body.id;
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

//Code for Patient Table

app.get("/Patients", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter10");
  //console.log("here1");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  //console.log("here");
  query = "select * from Patient";

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.post("/login/patients", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log(req);

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json;charset=UTF-8");

  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();
  query =
    "select username,password, id from Patient where username='" +
    req.body.username +
    "' and password='" +
    req.body.password +
    "'";
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results.length);
    if (error != null) {
      res.send({ error: error });
    } else if (results.length == 0) {
      res.send({ results: "Authetication failed", error: error });
    } else {
      res.send({ results: results, error: error, time: time });
    }
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.post("/signup", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("here2");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();
  id = randomUUID();
  //console.log(id);
  query =
    "insert into Patient Values (65,'" +
    req.body.name +
    "','" +
    req.body.gender +
    "','" +
    req.body.dob +
    "','" +
    req.body.email +
    "','" +
    req.body.phone +
    "','" +
    req.body.address +
    "'," +
    req.body.insurance_number +
    ",'" +
    req.body.email +
    "','" +
    req.body.password +
    "')";
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

//Code for Doctors Table

app.post("/login/Doctors", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("here1");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  query =
    "select username,password from Doctor where username='" +
    req.body.username +
    "' and password='" +
    req.body.password +
    "' and status = 'active'";
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.get("/Doctors", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter10");
  //console.log("here1");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  //console.log("here");
  query = "select * from Doctor";

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.get("/Doctors/Speciality", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter10");
  //console.log("here1");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  //console.log("here");
  query = "select * from Doctor where speciality='" + req.body.speciality + "'";

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.post("/Add/Doctors", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("here2");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();
  id = randomUUID();
  //console.log(id);
  query =
    "insert into Doctor Values ('91'," +
    "'" +
    req.body.name +
    "','" +
    req.body.gender +
    "','" +
    req.body.dob +
    "','" +
    req.body.email +
    "','" +
    req.body.phone +
    "','" +
    req.body.address +
    "','" +
    req.body.speciality +
    "','" +
    req.body.email +
    "','" +
    req.body.password +
    "','active')";
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.put("/Deactivate/Doctors", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("here2");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();
  id = randomUUID();
  //console.log(id);
  query = "update Doctor set status = 'inactive' where id =" + req.body.id;
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

// Code for Lab Tech tables

app.post("/Lab_Technicians/login", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("here1");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  query =
    "select username,password from LAB_Techinican where username='" +
    req.body.username +
    "' and password='" +
    req.body.password +
    "' and status = 'active'";
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.get("/Lab_Technicians", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter10");
  //console.log("here1");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();

  //console.log("here");
  query = "select * from Lab_Technician";

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.post("/Add/Lab_Technicians", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("here2");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();
  id = randomUUID();
  //console.log(id);
  query =
    "insert into Lab_Technician Values ('91'," +
    "'" +
    req.body.name +
    "','" +
    req.body.gender +
    "','" +
    req.body.dob +
    "','" +
    req.body.email +
    "','" +
    req.body.phone +
    "','" +
    req.body.address +
    "','" +
    req.body.speciality +
    "','" +
    req.body.email +
    "','" +
    req.body.password +
    "','active')";
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.put("/Deactivate/Lab_Technicians", (req, res) => {
  // const username = req.body.user;
  // const password = req.body.password;
  ////console.log(`POST request: username is ${username} and password is ${req}`);
  //console.log("Enter");
  //console.log("here2");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  // Executing the MySQL query (select all data from the 'users' table).
  const startTime = Date.now();
  id = randomUUID();
  //console.log(id);
  query =
    "update Lab_Technician set status = 'inactive' where id =" + req.body.id;
  //console.log(query);

  connection.query(query, function (error, results) {
    // If some error occurs, we throw an error.
    if (error) //console.log(error);
    const time = Date.now() - startTime;
    //console.log(results);
    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send({ results: results, error: error, time: time });
  });
  ////console.log(req.body);
  //res.end(`You are now logged in Mr(s) ${req.params}`);
});

app.listen(3000, () => {
  //console.log("Started on http://localhost:3000");
});
