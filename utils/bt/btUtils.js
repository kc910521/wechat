

//**********************TOOLS********************** */
var CryptoJS = require('../aes/crypto-js'); 

const CRC_TABLE = [
  0x0000, 0x8005, 0x800F, 0x000A, 0x801B, 0x001E, 0x0014, 0x8011,
  0x8033, 0x0036, 0x003C, 0x8039, 0x0028, 0x802D, 0x8027, 0x0022
];


function HexStrToArrayBuffer(hstr) {
  let oarray = Str2Bytes(hstr);
  let buffer = new ArrayBuffer(18)
  let dataView = new DataView(buffer)
  oarray.forEach((item, i) => {
    dataView.setInt8(i, item);
  });
  // for (var i = 0; i < oarray.length; i++) {
  //   dataView.setInt8(i, oarray[i]);
  // }
  return buffer;
}
/**
 * 获取数据的crc校验码
 * data == array of bt
 */
function crcTableSimple(data) {
  var crc = 0xFFFF;
  let j, i, l;
  for (var val of data){
    for (j = 0; j < 2; j++) {
      let c = (((crc >> 8) ^ val) >> 4) & 0x0F;
      crc = (crc << 4) ^ CRC_TABLE[(((crc >> 8) ^ val) >> 4) & 0x0F];
      val = val << 4;
    }
  }
  crc = crc & 0xFFFF;
  return crc.toString(16);
}

/**
 * encode hex to code
 */
function hexToCode(hex) {
  let key = CryptoJS.enc.Hex.parse('A0201052062000000000010000000000');
  let iv = CryptoJS.enc.Hex.parse('0000000000000000' + '0000000000000000');
  let lval = CryptoJS.enc.Hex.parse(hex);
  let encrypted = CryptoJS.AES.encrypt(lval, key,
    {
      iv: iv,
      algorithm: CryptoJS.algo.AES,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.NoPadding
    });
  return encrypted.ciphertext.toString().toUpperCase();// + '9FB2';
}
/**
 * decode hex to str
 */
function codeToStr(ehex) {
  let key = CryptoJS.enc.Hex.parse('A0201052062000000000010000000000');
  let iv = CryptoJS.enc.Hex.parse('0000000000000000' + '0000000000000000');

  let encryptedHexStr = CryptoJS.enc.Hex.parse(ehex);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key,
    {
      iv: iv,
      algorithm: CryptoJS.algo.AES,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.NoPadding
    });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Hex);
  return decryptedStr.toString();
}
/**
 * ss
 */
function Str2Bytes(str) {
  var pos = 0;
  var len = str.length;
  if (len % 2 != 0) {
    return null;
  }
  len /= 2;
  var hexA = new Array();
  for (var i = 0; i < len; i++) {
    var s = str.substr(pos, 2);
    var v = parseInt(s, 16);
    hexA.push(v);
    pos += 2;
  }
  return hexA;
}

export {
  Str2Bytes as Str2Bytes,
  codeToStr as codeToStr,
  hexToCode as hexToCode,
  crcTableSimple as crcTableSimple,
  HexStrToArrayBuffer as HexStrToArrayBuffer
};

