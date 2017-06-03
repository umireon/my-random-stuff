if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'xorshift-kotlin-tests'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'xorshift-kotlin-tests'.");
}
if (typeof this['xorshift-kotlin'] === 'undefined') {
  throw new Error("Error loading module 'xorshift-kotlin-tests'. Its dependency 'xorshift-kotlin' was not found. Please, check whether 'xorshift-kotlin' is loaded prior to 'xorshift-kotlin-tests'.");
}
if (typeof this['kotlin-test-js'] === 'undefined') {
  throw new Error("Error loading module 'xorshift-kotlin-tests'. Its dependency 'kotlin-test-js' was not found. Please, check whether 'kotlin-test-js' is loaded prior to 'xorshift-kotlin-tests'.");
}
this['xorshift-kotlin-tests'] = function (_, Kotlin, $module$xorshift_kotlin, $module$kotlin_test_js) {
  'use strict';
  var AbstractRandom64 = $module$xorshift_kotlin.com.github.umireon.my_random_stuff.AbstractRandom64;
  var nextBoolean = $module$xorshift_kotlin.com.github.umireon.my_random_stuff.nextBoolean_jf8mn4$;
  var assertEquals = $module$kotlin_test_js.kotlin.test.assertEquals_3m0tl5$;
  var nextBytes = $module$xorshift_kotlin.com.github.umireon.my_random_stuff.nextBytes_eg1buk$;
  var nextDouble = $module$xorshift_kotlin.com.github.umireon.my_random_stuff.nextDouble_jf8mn4$;
  var nextFloat = $module$xorshift_kotlin.com.github.umireon.my_random_stuff.nextFloat_jf8mn4$;
  var nextInt = $module$xorshift_kotlin.com.github.umireon.my_random_stuff.nextInt_jf8mn4$;
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var SplitMix64 = $module$xorshift_kotlin.com.github.umireon.my_random_stuff.SplitMix64;
  var Xoroshiro128Plus_init = $module$xorshift_kotlin.com.github.umireon.my_random_stuff.Xoroshiro128Plus_init_s8cxhz$;
  var Xorshift1024Star_init = $module$xorshift_kotlin.com.github.umireon.my_random_stuff.Xorshift1024Star_init_s8cxhz$;
  var Xorshift128Plus_init = $module$xorshift_kotlin.com.github.umireon.my_random_stuff.Xorshift128Plus_init_s8cxhz$;
  function zeros$ObjectLiteral() {
  }
  zeros$ObjectLiteral.prototype.next = function () {
    return Kotlin.Long.ZERO;
  };
  zeros$ObjectLiteral.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    interfaces: [AbstractRandom64]
  };
  var zeros;
  function ones$ObjectLiteral() {
  }
  ones$ObjectLiteral.prototype.next = function () {
    return Kotlin.Long.NEG_ONE;
  };
  ones$ObjectLiteral.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    interfaces: [AbstractRandom64]
  };
  var ones;
  function randoms$ObjectLiteral() {
  }
  randoms$ObjectLiteral.prototype.next = function () {
    return new Kotlin.Long(-1294847838, 287445236);
  };
  randoms$ObjectLiteral.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    interfaces: [AbstractRandom64]
  };
  var randoms;
  function AbstractRandomTest() {
  }
  AbstractRandomTest.prototype.testNextBoolean = function () {
    assertEquals(false, nextBoolean(zeros));
    assertEquals(true, nextBoolean(ones));
  };
  AbstractRandomTest.prototype.testNextBytes = function () {
    var buf = Kotlin.newArray(9, 0);
    nextBytes(randoms, buf);
    assertEquals(-94, buf[0]);
    assertEquals(-94, buf[8]);
  };
  AbstractRandomTest.prototype.testNextDouble = function () {
    assertEquals(0.0, nextDouble(zeros));
    assertEquals(1.0 - 1.0 / 9.007199254740992E15, nextDouble(ones));
  };
  AbstractRandomTest.prototype.testNextFloat = function () {
    assertEquals(0.0, nextFloat(zeros));
    assertEquals(1.0 - 1.0 / 1.6777216E7, nextFloat(ones));
  };
  AbstractRandomTest.prototype.testNextInt = function () {
    assertEquals(287445236, nextInt(randoms));
  };
  AbstractRandomTest.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'AbstractRandomTest',
    interfaces: []
  };
  function SplitMix64Test() {
    this.rng = new SplitMix64(Kotlin.Long.ONE);
  }
  SplitMix64Test.prototype.testNext = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    tmp$ = until(0, 9999);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var i = tmp$_0; i <= tmp$_1; i += tmp$_2)
      this.rng.next();
    assertEquals(new Kotlin.Long(-1958909781, -1127130805), this.rng.next());
  };
  SplitMix64Test.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'SplitMix64Test',
    interfaces: []
  };
  function Xoroshiro128PlusTest() {
    this.rng = Xoroshiro128Plus_init(Kotlin.Long.ONE);
  }
  Xoroshiro128PlusTest.prototype.testNext = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    tmp$ = until(0, 9999);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var i = tmp$_0; i <= tmp$_1; i += tmp$_2)
      this.rng.next();
    assertEquals(new Kotlin.Long(-1306342669, -1468622634), this.rng.next());
  };
  Xoroshiro128PlusTest.prototype.testJump = function () {
    this.rng.jump();
    assertEquals(new Kotlin.Long(-1509620833, -521296679), this.rng.next());
  };
  Xoroshiro128PlusTest.prototype.testSplit = function () {
    var newRng = this.rng.split();
    this.rng.jump();
    assertEquals(this.rng.next(), newRng.next());
  };
  Xoroshiro128PlusTest.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Xoroshiro128PlusTest',
    interfaces: []
  };
  function Xorshift1024StarTest() {
    this.rng = Xorshift1024Star_init(Kotlin.Long.ONE);
  }
  Xorshift1024StarTest.prototype.testNext = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    tmp$ = until(0, 9999);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var i = tmp$_0; i <= tmp$_1; i += tmp$_2)
      this.rng.next();
    assertEquals(new Kotlin.Long(-1201062975, -1848055268), this.rng.next());
  };
  Xorshift1024StarTest.prototype.testJump = function () {
    this.rng.jump();
    assertEquals(new Kotlin.Long(-1237117320, -2011016538), this.rng.next());
  };
  Xorshift1024StarTest.prototype.testSplit = function () {
    var newRng = this.rng.split();
    this.rng.jump();
    assertEquals(this.rng.next(), newRng.next());
  };
  Xorshift1024StarTest.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Xorshift1024StarTest',
    interfaces: []
  };
  function Xorshift128PlusTest() {
    this.rng = Xorshift128Plus_init(Kotlin.Long.ONE);
  }
  Xorshift128PlusTest.prototype.testNext = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    tmp$ = until(0, 9999);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var i = tmp$_0; i <= tmp$_1; i += tmp$_2)
      this.rng.next();
    assertEquals(new Kotlin.Long(-1600680312, -1243744001), this.rng.next());
  };
  Xorshift128PlusTest.prototype.testJump = function () {
    this.rng.jump();
    assertEquals(new Kotlin.Long(-535420252, 465172657), this.rng.next());
  };
  Xorshift128PlusTest.prototype.testSplit = function () {
    var newRng = this.rng.split();
    this.rng.jump();
    assertEquals(this.rng.next(), newRng.next());
  };
  Xorshift128PlusTest.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Xorshift128PlusTest',
    interfaces: []
  };
  _.AbstractRandomTest = AbstractRandomTest;
  _.SplitMix64Test = SplitMix64Test;
  _.Xoroshiro128PlusTest = Xoroshiro128PlusTest;
  _.Xorshift1024StarTest = Xorshift1024StarTest;
  _.Xorshift128PlusTest = Xorshift128PlusTest;
  zeros = new zeros$ObjectLiteral();
  ones = new ones$ObjectLiteral();
  randoms = new randoms$ObjectLiteral();
  Kotlin.defineModule('xorshift-kotlin-tests', _);
  QUnit.test('AbstractRandomTest.testNextBoolean', function () {
    (new AbstractRandomTest()).testNextBoolean();
  });
  QUnit.test('AbstractRandomTest.testNextBytes', function () {
    (new AbstractRandomTest()).testNextBytes();
  });
  QUnit.test('AbstractRandomTest.testNextDouble', function () {
    (new AbstractRandomTest()).testNextDouble();
  });
  QUnit.test('AbstractRandomTest.testNextFloat', function () {
    (new AbstractRandomTest()).testNextFloat();
  });
  QUnit.test('AbstractRandomTest.testNextInt', function () {
    (new AbstractRandomTest()).testNextInt();
  });
  QUnit.test('SplitMix64Test.testNext', function () {
    (new SplitMix64Test()).testNext();
  });
  QUnit.test('Xoroshiro128PlusTest.testNext', function () {
    (new Xoroshiro128PlusTest()).testNext();
  });
  QUnit.test('Xoroshiro128PlusTest.testJump', function () {
    (new Xoroshiro128PlusTest()).testJump();
  });
  QUnit.test('Xoroshiro128PlusTest.testSplit', function () {
    (new Xoroshiro128PlusTest()).testSplit();
  });
  QUnit.test('Xorshift1024StarTest.testNext', function () {
    (new Xorshift1024StarTest()).testNext();
  });
  QUnit.test('Xorshift1024StarTest.testJump', function () {
    (new Xorshift1024StarTest()).testJump();
  });
  QUnit.test('Xorshift1024StarTest.testSplit', function () {
    (new Xorshift1024StarTest()).testSplit();
  });
  QUnit.test('Xorshift128PlusTest.testNext', function () {
    (new Xorshift128PlusTest()).testNext();
  });
  QUnit.test('Xorshift128PlusTest.testJump', function () {
    (new Xorshift128PlusTest()).testJump();
  });
  QUnit.test('Xorshift128PlusTest.testSplit', function () {
    (new Xorshift128PlusTest()).testSplit();
  });
  return _;
}(typeof this['xorshift-kotlin-tests'] === 'undefined' ? {} : this['xorshift-kotlin-tests'], kotlin, this['xorshift-kotlin'], this['kotlin-test-js']);
