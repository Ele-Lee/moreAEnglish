let _areaSize = {}
let _activeTarget = {}
// let _logInfo = ''
let _parentNode = null
let htmlFontSize = +document.getElementsByTagName('html')[0].style.fontSize.slice(0, -2)
const _touch = (e) => {
    const {changedTouches: [{clientX, clientY}]} = e
    e.stopPropagation()
    e.preventDefault()
    return {clientX, clientY}
}

const _outOfFocus = () => {
    _activeTarget.style && (_activeTarget.style.outline = '')
}

const showInfo = () => {
    const { className, endY, endX, tLeft, tTop, startY, startX, tHeight, tWidth, paddingTop, paddingLeft, marginLeft, marginTop, $deg, $scale } = _activeTarget
    const top = (tTop - _areaSize.top + endY - startY + tHeight*($scale - 1)/2 - paddingTop/2 - marginTop/2 )/htmlFontSize
    const left = (tLeft - _areaSize.left + endX - startX  + tWidth*($scale - 1)/2 - paddingLeft/2 - marginLeft/2 )/htmlFontSize
    console.log(`.${className} {
        top: ${top.toFixed(3)}rem;
        left: ${left.toFixed(3)}rem;
        transform: rotate(${$deg})deg scale(${$scale});
    }`)
}

const keypress = (e) => {
    // console.log(e)
    _activeTarget.$scale_gap = _activeTarget.$scale_gap || .1
    _activeTarget.$deg_gap = _activeTarget.$deg_gap || 5
    switch (e.key) {
        case '+':
        _activeTarget.$scale+=_activeTarget.$scale_gap
            break;
        case '-':
        _activeTarget.$scale-=_activeTarget.$scale_gap
            break;
        case '=':
        _activeTarget.$deg-=_activeTarget.$deg_gap
            break;
        case '/':
        _activeTarget.$deg+=_activeTarget.$deg_gap
            break;
        case 'Enter':
            showInfo()
        // console.info(_logInfo)
            return;
        default:
            // _outOfFocus()
            return;
    }
    _activeTarget.style.transform = `scale(${_activeTarget.$scale}) rotate(${_activeTarget.$deg}deg)`
}

const touchstart = (e) => {
    const { clientX, clientY } = _touch(e)
    const { target } = e
    if (_parentNode === target) return _outOfFocus()
    const { left, top, width, height } = target.getBoundingClientRect()
    // if (!target.init) {
        const {paddingTop, paddingLeft, marginLeft, marginTop, transform} = getComputedStyle(target)
        // target.$scale = +transform.match(/(.{1,4})(?<=,)/g)[0].slice(0, -1) || 1
        target.$scale = target.$scale || 1
        // console.log(target.$scale)
        target.$deg = target.$deg || 0
        target.tWidth = width
        target.tHeight = height
        target.paddingTop = +paddingTop.slice(0, -2)
        target.paddingLeft = +paddingLeft.slice(0, -2)
        target.marginLeft = +marginLeft.slice(0, -2)
        target.marginTop = +marginTop.slice(0, -2)

        // target.init = true
    // }
    // const {paddingTop, paddingLeft, marginLeft, marginTop, width, height, left, top} = getComputedStyle(target)
    // console.log(left, top);
    target.tLeft =  left
    target.tTop = top
    target.startX = clientX
    target.startY = clientY
    _outOfFocus()
    _activeTarget = target
    target.style.outline = '1px dashed red'
}
const touchmove = (e) => {
    const { clientX, clientY } = _touch(e)
    const { target } = e
    if (_parentNode === target) return _outOfFocus()
    const { tLeft, tTop, startY, startX, $scale, tHeight, tWidth, paddingTop, paddingLeft, marginLeft, marginTop } = target
    // console.log(tTop, _areaSize)
    const top = (tTop - _areaSize.top + clientY - startY + tHeight*($scale - 1)/2 - paddingTop/2 - marginTop/2 )/htmlFontSize
    const left = (tLeft - _areaSize.left + clientX - startX  + tWidth*($scale - 1)/2 - paddingLeft/2 - marginLeft/2 )/htmlFontSize
    target.style.position = 'absolute'
    target.style.top = top + 'rem'
    target.style.left = left + 'rem'
}
const touchend = (e) => {
    const { clientX, clientY } = _touch(e)
    const { target } = e
    target.endX = clientX
    target.endY = clientY
    if (_parentNode === target) return _outOfFocus()
    // const { className, tLeft, tTop, startY, startX , $scale, $deg, tHeight, tWidth } = target
    // const top = (tTop - _areaSize.top + clientY - startY + ((tHeight * $scale) - tHeight)/2)/htmlFontSize
    // const left = (tLeft - _areaSize.left + clientX - startX  + ((tWidth * $scale) - tWidth)/2)/htmlFontSize
    // _logInfo = `.${className} {
    //     top: ${top} rem;
    //     left: ${left} rem;
    //     rotate: ${$deg} deg;
    //     scale: ${$scale};
    // }`
}

const dragArea = {
    bind(el) {
        el.style.position = 'relative'
        document.addEventListener('keypress', keypress, false)
        el.addEventListener('touchstart', touchstart, false)
        el.addEventListener('touchmove', touchmove, false)
        el.addEventListener('touchend', touchend, false)
        document.addEventListener('click', _outOfFocus, true)
    },
    inserted(el) {
        _parentNode = el
        _areaSize = _parentNode.getBoundingClientRect()
        // console.log(_areaSize)
    },
    unbind(el) {
        document.removeEventListener('keypress', keypress, false)
        el.removeEventListener('touchstart', touchstart, false)
        el.removeEventListener('touchmove', touchmove, false)
        el.removeEventListener('touchend', touchend, false)
        document.removeEventListener('click', _outOfFocus, true)
    }
}

const dragItem = {
    bind(el) {
    },
    inserted() {

    }
}

export {
    dragArea,
    dragItem,
}
