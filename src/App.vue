<template>
  <div id="app">
    <Header></Header>
    <div class="jumbotron jumb bg-info text-light">
      <p class="lead">Özellikler denemek için bir resim yükleyin.</p>
      <hr class="my-4" />
      <div class="pic">
        <picture-input
          ref="pictureInput"
          margin="16"
          accept="image/*"
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
import Header from "./components/Header";
export default {
  name: "app",
  components: { Header, PictureInput },
  data() {
    return {
      resimdata: null
    };
  },
  methods: {
    onChange(image) {
      console.log("Resim seçildi");
      this.resimdata = image;
      if (image) {
        console.log("Resim Yüklendi");
        this.image = image;
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
