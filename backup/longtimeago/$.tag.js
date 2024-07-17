;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory)
  } else {
    root['tag'] = factory(root)
  }
})(window, function (w) {
  'use strict'

  var version = '1.0.0'
  var reference = 'tag'
  var oldReference = w[reference]
  var uid = 0

  var noop = function () {}

  function isFunction(input) {
    return Object.prototype.toString.call(input) === '[object Function]'
  }

  function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]'
  }

  function Tags(wrap, sparms) {
    wrap.innerHTML =
      '<label class="x-tags" for="kwTag@id"><label for="kwTag@id"><a>+</a><input type="text" id="kwTag@id"></label></label>'.replace(
        /@id/g,
        uid
      )

    this.box = wrap.getElementsByTagName('label')[0]
    this.input = wrap.getElementsByTagName('input')[0]
    this.handleEvent()

    sparms || (sparms = {})

    this.afterDelete = isFunction(sparms.after) ? sparms.after : noop
    this.beforeInsert = isFunction(sparms.before) ? sparms.before : noop

    if (isArray(sparms.data)) {
      while (sparms.data.length) {
        var val = sparms.data.shift()
        this.insert(String(val))
      }
    }
  }

  Tags.prototype.insert = function (val) {
    if (val === '') return

    var tag = document.createElement('a')
    tag.innerHTML = val
    this.box.insertBefore(tag, this.input.parentNode)
    this.input.value = ''
  }

  Tags.prototype.handleEvent = function () {
    var self = this

    this.input.onkeypress = function (e) {
      e || (e = window.event)
      if (e.keyCode === 13) {
        self.beforeInsert(this.value) !== false && self.insert(this.value)
      }
    }

    this.box.onclick = function (e) {
      e || (e = window.event)
      var target = e.target || e.srcElement

      if (target.nodeName.toUpperCase() === 'A' && target.innerHTML !== '+') {
        e.stopPropagation()
        e.preventDefault()

        self.input.blur()
        self.afterDelete(self.box.removeChild(target))
      }
    }
  }

  function Tag(wrap, sparms) {
    uid++
    new Tags(wrap, sparms)
  }

  Tag._V = version
  Tag.noConflict = function () {
    w[reference] = oldReference
    return DatePicker
  }

  return Tag
})

// <style>
//     .x-tags{font-size:14px;display:block;border:2px solid #3498DB;border-radius:5px;background-color:#fff;padding:2px}
//     .x-tags:after,.x-tags:before{display:table;content:""}
//     .x-tags:after{clear:both}
//     .x-tags a:active,.x-tags a:hover,.x-tags a:link,.x-tags a:visited{color:#fff}
//     .x-tags a{cursor:pointer}
//     .x-tags>a{float:left;margin:3px;padding:3px 15px;background-color:#3498DB;color:#fff;border-radius:3px}
//     .x-tags>a:hover{padding:3px 5px;background-color:#2980B9}
//     .x-tags>a:hover::after{display:inline-block}
//     .x-tags>a::after{content:'×';font-weight:700;width:15px;margin-left:5px;display:none}
//     .x-tags>a:hover i{display:inline-block}
//     .x-tags>a>i{width:15px;margin-left:5px;display:none}
//     .x-tags>a>i::before{content:'×';font-weight:700}
//     .x-tags>label{float:left;margin:3px 5px}
//     .x-tags>label>a{display:inline-block;height:25px;line-height:25px;font-size:18px;font-weight:700;padding:0 5px;background-color:#bbc3cb;color:#fff;border-radius:3px}
//     .x-tags>label>a:hover{background-color:#3498DB}
//     .x-tags>label>input{font-size:14px;padding-left:5px;width:50px;border:0;height:22px;margin-top:2px;outline:0;background:0 0}
// </style>
