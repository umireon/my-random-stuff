// Written in 2016 by Kaito Udagawa
// Released under CC0 <http://creativecommons.org/publicdomain/zero/1.0/>

#include <stdint.h>
#include <stdio.h>

uint32_t xor128(uint32_t *s) { 
  uint32_t t = s[0] ^ (s[0] << 11);
  s[0] = s[1]; s[1] = s[2]; s[2] = s[3];
  return s[3] = (s[3] ^ (s[3] >> 19)) ^ (t ^ (t >> 8)); 
}

int main(void) {
  uint32_t s1[] = {1, 0, 0, 0};

  for (int i = 0; i < 10; i++) {
    uint32_t v = xor128(s1);
    for (int i = 31; i >= 0; i--) {
      printf("%u", (v >> i) & 1);
    }
    printf("\n");
  }
}
