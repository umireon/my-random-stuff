import com.github.umireon.my_random_stuff.Xorshift1024Star
import org.junit.Assert
import org.junit.Test

class Xorshift1024StarTest {

    val rng = Xorshift1024Star(1)

    @Test fun testNext() {
        for (i in 0 until 9999) rng.next()
        Assert.assertEquals(-7937336934166611007, rng.next())
    }

    @Test fun testJump() {
        rng.jump()
        Assert.assertEquals(-8637250259367291272, rng.next())
    }

    @Test fun testSplit() {
        val newRng = rng.split()
        rng.jump()
        Assert.assertEquals(rng.next(), newRng.next())
    }

}
