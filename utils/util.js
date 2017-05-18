function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * from wechat cnode master
 */
function getDateDiff(dateTimeStamp) {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var year = day * 365;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    //非法操作
    return '数据出错';
  }
  var yearC = diffValue / year;
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (yearC >= 1) {
    result = parseInt(yearC) + '年以前';
  } else if (monthC >= 1) {
    result = parseInt(monthC) + '个月前';
  } else if (weekC >= 1) {
    result = parseInt(weekC) + '星期前';
  } else if (dayC >= 1) {
    result = parseInt(dayC) + '天前';
  } else if (hourC >= 1) {
    result = parseInt(hourC) + '小时前';
  } else if (minC >= 5) {
    result = parseInt(minC) + '分钟前';
  } else {
    result = '刚刚发表';
  }
  return result;
}

module.exports = {
  formatTime: formatTime,
  converToShowPoint: converToShowPoint,
  getDateDiff: getDateDiff,
  strTrim: strTrim
}

function strTrim (str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}  
  /**
 * address
:
"北京市东城区正义路7号(公安部东南门)"
alpha
:
1
height
:
undefined
iconPath
:
"../../img/marker_red.png"
iconTapPath
:
"../../img/marker_yellow.png"
id
:
0
latitude
:
39.903587906397
longitude
:
116.40657977411
telephone
:
"010-58187788"
title
:
"北京瑞安宾馆(公安部招待所)"
width
:
undefined
 */
function pointObj(id,latitude,longitude,name,address,phone){
    let sm ={
        address: address,
        name: name,
        iconPath: "../../img/marker_red.png",
        // iconTapPath: "../../img/marker_yellow.png",
        id: id,
        latitude: latitude,
        longitude: longitude,
        telephone: phone,
        title: name,
        width: 20,
        height: 40
    }
    return sm

}
function converToShowPoint(orgDt){
    if (orgDt){
        let outputs = [];
        for (let idx = 0;idx < orgDt.length;idx ++){
            outputs.push(
                new pointObj(orgDt[idx].id,
                orgDt[idx].location.lat,
                orgDt[idx].location.lng,
                orgDt[idx].title,
                orgDt[idx].address,
                orgDt[idx].tel
                )
            );
        }
        return outputs;
    }
    return null;
}