// Written in 2016 by Kaito Udagawa
// Released under CC0 <http://creativecommons.org/publicdomain/zero/1.0/>

#include <stdint.h>
#include <stdio.h>

uint32_t xorshift128plus_32(uint32_t *state) {
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
