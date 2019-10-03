const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');


cnt = 1

app.get('/', function(req, res) {
    console.log(`got here, you are ${cnt++}`)
    res.send('You are not supposed to be here')
})

app.get('/update', function(req, res) {
    v = req.query
    console.log(`api_key=${v.api_key}, field1=${v.field1}`)
    res.send(`api_key=${v.api_key}, field1=${v.field1}`)

    api_key = v.api_key
    field1 = v.field1
    datetime = new Date();

    fs.appendFile('data.txt', `${datetime}: key=${api_key} value=${field1}\n`, (err) => {
        if (err) throw err;

        console.log(`got value key=${api_key} value=${field1}`)
    });

})

app.get('/dump', function(req, res) {
    fs.readFile('data.txt', function(err, data) {
       if (err) throw err
       console.log(data)
       res.type('text/html')
       res.send(data)
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
