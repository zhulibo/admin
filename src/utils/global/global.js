// 上传图片路径
let baseUrl = process.env.NODE_ENV == 'development' ? process.env.VUE_APP_REAL_URL : process.env.VUE_APP_BASE_URL

//给sessionStorage存值
let setContextData =(key, value) => {
  if(typeof value == "string"){
    sessionStorage.setItem(key, value)
  }else{
    sessionStorage.setItem(key, JSON.stringify(value))
  }
}

// 从sessionStorage取值
let getContextData = (key) => {
  const str = sessionStorage.getItem(key)
  if( typeof str == "string" ){
    try{
      return JSON.parse(str)
    }catch(e) {
      return str
    }
  }
  return
}

// 获取url中参数
let getParams = () => {
  let params = {} // 参数存放的对象
  let key, value;  // 键、值
  let str = location.href // 整个url
  str = str.substr(str.indexOf("?") + 1) // 从?下标+1处截取到最后
  let arr = str.split("&") // 以&分割参数

  for (let i = 0; i < arr.length; i++) {
    let num = arr[i].indexOf("=")
    if (num > 0) {
      key = arr[i].substring(0, num); // 从0到num
      value = arr[i].substr(num + 1) // 从num + 1到最后
      params[key] = value
    }
  }
  return params
}

// 获取此时北京时间戳
let getNowBeijingTimestamp = () => {
  let nowLocalTime = new Date()
  let nowLocalTimestamp = nowLocalTime.getTime()
  // 将此时当地时间戳转换为此时北京utf+8时间戳
  let nowLocalTimeStr = nowLocalTime.toString()
  let index = nowLocalTimeStr.indexOf('GMT') + 3
  let hourOffset = nowLocalTimeStr.substr(index, 5) / 100 - 8 // 当地与北京时区差
  let nowBeijingTimestamp = nowLocalTimestamp - hourOffset * 60 * 60 * 1000 // 此时北京时间戳
  return nowBeijingTimestamp
}

// 钢琴键盘
let keyboardPiano = () => {
  if (!window.AudioContext) {
    console.log('当前浏览器不支持Web Audio API')
    return
  }

  // 创建新的音频上下文接口
  var audioCtx = new AudioContext()

  let frequency = null // 播放频率
  let frequencyArr = [] // 频率总数组
  let frequencyArr0a = [130.813, 146.832, 164.814, 174.614, 195.998, 220.000, 246.942] // 小字母组
  let frequencyArr1a = [261.626, 293.665, 329.628, 349.228, 391.995, 440.000, 493.883] // 小字母1组
  let frequencyArr2a = [523.251, 587.330, 659.255, 698.456, 783.991, 880.000, 987.767] // 小字母2组
  let frequencyArr3a = [1046.502, 1174.659, 1318.510, 1396.913, 1567.982, 1760.000, 1975.533] // 小字母3组

  // 合并频率数组
  frequencyArr = frequencyArr.concat(frequencyArr0a, frequencyArr1a, frequencyArr2a, frequencyArr3a)

  let keyArr = 'zxcvbnmasdfghjklqwertyuiop' // 键盘字母顺序

  function music(event) {

    if (event.keyCode <= 90 && event.keyCode >= 65) {
      let keyIndex = keyArr.indexOf(event.key)
      frequency = frequencyArr[keyIndex]
    } else {
      return
    }

    console.log(frequency)

    // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
    var oscillator = audioCtx.createOscillator()
    // 创建一个GainNode,它可以控制音频的总音量
    var gainNode = audioCtx.createGain()
    // 把音量，音调和终节点进行关联
    oscillator.connect(gainNode)
    // audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
    gainNode.connect(audioCtx.destination)
    // 指定音调的类型，其他还有 sine|square|triangle|sawtooth
    oscillator.type = 'sine'
    // 设置当前播放声音的频率，也就是最终播放声音的调调
    oscillator.frequency.value = frequency
    // 当前时间设置音量为0
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
    // 0.01秒后音量为0.8
    gainNode.gain.linearRampToValueAtTime(0.6, audioCtx.currentTime + 0.01)
    // 音调从当前时间开始播放
    oscillator.start(audioCtx.currentTime)
    // 1.5秒内声音慢慢降低
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5)
    // 1.5秒后完全停止声音
    oscillator.stop(audioCtx.currentTime + 1.5)
  }

  document.addEventListener('keydown', music)
  document.addEventListener('mousedown', music)
}

export default {
  baseUrl,
  setContextData,
  getContextData,
  getParams,
  getNowBeijingTimestamp,
  keyboardPiano,
}