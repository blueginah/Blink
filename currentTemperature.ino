/*********
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com  
*********/

#include <OneWire.h>
#include <DallasTemperature.h>
#include <WiFi.h>
const int oneWireBus = 4;  
// GPIO where the DS18B20 is connected to

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);
String writeAPIkey="Y3BBLR7LLW312MCO";

WiFiClient client;

const char *ssid="yjl";
const char *password="05250525";
const char* thingspeak="api.thingspeak.com";
 
void setup() {
  // Start the Serial Monitor
    Serial.begin(115200);
    delay(10);
    Serial.print("Connecting to ");
    Serial.print(ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) 
    {
        delay(500);
        Serial.print(".");
    }
    Serial.print("");
    Serial.print("WiFi connected");
  
  // Start the DS18B20 sensor
  sensors.begin();
}

void loop() {
  sensors.requestTemperatures(); 
  float temperatureC = sensors.getTempCByIndex(0);
  float temperatureF = sensors.getTempFByIndex(0);

  char buf[16];
  String tempstr=dtostrf(temperatureC,4,1,buf);

  if(!client.connect(thingspeak,80)){
    Serial.print("Thingspeak connection fail!!\n\n");
    }
  else{
    // GET 방식으로 보내기 위한 String, Data 설정
    String thingspeakwrite="GET /update?api_key=";
    thingspeakwrite += writeAPIkey;
    thingspeakwrite += "&field2=";
    thingspeakwrite += tempstr;
    thingspeakwrite += "\r\n\r\n";
  
    client.print(thingspeakwrite);

     if(client.connected()){
      Serial.print("Well connected!");
     }

    Serial.println(tempstr);            
    Serial.println("%data Send to Thingspeak.");
  }

   client.stop();
    Serial.println("Waiting...");
    delay(6000);
  
 
}
