<template>
  <div id="app">
    <div class="menu-bar">
      <vue-navigation-bar
        :options="navbarOptions"
        @vnb-item-clicked="menuClick"
      />
    </div>
    <div class="body-item"></div>

    <el-row :gutter="10">
      <el-col :xs="1" :sm="1" :md="1" :lg="4" :xl="4"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xs="22" :sm="22" :md="22" :lg="16" :xl="16">
        <div class="grid-content bg-purple-light">
          <MdRender :path="currentPath" :key="mdKey" /></div
      ></el-col>
      <el-col :xs="1" :sm="1" :md="1" :lg="4" :xl="4"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
import "vue-navigation-bar/dist/vue-navigation-bar.css";
import MdRender from "./components/MdRender.vue";
// import the library
import VueNavigationBar from "vue-navigation-bar";
Vue.component("vue-navigation-bar", VueNavigationBar);

export default {
  name: "App",
  components: {
    MdRender,
  },

  data() {
    return {
      mdKey: 0,
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
            isLinkAction: true,
            type: "link",
            text: "Home",
            path: { name: "home" },
            iconRight: '<i class="fa fa-long-arrow-right fa-fw"></i>',
          },
          {
            isLinkAction: true,
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
              {
                type: "hr",
              },
              { 
                isLinkAction: true,
                type: "link",
                text: "Message board",
                path: { name: "msg_board"},
              },
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

       if (window.location.pathname === "/") {
        this.currentPath = '/home'
        this.mdKey++;
        return;
      }

    this.currentPath = window.location.pathname;

    
  },
  mounted() {
    window.addEventListener("popstate", this.handleHistoryChange);
  },
  computed: {},
  methods: {
    menuClick($event) {
      let pathName = `${$event.replaceAll(" ", "-").toLowerCase()}`;

      if (window.location.pathname === "/[object%20Object]") {
        return;
      }


      console.log(222, pathName)

      window.history.pushState(pathName, pathName, pathName);
      this.currentPath = window.location.pathname;
      console.log("ℹ️", $event, window.location.pathname);
      this.mdKey++;
    },
    handleHistoryChange() {
      if (window.location.pathname === "/[object%20Object]") {
        return;
      }

       if (window.location.pathname === "/") {
        this.currentPath = '/home'
        this.mdKey++;
        return;
      }

      console.log("💰", window.location.pathname);
      this.currentPath = window.location.pathname;
      this.mdKey++;
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

.vnb__menu-options__option__link {
  font-size: 16px;
}
.vnb__sub-menu-options__option__link__text-wrapper__sub-text {
  font-size: 10px;
}
.grid-content {
  min-height: 36px;
}

body {
  overflow-x: hidden; /* Hide horizontal scrollbar */
}
</style>
