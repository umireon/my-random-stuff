import com.github.umireon.my_random_stuff.*
import org.junit.Test
import kotlin.test.assertEquals

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
        assertEquals(-94, buf[0])
        assertEquals(-94, buf[8])
    }

    @Test fun testNextDouble() {
        assertEquals(0.0, zeros.nextDouble())
        assertEquals(1.0 - 1.0 / 9007199254740992.0, ones.nextDouble())
    }

    @Test fun testNextFloat() {
        assertEquals(0.0f, zeros.nextFloat())
        assertEquals(1.0f - 1.0f / 16777216.0f, ones.nextFloat())
    }

    @Test fun testNextInt() {
        assertEquals(287445236, randoms.nextInt())
    }

}