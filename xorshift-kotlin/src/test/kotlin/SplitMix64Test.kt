import com.github.umireon.my_random_stuff.SplitMix64
import org.junit.Assert
import org.junit.Test

class SplitMix64Test {

    val rng = SplitMix64(1)

    @Test fun testNext() {
        for (i in 0 until 9999) rng.next()
        Assert.assertEquals(-4840989943453095765, rng.next())
    }

}
