import Vue from "vue";

import "./styles/quasar.scss";
import "quasar/dist/quasar.ie.polyfills";
import iconSet from "quasar/icon-set/material-icons-outlined.js";
import lang from "quasar/lang/ko-kr.js";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import { Quasar } from "quasar";

Vue.use(Quasar, {
  config: {},
  plugins: {},
  lang: lang,
  iconSet: iconSet
});
