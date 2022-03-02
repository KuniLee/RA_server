const arr = [
  {
    deviceId: 42,
    value: 54612411,
    timestamp: Date.now(),
    parameter: 'temp',
  },
  {
    deviceId: 42,
    value: 546.5411,
    timestamp: Date.now(),
    parameter: 'humid',
  },
  {
    deviceId: 42,
    value: 331,
    timestamp: Date.now(),
    parameter: 'temp',
  },
  {
    deviceId: 42,
    value: 123,
    timestamp: Date.now(),
    parameter: 'humid',
  },
]

const newArr = arr.reduce((old, item) => {
  const ar = old
  ar[item.parameter] =
    old[item.parameter] !== undefined
      ? [...old[item.parameter], { x: item.timestamp, y: item.value }]
      : [{ x: item.timestamp, y: item.value }]
  return ar
}, {})

console.log(newArr)
