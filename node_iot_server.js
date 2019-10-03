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
	fs.readFile(`data.txt`, function(err, data) {
	if (err) throw err
	console.log(data)
	console.log("hello data")
	cnt=req.query.count
	res.type('text/html')
	data=data+' '
	split_data=data.split('\n')
	if(split_data.length>cnt)
		loop=split_data.length-cnt-1
	else
		loop=0

	finalLine=""
	for(i=loop;i<split_data.length-1;i++)
	{    
		line=split_data[i].split(' ')
		month=line[1]
		if(month == 'Jan')
			month_num ="01"
		else if(month == 'Feb')
			month_num = "02"
		else if(month == 'Mar')
			month_num = "03"
		else if(month == 'Apr')
			month_num = "04"
		else if(month == 'May')
			month_num = "05"
		else if(month == 'Jun')
			month_num = "06"
		else if(month == 'Jul')
			month_num = "07"
		else if(month == 'Aug')
			month_num = "08"
		else if(month == 'Sep')
			month_num = "09"
		else if(month == 'Oct')
			month_num = "10"
		else if(month == 'Nov')
			month_num = "11"
		else if(month == 'Dec')
			month_num = "12" 
	dateDay=line[3]+line[2]+month_num+','
	dateTime=line[4].split(':')
	hour=dateTime[0]
	min=dateTime[1]
	key=line[9]
	value=line[10]
	finalLine=finalLine+dateDay+hour+':'+min+','+key+' '+value+'<br>'

	}
	res.type('text/html')
	res.send(finalLine)	
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
