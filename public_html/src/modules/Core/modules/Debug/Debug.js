/* script */
//
//
import ModuleLoader from "/src/ModuleLoader.js";
import moduleStore from "./store/index.js";
import mutations from "./store/mutations.js";
import getters from "./store/getters.js";
var moduleName = 'Core.Debug';
export function initialize(_ref) {
  var store = _ref.store,
      router = _ref.router;
  store.registerModule(moduleName.split('.'), ModuleLoader.prepareStoreNames(moduleName, moduleStore));
}
var __vue_script__ = {
  name: moduleName,
  props: {
    levels: {
      type: Array,
      validate: function validate(value) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (['all', 'log', 'info', 'notice', 'warning', 'error'].indexOf(item) !== -1) {
              return false;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return true;
      }
    }
  },
  computed: {
    all: function all() {
      var moduleName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.$store.getters[getters.Core.Debug.get]('all', moduleName);
    },
    logs: function logs() {
      var moduleName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.$store.getters[getters.Core.Debug.get]('log', moduleName);
    },
    infos: function infos() {
      var moduleName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.$store.getters[getters.Core.Debug.get]('info', moduleName);
    },
    warnings: function warnings() {
      var moduleName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.$store.getters[getters.Core.Debug.get]('warning', moduleName);
    },
    notices: function notices() {
      var moduleName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.$store.getters[getters.Core.Debug.get]('notice', moduleName);
    },
    errors: function errors() {
      var moduleName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.$store.getters[getters.Core.Debug.get]('error', moduleName);
    }
  },
  methods: {
    log: function log(message, data) {
      this.$store.commit(mutations.Core.Debug.push, {
        type: 'log',
        message: message,
        data: data
      });
      this.$root.$emit('debug.log', {
        message: message,
        data: data
      });

      if (this.levels.indexOf('log') !== -1) {
        console.log(message, data);
      }
    },
    info: function info(message, data) {
      this.$store.commit(mutations.Core.Debug.push, {
        type: 'info',
        message: message,
        data: data
      });
      this.$root.$emit('debug.info', {
        message: message,
        data: data
      });

      if (this.levels.indexOf('info') !== -1) {
        console.info(message, data);
      }
    },
    notice: function notice(message, data) {
      this.$store.commit(mutations.Core.Debug.push, {
        type: 'notice',
        message: message,
        data: data
      });
      this.$root.$emit('debug.notice', {
        message: message,
        data: data
      });

      if (this.levels.indexOf('notice') !== -1) {
        console.log("%c ".concat(message), 'color: orange', data);
      }
    },
    warning: function warning(message, data) {
      this.$store.commit(mutations.Core.Debug.push, {
        type: 'warning',
        message: message,
        data: data
      });
      this.$root.$emit('debug.warning', {
        message: message,
        data: data
      });

      if (this.levels.indexOf('warning') !== -1) {
        console.warn(message, data);
      }
    },
    error: function error(message, data) {
      this.$store.commit(mutations.Core.Debug.push, {
        type: 'error',
        message: message,
        data: data
      });
      this.$root.$emit('debug.error', {
        message: message,
        data: data
      });

      if (this.levels.indexOf('error') !== -1) {
        console.error(message, data);
      }
    }
  }
  /* template */

};

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div");
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-671e3bb1_0", {
    source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
    map: {
      "version": 3,
      "sources": [],
      "names": [],
      "mappings": "",
      "file": "Debug.vue"
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* component normalizer */

function __vue_normalize__(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\www\\YetiForceCRM\\public_html\\src\\modules\\Core\\modules\\Debug\\Debug.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  if (true) {
    var hook;

    if (false) {
      // In SSR.
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      component._ssrRegister = hook;
    } else if (style) {
      hook = function hook(context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook !== undefined) {
      if (component.functional) {
        // register for functional component in vue file
        var originalRender = component.render;

        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }

  return component;
}
/* style inject */


function __vue_create_injector__() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (false && css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


export default __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);