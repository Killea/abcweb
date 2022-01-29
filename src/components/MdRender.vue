<template>
  <div v-if="text">
    <vue-markdown>
      {{ text }}
    </vue-markdown>
  </div>
</template>
<script>
import VueMarkdown from "vue-markdown";
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
  // watch: {
  //   // whenever question changes, this function will run
  //   path: async function (newPath) {
  //     const response = await fetch(`${newPath}.md`);
  //     this.text = await response.text();
  //     this.mdKey++;
  //   },
  // },
  async mounted() {
    const response = await fetch(`${this.path}.md`);
    this.text = await response.text();
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