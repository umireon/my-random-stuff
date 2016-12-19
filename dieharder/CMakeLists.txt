cmake_minimum_required(VERSION 3.0)
include(ExternalProject)

ExternalProject_Add(dieharder
  URL https://www.phy.duke.edu/~rgb/General/dieharder/dieharder-3.31.1.tgz
  URL_HASH SHA256=6cff0ff8394c553549ac7433359ccfc955fb26794260314620dfa5e4cd4b727f
  PATCH_COMMAND patch -p1 < ${CMAKE_SOURCE_DIR}/splitmix32.patch
  CONFIGURE_COMMAND sh -c "rm -f m4/*" && autoreconf -fiv && ./configure --disable-shared --prefix=<INSTALL_DIR>
  BUILD_IN_SOURCE 1
  )
