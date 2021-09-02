import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "./index.css";
import "./assets/tailwind.css";
import { initializeApp } from "firebase/app";
import Ripple from "vue-ripple-directive";
import { VTooltip, VPopover, VClosePopover } from "v-tooltip";
import VueSession from "vue-session";
import VModal from "vue-js-modal";
const VueScrollTo = require("vue-scrollto");

Vue.config.productionTip = false;

Vue.directive("ripple", Ripple);
Vue.directive("tooltip", VTooltip);
Vue.directive("close-popover", VClosePopover);
Vue.component("v-popover", VPopover);
Vue.use(VueScrollTo);
Vue.use(VueSession, {
  persist: true,
});
Vue.use(VModal);

const firebaseConfig = {
  apiKey: "AIzaSyB_OYDcJH3A80r2w7QqsyeUd0piiPrmxnA",
  authDomain: "hack-night-development.firebaseapp.com",
  projectId: "hack-night-development",
  storageBucket: "hack-night-development.appspot.com",
  messagingSenderId: "675886570421",
  appId: "1:675886570421:web:e333b088d04afede30d7fc",
};

initializeApp(firebaseConfig);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
