#include "Blink.h"

Blink::Blink(int ledPin)
{
  pin_ = ledPin;
  pinMode(0, OUTPUT);
  pinMode(pin_, OUTPUT);
}

void Blink::on(int on_time)
{
  delay(on_time);
  digitalWrite(pin_, HIGH);
  Serial.println("High");
}

void Blink::off(int off_time)
{
  delay(off_time);
  digitalWrite(pin_, LOW);
  Serial.println("Low");
}
