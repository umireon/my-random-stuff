bitwidth = [
  16 16 16 16
  16 16 16 16
][:,end:-1:1]
target = 16:47
factor = 1181783497276652981

symbols = permutedims([i - 1 + 'a' for (i, _) in enumerate(bitwidth')], [2, 1])

for j = 1:2
  for i = reverse(1:size(bitwidth, 2))
    @printf("%s(%2d) ", symbols[j, i], bitwidth[j, i])
  end
  println()
end

factors = Dict{String,Int}()
for y = 1:size(bitwidth, 2)
  for x = 1:size(bitwidth, 2)
    xrange = range(sum(bitwidth[1, 1:x-1]), 1, bitwidth[1, x])
    yrange = range(sum(bitwidth[2, 1:y-1]), 1, bitwidth[2, y])
    outrange = range(first(xrange) + first(yrange), 1, length(xrange) + length(yrange))
    requested = length(outrange ∩ target)

    if requested > 0 || first(outrange) < first(target)
      name = "$(symbols[1, x])$(symbols[2, y])"
      @printf("%s: %3d..%3d, %2d requested: ", name, first(outrange), last(outrange), requested)
      shift = first(outrange) - first(target)
      xlength = min(length(xrange), requested)
      subfactor = (factor >> first(yrange)) & ((1 << min(length(yrange), requested)) - 1)

      xname =
      if xrange == 0:15 && xlength == 16
        "(s32[p] & 0xFFFF)"
      elseif xrange == 0:15 && xlength == 8
        "s32[p]"
      elseif first(xrange) == 16
        "(s32[p] >> 16)"
      elseif first(xrange) == 32
        "s32[p+1]"
      else
        "???"
      end

      str =
      if shift < 0
        "(($xname * $subfactor) >> $(-shift))"
      else
        factors[xname] =
        if haskey(factors, xname)
          factors[xname] + subfactor << shift
        else
          subfactor << shift
        end

        if shift == 0
          "$xname * $subfactor"
        else
          "($xname * $subfactor << $shift)"
        end
      end

      println(str)
    end
  end
end

for (xname, f) in factors
  println("$xname * $f")
end
