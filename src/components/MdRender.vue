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
  async mounted() {
    const response = await fetch("/javascript-entry-level.md");
    this.text = await response.text();
    console.log(this.text)
  },
  computed:{ 
  },
  data() {
    return {
      text: null
    };
  },
};
</script>