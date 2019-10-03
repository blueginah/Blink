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
       console.log("hello data")
       res.type('text/html')
       res.send(data)
///////
       split_data = data.split('\n')
       month = split_data[1]
       if(month == 'Jan')
	    month_num = 1;
       else if(month == 'Feb')
	    month_num = 2;
       else if(month == 'Mar')
	    month_num = 3;
       else if(month == 'Apr')
	    month_num = 4;
       else if(month == 'May')
	    month_num = 5;
       else if(month == 'Jun')
	    month_num = 6;
       else if(month == 'Jul')
	    month_num = 7;
       else if(month == 'Feb')
	    month_num = 2;
       else if(month == 'Feb')
	    month_num = 2;
       else if(month == 'Feb')
	    month_num = 2;
       else if(month == 'Feb')
	    month_num = 2;
       else if(month == 'Feb')
	    month_num = 2;
       else if(month == 'Feb')
	    month_num = 2;
       else if(month == 'Feb')
	    month_num = 2;
       else if(month == 'Feb')
	    month_num = 2;





    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
