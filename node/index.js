const http = require('http');
const mysql = require('mysql2');
const PORT = 3000;

const con = mysql.createConnection({
    host: 'nodedb',
    user: 'root',
    password: 'root',
    database: 'nodedb'
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

async function GetFullCycleNames() {
    return new Promise((resolve, reject) => {
        let sql = "SELECT name FROM people";
        
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            let names = result;

            let fullCycleHtml = '<h1>Full Cycle Rocks!</h1> <ul>'
            names.forEach(function(name) {
                fullCycleHtml += `<li>${name.name}</li>`
            });
            fullCycleHtml += '</ul>';
            resolve(fullCycleHtml);
        });
    });
}

const server = http.createServer(async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
    res.end(await GetFullCycleNames())
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${3000}`);
});