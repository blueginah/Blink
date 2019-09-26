/*
 *  This sketch sends data via HTTP GET requests to data.sparkfun.com service.
 *
 *  You need to get streamId and privateKey at data.sparkfun.com and paste them
 *  below. Or just customize this script to talk to other HTTP servers.
 *
 */
#include <WiFi.h>
#include "ThingSpeak.h"

const char* ssid     = "지영 iPhone";
const char* password = "10161016!!";

const char* host = "www.kma.go.kr";

const char* thingspeak = "api.thingspeak.com";
const char* writeAPIkey = "Y3BBLR7LLW312MCO";
const int httpPort = 80;
unsigned long channelNumber = 871918;

String tmp_str;
String temp;
int i = 0;

// Use WiFiClient class to create TCP connections
WiFiClient client;

void setup()
{
    Serial.begin(115200);
    delay(10);

    // We start by connecting to a WiFi network

    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    ThingSpeak.begin(client);
}

int value = 0;

void loop()
{
    delay(5000);
    ++value;

    Serial.print("connecting to ");
    Serial.println(host);

    const int httpPort = 80;
    if (!client.connect(host, httpPort)) {
        Serial.println("connection failed");
        return;
    }

    // We now create a URI for the request
    String url = "/wid/queryDFSRSS.jsp?zone=1144063000";

    Serial.print("Requesting URL: ");
    Serial.println(url);

    // This will send the request to the server
    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" +
                 "Connection: close\r\n\r\n");
    unsigned long timeout = millis();
    while (client.available() == 0) {
        if (millis() - timeout > 5000) {
            Serial.println(">>> Client Timeout !");
            client.stop();
            return;
        }
    }

    // Read all the lines of the reply from server and print them to Serial
    while(client.available()) {
      //Serial.println("I am temperature!!\n\n");
      String line = client.readStringUntil('\n');
      tmp_str="<temp>";
      i = line.indexOf("</temp>");
      Serial.println(i);

      if(i > 0){
        temp = line.substring(line.indexOf(tmp_str)+tmp_str.length(), i);
        Serial.println(temp);
        ThingSpeak.setField(1, temp);
        ThingSpeak.writeFields(channelNumber, writeAPIkey);
      }//print temperature received from broadcast

      delay(1000);
    }

    Serial.println();
    Serial.println("closing connection");
}
