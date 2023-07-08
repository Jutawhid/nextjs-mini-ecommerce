const LOCALSTORAGE_KEY_PREFIX = "amazon-clone-ninja";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get(item: any) {
    try {
      return window != undefined && window.localStorage.getItem(`${LOCALSTORAGE_KEY_PREFIX}:${item}`);
    } catch (e) {
      return null;
    }
  },
  set(item: any, value: any) {
    try {
      window != undefined && window.localStorage.setItem(`${LOCALSTORAGE_KEY_PREFIX}:${item}`, value);
    } catch (e) {}
  },
};
