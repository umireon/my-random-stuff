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

  return state[p] * 1419247029;
}

uint32_t xoroshiro128plus_32(uint32_t *xyzw) {
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

uint32_t fmix32(uint32_t h) {
  h ^= h >> 16;
  h *= 0x85ebca6b;
  h ^= h >> 13;
  h *= 0xc2b2ae35;
  h ^= h >> 16;

  return h;
}

int main(void) {
  uint32_t seed[2][4];
  seed[0][0] = fmix32(1);
  seed[1][0] = fmix32(2);

  for (int i = 1; i < 4; i++) {
    seed[0][i] = fmix32(seed[0][i - 1]);
    seed[1][i] = fmix32(seed[1][i - 1]);
  }

  uint32_t s[2][33];
  for (int i = 1; i < 32; i++) {
    s[0][i] = xoroshiro128plus_32(seed[0]);
    s[1][i] = xoroshiro128plus_32(seed[1]);
  }
  s[0][32] = s[1][32] = 0;

  for (int i = 0; i < 10; i++) {
    printf("%10u %10u\n", xorshift1024star_32(s[0]), xorshift1024star_32(s[1]));
  }
}
