<template>
  <svg :height="height" :width="width" :viewBox="viewBox">
    <rect :height="top.height" :width="top.width" :x="top.x" :y="top.y" stroke="#808080" :stroke-width="strokeWidth" fill-opacity="0"></rect>
    <rect :height="outline.height" :width="outline.width" :x="outline.x" :y="outline.y" stroke="#808080" :stroke-width="strokeWidth" fill-opacity="0"></rect>
    <rect :height="inner.height" :width="inner.width" :x="inner.x" :y="inner.y" fill="#1976d2"></rect>
  </svg>
</template>

<script>
  export default {
    props: ['level', 'height', 'width', 'strokeWidth'],
    data() {
      return {}
    },
    computed: {
      strokeMargin: function() {
        return parseInt(this.strokeWidth);
      },
      widthLessMargin: function() {
        return this.width - (this.strokeMargin * 2);
      },
      adjustedHeight: function () {
        return (this.height - this.top.height - (this.strokeMargin * 2) - (this.gap * 2)) * (this.level / 12.0);
      },
      gap: function () {
        return 5;
      },
      top: function () {
        return {
          x: this.width / 3,
          y: this.strokeMargin,
          width: this.width / 3,
          height: this.height * 0.1 - this.strokeMargin
        }
      },
      outline: function () {
        return {
          x: this.strokeMargin,
          y: this.height * 0.1,
          width: this.widthLessMargin,
          height: this.height * 0.9 - this.strokeMargin
        }
      },
      inner: function () {
        return {
          x: this.strokeMargin + this.gap,
          y: this.height -  this.adjustedHeight - this.strokeMargin - this.gap,
          width: this.widthLessMargin - 10,
          height: this.adjustedHeight
        }
      },
      viewBox: function () {
        return `0 0 ${this.width} ${this.height}`
      }
    }
  }
</script>
