"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 477:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./src/layouts/components/navbar/index.tsx



const Navbar = () => {
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {});
};

/* harmony default export */ const navbar = (Navbar);
;// CONCATENATED MODULE: ./src/layouts/components/footer/index.tsx



const Footer = () => {
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {});
};

/* harmony default export */ const footer = (Footer);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
;// CONCATENATED MODULE: ./src/layouts/index.styles.ts

const Styled = {
  Wrapper: external_styled_components_default().div.withConfig({
    displayName: "indexstyles__Wrapper",
    componentId: "sc-n5e0ir-0"
  })([""]),
  Container: external_styled_components_default().section.withConfig({
    displayName: "indexstyles__Container",
    componentId: "sc-n5e0ir-1"
  })([""])
};
/* harmony default export */ const index_styles = (Styled);
;// CONCATENATED MODULE: ./src/layouts/index.tsx






const Layout = ({
  children
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(index_styles.Wrapper, {
    id: "onTop",
    children: [/*#__PURE__*/jsx_runtime_.jsx(navbar, {}), /*#__PURE__*/jsx_runtime_.jsx(index_styles.Container, {
      children: children
    }), /*#__PURE__*/jsx_runtime_.jsx(footer, {})]
  });
};

/* harmony default export */ const layouts = (Layout);
;// CONCATENATED MODULE: ./src/pages/_app.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function MyApp({
  Component,
  pageProps
}) {
  const getLayout = Component.getLayout ?? (page => /*#__PURE__*/jsx_runtime_.jsx(layouts, {
    children: page
  }));

  return getLayout( /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps)));
}

/* harmony default export */ const _app = (MyApp);

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 518:
/***/ ((module) => {

module.exports = require("styled-components");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(477));
module.exports = __webpack_exports__;

})();