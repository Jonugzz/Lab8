var express = require('express');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reseves = [];
var waitlist = [];

//Rutas
app.get("/", function(req, res) {
     res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

//regresa el arreglo de reservaciones
app.get("/api/tables", function(req, res) {
    return res.json(reseves);
});

//regresa el arreglo de lista de espera
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

//crea reservacion y al agrega al arreglo
app.post("/api/tables", function(req, res) {
    var newRv = req.body;
    
    if(reseves.length < 3) {
        reseves.push(newRv);
    }
    else{
        waitlist.push(newRv)
        return res.json(false);
    }

    res.json(newRv);
});

//Vacio de los arreglos
app.post("/api/del", function(req, res) {
    reseves = [];
    waitlist = [];
    return res.json(true);
});



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

  
  