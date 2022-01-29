<template>
  <div id="app">
    <div class="menu-bar">
      <vue-navigation-bar
        :options="navbarOptions"
        @vnb-item-clicked="menuClick"
      />
    </div>
    <div class="body-item">
      {{ currentPath }}
      <template v-if="currentPath === '/javascript-entry-level'">
        <img alt="Vue logo" src="./assets/logo.png" />
        <JavaScriptEntryLevel msg="Welcome to Your Vue.js App" />
      </template>
    </div>

    <!--  -->
  </div>
</template>

<script>
import JavaScriptEntryLevel from "./components/JavaScriptEntryLevel.vue";
import Vue from "vue";
import "vue-navigation-bar/dist/vue-navigation-bar.css";

// import the library
import VueNavigationBar from "vue-navigation-bar";
Vue.component("vue-navigation-bar", VueNavigationBar);

export default {
  name: "App",
  components: {
    JavaScriptEntryLevel,
  },

  data() {
    return {
      currentPath: "/",
      navbarOptions: {
        elementId: "main-navbar",
        isUsingVueRouter: false,
        mobileBreakpoint: 992,
        brandImageAltText: "brand-image",
        collapseButtonOpenColor: "#661c23",
        collapseButtonCloseColor: "#661c23",
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: "Main Navigation",
        tooltipAnimationType: "shift-away",
        tooltipPlacement: "bottom",
        menuOptionsLeft: [
          {
            type: "link",
            text: "Coding lessons",
            arrowColor: "#659CC8",
            subMenuOptions: [
              // {
              //   isLinkAction: true,
              //   type: "link",
              //   text: "About",
              //   subText: "Stupid corporate wet blankets. Like booze ever killed anyone.",
              //   path: { name: "about" },
              //   iconLeft: '<i class="fa fa-star fa-fw"></i>'
              // },
              // {
              //   type: "hr",
              // },
              {
                isLinkAction: true,
                type: "link",
                text: "JavaScript Entry Level",
                subText: "Join now! Enrolling~",
                path: { name: "locations" },
                arrowColor: "#659CC8",
              },
              {
                isLinkAction: true,
                type: "link",
                text: "JavaScript Mid Level",
                subText: "Coming soon",
                path: { name: "locations" },
                arrowColor: "#659CC8",
              },
              // {
              //   type: "hr",
              // },
              // {
              //   type: "link",
              //   text: "Blog",
              //   subText: "I enjoy having breakfast in bed. I like waking up to the smell of bacon. Sue me.",
              //   path: { name: "blog" }
              // },
            ],
          },
          {
            isLinkAction: true,
            type: "link",
            text: "About us",
            subMenuOptions: [
              {
                isLinkAction: true,
                type: "link",
                text: "Contact us",
                path: { name: "customer-service" },
              },
              // {
              //   type: "link",
              //   text: "Accounting",
              //   path: { name: "accounting" },
              // },
              // {
              //   type: "hr",
              // },
              // {
              //   type: "link",
              //   text: "Reception",
              //   path: { name: "reception"},
              //   iconLeft: '<svg id="i-telephone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M3 12 C3 5 10 5 16 5 22 5 29 5 29 12 29 20 22 11 22 11 L10 11 C10 11 3 20 3 12 Z M11 14 C11 14 6 19 6 28 L26 28 C26 19 21 14 21 14 L11 14 Z" /> <circle cx="16" cy="21" r="4" /> </svg>',
              // },
            ],
          },
          {
            isLinkAction: true,
            type: "link",
            text: "Blog",
            path: { name: "blog" },
            iconRight: '<i class="fa fa-long-arrow-right fa-fw"></i>',
          },
        ],
        // menuOptionsRight: [
        //   {
        //     type: "button",
        //     text: "Signup",
        //     path: { name: "signup" },
        //     class: "button-red"
        //   },
        //   {
        //     type: "button",
        //     text: "Login",
        //     path: { name: "login" },
        //     iconRight: '<svg id="i-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M22 6 L30 16 22 26 M30 16 L2 16" /> </svg>'
        //   }
        // ]
      },
    };
  },
  created() {
    console.log(window.location.pathname);
    this.currentPath = window.location.pathname;
  },
  mounted() {
    window.addEventListener("popstate", this.handleHistoryChange);
  },
  computed: {},
  methods: {
    menuClick($event) {
      const pathName = `${$event.replaceAll(" ", "-").toLowerCase()}`;

      if(window.location.pathname==="/[object%20Object]")
      {
        return;
      }
      
      window.history.pushState(pathName, pathName, pathName);
      this.currentPath = window.location.pathname;
      console.log($event, window.location.pathname);
    },
    handleHistoryChange() {
      if(window.location.pathname==="/[object%20Object]")
      {
        return;
      }
      console.log("💰", window.location.pathname);
      this.currentPath = window.location.pathname;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.menu-bar {
  margin-left: 200px;
  margin-right: 200px;
}
.body-item {
  margin-left: 240px;
  margin-right: 240px;
  height: 92vh;
}
</style>
