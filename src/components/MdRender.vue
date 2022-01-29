<template>
  <div v-if="text">
    <vue-markdown>
      {{ text }}
    </vue-markdown>
  </div>
</template>
<script>
import VueMarkdown from "vue-markdown";

import Prism from "prismjs";
// import "prismjs/themes/prism-okaidia.css"; // theme
// import "prismjs/components/prism-javascript.min"; // language
// import "prismjs/components/prism-go.min"; // language

export default {
  components: {
    VueMarkdown,
  },
  props: {
    path: {
      type: String,
      default: null,
    },
  },
  async mounted() {
    const response = await fetch(`${this.path}.md`);
    this.text = await response.text();
    this.$nextTick(() => {
      Prism.highlightAll();
    });
  },
  computed: {},
  data() {
    return {
      text: null,
      mdKey: 0,
    };
  },
};
</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css";
.vnb__menu-options__option__link {
  font-size: 16px;
}
</style>