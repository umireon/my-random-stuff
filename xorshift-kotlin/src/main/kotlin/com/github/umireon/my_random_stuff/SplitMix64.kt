package com.github.umireon.my_random_stuff

class SplitMix64(
        var state: Long
) : AbstractRandom64 {

    override fun next(): Long {
        state -= 7046029254386353131
        var z = state
        z = (z xor (z ushr 30)) * -4658895280553007687
        z = (z xor (z ushr 27)) * -7723592293110705685
        return z xor (z ushr 31)
    }

}
