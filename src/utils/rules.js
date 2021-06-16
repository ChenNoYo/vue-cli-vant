/**
 * 手机号码验证
 */
function RulePhone (val) {
  let check = true
  if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
    check = true
  } else if (!val || val.length === 0) {
    check = true
  } else {
    check = false
  }
  return check
}

/**
 * @param label
 * @returns {{validator: function}}
 */
function RuleBH (val) {
  let check = true
  if (val === '') {
    check = true
  } else if (/^[0-9a-zA-Z_]+$/.test(val)) {
    check = true
  } else {
    check = false
  }
  return check
  // let checkNumber = (rule, value, callback) => {
  //   if (value === '') {
  //     callback()
  //   } else if (/^[0-9a-zA-Z_]+$/.test(value)) {
  //     callback()
  //   } else {
  //     callback(new Error(`${label}只能是数字和字母`))
  //   }
  // }
  // return {
  //   validator: checkNumber
  // }
}

/**
 * @param label
 * @returns {{validator: function}}
 */
function RuleNumber (val) {
  let check = true
  if (!val || val === '') {
    check = true
  } else if (/^\d+$/.test(val)) {
    check = true
  } else {
    check = false
  }
  return check
  // let checkNumber = (rule, value, callback) => {
  //   if (!value || value === '') {
  //     callback()
  //   } else if (/^\d+$/.test(value)) {
  //     callback()
  //   } else {
  //     callback(new Error(`${label}只能是数字`))
  //   }
  // }
  // return {
  //   validator: checkNumber
  // }
}

/**
 * @param label
 * @returns {{validator: function}}
 */
function RuleDecimals (val) {
  let check = true
  if (!val || val === '') {
    check = true
  } else if (/^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(val)) {
    check = true
  } else {
    check = false
  }
  return check
  // let checkDecimals = (rule, value, callback) => {
  //   if (!value || value === '') {
  //     callback()
  //   } else if ((value + '').length > 20) {
  //     callback(new Error(`长度必须在 0 到 20 之间`))
  //   } else if (/^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(value)) {
  //     callback()
  //   } else {
  //     callback(new Error(`${label}只能是数字`))
  //   }
  // }
  // return {
  //   validator: checkDecimals
  // }
}
/**
 * 邮箱验证
 */
function RuleEmail (val) {
  let check = true
  if (!val || val === '') {
    check = true
  } else if (/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(val)) {
    check = true
  } else {
    check = false
  }
  return check
  // let checkEmail = (rule, value, callback) => {
  //   if (!value || value === '') {
  //     callback()
  //   } else if (/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)) {
  //     callback()
  //   } else {
  //     callback(new Error(`${label}格式不正确`))
  //   }
  // }
  // return {
  //   validator: checkEmail
  // }
}

/**
 * 身份证号验证
 */
function RuleIDCard (val) {
  let check = true
  if (!val || val === '') {
    check = true
  } else if (isIdCard(val)) {
    check = true
  } else {
    check = false
  }
  return check
  // let checkPhone = (rule, value, callback) => {
  //   if (isIdCard(value)) {
  //     callback()
  //   } else if (!value || value.length === 0) {
  //     callback()
  //   } else {
  //     callback(new Error('请输入正确的身份证号'))
  //   }
  // }
  // return {
  //   validator: checkPhone
  // }
}
const isIdCard = (val) => {
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
      console.log('last', last)
      if (last !== val[17].toUpperCase()) {
        return false
      }
    }
  }
  return true
}

export {
  RuleBH,
  RuleNumber,
  RuleDecimals,
  RuleEmail,
  RulePhone,
  RuleIDCard,
  isIdCard
}
