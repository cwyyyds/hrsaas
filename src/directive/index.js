export const imgError = {
  inserted: function (el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    }
  },
}
export const aa = {
  inserted: function (el, { value }) {
    el.onerror = function () {
      el.src = value
    }
  },
}
