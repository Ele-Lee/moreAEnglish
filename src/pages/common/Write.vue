<template>
  <div class="LetterCanvas">
    <div
      @touchend.stop.prevent="smearEnd"
      @touchmove.stop.prevent="smearMove"
      @touchstart.stop.prevent="smearStart"
      class="canvas__wrapper" ref="canvasWrapper"
    >
      <!-- :style="{backgroundImage: 'url(' + require(`@/assets/testA.png`) + ')',width, height }" -->
      <canvas
        v-show="strokeIndex > currentCtxIndex"
        v-for="strokeIndex in strokesSum" :key="strokeIndex"
        class="canvas" :width="width" :height="height" ref="canvas"
      />
    </div>
  </div>
</template>

<script>
const STROKE_DATA_GAP = 4;
const CORRECT_SMEAR_RATIO = 0.5
export default {
  name: 'LetterCanvas',
  components: {
  },
  props: {
    letterId: {
      type: String,
      default: 'a'
    },
    letter: {
      type: Array,
      default: () => [161, 45, 43, 376, 203, 44, 323, 374, 125, 223, 230, 226]
    },
    strokeRadius: {
      type: Number,
      default: 50
    },
    width: {
      type: String,
      default: '361px'
    },
    height: {
      type: String,
      default: '416px'
    }
  },
  created() {
    const strokes = this.letter.length/STROKE_DATA_GAP
    this.ctxs = [] //每笔相应的canvas.context
    this.canvasSizeData = {}  //canvas的尺寸数据
    this.strokeImgs = []  //每笔相应的img实例
    this.strokesSum = strokes //笔画总数
    this.currentStrokeIndex = strokes  //现在要画笔画的index
    this.initOpaquePixelsSum = []
    this.canvasArea = [],
    this.isCorrect = true
  },
  data() {
    return {
      currentStrokeIndex: -1,
    }
  },
  computed: {
    currentCtxIndex() {
      return this.strokesSum - this.currentStrokeIndex
    }
  },
  mounted() {
    Promise.all([this._initCanvas(), this._initStrokeImgs()]).then((res) => {
      const len = this.strokesSum
      for (let i=0; i<len; i++) {
        this._drawStroke(i)
        this.initOpaquePixelsSum[i] = this._getOpaquePixelsSum(i)
      }
      // this._handleEvent('on')
    })
  },

  methods: {
    //初始化笔画的context
    _initCanvas() {
      return new Promise(resolve => {
        const canvasArray = this.$refs.canvas
        const canvas = canvasArray[0]
        const canvasSizeData = canvas.getBoundingClientRect()
        this.ctxs = canvasArray.map(canvas => canvas.getContext('2d'))
        this.canvasSizeData = canvasSizeData
        this.canvasArea = [0, 0, canvasSizeData.width, canvasSizeData.height]
        resolve();
      })
    },
    //初始化笔画实例
    _initStrokeImgs() {
      return new Promise(resolve => {
        const {strokesSum} = this
        for (let i=1; i<=strokesSum; i++) {
          const img = new Image()
          img.onload = () => {
            this.strokeImgs.push(img)
            i == strokesSum && resolve();
          }
          img.src = require(`@/assets/${this.letterId}_${i}.png`)
        }
      })
    },
    //画笔画
    _drawStroke(index = this.currentCtxIndex) {
      const img = this.strokeImgs[index]
      this.ctxs[index].drawImage(img, ...this.canvasArea)
    },
    //获得像素不透明总数
    _getOpaquePixelsSum(index = this.currentCtxIndex) {
      const {data} = this.ctxs[index].getImageData(...this.canvasArea)
      const pixelLenght = data.length
      let opaquePixelsSum = 0
      for (let i=0; i<pixelLenght; i+=4) {
        data[i] != 0 && opaquePixelsSum++
      }
      return opaquePixelsSum
    },
    smearStart(e) {
      const {changedTouches: [{clientX, clientY}]} = e
      //判断起点是否画对
      this._judgeCorretPoint(clientX, clientY, 0)
      this._smearStroke(clientX, clientY)
    },
    smearMove(e) {
      const {changedTouches: [{clientX, clientY}]} = e
      //opt 快速移动不连贯
      this._smearStroke(clientX, clientY)
    },
    smearEnd(e) {
      const {changedTouches: [{clientX, clientY}]} = e
      const {currentCtxIndex, initOpaquePixelsSum} = this
      //起点正确时判断落点是否画对
      this.isCorrect && this._judgeCorretPoint(clientX, clientY, 2)
      //如果落点正确判断擦去的面积
      if (this.isCorrect) {
        //擦去像素的比率
        const currentOpaquePixelsSum = this._getOpaquePixelsSum()
        const smearRatio = 1 - (currentOpaquePixelsSum/initOpaquePixelsSum[currentCtxIndex])
        //擦去像素的比率大于设定值，画正确
        if (smearRatio > CORRECT_SMEAR_RATIO) {
          this.currentStrokeIndex--
        } else {
          console.log('画错了')
          this._drawStroke()
        }
      } else {
        console.log('起点或落点错了')
        this._drawStroke()
      }
      this.isCorrect = true
    },
    _judgeCorretPoint(clientX, clientY, startIndex) {
      const {letter, strokeRadius, currentCtxIndex,  canvasSizeData: {left, top}} = this
      const index = currentCtxIndex * STROKE_DATA_GAP
      const correctFactorX = ~~Math.abs(clientX - letter[index + startIndex] - left)
      const correctFactorY = ~~Math.abs(clientY - letter[index + startIndex + 1] - top)
      //判断起点或落点是否在预设区域内
      if (correctFactorX > strokeRadius || correctFactorY > strokeRadius) {
        this.isCorrect = false
      }
    },
    _smearStroke(x, y) {
      const {ctxs, currentCtxIndex, strokeRadius, canvasSizeData: {left, top}} = this
      const ctx = ctxs[currentCtxIndex]
      ctx.save()
      ctx.beginPath();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.arc(x - left, y - top, strokeRadius, 0, Math.PI*2, 0)
      ctx.fill()
      ctx.restore()
    },
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
}
</script>

<style lang="less">
.canvas__wrapper {
  position: absolute;
  top: 100px;
  right: 0;
  background-color:red;
}
.canvas{
  position: absolute;
  top: 0px;
  right: 0;
  // background-color: black;
  // background-image: url('~@/assets/testA.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.LetterCanvas {
  position: fixed;
  top: 0;
  background-color: green;
  width: 100vw;
  height: 100vh;
  // background-image: url('~@/assets/test.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
