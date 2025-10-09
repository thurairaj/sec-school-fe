const store = {
  access: null,
  setAccess(token) {
    this.access = token || null;
    if (token) localStorage.setItem("access", token);
    else localStorage.removeItem("access");
  },
  load() {
    this.access = localStorage.getItem("access");
  },
  getAccess() {
    return this.access;
  },
  clear() {
    this.setAccess(null);
  },
};

store.load();
export default store;
