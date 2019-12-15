<template>
  <div class="jumb">
    <span class="badge badge-danger head-text">Filtering Menu</span>
    <canvas v-show="false" :width="width+'px'" :height="height+'px'" ref="my-canvas"></canvas>
    <div class="jumbotron bg-info">
      <div class="canvasPanel">
        <img ref="org-img" width="400px" class="imgClass" :src="image" alt />
      </div>
      <div class="process-buttons">
        <button class="btn btn-danger" @click="blurFilter">Blur filter</button>
        <button class="btn btn-danger">Sharpening filter</button>
        <button class="btn btn-danger">Median filter</button>
        <button class="btn btn-danger">Laplace filter</button>
        <button class="btn btn-danger" @click="sobelFilter">Sobel filter</button>
      </div>
    </div>

    <div class="result" v-show="resultEnabled">
      <span class="badge badge-danger head-text">Result</span>
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
      width: null,
      height: null,
      resultEnabled: 0,
      provider: {
        context: null
      }
    };
  },
  methods: {
    blurFilter() {
      var imageData = this.$refs["my-canvas"]
        .getContext("2d")
        .getImageData(0, 0, this.width, this.height);
      var imageDataProcess = this.$refs["my-canvas"]
        .getContext("2d")
        .getImageData(0, 0, this.width, this.height);
      var data = imageData.data;
      var dataProcess = imageDataProcess.data;

      var AvgR = 0,
        AvgG = 0,
        AvgB = 0;
      for (var x = 1; x < this.width - 1; x++) {
        for (var y = 1; y < this.height - 1; y++) {
          var sumR = 0;
          var sumG = 0;
          var sumB = 0;

          var k = 0;
          for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
              var loc = ((y + j) * this.width + (x + i)) * 4;
              sumR = sumR + data[loc];
              sumG = sumG + data[loc + 1];
              sumB = sumB + data[loc + 2];
            }
          }
          AvgR = sumR / 9;
          AvgG = sumG / 9;
          AvgB = sumB / 9;
          var last_loc = (y * this.width + x) * 4;
          dataProcess[last_loc] = AvgR;
          dataProcess[last_loc + 1] = AvgG;
          dataProcess[last_loc + 2] = AvgB;
        }
        setTimeout(() => {
          this.$refs["my-canvas"]
            .getContext("2d")
            .putImageData(imageDataProcess, 0, 0);
          this.resultEnabled = 1;

          // Convert to Canvas image data to normal image----
          var dataURL = this.$refs["my-canvas"].toDataURL();
          this.$refs["result-img"].src = dataURL;
          //-----------x---------------x----------------------
          this.processingImage = this.$refs["result-img"].src;
        }, 1000);
      }
    },
    sobelFilter() {
      var imageData = this.$refs["my-canvas"]
        .getContext("2d")
        .getImageData(0, 0, this.width, this.height);
      var imageDataProcess = this.$refs["my-canvas"]
        .getContext("2d")
        .getImageData(0, 0, this.width, this.height);
      var data = imageData.data;
      var dataProcess = imageDataProcess.data;

      for (var x = 1; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          var loc = (y * this.width + x) * 4;
          var leftloc = (y * this.width + (x - 1)) * 4;

          for (var i = 0; i < 3; i++) {
            dataProcess[loc + i] = data[loc] - data[leftloc];
          }
        }
      }
      setTimeout(() => {
        this.$refs["my-canvas"]
          .getContext("2d")
          .putImageData(imageDataProcess, 0, 0);
        this.resultEnabled = 1;

        // Convert to Canvas image data to normal image----
        var dataURL = this.$refs["my-canvas"].toDataURL();
        this.$refs["result-img"].src = dataURL;
        //-----------x---------------x----------------------
        this.processingImage = this.$refs["result-img"].src;
      }, 1000);
    }
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

  created() {
    //-- named route path for next button ----------------
    this.$store.dispatch("routeNameSet", "morphological-menu");
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