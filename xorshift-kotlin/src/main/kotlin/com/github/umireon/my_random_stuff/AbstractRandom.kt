package com.github.umireon.my_random_stuff

interface AbstractRandom64 {
    fun next(): Long
}

fun AbstractRandom64.nextBoolean(): Boolean = next() < 0

fun AbstractRandom64.nextBytes(bytes: ByteArray) {
    val block = bytes.size / 8
    for (i in 0 until block) {
        var r = next()
        for (j in 0 until 8) {
            bytes[i * 8 + j] = r.toByte()
            r = r ushr 8
        }
    }

    val tail = bytes.size - block * 8
    if (tail > 0) {
        var r = next()
        for (j in 0 until tail) {
            bytes[block * 8 + j] = r.toByte()
            r = r ushr 8
        }
    }
}

fun AbstractRandom64.nextDouble(): Double = (next() ushr 11) * 1.1102230246251565e-16

fun AbstractRandom64.nextFloat(): Float = (next() ushr 40) * 5.960464477539063e-08f

fun AbstractRandom64.nextInt(): Int = (next() ushr 32).toInt()
