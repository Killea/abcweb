<template>
  <div>
    <object
      data="./assets/javascript-entry-level.md"
      width="300"
      height="200"
    ></object>
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
  created() {},
  data() {
    return {
      text: `
## Code
Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
| 测试    | extension to be used for dest files. |
`,
    };
  },
};
</script>