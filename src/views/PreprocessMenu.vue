<template>
  <div class="jumb">
    <span class="badge badge-success head-text">PreProcess Menu</span>
    <img :src="image" id="orgImg" v-show="false" />
    <canvas v-show="false" :width="width+'px'" :height="height+'px'" ref="my-canvas"></canvas>
    <div class="jumbotron bg-info">
      <div class="canvasPanel">
        <img ref="org-img" width="400px" class="imgClass" :src="image" alt />
      </div>
      <div class="process-buttons">
        <button class="btn btn-success" @click="grayScale">Gray Scale</button>
        <button class="btn btn-success">Image zoom</button>
        <button class="btn btn-success">Image Resize</button>
        <button class="btn btn-success">Image Crop</button>
      </div>
    </div>
    <div class="result" v-show="resultEnabled">
      <span class="badge badge-success head-text">Result</span>
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
      myCanvas: null,
      height: null,
      width: null,
      resultEnabled: 0,
      provider: {
        context: null
      }
    };
  },

  mounted() {
    //-- Get image in store ----------------------------
    this.image = this.$store.getters.sourceImageGetters;
    //--x----------------x------------------x----------
    //-- Canvas preliminary operations ------------------------------
    this.provider.context = this.$refs["my-canvas"].getContext("2d");
    //--x--------------x-----------------x-------------x-------------
  },

  methods: {
    grayScale() {
      this.canvasGetImgData();

      for (var i = 0; i < this.imageDataProcess.data.length; i += 4) {
        var avg =
          (this.imageDataProcess.data[i] +
            this.imageDataProcess.data[i + 1] +
            this.imageDataProcess.data[i + 2]) /
          3;
        this.imageDataProcess.data[i] = avg; // red
        this.imageDataProcess.data[i + 1] = avg; // green
        this.imageDataProcess.data[i + 2] = avg; // blue
      }
      setTimeout(() => {
        this.canvasSetImgData();
      }, 1000);
    },
    siyah_beyaz_cevirme() {
      var imageDataCopy = this.$refs["my-canvas"]
        .getContext("2d")
        .getImageData(0, 0, this.width, this.height);
      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          var loc = (y * this.width + x) * 4;
          var avg =
            (imageDataCopy.data[loc] +
              imageDataCopy.data[loc + 1] +
              imageDataCopy.data[loc + 2]) /
            3;
          if (avg > 138) {
            imageDataCopy.data[loc] = 255;
            imageDataCopy.data[loc + 1] = 255;
            imageDataCopy.data[loc + 2] = 255; // White
          } else {
            imageDataCopy.data[loc] = 0;
            imageDataCopy.data[loc + 1] = 0;
            imageDataCopy.data[loc + 2] = 0; // Black
          }
        }
      }
      setTimeout(() => {
        this.$refs["my-canvas"]
          .getContext("2d")
          .putImageData(imageDataCopy, 0, 0);
        this.resultEnabled = 1;

        var dataURL = this.$refs["my-canvas"].toDataURL();
        this.$refs["result-img"].src = dataURL;

        this.processingImage = this.$refs["result-img"].src;
      }, 1000);
    },
    getCursorPosition(canvas, event, control) {
      var rect = canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      if (control == "md") {
        leftData[0] = x;
        leftData[1] = y;
        console.log("mouse down " + leftData);
      } else {
        rightData[0] = x;
        rightData[1] = y;
        console.log("mouse up " + rightData);
      }
    },
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
    }
  },

  created() {
    //-- named route path for next button ----------------
    this.$store.dispatch("routeNameSet", "filtering-menu");
    //-------------x------------------x-------------------

    setTimeout(() => {
      //-- Take the height and width of the image  ----------------
      var imgWidth = document.getElementById("orgImg").width;
      var imgHeight = document.getElementById("orgImg").height;
      this.width = imgWidth;
      this.height = imgHeight;
      //--x---------------x----------------x--------------------

      //-- Sending the height and width to store ---------------
      this.$store.dispatch("imageSrcSet", {
        width: imgWidth,
        height: imgHeight
      });
      //--x-------------------x--------------x-------------------
    }, 500);

    //-- Press image to canvas --------------------------
    setTimeout(() => {
      var ImageData = new Image();
      ImageData.src = this.image;
      this.provider.context.drawImage(ImageData, 0, 0);
    }, 1000);
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
  margin-top: -530px;
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