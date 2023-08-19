const http = require('http');
const mysql = require('mysql');
const PORT = 8000;

const con = mysql.createConnection({
    host: '',
    user: 'root',
    password: 'root',
    database: 'people'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Conecatado!");

    let sql  = "INSERT INTO people (name) VALUES('Gabriel'), ('Rafaela'), ('Chimbinha')"
    con.query(sql, function (err, result) {
        if (err)throw err;
        console.log("Pessoas adicionadas")
    })
});

function GetFullCycleNames() {
    let sql = "SELECT name FROM people"
    let names;
    con.query(sql, function (err, result) {
        if (err) throw err;
        names = result
    })

    let fullCycleHtml = '<h1>Full Cycle Rocks!</h1> <ul>'

    names.forEach(name => {
        fullCycleHtml += `<li>${name}</li>`
    });

    fullCycleHtml += '</ul>'

    return fullCycleHtml
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(GetFullCycleNames());
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});