export function getJson (data) {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 驼峰转换下划线
 */
export function toLine (name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/**
 * 下划线转换驼峰
 */
export function toHump (name) {
  return name.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

// 设置cookie
export function setCookie (name, value, day) {
  var date = new Date()
  date.setDate(date.getDate() + day)
  document.cookie = name + '=' + value + ';expires=' + date
  // document.cookie = name + '=' + value;
};

// 获取cookie
export function getCookie (name) {
  var reg = RegExp(name + '=([^;]+)')
  var arr = document.cookie.match(reg)
  if (arr) {
    return arr[1]
  } else {
    return ''
  }
};

// 删除cookie
export function delCookie (name) {
  // setCookie(name, '');
  setCookie(name, '', -1)
};

export function getArray (data) {
  const arr = []
  for (let i = 1; i <= data; i++) {
    arr.push(i)
  }
  return arr
}

/**
 * 时间格式转换
 * @param {*} date 时间
 * @param {*} fmt 时间格式列如：yyyy-MM-dd hh:mm:ss
 */
export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

// 字符串字母转大写
export function upperCase (str) {
  const arr = str.split('')
  let newStr = ''
  // 通过数组的forEach方法来遍历数组
  arr.forEach(function (value) {
    if (value >= 'a' && value <= 'z') {
      newStr += value.toUpperCase()
    } else {
      newStr += value
    }
  })
  return newStr
}
// 字符串字母转小写
export function lowerCase (str) {
  const arr = str.split('')
  let newStr = ''
  // 通过for循环遍历数组
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 'A' && arr[i] <= 'Z') {
      newStr += arr[i].toLowerCase()
    } else {
      newStr += arr[i]
    }
  }
  return newStr
}
// 手机号验证
export function isPhone (val) {
  // return /^1[0-9]{10}$/.test(val) || /^\d{8}$/.test(val) || /^\d{7}$/.test(val) || /^\d{6}$/.test(val);
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(val)
}
// 座机验证
export function isTel (val) {
  return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(val)
}
/**
 * 合法身份证
 * @param val 身份证
 * @returns boolean
 */
export function isIdCard (val) {
  if (!val || val === '') {
    return false
  }
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  }

  if (!val || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(val)) {
    return false
  } else if (!city[val.substr(0, 2)]) {
    return false
  } else {
    if (val.length === 18) {
      val = val.split('')
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      // 校验位
      const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      let sum = 0
      let ai = 0
      let wi = 0
      for (let i = 0; i < 17; i++) {
        ai = val[i]
        wi = factor[i]
        sum += ai * wi
      }
      const last = parity[sum % 11] + ''
      if (last !== val[17].toUpperCase()) {
        return false
      }
    }
  }
  return true
}
// 图片压缩
export function compressImage (path, obj, callback) {
  var img = new Image()
  img.src = path
  img.onload = function () {
    var that = this
    // 默认按比例压缩
    var w = that.width * 0.3
    var h = that.height * 0.3
    var scale = w / h
    w = obj.width || w
    h = obj.height || (w / scale)
    var quality = 0.7 // 默认图片质量为0.7
    // 生成canvas
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    // 创建属性节点
    var anw = document.createAttribute('width')
    anw.nodeValue = w
    var anh = document.createAttribute('height')
    anh.nodeValue = h
    canvas.setAttributeNode(anw)
    canvas.setAttributeNode(anh)
    ctx.drawImage(that, 0, 0, w, h)
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality
    }
    // quality值越小，所绘制出的图像越模糊
    var base64 = canvas.toDataURL('image/jpeg', quality)
    // 回调函数返回base64的值
    callback(base64)
  }
}

function add0 (m) {
  return m < 10 ? '0' + m : m
}

export function format (shijianchuo) {
  // shijianchuo是整数，否则要parseInt转换
  var time = new Date(shijianchuo)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
}
