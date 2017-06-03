if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'xorshift-kotlin'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'xorshift-kotlin'.");
}
this['xorshift-kotlin'] = function (_, Kotlin) {
  'use strict';
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var get_indices = Kotlin.kotlin.collections.get_indices_se6h4x$;
  function AbstractRandom64() {
  }
  AbstractRandom64.$metadata$ = {
    kind: Kotlin.Kind.INTERFACE,
    simpleName: 'AbstractRandom64',
    interfaces: []
  };
  function nextBoolean($receiver) {
    return $receiver.next().compareTo_11rb$(Kotlin.Long.fromInt(0)) < 0;
  }
  function nextBytes($receiver, bytes) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8, tmp$_9, tmp$_10;
    var block = bytes.length / 8 | 0;
    tmp$ = until(0, block);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var i = tmp$_0; i <= tmp$_1; i += tmp$_2) {
      var r = $receiver.next();
      tmp$_3 = until(0, 8);
      tmp$_4 = tmp$_3.first;
      tmp$_5 = tmp$_3.last;
      tmp$_6 = tmp$_3.step;
      for (var j = tmp$_4; j <= tmp$_5; j += tmp$_6) {
        bytes[(i * 8 | 0) + j | 0] = Kotlin.toByte(r.toInt());
        r = r.shiftRightUnsigned(8);
      }
    }
    var tail = bytes.length - (block * 8 | 0) | 0;
    if (tail > 0) {
      var r_0 = $receiver.next();
      tmp$_7 = until(0, tail);
      tmp$_8 = tmp$_7.first;
      tmp$_9 = tmp$_7.last;
      tmp$_10 = tmp$_7.step;
      for (var j_0 = tmp$_8; j_0 <= tmp$_9; j_0 += tmp$_10) {
        bytes[(block * 8 | 0) + j_0 | 0] = Kotlin.toByte(r_0.toInt());
        r_0 = r_0.shiftRightUnsigned(8);
      }
    }
  }
  function nextDouble($receiver) {
    return $receiver.next().shiftRightUnsigned(11).toNumber() * 1.1102230246251565E-16;
  }
  function nextFloat($receiver) {
    return $receiver.next().shiftRightUnsigned(40).toNumber() * 5.9604645E-8;
  }
  function nextInt($receiver) {
    return $receiver.next().shiftRightUnsigned(32).toInt();
  }
  function SplitMix64(state) {
    this.state = state;
  }
  SplitMix64.prototype.next = function () {
    this.state = this.state.subtract(new Kotlin.Long(-2135587861, 1640531526));
    var z = this.state;
    z = z.xor(z.shiftRightUnsigned(30)).multiply(new Kotlin.Long(484763065, -1084733587));
    z = z.xor(z.shiftRightUnsigned(27)).multiply(new Kotlin.Long(321982955, -1798288965));
    return z.xor(z.shiftRightUnsigned(31));
  };
  SplitMix64.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'SplitMix64',
    interfaces: [AbstractRandom64]
  };
  function rotl(x, k) {
    return x.shiftLeft(k).or(x.shiftRightUnsigned(64 - k | 0));
  }
  var JUMP;
  function Xoroshiro128Plus(state) {
    this.state = state;
  }
  Xoroshiro128Plus.prototype.next = function () {
    var s0 = this.state[0];
    var s1 = this.state[1];
    var result = s0.add(s1);
    s1 = s1.xor(s0);
    this.state[0] = rotl(s0, 55).xor(s1).xor(s1.shiftLeft(14));
    this.state[1] = rotl(s1, 36);
    return result;
  };
  Xoroshiro128Plus.prototype.jump = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    var s0 = Kotlin.Long.ZERO;
    var s1 = Kotlin.Long.ZERO;
    tmp$ = JUMP;
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var jump = tmp$[tmp$_0];
      tmp$_1 = until(0, 64);
      tmp$_2 = tmp$_1.first;
      tmp$_3 = tmp$_1.last;
      tmp$_4 = tmp$_1.step;
      for (var b = tmp$_2; b <= tmp$_3; b += tmp$_4) {
        if (!Kotlin.equals(jump.and(Kotlin.Long.ONE.shiftLeft(b)), Kotlin.Long.ZERO)) {
          s0 = s0.xor(this.state[0]);
          s1 = s1.xor(this.state[1]);
        }
        this.next();
      }
    }
    this.state[0] = s0;
    this.state[1] = s1;
  };
  Xoroshiro128Plus.prototype.split = function () {
    var newRandom = new Xoroshiro128Plus(this.state.slice());
    newRandom.jump();
    return newRandom;
  };
  Xoroshiro128Plus.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Xoroshiro128Plus',
    interfaces: [AbstractRandom64]
  };
  function Xoroshiro128Plus_init(seed, $this) {
    $this = $this || Object.create(Xoroshiro128Plus.prototype);
    var $receiver = Kotlin.newArray(2, Kotlin.Long.ZERO);
    var seq = new SplitMix64(seed);
    $receiver[0] = seq.next();
    $receiver[1] = seq.next();
    Xoroshiro128Plus.call($this, $receiver);
    return $this;
  }
  var JUMP_0;
  function Xorshift1024Star(state, position) {
    if (position === void 0)
      position = 0;
    this.state = state;
    this.position = position;
  }
  Xorshift1024Star.prototype.next = function () {
    var s0 = this.state[this.position];
    this.position = this.position + 1 & 15;
    var s1 = this.state[this.position];
    s1 = s1.xor(s1.shiftLeft(31));
    this.state[this.position] = s1.xor(s0).xor(s1.shiftRightUnsigned(11)).xor(s0.shiftRightUnsigned(30));
    return this.state[this.position].multiply(new Kotlin.Long(1419247029, 275155412));
  };
  Xorshift1024Star.prototype.jump = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8, tmp$_9, tmp$_10, tmp$_11, tmp$_12;
    var t = Kotlin.newArray(16, Kotlin.Long.ZERO);
    tmp$ = JUMP_0;
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var jump = tmp$[tmp$_0];
      tmp$_1 = until(0, 64);
      tmp$_2 = tmp$_1.first;
      tmp$_3 = tmp$_1.last;
      tmp$_4 = tmp$_1.step;
      for (var b = tmp$_2; b <= tmp$_3; b += tmp$_4) {
        if (!Kotlin.equals(jump.and(Kotlin.Long.ONE.shiftLeft(b)), Kotlin.Long.ZERO)) {
          tmp$_5 = until(0, t.length);
          tmp$_6 = tmp$_5.first;
          tmp$_7 = tmp$_5.last;
          tmp$_8 = tmp$_5.step;
          for (var j = tmp$_6; j <= tmp$_7; j += tmp$_8) {
            t[j] = t[j].xor(this.state[j + this.position & 15]);
          }
        }
        this.next();
      }
    }
    tmp$_9 = until(0, t.length);
    tmp$_10 = tmp$_9.first;
    tmp$_11 = tmp$_9.last;
    tmp$_12 = tmp$_9.step;
    for (var j_0 = tmp$_10; j_0 <= tmp$_11; j_0 += tmp$_12) {
      this.state[j_0 + this.position & 15] = t[j_0];
    }
  };
  Xorshift1024Star.prototype.split = function () {
    var newRandom = new Xorshift1024Star(this.state.slice());
    newRandom.jump();
    return newRandom;
  };
  Xorshift1024Star.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Xorshift1024Star',
    interfaces: [AbstractRandom64]
  };
  function Xorshift1024Star_init(seed, $this) {
    $this = $this || Object.create(Xorshift1024Star.prototype);
    var $receiver = Kotlin.newArray(16, Kotlin.Long.ZERO);
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var seq = new SplitMix64(seed);
    tmp$ = get_indices($receiver);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var i = tmp$_0; i <= tmp$_1; i += tmp$_2)
      $receiver[i] = seq.next();
    Xorshift1024Star.call($this, $receiver);
    return $this;
  }
  var JUMP_1;
  function Xorshift128Plus(state) {
    this.state = state;
  }
  Xorshift128Plus.prototype.next = function () {
    var s1 = this.state[0];
    var s0 = this.state[1];
    var result = s0.add(s1);
    this.state[0] = s0;
    s1 = s1.xor(s1.shiftLeft(23));
    this.state[1] = s1.xor(s0).xor(s1.shiftRightUnsigned(18)).xor(s0.shiftRightUnsigned(5));
    return result;
  };
  Xorshift128Plus.prototype.jump = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    var s0 = Kotlin.Long.ZERO;
    var s1 = Kotlin.Long.ZERO;
    tmp$ = JUMP_1;
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var jump = tmp$[tmp$_0];
      tmp$_1 = until(0, 64);
      tmp$_2 = tmp$_1.first;
      tmp$_3 = tmp$_1.last;
      tmp$_4 = tmp$_1.step;
      for (var b = tmp$_2; b <= tmp$_3; b += tmp$_4) {
        if (!Kotlin.equals(jump.and(Kotlin.Long.ONE.shiftLeft(b)), Kotlin.Long.ZERO)) {
          s0 = s0.xor(this.state[0]);
          s1 = s1.xor(this.state[1]);
        }
        this.next();
      }
    }
    this.state[0] = s0;
    this.state[1] = s1;
  };
  Xorshift128Plus.prototype.split = function () {
    var newRandom = new Xorshift128Plus(this.state.slice());
    newRandom.jump();
    return newRandom;
  };
  Xorshift128Plus.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Xorshift128Plus',
    interfaces: [AbstractRandom64]
  };
  function Xorshift128Plus_init(seed, $this) {
    $this = $this || Object.create(Xorshift128Plus.prototype);
    var $receiver = Kotlin.newArray(2, Kotlin.Long.ZERO);
    var seq = new SplitMix64(seed);
    $receiver[0] = seq.next();
    $receiver[1] = seq.next();
    Xorshift128Plus.call($this, $receiver);
    return $this;
  }
  var package$com = _.com || (_.com = {});
  var package$github = package$com.github || (package$com.github = {});
  var package$umireon = package$github.umireon || (package$github.umireon = {});
  var package$my_random_stuff = package$umireon.my_random_stuff || (package$umireon.my_random_stuff = {});
  package$my_random_stuff.AbstractRandom64 = AbstractRandom64;
  package$my_random_stuff.nextBoolean_jf8mn4$ = nextBoolean;
  package$my_random_stuff.nextBytes_eg1buk$ = nextBytes;
  package$my_random_stuff.nextDouble_jf8mn4$ = nextDouble;
  package$my_random_stuff.nextFloat_jf8mn4$ = nextFloat;
  package$my_random_stuff.nextInt_jf8mn4$ = nextInt;
  package$my_random_stuff.SplitMix64 = SplitMix64;
  package$my_random_stuff.Xoroshiro128Plus_init_s8cxhz$ = Xoroshiro128Plus_init;
  package$my_random_stuff.Xoroshiro128Plus = Xoroshiro128Plus;
  package$my_random_stuff.Xorshift1024Star_init_s8cxhz$ = Xorshift1024Star_init;
  package$my_random_stuff.Xorshift1024Star = Xorshift1024Star;
  package$my_random_stuff.Xorshift128Plus_init_s8cxhz$ = Xorshift128Plus_init;
  package$my_random_stuff.Xorshift128Plus = Xorshift128Plus;
  JUMP = [new Kotlin.Long(-341443893, -1096022937), new Kotlin.Long(-2035640030, -664075125)];
  JUMP_0 = [new Kotlin.Long(-324418531, -2078003306), new Kotlin.Long(1996056661, -1547281529), new Kotlin.Long(118183991, 1530176415), new Kotlin.Long(-453830114, 1149874172), new Kotlin.Long(1211199296, 805235466), new Kotlin.Long(-26689502, -600991599), new Kotlin.Long(-1322259856, 911807275), new Kotlin.Long(-96220488, -1430159986), new Kotlin.Long(-1869047021, -993296043), new Kotlin.Long(1030867259, 1592358184), new Kotlin.Long(1813763392, 1763002568), new Kotlin.Long(279045797, 2031141917), new Kotlin.Long(1672733352, 190826053), new Kotlin.Long(-369322851, 75462276), new Kotlin.Long(-654932534, -1181646350), new Kotlin.Long(-217171773, 675676387)];
  JUMP_1 = [new Kotlin.Long(1667051007, -1973626999), new Kotlin.Long(1548169110, 304075285)];
  Kotlin.defineModule('xorshift-kotlin', _);
  return _;
}(typeof this['xorshift-kotlin'] === 'undefined' ? {} : this['xorshift-kotlin'], kotlin);
