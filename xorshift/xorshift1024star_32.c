// Written in 2016 by Kaito Udagawa
// Released under CC0 <http://creativecommons.org/publicdomain/zero/1.0/>

#include <stdint.h>
#include <stdio.h>

uint32_t xorshift1024star_32(uint32_t *state) {
  int p;
  uint32_t x, y, z, w;

  p = state[32];
  x = state[p];
  y = state[p + 1];

  p = state[32] = (p + 2) & 31;
  z = state[p];
  w = state[p + 1];

  w ^= (w << 31) | (z >> 1);
  z ^= z << 31;

  state[p] = z ^ x ^ ((z >> 11) | (w << 21)) ^ ((x >> 30) | (y << 2));
  state[p + 1] = w ^ y ^ (w >> 11) ^ (y >> 30);

  x = state[p] & 0xFFFF;
  return (x * 64949 >> 16) + x * 2312393879 + (state[p] >> 16) * 1419247029 + state[p + 1] * 4256497664;
}

uint32_t splitmix32(uint32_t *x) {
  uint32_t z = (*x += 0x9e3779b9);
  z = (z ^ (z >> 16)) * 0x85ebca6b;
  z = (z ^ (z >> 13)) * 0xc2b2ae35;
  return z ^ (z >> 16);
}

int main(void) {
  uint32_t s[2][33];
  uint32_t seed[2] = {0, 1};
  for (int i = 0; i < 32; i++) {
    s[0][i] = splitmix32(&seed[0]);
    s[1][i] = splitmix32(&seed[1]);
  }
  s[0][32] = s[1][32] = 0;

  for (int i = 0; i < 10; i++) {
    printf("%10u %10u\n", xorshift1024star_32(s[0]), xorshift1024star_32(s[1]));
  }
}
