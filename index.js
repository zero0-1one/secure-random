'use strict'
const crypto = require('crypto')

module.exports = {
  randomNumber(min, max) {
    min = Math.floor(min)
    max = Math.floor(max)
    let range = max - min
    if (range == 0) return min

    // 9007199254740991 为 2**53 - 1
    if (min > max || min < -9007199254740991 || max > 9007199254740991 || range > 9007199254740991)
      throw new Error('Out of range')

    let bits = 0
    let range2 = range
    while (range2 > 0) {
      bits += 1
      range2 = Math.floor(range2 / 2) //不能用位运算  因为range取值范围 >= 2**32  而JavaScript中位运算都会转换为int32
    }
    let bytes = Math.ceil(bits / 8)
    let mask = [255, 1, 3, 7, 15, 31, 63, 127][bits % 8]

    // console.log(bits, bytes, mask)

    let random = () => {
      const buffer = crypto.randomBytes(bytes)
      let value = buffer[0] & mask
      for (let i = 1; i < bytes; i++) {
        value = value * 256 + buffer[i] //也不能使用位运算
      }
      return value
    }
    let value = random()
    while (value > range) {
      value = random()
    }
    return min + value
  }
}
