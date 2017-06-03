import com.github.umireon.my_random_stuff.*
import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertEquals
import org.junit.Test

private val zeros = object : AbstractRandom64 {
    override fun next(): Long = 0
}

private val ones = object : AbstractRandom64 {
    override fun next(): Long = -1
}

private val randoms = object : AbstractRandom64 {
    override fun next(): Long = 1234567891011121314
}

class AbstractRandomTest {

    @Test fun testNextBoolean() {
        assertEquals(false, zeros.nextBoolean())
        assertEquals(true, ones.nextBoolean())
    }

    @Test fun testNextBytes() {
        val buf = ByteArray(9)
        randoms.nextBytes(buf)
        assertArrayEquals(byteArrayOf(-94, 48, -46, -78, -12, 16, 34, 17, -94), buf)
    }

    @Test fun testNextDouble() {
        assertEquals(0.0, zeros.nextDouble(), 0.0)
        assertEquals(1.0 - 1.0 / 9007199254740992.0, ones.nextDouble(), 0.0)
    }

    @Test fun testNextFloat() {
        assertEquals(0.0f, zeros.nextFloat(), 0.0f)
        assertEquals(1.0f - 1.0f / 16777216.0f, ones.nextFloat(), 0.0f)
    }

    @Test fun testNextInt() {
        assertEquals(287445236, randoms.nextInt())
    }

}