let expect = require("chai").expect;
let Vue = require("vue");
let YanProgress = require('../dist/YanProgress.min.js').default;

Vue.use(YanProgress);

let app;
let root;
let Ctor = Vue.options.components['yan-progress'];
let progressBar;
let tipTextList;
let TOTAL;
let DONE;
let MODIFY;
let UNDO;

function renderDOM({ total, done, modify, }, cb) {
    app = document.createElement("div");
    document.body.appendChild(app);

    root = new Vue({
        render(h) {
            return h('yan-progress', {
                props: {
                    total,
                    done,
                    modify,
                }
            });
        },
        mounted() {
            cb && cb(this);
        }
    }).$mount(app);
}

function removeDOM() {
    app.remove();
    app = null;
    root = null;
}

describe("render html", function () {
    beforeAll(function () {
        TOTAL = 100;
        DONE = 60;
        MODIFY = 30;
        UNDO = TOTAL - DONE;
        renderDOM({
            total: TOTAL,
            done: DONE,
            modify: MODIFY,
        });
        let comp = root.$children[0].$el;
        tipTextList = comp.innerHTML.match(/(?<=>)([^<>]+)(?=<)/g).filter(m => m.trim() !== "");; // e.g. 已提交60人
    });
    afterAll(function () {
        removeDOM();
    });

    it("It must be string", function () {
        expect(app.innerHTML)
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
});

describe("code strong", function () {
    it("total === 0", function () {
        TOTAL = 0;
        DONE = 60;
        MODIFY = 30;
        let progressBar = new Ctor({
            propsData: {
                total: TOTAL,
                done: DONE,
                modify: MODIFY,
            }
        });
        let { donePercent, modifyPercent } = progressBar.$data;
        expect(donePercent)
            .to
            .be
            .equal(0);
        expect(modifyPercent)
            .to
            .be
            .equal(0);
    });
    it("done === 0", function () {
        TOTAL = 100;
        DONE = 0;
        MODIFY = 30;
        let progressBar = new Ctor({
            propsData: {
                total: TOTAL,
                done: DONE,
                modify: MODIFY,
            }
        });
        let { donePercent, modifyPercent } = progressBar.$data;
        expect(donePercent)
            .to
            .be
            .equal(0);
        expect(modifyPercent)
            .to
            .be
            .equal(0);
    });
    it("tip is not array", function () {
        TOTAL = 100;
        DONE = 0;
        MODIFY = 30;
        let progressBar = new Ctor({
            propsData: {
                total: TOTAL,
                done: DONE,
                modify: MODIFY,
            }
        });
        let { tip } = progressBar.$props;
        expect(tip)
            .to
            .be
            .an("array");
        expect(tip)
            .to
            .have
            .lengthOf(3);
    });
    it("done > total", function () {
        TOTAL = 100;
        DONE = 600;
        MODIFY = 30;
        let progressBar = new Ctor({
            propsData: {
                total: TOTAL,
                done: DONE,
                modify: MODIFY,
            }
        });
        let { donePercent } = progressBar.$data;
        let done = donePercent / 1e2 * TOTAL;
        expect(done)
            .to
            .be
            .equal(TOTAL);
    });
    it("modify > done", function () {
        TOTAL = 100;
        DONE = 60;
        MODIFY = 100;
        let progressBar = new Ctor({
            propsData: {
                total: TOTAL,
                done: DONE,
                modify: MODIFY,
            }
        });
        let { modifyPercent } = progressBar.$data;
        let modify = modifyPercent / 1e2 * DONE;
        expect(modify)
            .to
            .be
            .equal(DONE);
    });
});