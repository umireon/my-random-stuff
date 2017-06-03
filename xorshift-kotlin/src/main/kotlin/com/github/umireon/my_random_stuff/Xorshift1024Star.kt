package com.github.umireon.my_random_stuff

private val JUMP = longArrayOf(-8924956236279331811,
        -6645523562763818923, 6572057659653707831, 4938671967096216094,
        3458459993260519232, -2581239258607468510, 3916182429352585840,
        -6142490363719071048, -4266174017505289453, 6839126324828817723,
        7572038374137779520, 8723688107328792229, 819591658532496040,
        324108011427370141, -5075132425047734838, 2902007988922235075
)

class Xorshift1024Star private constructor(
        val state: LongArray,
        var position: Int = 0
) : AbstractRandom64 {

    constructor(seed: Long) : this(
            LongArray(16).apply {
                val seq = SplitMix64(seed)
                for (i in indices) this[i] = seq.next()
            }
    )

    override fun next(): Long {
        val s0: Long = state[position]
        position = (position + 1) and 15
        var s1 = state[position]

        s1 = s1 xor (s1 shl 31)
        state[position] = s1 xor s0 xor (s1 ushr 11) xor (s0 ushr 30)

        return state[position] * 1181783497276652981
    }

    fun jump() {
        val t = LongArray(16)

        for (jump in JUMP) {
            for (b in 0 until 64) {
                if (jump and (1L shl b) != 0L) {
                    for (j in 0 until t.size) {
                        t[j] = t[j] xor state[(j + position) and 15]
                    }
                }
                next()
            }
        }

        for (j in 0 until t.size) {
            state[(j + position) and 15] = t[j]
        }
    }

    fun split(): Xorshift1024Star {
        val newRandom = Xorshift1024Star(state.clone(), position)
        newRandom.jump()
        return newRandom
    }

}
