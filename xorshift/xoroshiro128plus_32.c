// Written in 2016 by Kaito Udagawa
// Released under CC0 <http://creativecommons.org/publicdomain/zero/1.0/>

#include <stdint.h>
#include <stdio.h>

uint32_t xorshift128plus_32(uint32_t *state) {
  uint32_t x, y, z, w, t;

  x = state[0];
  y = state[1];
  z = state[2];
  w = state[3];

  t = y + w + (z != 0 && x >= -z ? 1 : 0);
  z ^= x;
  w ^= y;

  state[0] = ((y << 23) | (x >> 9)) ^ z ^ (z << 14);
  state[1] = ((x << 23) | (y >> 9)) ^ w ^ ((w << 14) | (z >> 18));
  state[2] = (w << 4) | (z >> 28);
  state[3] = (z << 4) | (w >> 28);

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
