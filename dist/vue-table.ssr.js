'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var axios=_interopDefault(require('axios')),qs=_interopDefault(require('qs')),Vuex=require('vuex'),Vuex__default=_interopDefault(Vuex),Vue=_interopDefault(require('vue')),VueDraggable=_interopDefault(require('vuedraggable'));function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = {
  name: "VueTableHeading",
  data: function data() {
    return {
      direction: null
    };
  },
  props: {
    column: {
      type: Object,
      required: true,
      validator: function validator(value) {
        return Object.prototype.hasOwnProperty.call(value, 'name') && Object.prototype.hasOwnProperty.call(value, 'title') && Object.prototype.hasOwnProperty.call(value, 'sortable');
      }
    }
  },
  computed: _objectSpread2({
    sortIcon: function sortIcon() {
      switch (this.direction) {
        case 'asc':
          return 'fa-sort-up';

        case 'desc':
          return 'fa-sort-down';

        default:
          return 'fa-sort';
      }
    }
  }, Vuex.mapState('sortingModule', ['sorting'])),
  methods: _objectSpread2({
    setOrder: function setOrder() {
      this.direction = this.direction == null ? 'asc' : this.direction === 'asc' ? 'desc' : null;
      this.addSort({
        column: this.column.name,
        direction: this.direction
      });
    },
    extractDirectionFromSorting: function extractDirectionFromSorting() {
      var _this = this;

      var column = this.sorting.filter(function (sort) {
        return sort.column == _this.column.name;
      });
      return column[0] ? column[0].direction : null;
    }
  }, Vuex.mapActions('sortingModule', {
    addSort: 'addSortAction'
  })),
  mounted: function mounted() {
    if (this.sortable) {
      this.direction = this.extractDirectionFromSorting();
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return !_vm.column.sortable ? _c('span', [_vm._ssrNode(_vm._ssrEscape("\n    " + _vm._s(_vm.column.title) + "\n"))], 2) : _c('a', {
    attrs: {
      "role": "button",
      "href": "#"
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
        return _vm.setOrder($event);
      }
    }
  }, [_vm._ssrNode(_vm._ssrEscape("\n    " + _vm._s(_vm.column.title) + "\n\n    ") + "<i" + _vm._ssrClass("fas fa-fw", _vm.sortIcon) + "></i>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-7cf4d2e0";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);var script$1 = {
  name: "VueTableSearchBar",
  data: function data() {
    return {
      lang: this.$parent.lang
    };
  },
  methods: _objectSpread2({}, Vuex.mapActions('searchModule', {
    setValue: 'setValueAction'
  })),
  computed: _objectSpread2({}, Vuex.mapState('searchModule', ['value']))
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "input-group"
  }, [_vm._ssrNode("<div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fas fa-search\"></i></div></div> <input type=\"text\"" + _vm._ssrAttr("placeholder", _vm.lang.search_for) + _vm._ssrAttr("value", _vm.value) + " class=\"form-control\">")]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-a2920846";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);var script$2 = {
  name: "VueTablePagination",
  props: {
    items: {
      type: Number,
      default: 0,
      validator: function validator(value) {
        return value >= 0;
      }
    },
    perPage: {
      type: Number,
      default: 20,
      validator: function validator(value) {
        return value > 0;
      }
    },
    maxLinks: {
      type: Number,
      default: 5,
      validator: function validator(value) {
        return value > 0;
      }
    }
  },
  methods: _objectSpread2({}, Vuex.mapActions('paginationModule', {
    setPage: 'setPageAction'
  })),
  computed: _objectSpread2({
    start: function start() {
      return (this.page - 1) * this.perPage;
    },
    end: function end() {
      var end = this.start + this.perPage;
      return this.items < end ? this.items : end;
    },
    totalPages: function totalPages() {
      return Math.ceil(this.items / this.perPage);
    },
    linkButtons: function linkButtons() {
      var linksSpan = this.linksSpan;
      var pages = [];

      for (var p = linksSpan.lower; p <= linksSpan.higher; p++) {
        pages.push(p);
      }

      return pages;
    },
    linksSpan: function linksSpan() {
      var span = Math.floor(this.maxLinks / 2);
      var lowerBound = this.page - span;
      var lowerOverflow = lowerBound < 0 ? Math.abs(lowerBound) + 1 : 0;
      var higherBound = this.page + span;
      var higherOverflow = higherBound > this.totalPages ? higherBound - this.totalPages : 0; // Correct overflows

      lowerBound += lowerOverflow;
      higherBound -= higherOverflow; // Correct bounds

      lowerBound -= higherOverflow;
      lowerBound += lowerBound < 1 ? 1 + Math.abs(lowerBound) : 0;
      higherBound += lowerOverflow;
      higherBound -= higherBound > this.totalPages ? higherBound - this.totalPages : 0;
      return {
        lower: lowerBound,
        higher: higherBound
      };
    }
  }, Vuex.mapState('paginationModule', ['page']))
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.totalPages > 1 ? _c('nav', [_vm._ssrNode("<ul class=\"pagination\">" + (_vm.page != 1 ? "<li class=\"page-item\"><a href=\"#\" aria-label=\"First\" class=\"page-link\"><i class=\"fas fa-backward\"></i> <span class=\"sr-only\">First</span></a></li> <li class=\"page-item\"><a href=\"#\" aria-label=\"Previous\" class=\"page-link\"><i class=\"fas fa-caret-left\"></i> <span class=\"sr-only\">Previous</span></a></li>" : "<!---->") + " " + _vm._ssrList(_vm.linkButtons, function (linkButton, index) {
    return "<li" + _vm._ssrClass("page-item", {
      'active': linkButton == _vm.page
    }) + "><a href=\"#\" class=\"page-link\">" + _vm._ssrEscape(_vm._s(linkButton)) + "</a></li>";
  }) + " " + (_vm.page != _vm.totalPages ? "<li class=\"page-item\"><a href=\"#\" aria-label=\"Next\" class=\"page-link\"><i class=\"fas fa-caret-right\"></i> <span class=\"sr-only\">Next</span></a></li> <li class=\"page-item\"><a href=\"#\" aria-label=\"Last\" class=\"page-link\"><i class=\"fas fa-forward\"></i> <span class=\"sr-only\">Last</span></a></li>" : "<!---->") + "</ul>" + _vm._ssrEscape("\n\n    Showing " + _vm._s(_vm.start) + " - " + _vm._s(_vm.end) + " of " + _vm._s(_vm.items) + "\n"))]) : _vm._e();
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-686e296c";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);var filtersStorageName = "vue_table_".concat(window.location.pathname, "_filters");
var filters = window.localStorage.getItem(filtersStorageName);
var filtersModule = {
  namespaced: true,
  state: {
    filters: filters ? JSON.parse(filters) : []
  },
  mutations: {
    /**
     * Adds a filter to the store.
     *
     * @param state
     * @param newFilter
     */
    addFilter: function addFilter(state, newFilter) {
      // If a filter with this key already exists, it must be removed from the array.
      state.filters = state.filters.filter(function (filter) {
        return filter.column != newFilter.column;
      });

      if (newFilter.values.length) {
        state.filters.push(newFilter);
      }
    },

    /**
     * Saves the data into local storage.
     *
     * @param state
     */
    saveData: function saveData(state) {
      window.localStorage.setItem(filtersStorageName, JSON.stringify(state.filters));
    }
  },
  actions: {
    /**
     * The action of adding a filter.
     *
     * @param commit
     * @param filter
     */
    addFilterAction: function addFilterAction(_ref, filter) {
      var commit = _ref.commit;
      commit('addFilter', filter);
      commit('saveData');
    }
  }
};var paginationStorageName = "vue_table_".concat(window.location.pathname, "_page");
var page = window.localStorage.getItem(paginationStorageName);
var paginationModule = {
  namespaced: true,
  state: {
    page: page ? parseInt(page) : 1
  },
  mutations: {
    /**
     * Sets the page number.
     *
     * @param state
     * @param page
     */
    setPage: function setPage(state, page) {
      state.page = page;
    },

    /**
     * Saves the data into local storage.
     *
     * @param state
     */
    saveData: function saveData(state) {
      window.localStorage.setItem(paginationStorageName, state.page);
    }
  },
  actions: {
    /**
     * The action of setting a page.
     *
     * @param commit
     * @param page
     */
    setPageAction: function setPageAction(_ref, page) {
      var commit = _ref.commit;
      commit('setPage', page);
      commit('saveData');
    }
  }
};var searchStorageName = "vue_table_".concat(window.location.pathname, "_search");
var value = window.localStorage.getItem(searchStorageName);
var searchModule = {
  namespaced: true,
  state: {
    value: value !== null && value !== void 0 ? value : ''
  },
  mutations: {
    /**
     * Sets the value.
     *
     * @param state
     * @param value
     */
    setValue: function setValue(state, value) {
      state.value = value;
    },

    /**
     * Saves the data into local storage.
     *
     * @param state
     */
    saveData: function saveData(state) {
      window.localStorage.setItem(searchStorageName, state.value);
    }
  },
  actions: {
    /**
     * The action of setting the value tha will be searched.
     *
     * @param commit
     * @param value
     */
    setValueAction: function setValueAction(_ref, value) {
      var commit = _ref.commit;
      commit('setValue', value);
      commit('saveData');
    }
  }
};var sortingStorageName = "vue_table_".concat(window.location.pathname, "_sorting");
var sorting = window.localStorage.getItem(sortingStorageName);
var sortingModule = {
  namespaced: true,
  state: {
    sorting: sorting ? JSON.parse(sorting) : []
  },
  mutations: {
    /**
     * Adds a sort to the store.
     *
     * @param state
     * @param newSorting
     */
    addSort: function addSort(state, newSort) {
      // If a sorting with this key already exists, it must be removed from the array.
      state.sorting = state.sorting.filter(function (sort) {
        return sort.column != newSort.column;
      });
      state.sorting.push(newSort);
    },

    /**
     * Saves the data into local storage.
     *
     * @param state
     */
    saveData: function saveData(state) {
      window.localStorage.setItem(sortingStorageName, JSON.stringify(state.sorting));
    }
  },
  actions: {
    /**
     * The action of adding a sorting.
     *
     * @param commit
     * @param sorting
     */
    addSortAction: function addSortAction(_ref, sort) {
      var commit = _ref.commit;
      commit('addSort', sort);
      commit('saveData');
    }
  }
};Vue.use(Vuex__default);
var store = new Vuex__default.Store({
  modules: {
    filtersModule: filtersModule,
    paginationModule: paginationModule,
    searchModule: searchModule,
    sortingModule: sortingModule
  }
});var script$3 = {
  store: store,
  name: "VueTable",
  components: {
    VueTableHeading: __vue_component__,
    VueDraggable: VueDraggable,
    VueTablePagination: __vue_component__$2,
    VueTableSearchBar: __vue_component__$1
  },
  data: function data() {
    return {
      items: [],
      lang: {
        "no_records": "No records found!",
        "search_for": "Search for..."
      },
      totalItems: 0
    };
  },
  props: {
    actions: {
      type: Object,
      default: function _default() {
        return {
          classes: "",
          slots: []
        };
      },
      validator: function validator(actions) {
        return Object.prototype.hasOwnProperty.call(actions, 'slots') && _typeof(actions.slots) === "object";
      }
    },
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    dataKey: {
      type: String,
      default: 'data'
    },
    locale: {
      type: String,
      default: 'en'
    },
    metaKey: {
      type: String,
      default: 'meta'
    },
    orderable: {
      type: Boolean,
      default: false
    },
    paginate: {
      type: Boolean,
      default: true
    },
    perPage: {
      type: Number,
      default: 20,
      validator: function validator(value) {
        return value > 0;
      }
    },
    sorting: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    uri: {
      type: String,
      default: null
    }
  },
  methods: _objectSpread2({
    /**
     * Get the items
     */
    getItems: function getItems() {
      var _this = this;

      var axios$1 = axios;

      var qs$1 = qs;

      var options = {
        params: {
          columns: this.columns,
          page: this.page,
          filters: this.filters,
          perPage: this.perPage,
          search: this.search,
          sorting: this.currentSorting
        },
        paramsSerializer: function paramsSerializer(params) {
          return qs$1.stringify(params);
        }
      };
      axios$1.get(this.uri, options).then(function (response) {
        if (Object.prototype.hasOwnProperty.call(response.data, _this.dataKey)) {
          _this.items = response.data[_this.dataKey];
        }

        if (Object.prototype.hasOwnProperty.call(response.data, _this.metaKey)) {
          var _response$data$_this$;

          _this.totalItems = (_response$data$_this$ = response.data[_this.metaKey].total) !== null && _response$data$_this$ !== void 0 ? _response$data$_this$ : _this.items.length;
        }

        _this.$emit('update:items', _this.items);
      });
    },

    /**
     * Returns the searchable columns
     *
     * @return {array}
     */
    getSearchableColumns: function getSearchableColumns() {
      var columns = this.columns.filter(function (column) {
        return column.searchable;
      });
      return columns;
    },

    /**
     * Checks whether the columns contain all the necessary properties
     * and whether these properties have been initialized correctly.
     */
    hydrateColumns: function hydrateColumns() {
      this.columns.forEach(function (column) {
        // Set name defaults
        if (!Object.prototype.hasOwnProperty.call(column, 'name')) {
          column.name = null;
        } // Set title defaults


        if (!Object.prototype.hasOwnProperty.call(column, 'title')) {
          column.title = '';
        } // Set sortable defaults


        if (!Object.prototype.hasOwnProperty.call(column, 'sortable') || typeof column.sortable !== 'boolean') {
          column.sortable = true;
        }
      });
    }
  }, Vuex.mapActions('sortingModule', {
    addSort: 'addSortAction'
  }), {}, Vuex.mapActions('paginationModule', {
    setPage: 'setPageAction'
  }), {}, Vuex.mapActions('filtersModule', {
    setFilter: 'addFilterAction'
  })),
  computed: _objectSpread2({
    /**
     * Checks whether the search form should be displayed. The form will
     * be displayed if there is at least one searchable column.
     *
     * @returns {boolean}
     */
    isSearchable: function isSearchable() {
      return this.getSearchableColumns().length > 0;
    }
  }, Vuex.mapState('filtersModule', ['filters']), {}, Vuex.mapState('sortingModule', {
    currentSorting: 'sorting'
  }), {}, Vuex.mapState('searchModule', {
    search: 'value'
  }), {}, Vuex.mapState('paginationModule', ['page'])),
  watch: {
    page: function page() {
      this.getItems();
    },
    currentSorting: function currentSorting() {
      this.getItems();
    },
    search: function search() {
      this.setPage(1);
      this.getItems();
    },
    filters: function filters() {
      this.setPage(1);
      this.getItems();
    }
  },
  created: function created() {
    this.hydrateColumns();
  },
  mounted: function mounted() {
    var _this2 = this;

    // Dispatch the sorting prop values
    this.sorting.forEach(function (sort) {
      return _this2.addSort(sort);
    }); // Register events

    this.$root.$on('filterOptionSelected', this.setFilter);

    if (this.uri !== null) {
      this.getItems();
    }
  }
};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<div class=\"card mb-4\">", "</div>", [_vm._ssrNode("<div class=\"card-body\">", "</div>", [_vm._ssrNode("<div class=\"form-row\">", "</div>", [_vm._t("filters"), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"col\">", "</div>", [_vm.isSearchable ? _c('vue-table-search-bar') : _vm._e()], 1)], 2)])]), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"card\">", "</div>", [_vm._ssrNode("<div class=\"card-body\">", "</div>", [_vm.items.length === 0 ? _vm._ssrNode("<div class=\"alert alert-info\">", "</div>", [_vm._ssrNode(_vm._ssrEscape("\n                " + _vm._s(_vm.lang.no_records) + "\n            "))], 2) : _vm._ssrNode("<div>", "</div>", [_vm._ssrNode("<div class=\"table-responsive\">", "</div>", [_vm._ssrNode("<table class=\"table table-striped\">", "</table>", [_vm._ssrNode("<thead>", "</thead>", [_vm._ssrNode("<tr>", "</tr>", [_vm._ssrNode((_vm.orderable ? "<th class=\"min-width\"></th>" : "<!---->") + " "), _vm._l(_vm.columns, function (column) {
    return _vm._ssrNode("<th" + _vm._ssrClass(null, column.headerClasses) + ">", "</th>", [_c('vue-table-heading', {
      attrs: {
        "column": column
      }
    })], 1);
  }), _vm._ssrNode(" " + (_vm.actions.slots.length ? "<th></th>" : "<!---->"))], 2)]), _vm._ssrNode(" "), _c('vue-draggable', {
    attrs: {
      "tag": "tbody",
      "handle": ".v-table-drag-handle",
      "disabled": !_vm.orderable
    },
    on: {
      "change": function change($event) {
        return _vm.$emit('itemsReordered', $event.moved.element, $event.moved.newIndex);
      }
    },
    model: {
      value: _vm.items,
      callback: function callback($$v) {
        _vm.items = $$v;
      },
      expression: "items"
    }
  }, _vm._l(_vm.items, function (item) {
    return _c('tr', {
      key: item.id
    }, [_vm.orderable ? _c('td', {
      staticClass: "min-width align-middle"
    }, [_c('button', {
      staticClass: "btn btn-sm v-table-drag-handle",
      attrs: {
        "type": "button"
      }
    }, [_c('i', {
      staticClass: "fas fa-arrows-alt-v"
    })])]) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, index) {
      return _c('td', {
        key: index,
        class: column.rowClasses
      }, [column.render && typeof column.render === 'function' ? [_c('div', {
        domProps: {
          "innerHTML": _vm._s(column.render(item))
        }
      })] : column.name ? [_vm._v("\n                                        " + _vm._s(item[column.name]) + "\n                                    ")] : _vm._e()], 2);
    }), _vm._v(" "), _vm.actions.slots.length ? _c('td', {
      staticClass: "v-table-options-wrapper min-width align-middle",
      class: _vm.actions.classes
    }, [_vm._l(_vm.actions.slots, function (action) {
      return _vm._t("action-" + action, null, {
        "item": item
      });
    })], 2) : _vm._e()], 2);
  }), 0)], 2)]), _vm._ssrNode(" "), _vm.paginate ? _c('vue-table-pagination', {
    attrs: {
      "per-page": _vm.perPage,
      "items": _vm.totalItems
    }
  }) : _vm._e()], 2)])])], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = "data-v-52037432";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);var filterColumn_directive = {
  name: 'filter-column',
  bind: function bind(el, binding, vnode) {
    var storedFilters = window.localStorage.getItem(filtersStorageName);
    storedFilters = storedFilters ? JSON.parse(storedFilters) : [];
    var storedFilter = storedFilters.find(function (filter) {
      return filter.column == binding.arg;
    });

    if (typeof storedFilter !== 'undefined') {
      _toConsumableArray(el.options).filter(function (option) {
        return storedFilter.values.includes(option.value);
      }).map(function (option) {
        return option.setAttribute('selected', true);
      });
    }

    el.addEventListener('change', function (event) {
      var selectedValues = _toConsumableArray(event.target.options).filter(function (option) {
        return option.selected && option.value;
      }).map(function (option) {
        return option.value;
      });

      var payload = {
        column: binding.arg,
        values: selectedValues
      };
      vnode.context.$root.$emit('filterOptionSelected', payload);
    });
  }
};var install = function installVueTable(Vue) {
  if (install.installed) {
    return;
  }

  install.installed = true;
  Vue.component('VueTable', __vue_component__$3);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$3.install = install; // Export component by default
exports.VueTable=__vue_component__$3;exports.filterColumn=filterColumn_directive;