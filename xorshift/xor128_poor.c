// Written in 2016 by Kaito Udagawa
// Released under CC0 <http://creativecommons.org/publicdomain/zero/1.0/>

#include <stdint.h>
#include <stdio.h>

uint32_t xor128(uint32_t *s) { 
  uint32_t x = s[0] ^ (s[0] << 11);
  s[0] = s[1]; s[1] = s[2]; s[2] = s[3];
  return s[3] = (s[3] ^ (s[3] >> 19)) ^ (x ^ (x >> 8)); 
}

int main(void) {
  uint32_t s[2][4] = {
    {1, 362436069, 521288629, 88675123},
    {2, 362436069, 521288629, 88675123}
  };

  for (int i = 0; i < 10; i++) {
    printf("%10u %10u\n", xor128(s[0]), xor128(s[1]));
  }
}
