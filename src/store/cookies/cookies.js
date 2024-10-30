import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const secretKey = "BOFJABOJB#JOFSFO12"; // Khóa bí mật để mã hóa

export const setEncryptedCookie = (name, data) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();
  Cookies.set(name, encryptedData, { expires: 7 }); // Lưu trữ cookie trong 7 ngày
};

export const getDecryptedCookie = (name) => {
  const encryptedData = Cookies.get(name);
  if (!encryptedData) return null;

  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
