;(function ($) {
  // #region 这块没什么意义
  //   //Author URL: https://github.com/mmkjony
  //   $.fn.toTop = function (opt) {
  //     //variables
  //     var elem = this
  //     var win = $(window)
  //     var doc = $('html, body')

  //     //Extended Options
  //     var options = $.extend(
  //       {
  //         autohide: true,
  //         offset: 420,
  //         speed: 500,
  //         position: true,
  //         right: 15,
  //         bottom: 30,
  //       },
  //       opt
  //     )

  //     elem.css({
  //       cursor: 'pointer',
  //     })

  //     if (options.autohide) {
  //       elem.css('display', 'none')
  //     }

  //     if (options.position) {
  //       elem.css({
  //         position: 'fixed',
  //         right: options.right,
  //         bottom: options.bottom,
  //       })
  //     }

  //     elem.click(function () {
  //       doc.animate({ scrollTop: 0 }, options.speed)
  //     })

  //     win.scroll(function () {
  //       var scrolling = win.scrollTop()

  //       if (options.autohide) {
  //         if (scrolling > options.offset) {
  //           elem.fadeIn(options.speed)
  //         } else elem.fadeOut(options.speed)
  //       }
  //     })
  //   }

  //   $(function () {
  //     //go up
  //     $('.to-top').toTop()

  //     // Mobile nav
  //     var $container = $('#container'),
  //       isMobileNavAnim = false,
  //       mobileNavAnimDuration = 200

  //     var startMobileNavAnim = function () {
  //       isMobileNavAnim = true
  //     }

  //     var stopMobileNavAnim = function () {
  //       setTimeout(function () {
  //         isMobileNavAnim = false
  //       }, mobileNavAnimDuration)
  //     }

  //     $('#main-nav-toggle').on('click', function () {
  //       if (isMobileNavAnim) return

  //       startMobileNavAnim()
  //       $container.toggleClass('mobile-nav-on')
  //       stopMobileNavAnim()
  //     })

  //     $('#wrap').on('click', function () {
  //       if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return

  //       $container.removeClass('mobile-nav-on')
  //     })
  //   })
  // #endregion

  $(function () {
    var state = history.pushState ? true : false

    var wait = function (time) {
      var _defer = $.Deferred()
      window.setTimeout(_defer.resolve, time)
      return _defer.promise()
    }

    var fetch = function (uri) {
      var $loader = $('#loader'),
        $main = $('#main')

      var cb = function (uri) {
        var index = uri.indexOf('#')
        var $anchor
        if (index > 0) {
          $anchor = $(uri.substr(index))
          $anchor.length && $('html,body').animate({ scrollTop: $anchor.offset().top }, 500)
        }
      }

      var errFn = function (e) {
        console.log(e)
        $loader.hide()
        window.open(uri)
      }

      $loader.fadeIn(200)
      $.get(uri, {})
        .done(function (data) {
          var title, text

          try {
            title = data.match(/<title>(.*)<\/title>/)[1]
            text = data.match(/<section id="main">([\s\S]*)<\/section>/)[1]
          } catch (e) {
            errFn(e)
          }

          if (text) {
            $main.animate({ opacity: '0.01' }, 200, function () {
              $(document).scrollTop(0).find('title').text(title)

              $main.empty().append(text)

              wait(100)
                .then(function () {
                  $loader.fadeOut(500)
                })
                .then(function () {
                  $main.animate({ opacity: '1' }, 200, function () {
                    cb(uri)
                  })
                })
                .then(function () {
                  history.pushState({}, '', uri)
                })
            })
          } else {
            $loader.hide()
          }
        })
        .fail(errFn)
    }

    $('body').on('click', function (e) {
      var eTarget = e.target
      var isLink = eTarget.tagName.toUpperCase() === 'A'

      if (isLink || eTarget.parentElement.tagName.toUpperCase() === 'A') {
        var link = isLink ? eTarget : eTarget.parentElement
        var href = link.getAttribute('href')
        var target = link.getAttribute('target')

        if (state && !target && href) {
          e.preventDefault()
          e.stopPropagation()

          var $anchor = href.indexOf('#') ? fetch(href) : $(href)

          if ($anchor && $anchor.length) {
            $('html,body').animate({ scrollTop: $anchor.offset().top }, 500)
          }
        }
      }
    })

    if (state) {
      // bug #1
      window.addEventListener('popstate', function () {
        fetch(location.href)
      })
    }

    // wait(1000)
    //   .then(function () {
    //     if (location.hostname !== 'imuyu.me') {
    //       $("<script>")
    //         .prop({
    //           charset: 'utf-8',
    //           src: 'https://hm.baidu.com/hm.js?9307c3968eb0d95f0ca1ac8f905faf6d'
    //         })
    //         .appendTo('head')
    //         .remove()
    //     }
    //   })
  })
})(jQuery)
