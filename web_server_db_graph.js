/*
 * 2018/10/10 Jiyoung Hwang
 * blueginah97@gmail.com 
 * GET으로 호출하는 경우.
 * 데이터 수집용 url
 * http://localhost:8080/log?device=202&unit=3&type=T&value=24.2&seq=34
 * 텍스트 전송 url(count default = 256)
 * http://localhost:8080/dump?count=5
 * 그래프 표시 url(count default = 256)
 * http://localhost:8080/graph?count=50
*/

var express = require('express');
var app = express();

fs = require('fs');
mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'mypassword',
    database: 'mydb'
})
connection.connect();

function insert_sensor(device, unit, type, value, seq, ip) {
  obj = {};
  obj.seq = seq;
  obj.device = device;
  obj.unit = unit;
  obj.type = type;
  obj.value = value;
  obj.ip = ip.replace(/^.*:/, '')

  var query = connection.query('insert into sensors set ?', obj, function(err, rows, cols) {
    if (err) throw err;
    console.log("database insertion ok= %j", obj);
  });
}

function addZero(i){
	if(i<10) i="0"+i;
	return i;
}

app.get('/', function(req, res) {
  res.end('Nice to meet you');
});

app.get('/log', function(req, res) {
  r = req.query;
  console.log("GET %j", r);

  insert_sensor(r.device, r.unit, r.type, r.value, r.seq, req.connection.remoteAddress);
  res.end('OK:' + JSON.stringify(req.query));
});

app.get('/dump', function(req, res) {
	r = req.query;
	cnt=req.query.count;
	if(cnt==undefined) cnt=256;
	res.type('text/html');
	console.log("The number of queries : ",cnt);
	var qstr = 'select * from sensors ';
	connection.query(qstr, function(err, rows, cols){
		if(err) throw err;
		var num_rows = rows.length;
		var data_num = cnt;
		if(num_rows < cnt) data_num = num_rows;
		console.log("Sending " + data_num + " records");
		html = ""
		for(var i=num_rows-data_num;i<num_rows;i++)
			html+=JSON.stringify(rows[i])+"<br>";
		res.write(html);
		 
	})
});

app.get('/graph', function (req, res) {
    console.log('got app.get(graph)');
    var html = fs.readFile('./graph.html', function (err, html) {
    html = " "+ html
    console.log('read file');

	cnt=req.query.count;
	if(cnt==undefined) cnt=256;
	res.type('text/html');
    var qstr = 'select * from sensors ';
    connection.query(qstr, function(err, rows, cols) {
      if (err) throw err;
	var num_rows = rows.length;
	var data_num=cnt;
	if(num_rows < cnt) data_num = num_rows;
	console.log("Drawing graph with " + data_num + " records");
      var data = "";
      var comma = ""
      for (var i=num_rows-data_num; i< num_rows; i++) {
         r = rows[i];
	var timetemp=r.time;
	data += comma + "[new Date("+timetemp.getFullYear()+","+addZero(timetemp.getMonth())+","+addZero(timetemp.getDate())+","+addZero(timetemp.getHours())+","+addZero(timetemp.getMinutes())+"),"+ r.value +"]";
        comma = ",";
      }
      var header = "data.addColumn('date', 'Date/Time');"
      header += "data.addColumn('number', 'Temp');"
      html = html.replace("<%HEADER%>", header);
      html = html.replace("<%DATA%>", data);

      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
    });
  });
})

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
