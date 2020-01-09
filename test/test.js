const secureRandom = require('../')

function getDistribution(bucket, size = 1, min = 0, N = 100000) {
  let distribution = new Array(bucket).fill(0)
  for (let i = 0; i < N; i++) {
    let n = secureRandom.randomNumber(min, min + bucket * size - 1)
    distribution[Math.floor((n - min) / size)]++
  }
  return distribution.map(n => n / (N / bucket))
}

console.log('small number', getDistribution(10))

console.log('big number', getDistribution(10, 10000000000000))

console.log('negative number', getDistribution(10, 1000, -1000000))
