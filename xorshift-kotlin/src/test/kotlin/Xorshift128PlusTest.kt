import com.github.umireon.my_random_stuff.Xorshift128Plus
import org.junit.Test
import kotlin.test.assertEquals

class Xorshift128PlusTest {

    val rng = Xorshift128Plus(1)

    @Test fun testNext() {
        for (i in 0 until 9999) rng.next()
        assertEquals(-5341839806196904312, rng.next())
    }

    @Test fun testJump() {
        rng.jump()
        assertEquals(1997901352567972516, rng.next())
    }

    @Test fun testSplit() {
        val newRng = rng.split()
        rng.jump()
        assertEquals(rng.next(), newRng.next())
    }

}
