/**
 *过滤特殊字符函数 
 ***/ 
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？↵\r\n]");
        var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 *验证邮箱格式 
 ***/
export function chackMali(val){
    let reg=/^([a-zA-Z0-9_-])+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(reg.test(val)){
        return true
    }else{
        return false
    }
}