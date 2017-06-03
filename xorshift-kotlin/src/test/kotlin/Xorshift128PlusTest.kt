import com.github.umireon.my_random_stuff.Xoroshiro128Plus
import com.github.umireon.my_random_stuff.Xorshift128Plus
import org.junit.Assert
import org.junit.Test

class Xorshift128PlusTest {

    val rng = Xorshift128Plus(1)

    @Test fun testNext() {
        for (i in 0 until 9999) rng.next()
        Assert.assertEquals(-5341839806196904312, rng.next())
    }

    @Test fun testJump() {
        rng.jump()
        Assert.assertEquals(1997901352567972516, rng.next())
    }

    @Test fun testSplit() {
        val newRng = rng.split()
        rng.jump()
        Assert.assertEquals(rng.next(), newRng.next())
    }

}
