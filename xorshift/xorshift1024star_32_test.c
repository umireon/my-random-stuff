// Written in 2016 by Kaito Udagawa
// Released under CC0 <http://creativecommons.org/publicdomain/zero/1.0/>

#include <stdint.h>
#include <stdio.h>
#include <assert.h>

uint32_t xorshift1024star(uint64_t *s, int *p) {
  const uint64_t s0 = s[*p];
	uint64_t s1 = s[*p = (*p + 1) & 15];
	s1 ^= s1 << 31; // a
	s[*p] = s1 ^ s0 ^ (s1 >> 11) ^ (s0 >> 30); // b,c
	return (s[*p] * UINT64_C(1181783497276652981)) >> 16;
}

uint32_t xorshift1024star_32(uint32_t *s32) {
  int p = s32[32];

  const uint32_t s0l = s32[p];
  const uint32_t s0u = s32[p + 1];

  p = s32[32] = (p + 2) & 31;
  uint32_t s1l = s32[p];
  uint32_t s1u = s32[p + 1];

  // a
  s1u ^= (s1u << 31) | (s1l >> 1);
  s1l ^= s1l << 31;

  // b, c
  s32[p] = s1l ^ s0l ^ ((s1l >> 11) | (s1u << 21)) ^ ((s0l >> 30) | (s0u << 2));
  s32[p + 1] = s1u ^ s0u ^ (s1u >> 11) ^ (s0u >> 30);

  uint32_t lo = s32[p] & 0xFFFF;
  return (lo * 64949 >> 16) + lo * 2312393879 + (s32[p] >> 16) * 1419247029 + s32[p + 1] * 4256497664;
}

int main(void) {
  uint64_t s[16] = {
    0xFFFFFFFFFFFFFFFFULL, 0xFFFFFFFFFFFFFFFFULL,
    0xFFFFFFFFFFFFFFFFULL, 0xFFFFFFFFFFFFFFFFULL,
    0xFFFFFFFFFFFFFFFFULL, 0xFFFFFFFFFFFFFFFFULL,
    0xFFFFFFFFFFFFFFFFULL, 0xFFFFFFFFFFFFFFFFULL,
    0xFFFFFFFFFFFFFFFFULL, 0xFFFFFFFFFFFFFFFFULL,
    0xFFFFFFFFFFFFFFFFULL, 0xFFFFFFFFFFFFFFFFULL,
    0xFFFFFFFFFFFFFFFFULL, 0xFFFFFFFFFFFFFFFFULL,
    0xFFFFFFFFFFFFFFFFULL, 0xFFFFFFFFFFFFFFFFULL
  };
  int p = 0;

  uint32_t s32[33] = {
    0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU,
    0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU,
    0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU,
    0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU,
    0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU,
    0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU,
    0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU,
    0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU, 0xFFFFFFFFU,
    0
  };

  for (int i = 0; i < 1000000000; i++) {
    assert(xorshift1024star(s, &p) == xorshift1024star_32(s32));
  }

  printf("test succeeded\n");
}
