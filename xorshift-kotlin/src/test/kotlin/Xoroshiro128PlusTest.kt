import com.github.umireon.my_random_stuff.Xoroshiro128Plus
import org.junit.Assert
import org.junit.Test

class Xoroshiro128PlusTest {

    val rng = Xoroshiro128Plus(1)

    @Test fun testNext() {
        for (i in 0 until 9999) rng.next()
        Assert.assertEquals(-6307686180206753037, rng.next())
    }

    @Test fun testJump() {
        rng.jump()
        Assert.assertEquals(-2238952185033063521, rng.next())
    }

    @Test fun testSplit() {
        val newRng = rng.split()
        rng.jump()
        Assert.assertEquals(rng.next(), newRng.next())
    }

}
