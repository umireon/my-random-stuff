import com.github.umireon.my_random_stuff.Xorshift1024Star
import org.junit.Test
import kotlin.test.assertEquals

class Xorshift1024StarTest {

    val rng = Xorshift1024Star(1)

    @Test fun testNext() {
        for (i in 0 until 9999) rng.next()
        assertEquals(-7937336934166611007, rng.next())
    }

    @Test fun testJump() {
        rng.jump()
        assertEquals(-8637250259367291272, rng.next())
    }

    @Test fun testSplit() {
        val newRng = rng.split()
        rng.jump()
        assertEquals(rng.next(), newRng.next())
    }

}
