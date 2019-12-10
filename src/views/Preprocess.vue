<template>
  <div>
    <h1>Preprocess menu</h1>
    <img :src="imageData" alt />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      imageData: null
    };
  },
  computed: {
    ...mapGetters({ imageData: "sourceImageGetters" })
  }
};
</script>