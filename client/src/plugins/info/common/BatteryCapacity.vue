<template>
  <svg :height="height" :width="width" :viewBox="viewBox">
    <rect
        v-for="n in 12"
        :height="blockHeight"
        :width="width"
        :x="0"
        :y="y(n)"
        :fill="n <= level ? fillColor : strokeColor"
    ></rect>
  </svg>
</template>

<script>
  export default {
    name: 'battery-capacity',
    props: {
      level: [String, Number],
      height: [String, Number],
      width: [String, Number],
      strokeWidth: [String, Number],
      strokeColor: String,
      fillColor: String
    },
    methods: {
      y(i) {
        return (12 - i) * this.blockHeightMargin;
      }
    },
    computed: {
      strokeMargin: function () {
        return parseInt(this.strokeWidth);
      },
      adjustedHeight: function () {
        return (this.height - (this.strokeMargin * 13));
      },
      blockHeight() {
        return this.adjustedHeight / 12;
      },
      blockHeightMargin() {
        return this.height / 12;
      },
      viewBox: function () {
        return `0 0 ${this.width} ${this.height}`
      }
    }
  }
</script>
