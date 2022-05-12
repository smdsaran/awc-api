import CryptoJS from "crypto-js";

const decrypt = (ciphertext) => {
  var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
};

export default decrypt;
