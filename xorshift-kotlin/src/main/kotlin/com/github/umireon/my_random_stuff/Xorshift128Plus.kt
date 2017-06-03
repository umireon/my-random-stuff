package com.github.umireon.my_random_stuff

private val JUMP = longArrayOf(-8476663413540573697, 1305993406145048470)

class Xorshift128Plus private constructor(
        val state: LongArray
) : AbstractRandom64 {

    constructor(seed: Long) : this(LongArray(2).apply {
        val seq = SplitMix64(seed)
        this[0] = seq.next()
        this[1] = seq.next()
    })

    override fun next(): Long {
        var s1 = state[0]
        val s0 = state[1]
        val result = s0 + s1

        state[0] = s0
        s1 = s1 xor (s1 shl 23)
        state[1] = s1 xor s0 xor (s1 ushr 18) xor (s0 ushr 5)

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

        state[0] = s0;
        state[1] = s1;
    }

    fun split(): Xorshift128Plus {
        val newRandom = Xorshift128Plus(longArrayOf(*state))
        newRandom.jump()
        return newRandom
    }

}
