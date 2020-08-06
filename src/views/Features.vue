<template>
  <div
    class="container d-flex mt-5 flex-row flex-wrap justify-content-between align-items-md-start"
  >
    <div v-for="item in featuresList">
      <span :class="'badge feature-title mt-5  head-text badge-'+item.css">{{item.title}}</span>
      <ul>
        <li class="feature-name" v-for="feature in item.features">{{feature}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      featuresList: [
        { title: "PreProcess", features: ["Gray Scale"], css: "success" },
        {
          title: "Filtering",
          features: [
            "Blur Filter",
            "Sharpening Filter",
            "Median Filter",
            "Sobel Filter",
          ],
          css: "danger",
        },
        {
          title: "Morphological",
          features: [
            "color to black-white",
            "Dilation",
            "Erosion",
            "Opening",
            "Closing",
          ],
          css: "secondary",
        },
        {
          title: "Segmentation",
          features: ["Threshold"],
          css: "warning",
        },
      ],
    };
  },
};
</script>
<style scoped>
.feature-title {
  font-size: 25px;
  letter-spacing: 1.2px;
}
.feature-name {
  font-size: 20px;
}
</style>