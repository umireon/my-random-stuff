// Written in 2016 by Kaito Udagawa
// Released under CC0 <http://creativecommons.org/publicdomain/zero/1.0/>

#include <stdint.h>
#include <stdio.h>
#include <assert.h>

static inline uint64_t rotl(const uint64_t x, int k) {
	return (x << k) | (x >> (64 - k));
}

uint32_t xoroshiro128plus(uint64_t *s) {
  const uint64_t s0 = s[0];
	uint64_t s1 = s[1];
	const uint64_t result = s0 + s1;

	s1 ^= s0;
	s[0] = rotl(s0, 55) ^ s1 ^ (s1 << 14); // a, b
	s[1] = rotl(s1, 36); // c

	return result;
}

uint32_t xoroshiro128plus_32(uint32_t *s32) {
  const uint32_t s0l = s32[0];
  const uint32_t s0u = s32[1];

  uint32_t s1l = s32[2];
  uint32_t s1u = s32[3];

  const uint32_t result = s0l + s1l;

  s1l ^= s0l;
  s1u ^= s0u;

  // a, b
  s32[0] = ((s0u << 23) | (s0l >> 9)) ^ s1l ^ (s1l << 14);
  s32[1] = ((s0l << 23) | (s0u >> 9)) ^ s1u ^ ((s1u << 14) | (s1l >> 18));

  // c
  s32[2] = (s1u << 4) | (s1l >> 28);
  s32[3] = (s1l << 4) | (s1u >> 28);

  return result;
}

int main(void) {
  uint64_t s[] = {0xFFFFFFFFFFFFFFFFULL, 0xFFFFFFFFFFFFFFFFULL};
  uint32_t s32[] = {0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU};

  for (int i = 0; i < 1000000000; i++) {
    assert(xoroshiro128plus(s) == xoroshiro128plus_32(s32));
  }

  printf("test succeeded\n");
}
