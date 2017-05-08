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

module.exports = {
  formatTime: formatTime,
  converToShowPoint: converToShowPoint
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
function pointObj(id,latitude,longitude,name,address){
    let sm ={
        address: address,
        name: name,
        iconPath: "../../img/marker_red.png",
        // iconTapPath: "../../img/marker_yellow.png",
        id: id,
        latitude: latitude,
        longitude: longitude,
        telephone: "110",
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
                orgDt[idx].address)
            );
        }
        return outputs;
    }
    return null;
}