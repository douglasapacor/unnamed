var Neutralino = (function (e) {
  "use strict";
  function t(e, t, n, r) {
    return new (n || (n = Promise))(function (o, i) {
      function a(e) {
        try {
          c(r.next(e));
        } catch (e) {
          i(e);
        }
      }
      function s(e) {
        try {
          c(r.throw(e));
        } catch (e) {
          i(e);
        }
      }
      function c(e) {
        var t;
        e.done
          ? o(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                })).then(a, s);
      }
      c((r = r.apply(e, t || [])).next());
    });
  }
  function n() {
    return p("extensions.getStats");
  }
  "function" == typeof SuppressedError && SuppressedError;
  var r = {
    __proto__: null,
    broadcast: function (e, t) {
      return p("extensions.broadcast", { event: e, data: t });
    },
    dispatch: function (e, r, o) {
      return new Promise((i, a) =>
        t(this, void 0, void 0, function* () {
          const t = yield n();
          if (t.loaded.includes(e))
            if (t.connected.includes(e))
              try {
                const t = yield p("extensions.dispatch", {
                  extensionId: e,
                  event: r,
                  data: o,
                });
                i(t);
              } catch (e) {
                a(e);
              }
            else
              !(function (e, t) {
                e in l ? l[e].push(t) : (l[e] = [t]);
              })(e, {
                method: "extensions.dispatch",
                data: { extensionId: e, event: r, data: o },
                resolve: i,
                reject: a,
              });
          else a({ code: "NE_EX_EXTNOTL", message: `${e} is not loaded` });
        })
      );
    },
    getStats: n,
  };
  function o(e, t) {
    return (
      window.addEventListener(e, t),
      Promise.resolve({ success: !0, message: "Event listener added" })
    );
  }
  function i(e, t) {
    const n = new CustomEvent(e, { detail: t });
    return (
      window.dispatchEvent(n),
      Promise.resolve({ success: !0, message: "Message dispatched" })
    );
  }
  function a(e) {
    const t = window.atob(e),
      n = t.length,
      r = new Uint8Array(n);
    for (let e = 0; e < n; e++) r[e] = t.charCodeAt(e);
    return r.buffer;
  }
  function s(e) {
    let t = new Uint8Array(e),
      n = "";
    for (let e of t) n += String.fromCharCode(e);
    return window.btoa(n);
  }
  let c;
  const u = {},
    d = [],
    l = {};
  function f() {
    window.NL_TOKEN && sessionStorage.setItem("NL_TOKEN", window.NL_TOKEN);
    const e = g().split(".")[1],
      r =
        window.NL_GINJECTED || window.NL_CINJECTED
          ? "127.0.0.1"
          : window.location.hostname;
    (c = new WebSocket(`ws://${r}:${window.NL_PORT}?connectToken=${e}`)),
      (function () {
        if (
          (o("ready", () =>
            t(this, void 0, void 0, function* () {
              if ((yield w(d), !window.NL_EXTENABLED)) return;
              const e = yield n();
              for (const t of e.connected) i("extensionReady", t);
            })
          ),
          o("extClientConnect", (e) => {
            i("extensionReady", e.detail);
          }),
          !window.NL_EXTENABLED)
        )
          return;
        o("extensionReady", (e) =>
          t(this, void 0, void 0, function* () {
            e.detail in l && (yield w(l[e.detail]), delete l[e.detail]);
          })
        );
      })(),
      (function () {
        c.addEventListener("message", (e) => {
          var t, n, r;
          const o = JSON.parse(e.data);
          o.id && o.id in u
            ? ((null === (t = o.data) || void 0 === t ? void 0 : t.error)
                ? (u[o.id].reject(o.data.error),
                  "NE_RT_INVTOKN" == o.data.error.code &&
                    (c.close(),
                    (document.body.innerText = ""),
                    document.write(
                      "<code>NE_RT_INVTOKN</code>: Neutralinojs application cannot execute native methods since <code>NL_TOKEN</code> is invalid."
                    )))
                : (null === (n = o.data) || void 0 === n
                    ? void 0
                    : n.success) &&
                  u[o.id].resolve(
                    o.data.hasOwnProperty("returnValue")
                      ? o.data.returnValue
                      : o.data
                  ),
              delete u[o.id])
            : o.event &&
              ("openedFile" == o.event &&
                "dataBinary" ==
                  (null === (r = null == o ? void 0 : o.data) || void 0 === r
                    ? void 0
                    : r.action) &&
                (o.data.data = a(o.data.data)),
              i(o.event, o.data));
        }),
          c.addEventListener("open", (e) =>
            t(this, void 0, void 0, function* () {
              i("ready");
            })
          ),
          c.addEventListener("close", (e) =>
            t(this, void 0, void 0, function* () {
              i("serverOffline", {
                code: "NE_CL_NSEROFF",
                message:
                  "Neutralino server is offline. Try restarting the application",
              });
            })
          ),
          c.addEventListener("error", (e) =>
            t(this, void 0, void 0, function* () {
              (document.body.innerText = ""),
                document.write(
                  "<code>NE_CL_IVCTOKN</code>: Neutralinojs application cannot connect with the framework core using <code>NL_TOKEN</code>."
                );
            })
          );
      })();
  }
  function p(e, t) {
    return new Promise((n, r) => {
      if ((null == c ? void 0 : c.readyState) != WebSocket.OPEN)
        return (
          (o = { method: e, data: t, resolve: n, reject: r }), void d.push(o)
        );
      var o;
      const i = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (e) =>
          (
            e ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (e / 4)))
          ).toString(16)
        ),
        a = g();
      (u[i] = { resolve: n, reject: r }),
        c.send(JSON.stringify({ id: i, method: e, data: t, accessToken: a }));
    });
  }
  function w(e) {
    return t(this, void 0, void 0, function* () {
      for (; e.length > 0; ) {
        const t = e.shift();
        try {
          const e = yield p(t.method, t.data);
          t.resolve(e);
        } catch (e) {
          t.reject(e);
        }
      }
    });
  }
  function g() {
    return window.NL_TOKEN || sessionStorage.getItem("NL_TOKEN") || "";
  }
  function m(e, t) {
    return p("filesystem.writeBinaryFile", { path: e, data: s(t) });
  }
  var h = {
    __proto__: null,
    appendBinaryFile: function (e, t) {
      return p("filesystem.appendBinaryFile", { path: e, data: s(t) });
    },
    appendFile: function (e, t) {
      return p("filesystem.appendFile", { path: e, data: t });
    },
    copy: function (e, t, n) {
      return p(
        "filesystem.copy",
        Object.assign({ source: e, destination: t }, n)
      );
    },
    createDirectory: function (e) {
      return p("filesystem.createDirectory", { path: e });
    },
    createWatcher: function (e) {
      return p("filesystem.createWatcher", { path: e });
    },
    getAbsolutePath: function (e) {
      return p("filesystem.getAbsolutePath", { path: e });
    },
    getOpenedFileInfo: function (e) {
      return p("filesystem.getOpenedFileInfo", { id: e });
    },
    getPathParts: function (e) {
      return p("filesystem.getPathParts", { path: e });
    },
    getRelativePath: function (e, t) {
      return p("filesystem.getRelativePath", { path: e, base: t });
    },
    getStats: function (e) {
      return p("filesystem.getStats", { path: e });
    },
    getWatchers: function () {
      return p("filesystem.getWatchers");
    },
    move: function (e, t) {
      return p("filesystem.move", { source: e, destination: t });
    },
    openFile: function (e) {
      return p("filesystem.openFile", { path: e });
    },
    readBinaryFile: function (e, t) {
      return new Promise((n, r) => {
        p("filesystem.readBinaryFile", Object.assign({ path: e }, t))
          .then((e) => {
            n(a(e));
          })
          .catch((e) => {
            r(e);
          });
      });
    },
    readDirectory: function (e, t) {
      return p("filesystem.readDirectory", Object.assign({ path: e }, t));
    },
    readFile: function (e, t) {
      return p("filesystem.readFile", Object.assign({ path: e }, t));
    },
    remove: function (e) {
      return p("filesystem.remove", { path: e });
    },
    removeWatcher: function (e) {
      return p("filesystem.removeWatcher", { id: e });
    },
    updateOpenedFile: function (e, t, n) {
      return p("filesystem.updateOpenedFile", { id: e, event: t, data: n });
    },
    writeBinaryFile: m,
    writeFile: function (e, t) {
      return p("filesystem.writeFile", { path: e, data: t });
    },
  };
  function v(e, t) {
    return p("os.execCommand", Object.assign({ command: e }, t));
  }
  var _ = {
    __proto__: null,
    execCommand: v,
    getEnv: function (e) {
      return p("os.getEnv", { key: e });
    },
    getEnvs: function () {
      return p("os.getEnvs");
    },
    getPath: function (e) {
      return p("os.getPath", { name: e });
    },
    getSpawnedProcesses: function () {
      return p("os.getSpawnedProcesses");
    },
    open: function (e) {
      return p("os.open", { url: e });
    },
    setTray: function (e) {
      return p("os.setTray", e);
    },
    showFolderDialog: function (e, t) {
      return p("os.showFolderDialog", Object.assign({ title: e }, t));
    },
    showMessageBox: function (e, t, n, r) {
      return p("os.showMessageBox", {
        title: e,
        content: t,
        choice: n,
        icon: r,
      });
    },
    showNotification: function (e, t, n) {
      return p("os.showNotification", { title: e, content: t, icon: n });
    },
    showOpenDialog: function (e, t) {
      return p("os.showOpenDialog", Object.assign({ title: e }, t));
    },
    showSaveDialog: function (e, t) {
      return p("os.showSaveDialog", Object.assign({ title: e }, t));
    },
    spawnProcess: function (e, t) {
      return p("os.spawnProcess", { command: e, cwd: t });
    },
    updateSpawnedProcess: function (e, t, n) {
      return p("os.updateSpawnedProcess", { id: e, event: t, data: n });
    },
  };
  var y = {
    __proto__: null,
    getArch: function () {
      return p("computer.getArch");
    },
    getCPUInfo: function () {
      return p("computer.getCPUInfo");
    },
    getDisplays: function () {
      return p("computer.getDisplays");
    },
    getKernelInfo: function () {
      return p("computer.getKernelInfo");
    },
    getMemoryInfo: function () {
      return p("computer.getMemoryInfo");
    },
    getMousePosition: function () {
      return p("computer.getMousePosition");
    },
    getOSInfo: function () {
      return p("computer.getOSInfo");
    },
  };
  var E = {
    __proto__: null,
    getData: function (e) {
      return p("storage.getData", { key: e });
    },
    getKeys: function () {
      return p("storage.getKeys");
    },
    setData: function (e, t) {
      return p("storage.setData", { key: e, data: t });
    },
  };
  function N(e, t) {
    return p("debug.log", { message: e, type: t });
  }
  var b = { __proto__: null, log: N };
  function O(e) {
    return p("app.exit", { code: e });
  }
  var P = {
    __proto__: null,
    broadcast: function (e, t) {
      return p("app.broadcast", { event: e, data: t });
    },
    exit: O,
    getConfig: function () {
      return p("app.getConfig");
    },
    killProcess: function () {
      return p("app.killProcess");
    },
    readProcessInput: function (e) {
      return p("app.readProcessInput", { readAll: e });
    },
    restartProcess: function (e) {
      return new Promise((n) =>
        t(this, void 0, void 0, function* () {
          let t = window.NL_ARGS.reduce(
            (e, t) => (t.includes(" ") && (t = `"${t}"`), (e += " " + t)),
            ""
          );
          (null == e ? void 0 : e.args) && (t += " " + e.args),
            yield v(t, { background: !0 }),
            O(),
            n();
        })
      );
    },
    writeProcessError: function (e) {
      return p("app.writeProcessError", { data: e });
    },
    writeProcessOutput: function (e) {
      return p("app.writeProcessOutput", { data: e });
    },
  };
  const S = new WeakMap();
  function T(e, t) {
    return p("window.move", { x: e, y: t });
  }
  function D() {
    return p("window.getSize");
  }
  var L = {
    __proto__: null,
    center: function () {
      return p("window.center");
    },
    create: function (e, t) {
      return new Promise((n, r) => {
        function o(e) {
          return (
            "string" != typeof e ||
              ((e = e.trim()).includes(" ") && (e = `"${e}"`)),
            e
          );
        }
        t = Object.assign(Object.assign({}, t), { useSavedState: !1 });
        let i = window.NL_ARGS.reduce(
          (e, t, n) => (
            (t.includes("--path=") ||
              t.includes("--debug-mode") ||
              t.includes("--load-dir-res") ||
              0 == n) &&
              (e += " " + o(t)),
            e
          ),
          ""
        );
        i += " --url=" + o(e);
        for (let e in t) {
          if ("processArgs" == e) continue;
          i += ` --window${
            "-" + e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
          }=${o(t[e])}`;
        }
        t && t.processArgs && (i += " " + t.processArgs),
          v(i, { background: !0 })
            .then((e) => {
              n(e);
            })
            .catch((e) => {
              r(e);
            });
      });
    },
    exitFullScreen: function () {
      return p("window.exitFullScreen");
    },
    focus: function () {
      return p("window.focus");
    },
    getPosition: function () {
      return p("window.getPosition");
    },
    getSize: D,
    getTitle: function () {
      return p("window.getTitle");
    },
    hide: function () {
      return p("window.hide");
    },
    isFullScreen: function () {
      return p("window.isFullScreen");
    },
    isMaximized: function () {
      return p("window.isMaximized");
    },
    isMinimized: function () {
      return p("window.isMinimized");
    },
    isVisible: function () {
      return p("window.isVisible");
    },
    maximize: function () {
      return p("window.maximize");
    },
    minimize: function () {
      return p("window.minimize");
    },
    move: T,
    setAlwaysOnTop: function (e) {
      return p("window.setAlwaysOnTop", { onTop: e });
    },
    setDraggableRegion: function (e, n = {}) {
      return new Promise((r, o) => {
        const i = e instanceof Element ? e : document.getElementById(e);
        let a = 0,
          s = 0,
          c = 0,
          u = !1,
          d = performance.now(),
          l = n.alwaysCapture;
        if (!i)
          return o({
            code: "NE_WD_DOMNOTF",
            message: "Unable to find DOM element",
          });
        if (S.has(i))
          return o({
            code: "NE_WD_ALRDREL",
            message: "This DOM element is already an active draggable region",
          });
        function f(e) {
          return t(this, void 0, void 0, function* () {
            var t;
            const r = e.clientX - a,
              o = e.clientY - s;
            if (
              ((c = Math.sqrt(r * r + o * o)),
              c >=
                (null !== (t = n.dragMinDistance) && void 0 !== t ? t : 10) &&
                ((u = !0), l || (i.setPointerCapture(e.pointerId), (l = !0))),
              u)
            ) {
              const t = performance.now(),
                n = t - d;
              if (n < 5) return;
              return (
                (d = t - (n - 5)), void (yield T(e.screenX - a, e.screenY - s))
              );
            }
          });
        }
        function p(e) {
          0 === e.button &&
            ((a = e.clientX),
            (s = e.clientY),
            i.addEventListener("pointermove", f),
            n.alwaysCapture && i.setPointerCapture(e.pointerId));
        }
        function w(e) {
          i.removeEventListener("pointermove", f),
            i.releasePointerCapture(e.pointerId);
        }
        i.addEventListener("pointerdown", p),
          i.addEventListener("pointerup", w),
          i.addEventListener("pointercancel", w),
          S.set(i, { pointerdown: p, pointerup: w }),
          r({ success: !0, message: "Draggable region was activated" });
      });
    },
    setFullScreen: function () {
      return p("window.setFullScreen");
    },
    setIcon: function (e) {
      return p("window.setIcon", { icon: e });
    },
    setSize: function (e) {
      return new Promise((n, r) =>
        t(this, void 0, void 0, function* () {
          let t = yield D();
          p("window.setSize", (e = Object.assign(Object.assign({}, t), e)))
            .then((e) => {
              n(e);
            })
            .catch((e) => {
              r(e);
            });
        })
      );
    },
    setTitle: function (e) {
      return p("window.setTitle", { title: e });
    },
    show: function () {
      return p("window.show");
    },
    snapshot: function (e) {
      return p("window.snapshot", { path: e });
    },
    unmaximize: function () {
      return p("window.unmaximize");
    },
    unminimize: function () {
      return p("window.unminimize");
    },
    unsetDraggableRegion: function (e) {
      return new Promise((t, n) => {
        const r = e instanceof Element ? e : document.getElementById(e);
        if (!r)
          return n({
            code: "NE_WD_DOMNOTF",
            message: "Unable to find DOM element",
          });
        if (!S.has(r))
          return n({
            code: "NE_WD_NOTDRRE",
            message: "DOM element is not an active draggable region",
          });
        const { pointerdown: o, pointerup: i } = S.get(r);
        r.removeEventListener("pointerdown", o),
          r.removeEventListener("pointerup", i),
          r.removeEventListener("pointercancel", i),
          S.delete(r),
          t({ success: !0, message: "Draggable region was deactivated" });
      });
    },
  };
  var F = {
    __proto__: null,
    broadcast: function (e, t) {
      return p("events.broadcast", { event: e, data: t });
    },
    dispatch: i,
    off: function (e, t) {
      return (
        window.removeEventListener(e, t),
        Promise.resolve({ success: !0, message: "Event listener removed" })
      );
    },
    on: o,
  };
  let x = null;
  var C = {
    __proto__: null,
    checkForUpdates: function (e) {
      return new Promise((n, r) =>
        t(this, void 0, void 0, function* () {
          if (!e)
            return r({
              code: "NE_RT_NATRTER",
              message: "Missing require parameter: url",
            });
          try {
            const t = yield fetch(e);
            (x = JSON.parse(yield t.text())),
              !(function (e) {
                return !!(
                  e.applicationId &&
                  e.applicationId == window.NL_APPID &&
                  e.version &&
                  e.resourcesURL
                );
              })(x)
                ? r({
                    code: "NE_UP_CUPDMER",
                    message:
                      "Invalid update manifest or mismatching applicationId",
                  })
                : n(x);
          } catch (e) {
            r({
              code: "NE_UP_CUPDERR",
              message: "Unable to fetch update manifest",
            });
          }
        })
      );
    },
    install: function () {
      return new Promise((e, n) =>
        t(this, void 0, void 0, function* () {
          if (!x)
            return n({
              code: "NE_UP_UPDNOUF",
              message: "No update manifest loaded",
            });
          try {
            const t = yield fetch(x.resourcesURL),
              n = yield t.arrayBuffer();
            yield m(window.NL_PATH + "/resources.neu", n),
              e({
                success: !0,
                message: "Update installed. Restart the process to see updates",
              });
          } catch (e) {
            n({ code: "NE_UP_UPDINER", message: "Update installation error" });
          }
        })
      );
    },
  };
  var I = {
    __proto__: null,
    clear: function () {
      return p("clipboard.clear");
    },
    getFormat: function () {
      return p("clipboard.getFormat");
    },
    readImage: function (e = "") {
      return new Promise((t, n) => {
        p("clipboard.readImage")
          .then((n) => {
            if (n) {
              const r = window.atob(n.data);
              let o,
                i,
                a,
                s = 32 == n.bpp ? 4 : 3;
              switch (e.toLowerCase()) {
                case "rgb":
                  (o = n.width * n.height * 3), (i = [0, 1, 2]);
                  break;
                case "rgba":
                  (o = n.width * n.height * 4), (i = [0, 1, 2, 3]);
                  break;
                case "argb":
                  (o = n.width * n.height * 4), (i = [3, 0, 1, 2]);
                  break;
                case "bgra":
                  (o = n.width * n.height * 4), (i = [2, 1, 0, 3]);
                  break;
                default:
                  (o = r.length), (a = new Uint8Array(o));
                  for (let e = 0; e < o; e++) a[e] = r.charCodeAt(e);
                  return (n.data = a), void t(n);
              }
              a = new Uint8Array(o);
              let c,
                u,
                d,
                l,
                f,
                p = 255 == new Uint8Array(new Uint32Array([255]).buffer)[0],
                w = [],
                g = 0;
              for (let e = 0; e < r.length; e += s)
                (c = r.charCodeAt(e)),
                  (u = r.charCodeAt(e + 1)),
                  (d = r.charCodeAt(e + 2)),
                  (l = 4 == s ? r.charCodeAt(e + 3) : 255),
                  (f = p
                    ? ((l << 24) | (d << 16) | (u << 8) | c) >>> 0
                    : ((c << 24) | (u << 16) | (d << 8) | l) >>> 0),
                  (w = [
                    (f >> n.redShift) & 255,
                    (f >> n.greenShift) & 255,
                    (f >> n.blueShift) & 255,
                    (f >> n.alphaShift) & 255,
                  ]),
                  i.forEach((e, t) => {
                    a[t + g] = w[e];
                  }),
                  (g += i.length);
              n.data = a;
            }
            t(n);
          })
          .catch((e) => {
            n(e);
          });
      });
    },
    readText: function () {
      return p("clipboard.readText");
    },
    writeImage: function (e) {
      const t = Object.assign({}, e);
      return (
        (null == e ? void 0 : e.data) && (t.data = s(e.data)),
        p("clipboard.writeImage", t)
      );
    },
    writeText: function (e) {
      return p("clipboard.writeText", { data: e });
    },
  };
  var A = {
    __proto__: null,
    extractDirectory: function (e, t) {
      return p("resources.extractDirectory", { path: e, destination: t });
    },
    extractFile: function (e, t) {
      return p("resources.extractFile", { path: e, destination: t });
    },
    getFiles: function () {
      return p("resources.getFiles");
    },
    getStats: function (e) {
      return p("resources.getStats", { path: e });
    },
    readBinaryFile: function (e) {
      return new Promise((t, n) => {
        p("resources.readBinaryFile", { path: e })
          .then((e) => {
            t(a(e));
          })
          .catch((e) => {
            n(e);
          });
      });
    },
    readFile: function (e) {
      return p("resources.readFile", { path: e });
    },
  };
  var M = {
    __proto__: null,
    getMounts: function () {
      return p("server.getMounts");
    },
    mount: function (e, t) {
      return p("server.mount", { path: e, target: t });
    },
    unmount: function (e) {
      return p("server.unmount", { path: e });
    },
  };
  var R = {
    __proto__: null,
    getMethods: function () {
      return p("custom.getMethods");
    },
  };
  let j = !1;
  return (
    (e.app = P),
    (e.clipboard = I),
    (e.computer = y),
    (e.custom = R),
    (e.debug = b),
    (e.events = F),
    (e.extensions = r),
    (e.filesystem = h),
    (e.init = function (e = {}) {
      if (((e = Object.assign({ exportCustomMethods: !0 }, e)), !j)) {
        if (
          (f(),
          window.NL_ARGS.find((e) => "--neu-dev-auto-reload" == e) &&
            o("neuDev_reloadApp", () =>
              t(this, void 0, void 0, function* () {
                yield N("Reloading the application..."), location.reload();
              })
            ),
          e.exportCustomMethods &&
            window.NL_CMETHODS &&
            window.NL_CMETHODS.length > 0)
        )
          for (const e of window.NL_CMETHODS)
            Neutralino.custom[e] = (...t) => {
              let n = {};
              for (const [e, r] of t.entries())
                n =
                  "object" != typeof r || Array.isArray(r) || null == r
                    ? Object.assign(Object.assign({}, n), { ["arg" + e]: r })
                    : Object.assign(Object.assign({}, n), r);
              return p("custom." + e, n);
            };
        (window.NL_CVERSION = "5.6.0"),
          (window.NL_CCOMMIT = "425c526c318342e0e5d0f17caceef2a53049eda4"),
          (j = !0);
      }
    }),
    (e.os = _),
    (e.resources = A),
    (e.server = M),
    (e.storage = E),
    (e.updater = C),
    (e.window = L),
    e
  );
})({});
