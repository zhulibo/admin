const oss = require('ali-oss')

export function client(res) {
  // 后端提供数据
  return new oss({
    region: res.region,
    accessKeyId: res.accessKeyId,
    accessKeySecret: res.accessKeySecret,
    bucket: res.bucket,
  })
}

export const getFileNameUUID = () => {
  function randomNum() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  return `${Date.now()}_${randomNum()}${randomNum()}`
}