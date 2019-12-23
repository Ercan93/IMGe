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
        <button class="btn btn-danger" @click="sharpeningFilter">Sharpening filter</button>
        <button class="btn btn-danger" @click="medianFilter">Median filter</button>
        <button class="btn btn-danger disabled">Laplace filter</button>
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
      imageDataProcess: null,
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
      setTimeout(() => {
        this.$store.dispatch("sourceImageSet", this.processingImage);
      }, 500);
    },
    blurFilter() {
      this.canvasGetImgData();
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
              sumR = sumR + this.imageData.data[loc];
              sumG = sumG + this.imageData.data[loc + 1];
              sumB = sumB + this.imageData.data[loc + 2];
            }
          }
          AvgR = sumR / 9;
          AvgG = sumG / 9;
          AvgB = sumB / 9;
          var last_loc = (y * this.width + x) * 4;
          this.imageDataProcess.data[last_loc] = AvgR;
          this.imageDataProcess.data[last_loc + 1] = AvgG;
          this.imageDataProcess.data[last_loc + 2] = AvgB;
        }
        setTimeout(() => {
          this.canvasSetImgData();
        }, 500);
      }
    },
    sobelFilter() {
      this.canvasGetImgData();
      for (var x = 1; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          var loc = (y * this.width + x) * 4;
          var leftloc = (y * this.width + (x - 1)) * 4;

          for (var i = 0; i < 3; i++) {
            this.imageDataProcess.data[loc + i] =
              this.imageData.data[loc] - this.imageData.data[leftloc];
          }
        }
      }
      setTimeout(() => {
        this.canvasSetImgData();
      }, 500);
    },
    medianFilter() {
      this.canvasGetImgData();
      var arr_r = new Array(9).fill(0);
      var arr_g = new Array(9).fill(0);
      var arr_b = new Array(9).fill(0);
      var arr_gri = new Array(9).fill(0);

      for (var x = 1; x < this.width - 1; x++) {
        for (var y = 1; y < this.height - 1; y++) {
          var k = 0;
          for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
              var loc = ((y + j) * this.width + (x + i)) * 4;
              arr_r[k] = this.imageData.data[loc];
              arr_g[k] = this.imageData.data[loc + 1];
              arr_b[k] = this.imageData.data[loc + 2];

              arr_gri[k] = parseInt(
                arr_r[k] * 0.299 + arr_g[k] * 0.587 + arr_b[k] * 0.114
              );
              k++;
            }
          }

          for (var i = 0; i < 9; i++) {
            for (var j = i + 1; j < 9; j++) {
              if (arr_gri[j] < arr_gri[i]) {
                var temp1 = arr_gri[i];
                arr_gri[i] = arr_gri[j];
                arr_gri[j] = temp1;

                var temp2 = arr_b[i];
                arr_b[i] = arr_b[j];
                arr_b[j] = temp2;

                var temp3 = arr_r[i];
                arr_r[i] = arr_r[j];
                arr_r[j] = temp3;

                var temp4 = arr_g[i];
                arr_g[i] = arr_g[j];
                arr_g[j] = temp4;
              }
            }
          }
          var loc2 = (y * this.width + x) * 4;
          this.imageData.data[loc2] = arr_r[4];
          this.imageData.data[loc2 + 1] = arr_g[4];
          this.imageData.data[loc2 + 2] = arr_b[4];
        }
      }
      setTimeout(() => {
        this.canvasSetImgData();
      }, 500);
    },
    sharpeningFilter() {
      this.canvasGetImgData();
      var matris = [0, -2, 0, -2, 11, -2, 0, -2, 0];
      var MatrisToplami = 0 + -2 + 0 + -2 + 11 + -2 + 0 + -2 + 0;

      for (var x = 1; x < this.width - 1; x++) {
        for (var y = 1; y < this.height - 1; y++) {
          var toplamR = 0;
          var toplamG = 0;
          var toplamB = 0;
          var Red = 0,
            Green = 0,
            Blue = 0;
          var k = 0;
          for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
              var loc = ((y + j) * this.width + (x + i)) * 4;
              toplamR =
                toplamR + this.imageData.data[loc] * parseInt(matris[k]);
              toplamG =
                toplamG + this.imageData.data[loc + 1] * parseInt(matris[k]);
              toplamB =
                toplamB + this.imageData.data[loc + 2] * parseInt(matris[k]);
              Red = toplamR / MatrisToplami;
              Green = toplamG / MatrisToplami;
              Blue = toplamB / MatrisToplami;
              if (Red > 255) {
                Red = 255;
              }
              if (Green > 255) {
                Green = 255;
              }
              if (Blue > 255) {
                Blue = 255;
              }
              if (Red < 0) {
                Red = 0;
              }
              if (Green < 0) {
                Green = 0;
              }
              if (Blue < 0) {
                Blue = 0;
              }
              var loc2 = (y * this.width + x) * 4;
              this.imageDataProcess.data[loc2] = Red;
              this.imageDataProcess.data[loc2 + 1] = Green;
              this.imageDataProcess.data[loc2 + 2] = Blue;
              k++;
            }
          }
        }
      }
      setTimeout(() => {
        this.canvasSetImgData();
      }, 500);
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
  margin-top: 40px;
}
.process-buttons button {
  margin-bottom: 15px;
  margin-top: -5px;
  margin-left: 15px;
}
</style>