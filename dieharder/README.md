Modified dieharder
==================

Available RNGs
--------
* splitmix32

Requirements
------------
* cmake
* autoconf
* automake
* libtool
* gsl

How to run
-------------

```
$ mkdir build
$ cd build
$ cmake ..
$ make
$ dieharder-prefix/bin/dieharder -a -g210
```
