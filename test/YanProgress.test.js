let YanProgress = require('../dist/YanProgress.min.js').default;
let expect = require("chai").expect;
let Vue = require("vue");


describe("render", function () {

    Vue.use(YanProgress);

    let app = document.createElement("div");
    document.body.appendChild(app);

    let TOTAL = 100;
    let DONE = 60;
    let MODIFY = 30;
    let UNDO = TOTAL - DONE;

    new Vue({
        render(h) {
            return h('yan-progress', {
                props: {
                    total: TOTAL,
                    done: DONE,
                    modify: MODIFY,
                }
            });
        },
        mounted() {
            let comp = this.$el;
            let tipTextList = comp.innerHTML.match(/(?<=>)([^<>]+)(?=<)/g).filter(m => m.trim() !== "");; // e.g. 已提交60人

            it("It must be string", function () {
                expect(comp.innerHTML)
                    .to
                    .be
                    .an("string");
            });
            it("Tips must be array", function () {
                expect(tipTextList)
                    .to
                    .be
                    .an("array");
            });
            it("Tips has three items", function () {
                expect(tipTextList)
                    .to
                    .have
                    .lengthOf(3);
            });
            it("Judge calc is correct", function () {
                let [undo, done, modify] = tipTextList.map(item => +item.match(/\d+/)[0]);

                expect(undo)
                    .to
                    .be
                    .equal(UNDO);
                expect(done)
                    .to
                    .be
                    .equal(DONE);
                expect(modify)
                    .to
                    .be
                    .equal(MODIFY);
            });
        }
    }).$mount(app);
});