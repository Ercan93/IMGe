<template>
  <div class="container d-flex">
    <div class="jumbotron jumb bg-info text-light">
      <p class="lead">Upload an image to try out the features.</p>
      <hr class="my-4" />
      <div class="pic">
        <picture-input
          ref="pictureInput"
          margin="16"
          accept="image/*"
          :hideChangeButton="true"
          size="10"
          button-class="btn"
          :custom-strings="{
        upload: '<h1>Heyoo!</h1>',
        drag: 'Drag a picture 😺'
      }"
          @change="onChange"
        ></picture-input>
      </div>
    </div>
  </div>
</template>
<script>
import PictureInput from "vue-picture-input";

export default {
  components: { PictureInput },
  data() {
    return {};
  },
  methods: {
    onChange(image) {
      var img = new Image();
      img = image;
      console.log("Resim seçildi");
      if (img) {
        console.log("Resim Yüklendi");
        this.$store.dispatch("sourceImageSet", img);
      } else {
        console.log("Ahbab yanlış yoldasın!!");
      }
    },
  },
  created() {
    // named route path for next button
    this.$store.dispatch("routeNameSet", "pre-process-menu");
  },
};
</script>

<style scoped>
.jumb {
  margin-top: 50px;
  margin-left: 50px;
  height: 500px;
  display: flex;
  width: 70vw;
  flex-direction: column;
  align-items: center;
}
.pic {
  justify-content: center;
  height: 300px;
  width: 300px;
}
</style>
