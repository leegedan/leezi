;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory)
  } else {
    root['dp'] = factory(root)
  }
})(window, function (w) {
  'use strict'

  var version = '1.0.0'
  var reference = 'dp'
  var oldReference = w[reference]

  var Html =
    '<div class="dp-header cf"><a class="dp-prev" data-handle="m">&lt;&lt;</a><b>@yyyyMM</b><a class="dp-next" data-handle="m">&gt;&gt;</a></div>' +
    '<div class="dp-weeks cf"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>' +
    '<div class="dp-days cf">@days</div>' +
    '<div class="dp-footer cf"><a class="dp-clear" data-handle="o">\u4eca\u5929</a><a class="dp-today" data-handle="o">\u6e05\u9664</a></div>'

  var pad2 = function (str) {
    return ('00' + str).slice(-2)
  }
  var getDays = function (yyyy, mm) {
    return new Date(yyyy, mm, 0).getDate()
  }

  function on(el, evtName, fn) {
    if (w.addEventListener) {
      el.addEventListener(evtName, fn, false)
    } else if (w.attachEvent) {
      el.attachEvent('on' + evtName, fn)
    } else {
      el['on' + evtName] = fn
    }
  }

  function off(el, evtName, fn) {
    if (w.addEventListener) {
      el.removeEventListener(evtName, fn, false)
    } else if (w.dispatchEvent) {
      el.dispatchEvent('on' + evtName, fn)
    } else {
      el['on' + evtName] = null
    }
  }

  function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]'
  }

  var picker = null

  function Picker() {
    this.initWrap()
  }

  Picker.prototype.initWrap = function () {
    var self = this
    var wrap = (this.wrap = w.document.createElement('div'))

    wrap.style.display = 'none'
    wrap.style.position = 'absolute'
    wrap.style.zIndex = 999

    wrap.onclick = function (e) {
      e || (e = window.event)
      var target = e.target || e.srcElement
      var h, val, handle
      if (target.nodeName.toUpperCase() === 'A') {
        h = target.getAttribute('data-handle')
        val = target.innerHTML
        handle = self.handle[h]
        handle && handle.call(self, val)
        return false
      }
    }

    wrap.className = 'dp-wrap'
    w.document.body.appendChild(wrap)

    return this
  }
  Picker.prototype.renderWrap = function () {
    this.wrap.innerHTML = Html.replace('@yyyyMM', this.yyyy + '-' + pad2(this.MM)).replace('@days', this.getDays())

    return this
  }

  Picker.prototype.getDays = function () {
    var y = this.yyyy,
      m = this.MM,
      d = this.dd

    var days = getDays(y, m)
    var lastday = getDays(y, m - 1)
    var week = new Date(y, m - 1, 1).getDay()
    var selected = this.value === this.getValue() ? d : 0

    var i,
      arr = [],
      len = 42 - days - week

    while (week--) {
      arr.push('<a class="day-grey" data-handle="m">' + (lastday - week) + '</a>')
    }

    for (i = 1; i <= days; i++) {
      arr.push('<a data-handle="d"' + (i === selected ? ' class="on"' : '') + '>' + i + '</a>')
    }

    for (i = 1; i <= len; i++) {
      arr.push('<a class="day-grey" data-handle="m">' + i + '</a>')
    }

    return arr.join('')
  }

  Picker.prototype.initDate = function (val) {
    var date
    if (val) {
      val = val.split('-')
      date = new Date(+val[0], val[1] - 1, +val[2])
    }

    if (!date || !date.getTime()) date = new Date()

    this.yyyy = date.getFullYear()
    this.MM = date.getMonth() + 1
    this.dd = date.getDate()
    this.value = this.getValue()

    return this
  }

  Picker.prototype.getValue = function (s) {
    //s || (s = '-')
    var value = this.yyyy + '-' + pad2(this.MM) + '-' + pad2(this.dd)

    return value
  }

  Picker.prototype.setValue = function () {
    this.element.value = this.value = this.getValue()
  }
  Picker.prototype.setPos = function () {
    var wrap = this.wrap
    var reat = this.element.getBoundingClientRect()

    wrap.style.display = 'none'
    wrap.style.top = reat.bottom + 'px'
    wrap.style.left = reat.left + 'px'

    return this
  }
  Picker.prototype.show = function () {
    this.initDate(this.element.value).setPos().renderWrap().wrap.style.display = 'block'
  }
  Picker.prototype.hide = function () {
    this.wrap.style.display = 'none'
  }
  Picker.prototype.autoHide = function () {
    var self = this
    var evtName = 'mousedown'

    var fn = function (e) {
      e || (e = window.event)
      var target = e.target || e.srcElement
      var hide = target === self.element || target === self.wrap

      if (!hide) {
        while (target.parentNode) {
          hide = target.parentNode === self.wrap
          if (hide) {
            break
          } else {
            target = target.parentNode
          }
        }
      }

      if (!hide) {
        self.hide()
        off(w.document, evtName, fn)
      }
    }

    self.show()
    on(w.document, evtName, fn)
  }
  Picker.prototype.handle = {
    m: function (val) {
      // var dd = Number(val)
      // if (dd) {
      //     val = dd > 15 ? '<<' : '>>'
      // }
      if (val === '&lt;&lt;') {
        if (--this.MM === 0) this.yyyy--, (this.MM = 12)
      } else if (val === '&gt;&gt;') {
        if (++this.MM === 13) this.yyyy++, (this.MM = 1)
      } else {
        return
      }
      this.renderWrap()
    },
    d: function (val) {
      this.dd = +val
      this.setValue()
      this.renderWrap()
    },
    o: function (val) {
      if (val === '\u6e05\u9664') {
        this.element.value = ''
      } else {
        this.initDate().setValue()
      }
      this.hide()
    },
  }

  function DatePicker(input) {
    if (isArray(input)) {
      for (var i = 0; i < input.length; i++) {
        DatePicker(input[i])
      }
      return input
    }

    if (!picker) {
      picker = new Picker()
    }

    if (input && input.nodeName && input.nodeName.toUpperCase() === 'INPUT') {
      input.onfocus = function (e) {
        picker.element = this
        picker.autoHide()
      }
    } else {
      //throw new Error('\u65e0\u6548\u7ed1\u5b9a\u5bf9\u8c61')
    }

    return input
  }

  DatePicker._V = version
  DatePicker.noConflict = function () {
    w[reference] = oldReference
    return DatePicker
  }

  return DatePicker
})

// <style>
//     .dp-wrap{width:196px;color:#333;border:1px solid #eee;border-radius:4px;background-color:#fff;display:none}
//     .dp-wrap .cf:after,.dp-wrap .cf:before{display:table;content:""}
//     .dp-wrap .cf:after{clear:both}
//     .dp-wrap .cf{*zoom: 1}
//     .dp-wrap a{cursor:pointer}
//     .dp-wrap .dp-weeks>span{float:left;width:24px;text-align:center;height:18px;margin:0 2px;font-size:12px;color:#999;line-height:1.4}
//     .dp-wrap .dp-days>a{float:left;height:24px;width:24px;text-align:center;line-height:24px;margin:2px;font-size:12px;border-radius:50%;color:#333}
//     .dp-wrap .dp-days>a.day-grey{color:#ccc;cursor:no-drop}
//     .dp-wrap .dp-days>a.day-grey:hover{color:#ccc;background-color:#fff}
//     .dp-wrap .dp-days>a:hover{background-color:#1ABC9C;color:#FFF}
//     .dp-wrap .dp-days>a.on{background-color:#16A085;color:#FFF}
//     .dp-wrap .dp-header{text-align:center;font-size:14px}
//     .dp-wrap .dp-header>b{line-height:28px}
//     .dp-wrap .dp-header .dp-next,.dp-wrap .dp-header .dp-prev{padding:2px;margin:3px}
//     .dp-wrap .dp-header .dp-next{float:right;*margin-top: -29px}
//     .dp-wrap .dp-header .dp-prev{float:left}
//     .dp-wrap .dp-footer{font-size:12px}
//     .dp-wrap .dp-footer .dp-clear,.dp-wrap .dp-footer .dp-today{float:right;margin-right:15px;margin-bottom:3px;padding:5px 10px;border-radius:3px}
// </style>

// dp([ele1, ele2])
