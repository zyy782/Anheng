// 封装localStorage本地存储的方法
var storage = {
  setItem (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getItem (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  removeItem (key) {
    localStorage.removeItem(key)
  }
}
export default storage
