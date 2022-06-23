const express = require('express');

const mysql = require('mysql2');
let dbparams = {
    host: 'localhost',
    database: 'mumbai',
    user: 'root',
    password: 'cdac',
    port: 3306
}
const con = mysql.createConnection(dbparams);


const app = express();
app.use(express.static("sf"));

app.get('/searching', (req, resp) => {

    let input = req.query.bookid;
    let output = { status: false, bookdetails: {} };
    con.query('select * from book where bookid=?', [input], (error, rows) => {

        if (error) {
            console.log("Error-Not connected Db server");
        } else {

            if (rows.length == 1) {
                output.status = true;
                output.bookdetails = rows[0];
            }

        }
        resp.send(output);
    })

});//searching end

app.get('/update', (req, resp) => {

    let bookname = req.query.bookname;
    let bookid = req.query.bookid;
    let price = req.query.price;

    let output = { status: false };

    con.query('update book set bookname=?,price=? where bookid=?', [bookname, price, bookid],
        (error, rows) => {

            if (error) {
                console.log("Error-Not connected Db server");
            } else {

                if (rows.affectedRows == 1) {
                    output.status = true;

                }

            }
            resp.send(output);
        })



});//update event



app.listen(8085, () => {

    console.log("port 8085 running...");

});