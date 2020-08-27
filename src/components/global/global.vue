<script>

let baseUrl = process.env.NODE_ENV == 'development' ? process.env.VUE_APP_REAL_URL : process.env.VUE_APP_BASE_URL

let getParams = () => {
  let params = {} // 参数存放的对象
  let key, value;  // 键、值
  let str = location.href; // 整个url
  str = str.substr(str.indexOf("?") + 1); // 从?下标+1处截取到最后
  let arr = str.split("&"); // 以&分割参数

  for (let i = 0; i < arr.length; i++) {
    let num = arr[i].indexOf("=");
    if (num > 0) {
      key = arr[i].substring(0, num); // 从0到num
      value = arr[i].substr(num + 1); // 从num + 1到最后
      params[key] = value;
    }
  }
  return params
}

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

let sheetMusic = () => {
  if (!window.AudioContext) {
    console.log('当前浏览器不支持Web Audio API')
    return
  }

  // 创建新的音频上下文接口
  var audioCtx = new AudioContext()

  // 频率
  let frequency = null
  let frequencyArr = [262,294,330,349,392,440,494,523,587,659,698,784,880,988]
  let frequencyArrCTuneAll = [262,277,294,311,330,349,370,392,415,440,466,494,523,554,587,622,659,698,740,784,831,880,932,988,1046,1109,1175,1245,1318,1397,1480,1568,1661,1760,1865,1976]
  // 频谱
  let sheetMusic = []
  let theme = JSON.parse(localStorage.getItem('theme'))
  if (theme){
    sheetMusic = theme.sheetMusic.split(',')
  }

  // 频谱位置
  var start = 0
  // 键盘顺序
  let keyArr = 'zxcvbnmasdfghjklqwertyuiop'

  function music(event) {
    if (start > sheetMusic.length - 1) {
      start = 0
    }
    let frequencyIndex = parseInt(sheetMusic[start]) - 1
    if(event.keyCode <= 90 && event.keyCode >= 65) { // 键盘固定频率
      let keyIndex = keyArr.indexOf(event.key)
      frequency = frequencyArrCTuneAll[keyIndex]
    } else{ // 频谱频率
      frequency = frequencyArr[frequencyIndex]
    }
    start++

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
    // 1.2秒内声音慢慢降低，是个不错的停止声音的方法
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2)
    // 1.2秒后完全停止声音
    oscillator.stop(audioCtx.currentTime + 1.2)
  }

  document.addEventListener('keydown', music)
  document.addEventListener('mousedown', music)
}

export default {
  baseUrl, // 上传图片路径
  getParams, // 获取url中参数
  getNowBeijingTimestamp, // 获取此时北京时间戳
  sheetMusic, // 点击音效
}
</script>
