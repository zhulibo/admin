let timestampToDate = value => {
  if (!value) return ''
  let dt = new Date(Number(value))
  let y = dt.getFullYear()
  let m = dt.getMonth() + 1
  let d = dt.getDate()
  let hh = dt.getHours()
  let mm = dt.getMinutes()

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i
    }
    return i
  }

  m = checkTime(m)
  d = checkTime(d)
  hh = checkTime(hh)
  mm = checkTime(mm)

  return y + "-" + m + "-" + d + "  " + hh + ":" + mm
}

let timestampToDateDay = value => {
  if (!value) return ''
  let dt = new Date(Number(value))
  let y = dt.getFullYear()
  let m = dt.getMonth() + 1
  let d = dt.getDate()
  let hh = dt.getHours()
  let mm = dt.getMinutes()

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i
    }
    return i
  }

  m = checkTime(m)
  d = checkTime(d)
  hh = checkTime(hh)
  mm = checkTime(mm)

  return y + "-" + m + "-" + d
}

let noneToLine = value => {
  if (value === null || value === '') return '--'
  return value
}

export default {
  timestampToDate, // 时间戳转日期
  timestampToDateDay, // 时间戳转日期
  noneToLine, // '' 转 '--'
}