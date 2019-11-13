!(function(n) {
  var e = {};
  function t(s) {
    if (e[s]) return e[s].exports;
    var o = (e[s] = { i: s, l: !1, exports: {} });
    return n[s].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
  }
  (t.m = n),
    (t.c = e),
    (t.d = function(n, e, s) {
      t.o(n, e) || Object.defineProperty(n, e, { enumerable: !0, get: s });
    }),
    (t.r = function(n) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(n, '__esModule', { value: !0 });
    }),
    (t.t = function(n, e) {
      if ((1 & e && (n = t(n)), 8 & e)) return n;
      if (4 & e && 'object' == typeof n && n && n.__esModule) return n;
      var s = Object.create(null);
      if ((t.r(s), Object.defineProperty(s, 'default', { enumerable: !0, value: n }), 2 & e && 'string' != typeof n))
        for (var o in n)
          t.d(
            s,
            o,
            function(e) {
              return n[e];
            }.bind(null, o)
          );
      return s;
    }),
    (t.n = function(n) {
      var e =
        n && n.__esModule
          ? function() {
              return n.default;
            }
          : function() {
              return n;
            };
      return t.d(e, 'a', e), e;
    }),
    (t.o = function(n, e) {
      return Object.prototype.hasOwnProperty.call(n, e);
    }),
    (t.p = ''),
    t((t.s = 8));
})([
  function(module, exports, __webpack_require__) {
    'use strict';
    eval(
      '\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return "@media ".concat(item[2], "{").concat(content, "}");\n      }\n\n      return content;\n    }).join(\'\');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === \'string\') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, \'\']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      // eslint-disable-next-line prefer-destructuring\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = modules[_i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || \'\'; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === \'function\') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join(\'\\n\');\n  }\n\n  return [content].join(\'\\n\');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);\n  return "/*# ".concat(data, " */");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?'
    );
  },
  function(module, exports, __webpack_require__) {
    'use strict';
    eval(
      "\n\nvar stylesInDom = {};\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nfunction listToStyles(list, options) {\n  var styles = [];\n  var newStyles = {};\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var css = item[1];\n    var media = item[2];\n    var sourceMap = item[3];\n    var part = {\n      css: css,\n      media: media,\n      sourceMap: sourceMap\n    };\n\n    if (!newStyles[id]) {\n      styles.push(newStyles[id] = {\n        id: id,\n        parts: [part]\n      });\n    } else {\n      newStyles[id].parts.push(part);\n    }\n  }\n\n  return styles;\n}\n\nfunction addStylesToDom(styles, options) {\n  for (var i = 0; i < styles.length; i++) {\n    var item = styles[i];\n    var domStyle = stylesInDom[item.id];\n    var j = 0;\n\n    if (domStyle) {\n      domStyle.refs++;\n\n      for (; j < domStyle.parts.length; j++) {\n        domStyle.parts[j](item.parts[j]);\n      }\n\n      for (; j < item.parts.length; j++) {\n        domStyle.parts.push(addStyle(item.parts[j], options));\n      }\n    } else {\n      var parts = [];\n\n      for (; j < item.parts.length; j++) {\n        parts.push(addStyle(item.parts[j], options));\n      }\n\n      stylesInDom[item.id] = {\n        id: item.id,\n        refs: 1,\n        parts: parts\n      };\n    }\n  }\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n\n  if (typeof options.attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      options.attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(options.attributes).forEach(function (key) {\n    style.setAttribute(key, options.attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  var styles = listToStyles(list, options);\n  addStylesToDom(styles, options);\n  return function update(newList) {\n    var mayRemove = [];\n\n    for (var i = 0; i < styles.length; i++) {\n      var item = styles[i];\n      var domStyle = stylesInDom[item.id];\n\n      if (domStyle) {\n        domStyle.refs--;\n        mayRemove.push(domStyle);\n      }\n    }\n\n    if (newList) {\n      var newStyles = listToStyles(newList, options);\n      addStylesToDom(newStyles, options);\n    }\n\n    for (var _i = 0; _i < mayRemove.length; _i++) {\n      var _domStyle = mayRemove[_i];\n\n      if (_domStyle.refs === 0) {\n        for (var j = 0; j < _domStyle.parts.length; j++) {\n          _domStyle.parts[j]();\n        }\n\n        delete stylesInDom[_domStyle.id];\n      }\n    }\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?"
    );
  },
  function(module, exports, __webpack_require__) {
    eval(
      "var content = __webpack_require__(3);\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(1)(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./src/modules/index.css?"
    );
  },
  function(module, exports, __webpack_require__) {
    eval(
      'exports = module.exports = __webpack_require__(0)(false);\n// Module\nexports.push([module.i, "body{\\n    font-size: 14px;\\n}\\n\\ninput {\\n    height: 20px;\\n    line-height: 20px;\\n    padding: 0 5px;\\n}\\n\\n", ""]);\n\n\n//# sourceURL=webpack:///./src/modules/index.css?./node_modules/css-loader/dist/cjs.js'
    );
  },
  function(module, exports, __webpack_require__) {
    eval(
      "var content = __webpack_require__(5);\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(1)(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./src/modules/userInfo.css?"
    );
  },
  function(module, exports, __webpack_require__) {
    eval(
      'exports = module.exports = __webpack_require__(0)(false);\n// Module\nexports.push([module.i, ".userInfo-row{\\n    display: flex;\\n    margin-bottom: 10px;\\n}\\n\\n.userInfo-label{\\n    width: 100px;\\n}\\n", ""]);\n\n\n//# sourceURL=webpack:///./src/modules/userInfo.css?./node_modules/css-loader/dist/cjs.js'
    );
  },
  function(module, exports, __webpack_require__) {
    eval(
      "var content = __webpack_require__(7);\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(1)(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./src/modules/userForm.css?"
    );
  },
  function(module, exports, __webpack_require__) {
    eval(
      'exports = module.exports = __webpack_require__(0)(false);\n// Module\nexports.push([module.i, ".userForm-item{\\n    display: flex;\\n    margin-bottom: 10px;\\n}\\n\\n.userForm-label{\\n    width: 100px;\\n}\\n", ""]);\n\n\n//# sourceURL=webpack:///./src/modules/userForm.css?./node_modules/css-loader/dist/cjs.js'
    );
  },
  function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    eval(
      '__webpack_require__.r(__webpack_exports__);\n\n// EXTERNAL MODULE: ./src/modules/index.css\nvar modules = __webpack_require__(2);\n\n// CONCATENATED MODULE: ./src/modules/userStore.js\nlet currentUser;\nconst changeListeners = [];\n\nfunction emitUserUpdate() {\n  console.log("Emit updates");\n  changeListeners.map(cb => cb(currentUser));\n}\n\nconst userStore = {\n  getUser() {\n    return currentUser;\n  },\n\n  setUser(user) {\n    currentUser = user;\n    emitUserUpdate(user);\n  },\n\n  addChangeListener(callback) {\n    changeListeners.push(callback);\n  }\n\n};\n// EXTERNAL MODULE: ./src/modules/userInfo.css\nvar userInfo = __webpack_require__(4);\n\n// CONCATENATED MODULE: ./src/modules/userInfo.js\n\n\nconst template = `\n   <h2>User info</h2>\n    <div class="userInfo-row">\n        <div class="userInfo-label">Name:</div>\n        <div class="userInfo-value" id="userInfoName"></div>\n    </div> \n    <div  class="userInfo-row">\n        <div class="userInfo-label">Age:</div>\n        <div class="userInfo-value" id="userInfoAge"></div>\n    </div> \n    <div  class="userInfo-row">\n        <div class="userInfo-label">City:</div>\n        <div class="userInfo-value" id="userInfoCity"></div>\n    </div> \n    <div  class="userInfo-row">\n        <div class="userInfo-label">Street:</div>\n        <div class="userInfo-value" id="userInfoStreet"></div>\n    </div> \n`;\nfunction initUserInfo(parent) {\n  console.log("User info: init");\n  userStore.addChangeListener(updateUserInfo);\n  const host = document.createElement("div");\n  host.innerHTML = template;\n  parent.append(host);\n}\n\nfunction updateUserInfo(user) {\n  console.log("User info: update");\n  document.getElementById("userInfoName").innerText = user.name;\n  document.getElementById("userInfoAge").innerText = user.age;\n  document.getElementById("userInfoCity").innerText = user.address && user.address.city || "";\n  document.getElementById(\'userInfoStreet\').innerText = user.address && user.address.street || \'\'; // document.getElementById("userInfoStreet").innerText =\n  //   user.address?.street || "";\n}\n\nlet a = 1;\nlet b = 2;\nlet c = a == b;\n// EXTERNAL MODULE: ./src/modules/userForm.css\nvar userForm = __webpack_require__(6);\n\n// CONCATENATED MODULE: ./src/modules/userForm.js\n\n\nconst userForm_template = `\n<h2>User form</h2>\n<div class="userForm-item">\n    <label class="userForm-label" for="name">Name:</label>\n    <input type="text" id="name"/>\n</div>\n<div class="userForm-item">\n    <label class="userForm-label" for="age">Age:</label>\n    <input type="text" id="age"/>\n</div>\n<h5>Address</h5>\n<div class="userForm-item">\n    <label class="userForm-label" for="city">City:</label>\n    <input type="text" id="city"/>\n</div>\n<div class="userForm-item">\n    <label class="userForm-label" for="street">Street:</label>\n    <input type="text" id="street"\n    />\n</div>\n<button id="saveButton">Save</button>\n`;\n\nfunction getFormData() {\n  const name = document.getElementById("name").value;\n  const age = document.getElementById("age").value;\n  const city = document.getElementById("city").value;\n  const street = document.getElementById("street").value;\n  const user = {\n    name,\n    age\n  };\n\n  if (city || street) {\n    user.address = { ...(city && {\n        city\n      }),\n      ...(street && {\n        street\n      })\n    };\n  }\n\n  return user;\n}\n\nfunction initUserForm(parent) {\n  console.log("UserForm: init");\n  const host = document.createElement("div");\n  host.innerHTML = userForm_template;\n  parent.append(host);\n  host.querySelector("#saveButton").addEventListener("click", event => {\n    console.log("UserForm: save button click");\n    event.preventDefault();\n    userStore.setUser(getFormData());\n  });\n}\nlet unusedVariable;\n// CONCATENATED MODULE: ./src/modules/index.js\n\n\n\n\nconst initApp = () => {\n  document.addEventListener("DOMContentLoaded", () => {\n    console.log("Init application");\n    initUserForm(document.getElementById("userForm"));\n    initUserInfo(document.getElementById("userInfo"));\n  });\n};\n\ninitApp();\n\n//# sourceURL=webpack:///./src/modules/index.js_+_3_modules?'
    );
  }
]);
