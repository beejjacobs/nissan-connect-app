<template>
  <svg :height="height" :width="width" :viewBox="viewBox">
    <rect
        :height="top.height"
        :width="top.width"
        :x="top.x"
        :y="top.y"
        :stroke="strokeColor"
        :stroke-width="strokeWidth"
        fill-opacity="0.5"
        :fill="strokeColor"></rect>
    <rect
        :height="outline.height"
        :width="outline.width"
        :x="outline.x"
        :y="outline.y"
        :stroke="strokeColor"
        :stroke-width="strokeWidth"
        fill-opacity="0"></rect>
    <rect
        :height="inner.height"
        :width="inner.width"
        :x="inner.x"
        :y="inner.y"
        :fill="fillColor"></rect>
    <polygon
        v-if="charging"
        :points="chargingPoints"
        :stroke="strokeColor"
        stroke-width="2"
        :fill="chargingColor"
        :transform="chargingRotate"></polygon>
  </svg>
</template>

<script>
  export default {
    name: 'battery-level',
    props: {
      level: [String, Number],
      height: [String, Number],
      width: [String, Number],
      strokeWidth: [String, Number],
      strokeColor: String,
      fillColor: String,
      charging: Boolean,
      chargingColor: {
        type: String,
        default: 'yellow'
      }
    },
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
      chargingPoints: function () {
        let height = this.outline.height * 0.8;
        let width = this.width * 0.2;
        let x = this.width / 2;
        let y = this.outline.height * 0.1 + this.outline.y;
        let points = [
          [x, y],
          [x, y + (height * 0.45)],
          [x + width,  y + (height * 0.45)],
          [x, y + height],
          [x, y + (height * 0.55)],
          [x - width, y + (height * 0.55)]
        ];

        return points.reduce((out, value) => out + ' ' + value[0] + ',' + value[1], '');
      },
      chargingRotate: function () {
        return `rotate(5 ${this.width/2} ${this.height/2})`
      },
      viewBox: function () {
        return `0 0 ${this.width} ${this.height}`
      }
    }
  }
</script>
