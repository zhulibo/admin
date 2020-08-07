let timestampToDate = value => {
  let dt = new Date(value);

  let y = dt.getFullYear();
  let m = dt.getMonth() + 1;
  let d = dt.getDate();
  let hh = dt.getHours();
  let mm = dt.getMinutes();
  let ss = dt.getSeconds();

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  hh = checkTime(hh);
  mm = checkTime(mm);
  ss = checkTime(ss);

  return y + "-" + m + "-" + d + "  " + hh + ":" + mm + ":" + ss
}

let noneToLine = value => {
  if (!value) return '--'
  return value
}

export default {
  timestampToDate, // 时间戳转日期
  noneToLine, // '' 转 '--'
}