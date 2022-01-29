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
</style>