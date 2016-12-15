// Written in 2016 by Kaito Udagawa
// Released under CC0 <http://creativecommons.org/publicdomain/zero/1.0/>

#include <stdint.h>
#include <stdio.h>

uint32_t xorshift128plus_32(uint32_t *xyzw) {
  uint32_t x, y, z, w, t;

  x = xyzw[0];
  y = xyzw[1];
  z = xyzw[2];
  w = xyzw[3];

  t = z + x;
  y ^= (y << 23) | (x >> 9);
  x ^= x << 23;

  xyzw[0] = z;
  xyzw[1] = w;
  xyzw[2] = x ^ z ^ ((x >> 18) | (y << 14)) ^ ((z >> 5) | (w << 27));
  xyzw[3] = y ^ w ^ (y >> 18) ^ (w >> 5);

  return t;
}

uint32_t splitmix32(uint32_t *x) {
  uint32_t z = (*x += 0x9e3779b9);
  z = (z ^ (z >> 16)) * 0x85ebca6b;
  z = (z ^ (z >> 13)) * 0xc2b2ae35;
  return z ^ (z >> 16);
}

int main(void) {
  uint32_t s[2][4];
  uint32_t seed[2] = {0, 1};
  for (int i = 0; i < 4; i++) {
    s[0][i] = splitmix32(&seed[0]);
    s[1][i] = splitmix32(&seed[1]);
  }

  for (int i = 0; i < 10; i++) {
    printf("%10u %10u\n", xorshift128plus_32(s[0]), xorshift128plus_32(s[1]));
  }
}
