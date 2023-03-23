<template>
  <div class="wx-echarts-container">
    <div class="chart" v-if="!isShowEmpty"></div>
    <div class="empty" v-else>
      <slot name="empty" />
    </div>
  </div>
</template>

<script>
import { isEmpty, get } from "lodash-es";
import { generateUUID } from "../../utils";
import { fullScreenIcon } from "./source";
const chartInstanceKey = "chart";
export default {
  name: "WxEcharts",
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
    showFullScreenSetting: {
      type: Boolean,
      default: true,
    },
    fullScreenIcon: {
      tpye: String,
      default: "",
    },
    isShowEmpty: {
      type: Boolean,
      default: false,
    },
    showLoading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: "加载中...",
    },
    loadingTextColor: {
      type: String,
      default: "#444",
    },
    loadingColor: {
      type: String,
      default: "#3275F7",
    },
    loadingMaskColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.01)",
    },
    renderer: {
      type: String,
      default: "canvas",
      validator(val) {
        return ["canvas", "svg"].includes(val);
      },
    },
  },

  data() {
    return {
      id: `chart-${generateUUID()}`,
    };
  },

  watch: {
    option: {
      handler(val) {
        this.setOption(val);
      },
      deep: true,
      immediate: true,
    },
    showLoading: {
      handler(val) {
        this.handleShowLoading(val);
      },
      immediate: true,
    },
  },

  methods: {
    initChart() {
      const el = this.$el.querySelector(".chart");
      if (el) {
        this[chartInstanceKey] = echarts.init(el, null, {
          renderer: this.renderer,
        });
        window.addEventListener("resize", this.resize);
      }
    },
    resize() {
      this[chartInstanceKey] && this[chartInstanceKey].resize();
    },
    async handleShowLoading(val) {
      if (val && !this[chartInstanceKey]) {
        let timer = null;
        await new Promise((resolve) => {
          setInterval(() => {
            this[chartInstanceKey] && resolve();
          }, 0);
        });
        clearInterval(timer);
        timer = null;
      }
      if (!this[chartInstanceKey]) return;
      if (val) {
        this[chartInstanceKey].showLoading({
          text: this.loadingText,
          color: this.loadingColor,
          textColor: this.loadingTextColor,
          maskColor: this.loadingMaskColor,
        });
      } else {
        this[chartInstanceKey].hideLoading();
      }
    },
    setOption(option) {
      if (isEmpty(option)) return;
      const postOption = this.mergeOption(option);
      this.$nextTick(() => {
        this[chartInstanceKey] &&
          this[chartInstanceKey].setOption(postOption, true);
      });
    },
    mergeOption(option) {
      let mo = option;
      if (this.showFullScreenSetting) {
        mo = this.fullScreenSetting(option);
      }
      return mo;
    },
    fullScreenSetting(option) {
      const that = this;
      return Object.assign(option, {
        toolbox: {
          ...get(option, "toolbox", {}),
          feature: {
            ...get(option, "toolbox.feature", {}),
            myFull: {
              show: true,
              title: "",
              icon: that.fullScreenIcon || fullScreenIcon,
              onclick: (e) => {
                // 全屏查看
                const domName = that.$el;
                if (domName.requestFullScreen) {
                  domName.requestFullScreen();
                } else if (domName.msRequestFullscreen) {
                  domName.msRequestFullScreen();
                } else if (domName.webkitRequestFullScreen) {
                  domName.webkitRequestFullScreen();
                } else if (domName.mozRequestFullScreen) {
                  domName.mozRequestFullScreen();
                }
                // 退出全屏
                if (domName.requestFullScreen) {
                  document.exitFullscreen();
                } else if (domName.msRequestFullScreen) {
                  document.msExitFullscreen();
                } else if (domName.webkitRequestFullScreen) {
                  document.webkitCancelFullScreen();
                } else if (domName.mozRequestFullScreen) {
                  document.mozCancelFullScreen();
                }
              },
            },
          },
        },
      });
    },
    getInstance() {
      if (!this[chartInstanceKey]) {
        this.initChart();
      }
      return this[chartInstanceKey];
    },
  },

  mounted() {
    this.initChart();
  },
};
</script>

<style lang="less" socped>
.wx-echarts-container {
  width: 100%;
  height: 100%;
  .chart {
    width: 100%;
    height: 100%;
  }
  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
