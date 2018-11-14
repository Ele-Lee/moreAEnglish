const requireAll = context => context.keys().map(context);

const getLetterName = (letter) => {
    //大小写的ASCII码阈值
    const ASCII_THRESHOLD = 91;
    const ASCII = +letter.charCodeAt();
    //大于阈值小写，反之大写
    const sign = ASCII > ASCII_THRESHOLD ? '_' : '-';
    return `letter${sign}${letter}`;
}


export {
    requireAll,
    getLetterName
}
