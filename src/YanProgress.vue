<template>
  <div class="y-progress" :style="{'background-color':tip[0].fillStyle || '#ccc'}">
    <a class="y-progress_text" :style="{'width':(100-donePercent)+'%'}">
      <span class="y-tooltip" v-text="tip[0].text.replace('X',total<done?0:(total-done))"></span>
    </a>
    <div
      class="y-progress_bar"
      :style="{'width':donePercent+ '%','background-color':tip[1].fillStyle || '#9c3'}"
    >
      <a class="y-progress_text" :style="{'width':(100-modifyPercent)+'%'}">
        <span class="y-tooltip" v-text="tip[1].text.replace('X',done>total?total:done)"></span>
      </a>
      <div
        class="y-progress_bar"
        :style="{'width':modifyPercent+ '%','background-color':tip[2].fillStyle || '#080'}"
      >
        <a class="y-progress_text" :style="{'width':'100%'}">
          <span class="y-tooltip" v-text="tip[2].text.replace('X',modify>done?done:modify)"></span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
// 0-100(%)
function calcDonePercent({ total, done }) {
  if (done <= 0 || total <= 0) {
    return 0;
  }
  if (done > total) {
    return 1e2;
  }
  return (done / total) * 1e2;
}
// 0-100(%)
function calcModifyPercent({ total, done, modify }) {
  let donePercent = calcDonePercent({ total, done });
  if (donePercent === 0) {
    return 0;
  }
  if (modify > done) {
    return 1e2;
  }
  return (modify / done) * 1e2;
}

export default {
  name:'yan-progress',
  data() {
    return {
      donePercent: calcDonePercent(this.$props),
      modifyPercent: calcModifyPercent(this.$props)
    };
  },
  watch: {
    done(val) {
      this.donePercent = calcDonePercent({
        done: val,
        total: this.total
      });
    },
    modify(val) {
      this.modifyPercent = calcModifyPercent({
        modify: val,
        done: this.done
      });
    }
  }
};
</script>
<style scoped>
.y-progress {
  position: relative;
  width: 100%;
  height: 8px;
  background-color: #ccc;
  border-radius: 4px;
}
.y-progress_bar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-radius: 4px;
  transition: all 1.5s ease;
}
.y-progress_text {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  text-align: center;
}
.y-progress_text .y-tooltip {
  position: absolute;
  top: 15px;
  right: 0;
  background-color: #333;
  color: #f1f1f1;
  border-radius: 5px;
  padding: 5px 10px;
  visibility: hidden;
  opacity: 0;
  transform: scale(0);
  transition: all ease-in 0.2s;
}
.y-progress_text:hover .y-tooltip {
  visibility: visible;
  opacity: 1;
  transform: scale(1);
}
.y-tooltip:after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  border: 5px solid;
  border-color: transparent transparent #333 transparent;
}
</style>