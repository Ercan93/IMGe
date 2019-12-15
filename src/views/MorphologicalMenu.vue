<template>
  <div class="jumb">
    <span class="badge badge-secondary head-text">Morphological Menu</span>
    <canvas v-show="false" :width="width+'px'" :height="height+'px'" ref="my-canvas"></canvas>
    <div class="jumbotron bg-info">
      <div class="canvasPanel">
        <img ref="org-img" width="400px" class="imgClass" :src="image" alt />
      </div>
      <div class="process-buttons">
        <button class="btn btn-secondary">Dilation</button>
        <button class="btn btn-secondary" @click="erosion">Erosion</button>
        <button class="btn btn-secondary">Opening</button>
        <button class="btn btn-secondary">Closing</button>
      </div>
    </div>

    <div class="result" v-show="resultEnabled">
      <span class="badge badge-secondary head-text">Result</span>
      <img width="500px" ref="result-img" class="resultImg" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      image: null,
      imageData: null,
      processingImage: null,
      myCanvas: null,
      thresoldValue: null,
      width: null,
      height: null,
      resultEnabled: 0,
      provider: {
        context: null
      }
    };
  },

  mounted() {
    //-- Get image in store -------------------------------
    this.image = this.$store.getters.processingImageGetters;
    if (this.image == null) {
      this.image = this.$store.getters.sourceImageGetters;
    }
    //--x----------------x------------------x----------------

    //-- Get image width and height data in store --------
    var imgData = this.$store.getters.imageSrcGetters;
    this.height = imgData.height;
    this.width = imgData.width;
    console.log(imgData.height);
    //----x--------------x--------------x----------------

    //-- Canvas preliminary operations ------------------------------
    this.provider.context = this.$refs["my-canvas"].getContext("2d");
    //--x--------------x-----------------x-------------x-------------
  },
  methods: {
    canvasGetImgData() {
      this.imageData = this.$refs["my-canvas"]
        .getContext("2d")
        .getImageData(0, 0, this.width, this.height);
      this.imageDataProcess = this.$refs["my-canvas"]
        .getContext("2d")
        .getImageData(0, 0, this.width, this.height);
    },
    canvasSetImgData() {
      this.$refs["my-canvas"]
        .getContext("2d")
        .putImageData(this.imageDataProcess, 0, 0);
      this.resultEnabled = 1;

      // Convert to Canvas image data to normal image----
      var dataURL = this.$refs["my-canvas"].toDataURL();
      this.$refs["result-img"].src = dataURL;
      //-----------x---------------x----------------------
      this.processingImage = this.$refs["result-img"].src;
    },
    erosion() {
      this.canvasGetImgData();
      this.thresoldValue = this.thresold();
      this.colorToBlackWhite();

      for (var i = 1; i < this.width; i++) {
        for (var j = 1; j < this.height; j++) {
          var sum = 0;
          for (var n = 0; n < 3; n++) {
            for (var m = 0; m < 3; m++) {
              var veri = ((j - 1 + m) * this.width + (i - 1 + n)) * 4;
              sum += this.imageData.data[veri];
            }
          }
          var sira = (j * this.width + i) * 4;
          if (sum > 254) {
            this.imageDataProcess.data[sira] = 255;
            this.imageDataProcess.data[sira + 1] = 255;
            this.imageDataProcess.data[sira + 2] = 255;
          }

          sum = 0;
        }
      }
      setTimeout(() => {
        this.canvasSetImgData();
      }, 500);
    },
    thresold() {
      var colorSum = 0;
      for (var i = 0; i < this.imageData.data.length; i += 4) {
        var avg =
          (this.imageData.data[i] +
            this.imageData.data[i + 1] +
            this.imageData.data[i + 2]) /
          3;
        colorSum += avg;
      }
      var brightness = Math.floor(colorSum / (this.width * this.height));
      console.log(brightness);
      return brightness;
    },
    colorToBlackWhite() {
      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          var loc = (y * this.width + x) * 4;
          var avg =
            (this.imageData.data[loc] +
              this.imageData.data[loc + 1] +
              this.imageData.data[loc + 2]) /
            3;
          if (avg > this.threshold) {
            this.imageDataProcess.data[loc] = 255;
            this.imageDataProcess.data[loc + 1] = 255;
            this.imageDataProcess.data[loc + 2] = 255; // White
          } else {
            this.imageDataProcess.data[loc] = 0;
            this.imageDataProcess.data[loc + 1] = 0;
            this.imageDataProcess.data[loc + 2] = 0; // Black
          }
        }
      }
    }
  },
  created() {
    //-- named route path for next button ----------------
    this.$store.dispatch("routeNameSet", "segmentation-menu");
    //-------------x------------------x-------------------

    //-- Press image to canvas --------------------------
    setTimeout(() => {
      var ImageData = new Image();
      ImageData.src = this.image;
      this.provider.context.drawImage(ImageData, 0, 0);
    }, 500);
    //----x-----------------x---------------x------------
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("processingImageSet", this.processingImage);
    next();
  }
};
</script>

<style scoped>
.jumb {
  margin-left: 100px;
  margin-top: 15px;
  display: block;
}
.jumbotron {
  margin-top: 14px;
  height: 450px;
  width: 600px;
  display: flex;
  justify-content: space-around;
}
.result {
  float: right;
  justify-content: center;
  width: 200px;
  height: 300px;
  margin-top: -490px;
  margin-right: 365px;
}

.resultImg {
  margin-top: 10px;
  border: 3px solid black;
  border-radius: 5px;
}
.head-text {
  font-size: 25px;
}
span.head-text {
  border: 2px solid black;
}
.process-buttons {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}
.process-buttons button {
  margin-bottom: 15px;
  margin-top: -5px;
  margin-left: 15px;
}
</style>