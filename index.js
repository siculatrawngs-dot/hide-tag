let u1, u2;
module.exports = {
  onLoad: () => {
    try {
      const v = typeof vendetta !== "undefined" ? vendetta : window.bunny;
      const b = v.metro.findByName("BotTag", false);
      if (b) {
        if (b.default) u1 = v.patcher.after("default", b, () => null);
        else u1 = v.patcher.after("BotTag", b, () => null);
      }
      const a = v.metro.findByName("AppTag", false);
      if (a) {
        if (a.default) u2 = v.patcher.after("default", a, () => null);
        else u2 = v.patcher.after("AppTag", a, () => null);
      }
    } catch(e) {}
  },
  onUnload: () => {
    if (u1) u1();
    if (u2) u2();
  }
};
