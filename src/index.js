import Comp from './YanProgress.vue';

const CONF = {
    tip: [
        {
            text: "未提交X人",
            fillStyle: "#ccc",
        }, {
            text: "已提交X人",
            fillStyle: "#9c3",
        }, {
            text: "已批改X人",
            fillStyle: "#080"
        }
    ]
};

let YanProgress = {
    install(Vue, opts = {}) {

        Vue.component('yan-progress', Object.assign({}, Comp, {
            props: {
                "total": {
                    type: Number,
                    default: 0
                },
                "done": {
                    type: Number,
                    default: 0
                },
                "modify": {
                    type: Number,
                    default: 0
                },
                "tip": {
                    type: Array,
                    default() {
                        return CONF.tip;
                    }
                }
            },
        }));
    }
};

if (window && window.Vue) {
    window.Vue.use(YanProgress);
}

export default YanProgress;

