const drawSquircle = (e, i, t, r, l, h) => {
  const s = h,
    o = l / 2;
  e.beginPath(),
    e.lineTo(t, o),
    e.lineTo(i.width - t, o),
    e.bezierCurveTo(i.width - t / r, o, i.width - o, t / r, i.width - o, t),
    e.lineTo(i.width - o, i.height - t),
    e.bezierCurveTo(
      i.width - o,
      i.height - t / r,
      i.width - t / r,
      i.height - o,
      i.width - t,
      i.height - o,
    ),
    e.lineTo(t, i.height - o),
    e.bezierCurveTo(t / r, i.height - o, o, i.height - t / r, o, i.height - t),
    e.lineTo(o, t),
    e.bezierCurveTo(o, t / r, t / r, o, t, o),
    e.closePath(),
    l
      ? ((e.strokeStyle = s), (e.lineWidth = l), e.stroke())
      : ((e.fillStyle = s), e.fill());
};
if ("undefined" != typeof registerPaint) {
  class e {
    static get contextOptions() {
      return { alpha: !0 };
    }
    static get inputProperties() {
      return [
        "--squircle-radius",
        "--squircle-smooth",
        "--squircle-outline",
        "--squircle-fill",
        "--squircle-ratio",
      ];
    }
    paint(e, i, t) {
      const r = t.get("--squircle-ratio"),
        l = parseFloat(r) ? parseFloat(r) : 1.8,
        h = parseFloat(10 * t.get("--squircle-smooth")),
        s = parseInt(t.get("--squircle-radius"), 10) * l,
        o = parseFloat(t.get("--squircle-outline"), 10),
        a = t.get("--squircle-fill").toString().replace(/\s/g, ""),
        u = () =>
          void 0 !== t.get("--squircle-smooth")[0] ? (0 === h ? 1 : h) : 10,
        n = () => o || 0,
        c = () => a || "#f45";
      s < i.width / 2 && s < i.height / 2
        ? drawSquircle(e, i, s, u(), n(), c())
        : drawSquircle(
            e,
            i,
            Math.min(i.width / 2, i.height / 2),
            u(),
            n(),
            c(),
          );
    }
  }
  registerPaint("squircle", e);
}
