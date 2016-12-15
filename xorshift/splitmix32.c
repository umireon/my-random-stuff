// Written in 2016 by Kaito Udagawa
// Released under CC0 <http://creativecommons.org/publicdomain/zero/1.0/>

#include <stdint.h>
#include <stdio.h>

// MurmurHash3 fmix32 with adding GOLDEN_GAMMA [1]
// [1]: Guy L. Steele, Jr., Doug Lea, and Christine H. Flood. 2014. Fast splittable pseudorandom number generators. In Proceedings of the 2014 ACM International Conference on Object Oriented Programming Systems Languages & Applications (OOPSLA '14). ACM, New York, NY, USA, 453-472.
uint32_t splitmix32(uint32_t *x) {
  uint32_t z = (*x += 0x9e3779b9);
  z = (z ^ (z >> 16)) * 0x85ebca6b;
  z = (z ^ (z >> 13)) * 0xc2b2ae35;
  return z ^ (z >> 16);
}

int main(void) {
  uint32_t x[2];
  x[0] = 1;
  x[1] = 2;

  for (int i = 0; i < 10; i++) {
    printf("%10u %10u\n", splitmix32(&x[0]), splitmix32(&x[1]));
  }
}
