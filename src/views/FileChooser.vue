<template>
  <div>
    <div class="jumbotron jumb bg-info text-light">
      <p class="lead">Özellikler denemek için bir resim yükleyin.</p>
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
        drag: 'Bir resim sürükle 😺'
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
      console.log("Resim seçildi");
      if (image) {
        console.log("Resim Yüklendi");
        this.$store.dispatch("sourceImageSet", image);
        setTimeout(() => {
          this.$router.push({ name: "pre-process" });
        }, 1000);
      } else {
        console.log("Ahbab yanlış yoldasın!!");
      }
    }
  }
};
</script>

<style scoped>
.jumb {
  margin-left: 350px;
  margin-right: 350px;
  margin-top: 50px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pic {
  justify-content: center;
  height: 300px;
  width: 300px;
}
</style>
