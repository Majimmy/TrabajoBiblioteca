<template>
  <div id="app">
    <p>original message: "{{ message }}"</p>
    <p>reversed message: "{{ reversedMessage }}"</p>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      message: "Hello"
    };
  },
  computed: {
    reversedMessage() {
      return this.message
        .split("")
        .reverse()
        .join("");
    }
  }
};
</script>
