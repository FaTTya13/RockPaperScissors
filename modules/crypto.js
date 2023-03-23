const key = require("csprng");
const crypto = require("crypto");

class Crypto {
  static generateKey() {
    const t = key(256, 16);
    return t;
  }
  static generateHMAC(key, message) {
    const hmac = crypto
      .createHmac("sha3-256", key)
      .update(message)
      .digest("hex");
    return hmac;
  }
}

module.exports = Crypto;