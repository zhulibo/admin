export const renameFileName = () => {
  function randomNum() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${Date.now()}_${randomNum()}${randomNum()}`
}