const validator = {
  validateUserId: (userId) => {
    return typeof userId === "string" && userId.trim() !== "";
  },
  validateDeviceId: (deviceId) => {
    return typeof deviceId === "string" && deviceId.trim() !== "";
  },
  validateName: (name) => {
    return typeof name === "string" && name.trim() !== "";
  },
  validatePhone: (phone) => {
    return typeof phone === "string" && phone.trim() !== "";
  },
  validatePassword: (password) => {
    return typeof password === "string" && password.length >= 5;
  },
  validateIsPrime: (isPrime) => {
    return typeof isPrime === "boolean";
  },
};

module.exports = validator;
