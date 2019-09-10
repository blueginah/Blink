#include "Blink.h"

Blink blink(4);

void setup() {
  Serial.begin(115200);
  Serial.println("\nBlink Version 1.0 Jiyoung Hwang");
}

void loop() {
  blink.on(500);
  blink.off(300);
}
