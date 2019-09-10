#include "Arduino.h"

class Blink
{
  public:
    Blink(int ledPin);
    void on(int on_time);
    void off(int off_time);
  private:
    int pin_;
};
