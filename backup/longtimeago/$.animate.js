!(function() {
    var anim = $.fn.animate
    $.fn.animate = function() {
      var args = $.makeArray(arguments)
      var defer
      if (args[args.length - 1] === '@promise') {
        defer = $.Deferred()
        args[1] = args[1] || 'normal'
        args[2] = args[2] || 'swing'
        args[3] = defer.resolve
        anim.apply(this, args)
        return defer.promise()
      } else {
        return anim.apply(this, args)
      }
    }
  })()
  