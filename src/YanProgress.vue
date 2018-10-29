<template>
    <div class="y-progress" v-bind:style="{'background-color':tip[0].fillStyle || '#ccc'}">
        <span v-bind:title="tip[0].text.replace('X',total<done?0:(total-done))" placement="top">
            <p class="y-progress_text" v-bind:style="{'width':(100-donePercent)+'%'}"></p>
        </span>
        <div class="y-progress_bar" v-bind:style="{'width':donePercent+ '%','background-color':tip[1].fillStyle || '#9c3'}">
            <span v-bind:title="tip[1].text.replace('X',done>total?total:done)" placement="top">
                <p class="y-progress_text" v-bind:style="{'width':(100-modifyPercent)+'%'}"></p>
            </span>
            <div class="y-progress_bar" v-bind:style="{'width':modifyPercent+ '%','background-color':tip[2].fillStyle || '#080'}">
                <span v-bind:title="tip[2].text.replace('X',modify>done?done:modify)" placement="top">
                    <p class="y-progress_text" v-bind:style="{'width':'100%'}"></p>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                inTotal: this.total,
                inDone: this.done,
                inModify: this.modify,
                donePercent: this.done==0?0:(this.done>=this.total ? 1 : this.done / this.total)*100,
                modifyPercent: this.modify == 0 ? 0 :(this.modify>=this.done ? 1: this.modify / this.done)*100,
            };
        },
        watch: {
            done(val) {
                this.donePercent = val == 0 ? 0 : (val >= this.total ? 1 : val / this.total) * 100;
            },
            modify(val) {
                this.modifyPercent = val == 0 ? 0 : (val >= this.done ? 1 : val / this.done) * 100;
            }
        },
    };
</script>
<style scoped>
.y-progress {
    position: relative;
    width: 100%;
    height: 8px;
    background-color: #ccc;
    border-radius: 4px;
    overflow: hidden;
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
</style>