<template>
    <main
        class="LetterCanvas" ref="canvasWrapper"
        @touchend.stop.prevent="smearEnd"
        @touchmove.stop.prevent="smearMove"
        @touchstart.stop.prevent="smearStart"
    >
        <Letter
            :sprite-id="letterKey"
            :resetSvgSize="true"
            @inited="initialSize"
        />
        <canvas
            ref="canvas"
            v-show="strokeIndex > currentCtxIndex"
            v-for="strokeIndex in strokesSum"
            :key="strokeIndex" class="canvas strokes"
        />
        <!-- 完整笔画，优化canvas没有画出来前出现空白 -->
        <div v-show="!initialDrawStrokes" class="strokes--full strokes" :style="fullStrokesStyle" />
    </main>
</template>

<script>
    const STROKE_DATA_GAP = 4;
    import Letter from '@/components/ui/Letter.vue';
    export default {
        name: 'LetterCanvas',
        components: { Letter },
        props: {
            //擦去比例正确率
            correctSmearRatio: {
                type: Number,
                default: 0.5
            },
            //起点落点正确范围
            correctPointRange: {
                type: Number,
                default: 10
            },
            //字母起落点的xy的百分比 (固定大小可用px)
            letterPoints: {
                type: Array
                // default: () => [45, 8, 10, 92, 57, 8, 87, 91, 35, 55, 63, 55]
                // default: () => [161, 45, 43, 376, 203, 44, 323, 374, 125, 223, 230, 226]
            },
            //笔画的基本路径
            strokesUrl: {
                type: String,
                default: 'class1/abc/strokes/letter-A'
            },
            //笔触大小
            strokeRadius: {
                type: Number,
                default: 40
            },
            //字母
            letterKey: {
                type: String,
                default: 'A'
            }
        },
        created() {
            console.log('created', this.letterPoints);
            const strokes = this.letterPoints.length / STROKE_DATA_GAP;
            this.ctxs = []; //每笔相应的canvas.context
            this.canvasSizeData = {}; //canvas的尺寸数据
            this.strokeImgs = []; //每笔相应的img实例
            this.strokesSum = strokes; //笔画总数
            this.currentStrokeIndex = strokes; //现在要画笔画的index
            this.initOpaquePixelsSum = [];
            this.canvasArea = [];
            this.isCorrect = true;
        },
        data() {
            return {
                currentStrokeIndex: -1,
                initialDrawStrokes: false,
                fullStrokesStyle: {}
            };
        },
        computed: {
            currentCtxIndex() {
                return this.strokesSum - this.currentStrokeIndex;
            }
        },
        mounted() {
            Promise.all([this._initCanvas(), this._initStrokeImgs()]).then(res => {
                for (let i = 0; i < this.strokesSum; i++) {
                    this._drawStroke(i);
                    this.initOpaquePixelsSum[i] = this._getOpaquePixelsSum(i);
                }
                this.initialDrawStrokes = true;
                // this._handleEvent('on')
            });
        },
        methods: {
            _initFullStrokesStyle() {
                const strokesUrl = this.strokesUrl + (this.strokesSum === 1 ? '1' : '');
                this.fullStrokesStyle = {
                    backgroundImage: `url(${require(`@/assets/${strokesUrl}.png`)})`,
                    width: this.width + 'px',
                    height: this.height + 'px'
                };
            },
            //初始化canvas大小
            initialSize({ width, height }) {
                this.width = width;
                this.height = height;
                this._initFullStrokesStyle();
            },
            //初始化笔画的context
            _initCanvas() {
                return new Promise(resolve => {
                    const canvasArray = this.$refs.canvas;
                    const canvas = canvasArray[0];
                    this.ctxs = canvasArray.map(canvas => {
                        const ctx = canvas.getContext('2d');
                        canvas.width = this.width;
                        canvas.height = this.height;
                        return ctx;
                    });
                    const canvasSizeData = canvas.getBoundingClientRect();
                    this.canvasSizeData = canvasSizeData;
                    this.canvasArea = [0, 0, canvasSizeData.width, canvasSizeData.height];
                    resolve();
                });
            },
            //初始化笔画实例
            _initStrokeImgs() {
                return new Promise(resolve => {
                    const { strokesSum } = this;
                    let loadedImg = 0;
                    for (let i = 1; i <= strokesSum; i++) {
                        const img = new Image();
                        img.onload = () => {
                            this.strokeImgs.push(img);
                            ++loadedImg == strokesSum && resolve();
                        };
                        img.src = require(`@/assets/${this.strokesUrl}${i}.png`);
                    }
                });
            },
            //画笔画
            _drawStroke(index = this.currentCtxIndex) {
                const img = this.strokeImgs[index];
                this.ctxs[index].drawImage(img, ...this.canvasArea);
            },
            //获得像素不透明总数
            _getOpaquePixelsSum(index = this.currentCtxIndex) {
                const { data } = this.ctxs[index].getImageData(...this.canvasArea);
                const pixelLenght = data.length;
                let opaquePixelsSum = 0;
                for (let i = 0; i < pixelLenght; i += 4) {
                    data[i] != 0 && opaquePixelsSum++;
                }
                return opaquePixelsSum;
            },
            smearStart(e) {
                const {
                    changedTouches: [{ clientX, clientY }]
                } = e;
                //判断起点是否画对
                this._judgeCorretPoint(clientX, clientY, 0);
                this._smearStroke(clientX, clientY);
            },
            smearMove(e) {
                const {
                    changedTouches: [{ clientX, clientY }]
                } = e;
                //opt 快速移动不连贯
                this._smearStroke(clientX, clientY);
            },
            smearEnd(e) {
                const {
                    changedTouches: [{ clientX, clientY }]
                } = e;
                const { currentCtxIndex, initOpaquePixelsSum } = this;
                //起点正确时判断落点是否画对
                this.isCorrect && this._judgeCorretPoint(clientX, clientY, 2);
                //如果落点正确判断擦去的面积
                if (this.isCorrect) {
                    //擦去像素的比率
                    const currentOpaquePixelsSum = this._getOpaquePixelsSum();
                    const smearRatio =
                        1 - currentOpaquePixelsSum / initOpaquePixelsSum[currentCtxIndex];
                    // console.log(
                    //     smearRatio,
                    //     currentOpaquePixelsSum,
                    //     initOpaquePixelsSum[currentCtxIndex]
                    // );
                    //擦去像素的比率大于设定值，画正确
                    if (smearRatio > this.correctSmearRatio) {
                        this.currentStrokeIndex--;
                        this.$emit('draw', this.currentStrokeIndex);
                    } else {
                        console.log('画错了');
                        this._drawStroke();
                    }
                } else {
                    console.log('起点或落点错了');
                    this._drawStroke();
                }
                this.isCorrect = true;
            },
            _judgeCorretPoint(clientX, clientY, startIndex) {
                const {
                    letter,
                    strokeRadius,
                    currentCtxIndex,
                    canvasSizeData: { left, top, width, height }
                } = this;
                const index = currentCtxIndex * STROKE_DATA_GAP;
                // const correctFactorX = ~~Math.abs(clientX - left - letterPoints[index + startIndex]);
                // const correctFactorY = ~~Math.abs(clientY - top - letterPoints[index + startIndex + 1]);
                const correctFactorX = ~~Math.abs(
                    ((clientX - left) * 100) / width - this.letterPoints[index + startIndex]
                );
                const correctFactorY = ~~Math.abs(
                    ((clientY - top) * 100) / height - this.letterPoints[index + startIndex + 1]
                );
                // console.log('correctFactorX', correctFactorX, 'correctFactorY', correctFactorY);
                //判断起点或落点是否在预设区域内
                if (
                    correctFactorX >= this.correctPointRange ||
                    correctFactorY >= this.correctPointRange
                ) {
                    this.isCorrect = false;
                }
            },
            _smearStroke(x, y) {
                const {
                    ctxs,
                    currentCtxIndex,
                    strokeRadius,
                    canvasSizeData: { left, top }
                } = this;
                const ctx = ctxs[currentCtxIndex];
                ctx.save();
                ctx.beginPath();
                ctx.globalCompositeOperation = 'destination-out';
                ctx.arc(x - left, y - top, strokeRadius, 0, Math.PI * 2, 0);
                ctx.fill();
                ctx.restore();
            }
            // _handleEvent(type) {
            //   const canvasWrapper = this.$refs.canvasWrapper
            //   if (type === 'on') {
            //     canvasWrapper.addEventListener('touchstart', this._smearStart, false)
            //     canvasWrapper.addEventListener('touchmove', this._smearMove, false)
            //     canvasWrapper.addEventListener('touchend', this._smearEnd, false)
            //   } else if (type === 'off') {
            //     canvasWrapper.removeEventListener('touchstart', this._smearStart, false)
            //     canvasWrapper.removeEventListener('touchmove', this._smearMove, false)
            //     canvasWrapper.removeEventListener('touchend', this._smearEnd, false)
            //   }
            // },
        }
    };
</script>

<style lang="less">
    @paths: '', 'class1/common', 'classCommon/titles', 'class1/abc/strokes/';
    .LetterCanvas {
        position: relative;
        .flex();
        flex: 1;
        > .canvas,
        > .strokes--full {
            display: block;
            .p-center();
            .contain();
        }
    }
</style>
