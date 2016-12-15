// Written in 2016 by Kaito Udagawa
// Released under CC0 <http://creativecommons.org/publicdomain/zero/1.0/>

#include <stdint.h>
#include <stdio.h>
#include <assert.h>

uint32_t xorshift128plus(uint64_t *s) {
  uint64_t s1 = s[0];
  const uint64_t s0 = s[1];
  const uint64_t result = s0 + s1;
  s[0] = s0;
  s1 ^= s1 << 23; // a
  s[1] = s1 ^ s0 ^ (s1 >> 18) ^ (s0 >> 5); // b, c
  return result >> 32;
}

uint32_t xorshift128plus_32(uint32_t *s32) {
  uint32_t s1l = s32[0];
  uint32_t s1u = s32[1];

  const uint32_t s0l = s32[2];
  const uint32_t s0u = s32[3];

  const uint32_t result = s0u + s1u + (s1l != 0 && s0l >= -s1l ? 1 : 0);

  s32[0] = s0l;
  s32[1] = s0u;

  // a
  s1u ^= (s1u << 23) | (s1l >> 9);
  s1l ^= s1l << 23;

  // b, c
  s32[2] = s1l ^ s0l ^ ((s1l >> 18) | (s1u << 14)) ^ ((s0l >> 5) | (s0u << 27));
  s32[3] = s1u ^ s0u ^ (s1u >> 18) ^ (s0u >> 5);

  return result;
}

int main(void) {
  uint64_t s[] = {0xFFFFFFFFFFFFFFFFULL, 0xFFFFFFFFFFFFFFFFULL};
  uint32_t s32[] = {0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU};

  for (int i = 0; i < 1000000000; i++) {
    assert(xorshift128plus(s) == xorshift128plus_32(s32));
  }

  printf("test succeeded\n");
}
