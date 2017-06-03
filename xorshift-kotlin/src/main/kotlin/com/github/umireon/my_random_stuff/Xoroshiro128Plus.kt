package com.github.umireon.my_random_stuff

private fun rotl(x: Long, k: Int): Long {
    return (x shl k) or (x ushr (64 - k))
}

private val JUMP = longArrayOf(-4707382666127344949, -2852180941702784734)

class Xoroshiro128Plus private constructor(
        var state: LongArray
) : AbstractRandom64 {

    constructor(seed: Long) : this(LongArray(2).apply {
        val seq = SplitMix64(seed)
        this[0] = seq.next()
        this[1] = seq.next()
    })

    override fun next(): Long {
        val s0 = state[0]
        var s1 = state[1]
        val result = s0 + s1

        s1 = s1 xor s0
        state[0] = rotl(s0, 55) xor s1 xor (s1 shl 14)
        state[1] = rotl(s1, 36)

        return result
    }

    fun jump() {
        var s0 = 0L
        var s1 = 0L

        for (jump in JUMP) {
            for (b in 0 until 64) {
                if (jump and (1L shl b) != 0L) {
                    s0 = s0 xor state[0]
                    s1 = s1 xor state[1]
                }
                next()
            }
        }

        state[0] = s0
        state[1] = s1
    }

    fun split(): Xoroshiro128Plus {
        val newRandom = Xoroshiro128Plus(longArrayOf(*state))
        newRandom.jump()
        return newRandom
    }

}
