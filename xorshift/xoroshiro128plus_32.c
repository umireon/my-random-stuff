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

  t = x + z;
  z ^= x;
  w ^= y;

  xyzw[0] = ((y << 23) | (x >> 9)) ^ z ^ (z << 14);
  xyzw[1] = ((x << 23) | (y >> 9)) ^ w ^ ((w << 14) | (z >> 18));
  xyzw[2] = (w << 4) | (z >> 28);
  xyzw[3] = (z << 4) | (w >> 28);

  return t;
}

uint32_t fmix32 ( uint32_t h ) {
  h ^= h >> 16;
  h *= 0x85ebca6b;
  h ^= h >> 13;
  h *= 0xc2b2ae35;
  h ^= h >> 16;

  return h;
}

int main(void) {
  uint32_t s[2][4];
  s[0][0] = fmix32(1);
  s[1][0] = fmix32(2);

  for (int i = 1; i < 4; i++) {
    s[0][i] = fmix32(s[0][i - 1]);
    s[1][i] = fmix32(s[1][i - 1]);
  }

  for (int i = 0; i < 10; i++) {
    printf("%10u %10u\n", xorshift128plus_32(s[0]), xorshift128plus_32(s[1]));
  }
}
