const q = globalThis, re = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ae = /* @__PURE__ */ Symbol(), he = /* @__PURE__ */ new WeakMap();
let ke = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== ae) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (re && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = he.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && he.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ue = (t) => new ke(typeof t == "string" ? t : t + "", void 0, ae), A = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, a, n) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + t[n + 1], t[0]);
  return new ke(i, t, ae);
}, Re = (t, e) => {
  if (re) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), a = q.litNonce;
    a !== void 0 && r.setAttribute("nonce", a), r.textContent = i.cssText, t.appendChild(r);
  }
}, be = re ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return Ue(i);
})(t) : t;
const { is: He, defineProperty: ze, getOwnPropertyDescriptor: Ie, getOwnPropertyNames: Be, getOwnPropertySymbols: We, getPrototypeOf: Fe } = Object, J = globalThis, fe = J.trustedTypes, qe = fe ? fe.emptyScript : "", Ge = J.reactiveElementPolyfillSupport, j = (t, e) => t, G = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? qe : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, ne = (t, e) => !He(t, e), ve = { attribute: !0, type: String, converter: G, reflect: !1, useDefault: !1, hasChanged: ne };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), J.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let S = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = ve) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), a = this.getPropertyDescriptor(e, r, i);
      a !== void 0 && ze(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: a, set: n } = Ie(this.prototype, e) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: a, set(s) {
      const l = a?.call(this);
      n?.call(this, s), this.requestUpdate(e, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ve;
  }
  static _$Ei() {
    if (this.hasOwnProperty(j("elementProperties"))) return;
    const e = Fe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(j("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(j("properties"))) {
      const i = this.properties, r = [...Be(i), ...We(i)];
      for (const a of r) this.createProperty(a, i[a]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [r, a] of i) this.elementProperties.set(r, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const a = this._$Eu(i, r);
      a !== void 0 && this._$Eh.set(a, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const a of r) i.unshift(be(a));
    } else e !== void 0 && i.push(be(e));
    return i;
  }
  static _$Eu(e, i) {
    const r = i.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const r of i.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Re(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, r) {
    this._$AK(e, r);
  }
  _$ET(e, i) {
    const r = this.constructor.elementProperties.get(e), a = this.constructor._$Eu(e, r);
    if (a !== void 0 && r.reflect === !0) {
      const n = (r.converter?.toAttribute !== void 0 ? r.converter : G).toAttribute(i, r.type);
      this._$Em = e, n == null ? this.removeAttribute(a) : this.setAttribute(a, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const r = this.constructor, a = r._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const n = r.getPropertyOptions(a), s = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : G;
      this._$Em = a;
      const l = s.fromAttribute(i, n.type);
      this[a] = l ?? this._$Ej?.get(a) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, a = !1, n) {
    if (e !== void 0) {
      const s = this.constructor;
      if (a === !1 && (n = this[e]), r ??= s.getPropertyOptions(e), !((r.hasChanged ?? ne)(n, i) || r.useDefault && r.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(s._$Eu(e, r)))) return;
      this.C(e, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: r, reflect: a, wrapped: n }, s) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, s ?? i ?? this[e]), n !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (i = void 0), this._$AL.set(e, i)), a === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [a, n] of this._$Ep) this[a] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [a, n] of r) {
        const { wrapped: s } = n, l = this[a];
        s !== !0 || this._$AL.has(a) || l === void 0 || this.C(a, void 0, n, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[j("elementProperties")] = /* @__PURE__ */ new Map(), S[j("finalized")] = /* @__PURE__ */ new Map(), Ge?.({ ReactiveElement: S }), (J.reactiveElementVersions ??= []).push("2.1.2");
const se = globalThis, $e = (t) => t, V = se.trustedTypes, ye = V ? V.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Le = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Te = "?" + $, Ve = `<${Te}>`, C = document, N = () => C.createComment(""), D = (t) => t === null || typeof t != "object" && typeof t != "function", oe = Array.isArray, Ke = (t) => oe(t) || typeof t?.[Symbol.iterator] == "function", X = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xe = /-->/g, _e = />/g, x = RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), we = /'/g, Ce = /"/g, Pe = /^(?:script|style|textarea|title)$/i, Ze = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), c = Ze(1), k = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), Ae = /* @__PURE__ */ new WeakMap(), _ = C.createTreeWalker(C, 129);
function Me(t, e) {
  if (!oe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ye !== void 0 ? ye.createHTML(e) : e;
}
const Je = (t, e) => {
  const i = t.length - 1, r = [];
  let a, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = O;
  for (let l = 0; l < i; l++) {
    const o = t[l];
    let d, m, p = -1, h = 0;
    for (; h < o.length && (s.lastIndex = h, m = s.exec(o), m !== null); ) h = s.lastIndex, s === O ? m[1] === "!--" ? s = xe : m[1] !== void 0 ? s = _e : m[2] !== void 0 ? (Pe.test(m[2]) && (a = RegExp("</" + m[2], "g")), s = x) : m[3] !== void 0 && (s = x) : s === x ? m[0] === ">" ? (s = a ?? O, p = -1) : m[1] === void 0 ? p = -2 : (p = s.lastIndex - m[2].length, d = m[1], s = m[3] === void 0 ? x : m[3] === '"' ? Ce : we) : s === Ce || s === we ? s = x : s === xe || s === _e ? s = O : (s = x, a = void 0);
    const b = s === x && t[l + 1].startsWith("/>") ? " " : "";
    n += s === O ? o + Ve : p >= 0 ? (r.push(d), o.slice(0, p) + Le + o.slice(p) + $ + b) : o + $ + (p === -2 ? l : b);
  }
  return [Me(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class U {
  constructor({ strings: e, _$litType$: i }, r) {
    let a;
    this.parts = [];
    let n = 0, s = 0;
    const l = e.length - 1, o = this.parts, [d, m] = Je(e, i);
    if (this.el = U.createElement(d, r), _.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (a = _.nextNode()) !== null && o.length < l; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const p of a.getAttributeNames()) if (p.endsWith(Le)) {
          const h = m[s++], b = a.getAttribute(p).split($), F = /([.?@])?(.*)/.exec(h);
          o.push({ type: 1, index: n, name: F[2], strings: b, ctor: F[1] === "." ? Qe : F[1] === "?" ? Xe : F[1] === "@" ? et : Y }), a.removeAttribute(p);
        } else p.startsWith($) && (o.push({ type: 6, index: n }), a.removeAttribute(p));
        if (Pe.test(a.tagName)) {
          const p = a.textContent.split($), h = p.length - 1;
          if (h > 0) {
            a.textContent = V ? V.emptyScript : "";
            for (let b = 0; b < h; b++) a.append(p[b], N()), _.nextNode(), o.push({ type: 2, index: ++n });
            a.append(p[h], N());
          }
        }
      } else if (a.nodeType === 8) if (a.data === Te) o.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = a.data.indexOf($, p + 1)) !== -1; ) o.push({ type: 7, index: n }), p += $.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const r = C.createElement("template");
    return r.innerHTML = e, r;
  }
}
function L(t, e, i = t, r) {
  if (e === k) return e;
  let a = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const n = D(e) ? void 0 : e._$litDirective$;
  return a?.constructor !== n && (a?._$AO?.(!1), n === void 0 ? a = void 0 : (a = new n(t), a._$AT(t, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = a : i._$Cl = a), a !== void 0 && (e = L(t, a._$AS(t, e.values), a, r)), e;
}
class Ye {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: r } = this._$AD, a = (e?.creationScope ?? C).importNode(i, !0);
    _.currentNode = a;
    let n = _.nextNode(), s = 0, l = 0, o = r[0];
    for (; o !== void 0; ) {
      if (s === o.index) {
        let d;
        o.type === 2 ? d = new W(n, n.nextSibling, this, e) : o.type === 1 ? d = new o.ctor(n, o.name, o.strings, this, e) : o.type === 6 && (d = new tt(n, this, e)), this._$AV.push(d), o = r[++l];
      }
      s !== o?.index && (n = _.nextNode(), s++);
    }
    return _.currentNode = C, a;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class W {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, r, a) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = a, this._$Cv = a?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = L(this, e, i), D(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== k && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ke(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && D(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: r } = e, a = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = U.createElement(Me(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === a) this._$AH.p(i);
    else {
      const n = new Ye(a, this), s = n.u(this.options);
      n.p(i), this.T(s), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = Ae.get(e.strings);
    return i === void 0 && Ae.set(e.strings, i = new U(e)), i;
  }
  k(e) {
    oe(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, a = 0;
    for (const n of e) a === i.length ? i.push(r = new W(this.O(N()), this.O(N()), this, this.options)) : r = i[a], r._$AI(n), a++;
    a < i.length && (this._$AR(r && r._$AB.nextSibling, a), i.length = a);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const r = $e(e).nextSibling;
      $e(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Y {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, r, a, n) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = i, this._$AM = a, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(e, i = this, r, a) {
    const n = this.strings;
    let s = !1;
    if (n === void 0) e = L(this, e, i, 0), s = !D(e) || e !== this._$AH && e !== k, s && (this._$AH = e);
    else {
      const l = e;
      let o, d;
      for (e = n[0], o = 0; o < n.length - 1; o++) d = L(this, l[r + o], i, o), d === k && (d = this._$AH[o]), s ||= !D(d) || d !== this._$AH[o], d === g ? e = g : e !== g && (e += (d ?? "") + n[o + 1]), this._$AH[o] = d;
    }
    s && !a && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Qe extends Y {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class Xe extends Y {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class et extends Y {
  constructor(e, i, r, a, n) {
    super(e, i, r, a, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = L(this, e, i, 0) ?? g) === k) return;
    const r = this._$AH, a = e === g && r !== g || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== g && (r === g || a);
    a && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class tt {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    L(this, e);
  }
}
const it = se.litHtmlPolyfillSupport;
it?.(U, W), (se.litHtmlVersions ??= []).push("3.3.2");
const rt = (t, e, i) => {
  const r = i?.renderBefore ?? e;
  let a = r._$litPart$;
  if (a === void 0) {
    const n = i?.renderBefore ?? null;
    r._$litPart$ = a = new W(e.insertBefore(N(), n), n, void 0, i ?? {});
  }
  return a._$AI(t), a;
};
const le = globalThis;
class f extends S {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = rt(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return k;
  }
}
f._$litElement$ = !0, f.finalized = !0, le.litElementHydrateSupport?.({ LitElement: f });
const at = le.litElementPolyfillSupport;
at?.({ LitElement: f });
(le.litElementVersions ??= []).push("4.2.2");
const P = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const nt = { attribute: !0, type: String, converter: G, reflect: !1, hasChanged: ne }, st = (t = nt, e, i) => {
  const { kind: r, metadata: a } = i;
  let n = globalThis.litPropertyMetadata.get(a);
  if (n === void 0 && globalThis.litPropertyMetadata.set(a, n = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), r === "accessor") {
    const { name: s } = i;
    return { set(l) {
      const o = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(s, o, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(s, void 0, t, l), l;
    } };
  }
  if (r === "setter") {
    const { name: s } = i;
    return function(l) {
      const o = this[s];
      e.call(this, l), this.requestUpdate(s, o, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function u(t) {
  return (e, i) => typeof i == "object" ? st(t, e, i) : ((r, a, n) => {
    const s = a.hasOwnProperty(n);
    return a.constructor.createProperty(n, r), s ? Object.getOwnPropertyDescriptor(a, n) : void 0;
  })(t, e, i);
}
function ot(t) {
  return u({ ...t, state: !0, attribute: !1 });
}
const M = A`
  :host {
    --li-bg:
      radial-gradient(circle at top left, rgba(55, 101, 91, 0.14), transparent 34%),
      radial-gradient(circle at 85% 18%, rgba(80, 144, 114, 0.1), transparent 28%),
      linear-gradient(180deg, #eef4f4 0%, #e6edf1 42%, #dfe7eb 100%);
    --li-panel: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(244, 248, 250, 0.96));
    --li-surface: linear-gradient(180deg, rgba(248, 251, 252, 0.98), rgba(238, 244, 247, 0.98));
    --li-surface-strong: linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(244, 248, 250, 0.99));
    --li-surface-muted: rgba(235, 241, 244, 0.92);
    --li-text: #13202a;
    --li-muted: #5f7482;
    --li-border: rgba(86, 115, 134, 0.16);
    --li-accent: #129e56;
    --li-accent-soft: #1fd474;
    --li-accent-dim: rgba(18, 158, 86, 0.12);
    --li-warn: #d29a15;
    --li-low: #d95d48;
    --li-info: #2c7ddf;
    --li-shadow: 0 18px 38px rgba(28, 49, 66, 0.12);
    --li-shadow-strong: 0 14px 28px rgba(28, 49, 66, 0.18);
    --li-ring-fill: rgba(44, 125, 223, 0.08);
    --li-ring-core:
      radial-gradient(circle at center, rgba(244, 249, 251, 0.98) 0 38%, rgba(226, 236, 241, 0.94) 39% 100%);
    --li-ring-inner-stroke: rgba(123, 149, 166, 0.16);
    --li-axis: rgba(109, 132, 149, 0.14);
    --li-dashed-border: rgba(109, 132, 149, 0.18);
    --li-point-border: rgba(255, 255, 255, 0.82);
    --li-editor-input-bg: rgba(247, 251, 252, 0.96);
    --li-editor-chip-bg: rgba(239, 245, 248, 0.98);
    --li-editor-chip-active: rgba(18, 158, 86, 0.12);
    --li-grid:
      linear-gradient(rgba(91, 119, 138, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(91, 119, 138, 0.08) 1px, transparent 1px);
    --li-glow: 0 0 0 1px rgba(18, 158, 86, 0.08), 0 0 24px rgba(18, 158, 86, 0.1);
    display: block;
    color: var(--li-text);
    font-family: "Manrope", "Segoe UI", sans-serif;
  }

  :host([data-theme="dark"]),
  :host-context(.theme-dark),
  :host-context([data-theme="dark"]) {
    --li-bg:
      radial-gradient(circle at top left, rgba(30, 63, 58, 0.28), transparent 34%),
      radial-gradient(circle at 84% 18%, rgba(21, 72, 52, 0.14), transparent 28%),
      linear-gradient(180deg, #0a1118 0%, #0d151d 44%, #0b1219 100%);
    --li-panel: linear-gradient(180deg, rgba(16, 24, 34, 0.96), rgba(12, 19, 27, 0.98));
    --li-surface: linear-gradient(180deg, rgba(22, 31, 41, 0.98), rgba(15, 23, 32, 0.98));
    --li-surface-strong: linear-gradient(180deg, rgba(27, 38, 49, 0.99), rgba(17, 26, 35, 0.99));
    --li-surface-muted: rgba(13, 20, 28, 0.9);
    --li-text: #edf4f8;
    --li-muted: #90a2b1;
    --li-border: rgba(136, 162, 181, 0.14);
    --li-accent: #17bc63;
    --li-accent-soft: #76f2a8;
    --li-accent-dim: rgba(23, 188, 99, 0.14);
    --li-warn: #f2b534;
    --li-low: #f37862;
    --li-info: #479fff;
    --li-shadow: 0 22px 44px rgba(0, 0, 0, 0.32);
    --li-shadow-strong: 0 18px 36px rgba(0, 0, 0, 0.4);
    --li-ring-fill: rgba(71, 159, 255, 0.08);
    --li-ring-core:
      radial-gradient(circle at center, rgba(11, 18, 26, 0.98) 0 38%, rgba(16, 26, 35, 0.92) 39% 100%);
    --li-ring-inner-stroke: rgba(92, 122, 145, 0.16);
    --li-axis: rgba(110, 141, 165, 0.13);
    --li-dashed-border: rgba(110, 141, 165, 0.18);
    --li-point-border: rgba(214, 229, 240, 0.16);
    --li-editor-input-bg: rgba(13, 20, 28, 0.94);
    --li-editor-chip-bg: rgba(18, 27, 37, 0.98);
    --li-editor-chip-active: rgba(23, 188, 99, 0.14);
    --li-glow: 0 0 0 1px rgba(23, 188, 99, 0.1), 0 0 24px rgba(23, 188, 99, 0.12);
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --li-bg:
        radial-gradient(circle at top left, rgba(30, 63, 58, 0.28), transparent 34%),
        radial-gradient(circle at 84% 18%, rgba(21, 72, 52, 0.14), transparent 28%),
        linear-gradient(180deg, #0a1118 0%, #0d151d 44%, #0b1219 100%);
      --li-panel: linear-gradient(180deg, rgba(16, 24, 34, 0.96), rgba(12, 19, 27, 0.98));
      --li-surface: linear-gradient(180deg, rgba(22, 31, 41, 0.98), rgba(15, 23, 32, 0.98));
      --li-surface-strong: linear-gradient(180deg, rgba(27, 38, 49, 0.99), rgba(17, 26, 35, 0.99));
      --li-surface-muted: rgba(13, 20, 28, 0.9);
      --li-text: #edf4f8;
      --li-muted: #90a2b1;
      --li-border: rgba(136, 162, 181, 0.14);
      --li-accent: #17bc63;
      --li-accent-soft: #76f2a8;
      --li-accent-dim: rgba(23, 188, 99, 0.14);
      --li-warn: #f2b534;
      --li-low: #f37862;
      --li-info: #479fff;
      --li-shadow: 0 22px 44px rgba(0, 0, 0, 0.32);
      --li-shadow-strong: 0 18px 36px rgba(0, 0, 0, 0.4);
      --li-ring-fill: rgba(71, 159, 255, 0.08);
      --li-ring-core:
        radial-gradient(circle at center, rgba(11, 18, 26, 0.98) 0 38%, rgba(16, 26, 35, 0.92) 39% 100%);
      --li-ring-inner-stroke: rgba(92, 122, 145, 0.16);
      --li-axis: rgba(110, 141, 165, 0.13);
      --li-dashed-border: rgba(110, 141, 165, 0.18);
      --li-point-border: rgba(214, 229, 240, 0.16);
      --li-editor-input-bg: rgba(13, 20, 28, 0.94);
      --li-editor-chip-bg: rgba(18, 27, 37, 0.98);
      --li-editor-chip-active: rgba(23, 188, 99, 0.14);
      --li-glow: 0 0 0 1px rgba(23, 188, 99, 0.1), 0 0 24px rgba(23, 188, 99, 0.12);
    }
  }

  ha-card {
    background: var(--li-bg);
    border: 1px solid var(--li-border);
    border-radius: 28px;
    box-shadow: var(--li-shadow);
    overflow: hidden;
  }

  .eyebrow {
    color: var(--li-muted);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.38rem 0.72rem;
    border-radius: 999px;
    background: var(--li-surface-muted);
    border: 1px solid var(--li-border);
    color: var(--li-text);
    font-size: 0.8rem;
    font-weight: 600;
  }

  .panel {
    background: var(--li-panel);
    border: 1px solid var(--li-border);
    border-radius: 22px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(16px);
  }
`;
var lt = Object.defineProperty, ct = Object.getOwnPropertyDescriptor, Q = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? ct(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (a = (r ? s(e, i, a) : s(a)) || a);
  return r && a && lt(e, i, a), a;
};
let T = class extends f {
  constructor() {
    super(...arguments), this.mode = "single", this.config = { type: "" };
  }
  setConfig(t) {
    this.config = { ...t };
  }
  render() {
    const t = this.getEntityCandidates(), e = this.config.entities ?? [], i = t.filter((r) => !e.includes(r.entity_id)).slice(0, 8);
    return c`
      <div class="editor">
        <label>
          <span>Title</span>
          <input
            .value=${this.config.title ?? ""}
            @input=${this.onTextInput("title")}
            placeholder=${this.mode === "single" ? "Optional panel title" : "Location overview"}
          />
        </label>

        ${this.mode === "single" ? c`
              <label>
                <span>Name override</span>
                <input
                  .value=${this.config.name ?? ""}
                  @input=${this.onTextInput("name")}
                  placeholder="Optional display name"
                />
              </label>
            ` : g}

        ${this.mode === "single" ? c`
              <label>
                <span>Entity</span>
                <input
                  list="location-intelligence-entities"
                  .value=${this.config.entity ?? ""}
                  @input=${this.onTextInput("entity")}
                  placeholder="sensor.alice_status"
                />
              </label>
            ` : c`
              <div class="section">
                <div class="sectionHeading">
                  <span>Entities</span>
                  ${e.length > 0 ? c`<small>${e.length} selected</small>` : g}
                </div>
                <textarea
                  @input=${this.onEntitiesInput}
                  placeholder="sensor.alice_status&#10;sensor.car_status"
                >
${e.join(`
`)}</textarea
                >
                ${e.length > 0 ? c`
                      <div class="chips">
                        ${e.map(
      (r) => c`
                            <button type="button" class="entityChip active" @click=${() => this.removeEntity(r)}>
                              ${r}
                            </button>
                          `
    )}
                      </div>
                    ` : g}
              </div>

              <label>
                <span>Focus entity</span>
                <input
                  list="location-intelligence-entities"
                  .value=${this.config.focus_entity ?? ""}
                  @input=${this.onTextInput("focus_entity")}
                  placeholder="Optional primary entity"
                />
              </label>
            `}

        ${t.length > 0 ? c`
              <div class="section">
                <div class="sectionHeading">
                  <span>Detected status sensors</span>
                  <small>Click to ${this.mode === "single" ? "use" : "add"}</small>
                </div>
                <div class="chips">
                  ${this.mode === "single" ? t.slice(0, 10).map(
      (r) => c`
                          <button type="button" class="entityChip" @click=${() => this.selectSingleEntity(r.entity_id)}>
                            <strong>${this.entityLabel(r)}</strong>
                            <small>${r.entity_id}</small>
                          </button>
                        `
    ) : i.map(
      (r) => c`
                          <button type="button" class="entityChip" @click=${() => this.addEntity(r.entity_id)}>
                            <strong>${this.entityLabel(r)}</strong>
                            <small>${r.entity_id}</small>
                          </button>
                        `
    )}
                </div>
              </div>
            ` : g}

        <p class="hint">
          ${this.mode === "single" ? "Use one per-subject status sensor. The card derives location, direction, and confidence from whichever supported attributes are available." : "Use one per-subject status sensor per line. The dashboard and list stay frontend-only and tolerate partial entity attributes."}
        </p>

        <datalist id="location-intelligence-entities">
          ${t.map((r) => c`<option value=${r.entity_id}>${this.entityLabel(r)}</option>`)}
        </datalist>
      </div>
    `;
  }
  getEntityCandidates() {
    return Object.values(this.hass?.states ?? {}).filter((e) => this.isCandidateEntity(e)).sort((e, i) => this.entityLabel(e).localeCompare(this.entityLabel(i)));
  }
  isCandidateEntity(t) {
    const e = typeof t.attributes.subject_id == "string" || typeof t.attributes.reference_place_name == "string" || typeof t.attributes.likely_location == "string" || typeof t.attributes.confidence == "number";
    return t.entity_id.startsWith("sensor.") && (t.entity_id.endsWith("_status") || e);
  }
  entityLabel(t) {
    const e = t.attributes.friendly_name;
    return typeof e == "string" && e.trim() !== "" ? e : t.entity_id;
  }
  onTextInput(t) {
    return (e) => {
      const i = e.target.value.trim();
      this.updateConfig({
        [t]: i === "" ? void 0 : i
      });
    };
  }
  onEntitiesInput(t) {
    const e = t.target.value;
    this.updateEntityList(e);
  }
  updateEntityList(t) {
    const e = t.split(`
`).map((i) => i.trim()).filter((i, r, a) => i !== "" && a.indexOf(i) === r);
    this.updateConfig({
      entities: e.length > 0 ? e : void 0,
      focus_entity: this.config.focus_entity && e.includes(this.config.focus_entity) ? this.config.focus_entity : this.config.focus_entity && e.length === 0 ? void 0 : this.config.focus_entity
    });
  }
  selectSingleEntity(t) {
    this.updateConfig({ entity: t });
  }
  addEntity(t) {
    const e = [...this.config.entities ?? []];
    e.includes(t) || e.push(t), this.updateConfig({
      entities: e,
      focus_entity: this.config.focus_entity ?? t
    });
  }
  removeEntity(t) {
    const e = (this.config.entities ?? []).filter((i) => i !== t);
    this.updateConfig({
      entities: e.length > 0 ? e : void 0,
      focus_entity: this.config.focus_entity === t ? e[0] : this.config.focus_entity
    });
  }
  updateConfig(t) {
    this.config = {
      ...this.config,
      ...t
    }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
        bubbles: !0,
        composed: !0
      })
    );
  }
};
T.styles = [
  M,
  A`
      :host {
      display: block;
      }

      .editor {
        display: grid;
        gap: 1rem;
        padding: 0.25rem 0;
      }

    .section {
      display: grid;
      gap: 0.55rem;
    }

    .sectionHeading {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: baseline;
    }

    label {
      display: grid;
      gap: 0.35rem;
    }

    span {
      font-size: 0.9rem;
      font-weight: 600;
    }

      small {
        color: var(--li-muted);
        font-size: 0.78rem;
      }

      input,
      textarea {
        box-sizing: border-box;
        width: 100%;
        padding: 0.75rem 0.9rem;
        border: 1px solid var(--li-border);
        border-radius: 10px;
        font: inherit;
        color: inherit;
        background: var(--li-editor-input-bg);
      }

    textarea {
      min-height: 7rem;
      resize: vertical;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

      .entityChip {
        display: grid;
        gap: 0.1rem;
        text-align: left;
        padding: 0.65rem 0.8rem;
        border-radius: 999px;
        border: 1px solid var(--li-border);
        background: var(--li-editor-chip-bg);
        color: inherit;
        cursor: pointer;
        font: inherit;
      }

    .entityChip strong {
      font-size: 0.84rem;
      font-weight: 700;
    }

    .entityChip small {
      line-height: 1.2;
    }

      .entityChip.active {
        background: var(--li-editor-chip-active);
        border-color: color-mix(in srgb, var(--li-accent-soft) 32%, transparent);
      }

      .hint {
        margin: 0;
        color: var(--li-muted);
        font-size: 0.85rem;
      }
    `
];
Q([
  u({ attribute: !1 })
], T.prototype, "hass", 2);
Q([
  u({ attribute: !1 })
], T.prototype, "mode", 2);
Q([
  ot()
], T.prototype, "config", 2);
T = Q([
  P("location-intelligence-card-editor")
], T);
const Se = [
  "N",
  "NE",
  "E",
  "SE",
  "S",
  "SW",
  "W",
  "NW"
], Ee = /* @__PURE__ */ new Set(["unknown", "unavailable", "none"]), E = (t) => {
  if (typeof t == "number" && Number.isFinite(t))
    return t;
  if (typeof t == "string" && t.trim() !== "") {
    const e = Number(t);
    return Number.isFinite(e) ? e : void 0;
  }
}, te = (t) => {
  if (typeof t != "string")
    return;
  const e = t.trim();
  return e === "" ? void 0 : e;
}, ee = (t, e) => {
  for (const i of e) {
    const r = E(t[i]);
    if (r !== void 0)
      return r;
  }
}, v = (t, e) => {
  for (const i of e) {
    const r = te(t[i]);
    if (r !== void 0)
      return r;
  }
}, dt = (t) => t.replace(/^sensor\./, "").replace(/_status$/, "").replace(/_/g, " "), Oe = (t) => t.replace(/\b\w/g, (e) => e.toUpperCase()), pt = (t) => {
  if (t !== void 0) {
    if (t > 1 && t <= 100)
      return t / 100;
    if (!(t < 0 || t > 1))
      return t;
  }
}, ce = (t) => Oe(t.replace(/[_-]/g, " ")), gt = (t) => t.trim() === "" ? "Unknown" : ce(t), mt = (t) => (v(t.attributes, ["subject_type", "reference_place_kind"]) ?? t.entity_id.split(".")[0]).toLowerCase(), ut = (t) => t === "device_tracker" ? "Device tracker" : ce(t), ht = (t) => {
  if (t !== void 0)
    return `${t} source${t === 1 ? "" : "s"}`;
}, de = (t) => {
  const e = mt(t), i = String(t.state ?? ""), r = v(t.attributes, ["direction", "direction_from_reference", "direction_from_home"]) ?? void 0, a = pt(E(t.attributes.confidence));
  return {
    subjectId: te(t.attributes.subject_id),
    entityId: t.entity_id,
    name: Oe(
      dt(
        String(
          t.attributes.friendly_name ?? te(t.attributes.subject_id) ?? t.entity_id
        )
      )
    ),
    subjectType: e,
    subjectTypeLabel: ut(e),
    likelyLocation: v(t.attributes, [
      "likely_location",
      "reference_place_name",
      "geocoded_place_name",
      "place_name"
    ]) ?? (Ee.has(i.toLowerCase()) ? void 0 : i),
    distanceM: ee(t.attributes, [
      "distance_m",
      "distance_from_reference_m",
      "distance_from_home_m"
    ]),
    bearingDeg: ee(t.attributes, [
      "bearing_deg",
      "bearing_from_reference_deg",
      "bearing_from_home_deg"
    ]),
    directionLabel: r,
    confidence: a,
    confidenceLabel: v(t.attributes, ["confidence_label"]),
    sourceLabel: v(t.attributes, ["source_label", "source_name"]) ?? ht(E(t.attributes.source_count)),
    sourceCount: E(t.attributes.source_count),
    accuracyM: ee(t.attributes, ["accuracy_m", "gps_accuracy", "horizontal_accuracy"]),
    latitude: E(t.attributes.latitude),
    longitude: E(t.attributes.longitude),
    referencePlaceName: v(t.attributes, ["reference_place_name", "place_name"]),
    referencePlaceKind: v(t.attributes, ["reference_place_kind"]),
    state: i,
    stateLabel: gt(i),
    isAvailable: !Ee.has(i.toLowerCase()),
    lastReported: v(t.attributes, ["last_reported", "observed_at", "timestamp"]) ?? t.last_updated ?? t.last_changed,
    raw: t
  };
}, je = (t) => {
  if (t === void 0)
    return "Unknown";
  const e = (t % 360 + 360) % 360, i = Math.round(e / 45) % Se.length;
  return Se[i];
}, y = (t) => {
  if (t === void 0)
    return "Distance unknown";
  if (t < 25)
    return "Within 25 m";
  if (t < 1e3)
    return `${Math.round(t / 10) * 10} m away`;
  const e = t / 1e3;
  return `${e < 10 ? e.toFixed(1) : Math.round(e)} km away`;
}, bt = (t) => {
  if (t === void 0)
    return "Confidence unknown";
  const e = Math.max(0, Math.min(100, Math.round(t * 100)));
  return e >= 80 ? `${e}% confident` : e >= 50 ? `${e}% confidence` : `${e}% low confidence`;
}, ft = (t) => t === void 0 ? "unknown" : t >= 0.8 ? "high" : t >= 0.5 ? "medium" : "low", ie = (t) => t.likelyLocation && t.distanceM !== void 0 ? `Probably near ${t.likelyLocation}, ${y(t.distanceM).toLowerCase()}` : t.likelyLocation ? `Probably near ${t.likelyLocation}` : t.distanceM !== void 0 ? y(t.distanceM) : "Probable location unknown", R = (t) => t.directionLabel ? ce(t.directionLabel) : je(t.bearingDeg), K = (t) => t === void 0 ? "Accuracy unknown" : t < 25 ? `~${Math.round(t)} m accuracy` : t < 1e3 ? `~${Math.round(t / 5) * 5} m accuracy` : `~${(t / 1e3).toFixed(1)} km accuracy`, w = (t) => {
  if (!t)
    return "No recent update";
  const e = new Date(t);
  return Number.isNaN(e.getTime()) ? t : e.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}, Ne = (t) => [...t].sort((e, i) => e.isAvailable !== i.isAvailable ? Number(i.isAvailable) - Number(e.isAvailable) : e.distanceM !== void 0 && i.distanceM !== void 0 && e.distanceM !== i.distanceM ? e.distanceM - i.distanceM : e.confidence !== void 0 && i.confidence !== void 0 && e.confidence !== i.confidence ? i.confidence - e.confidence : e.name.localeCompare(i.name));
var vt = Object.defineProperty, $t = Object.getOwnPropertyDescriptor, De = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? $t(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (a = (r ? s(e, i, a) : s(a)) || a);
  return r && a && vt(e, i, a), a;
};
let Z = class extends f {
  render() {
    return c`<span class="chip ${ft(this.confidence)}">
      ${bt(this.confidence)}
    </span>`;
  }
};
Z.styles = [
  M,
  A`
      .chip {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.7rem;
      border-radius: 999px;
      border: 1px solid transparent;
      font-size: 0.8rem;
      font-weight: 700;
    }

      .high {
        background: color-mix(in srgb, var(--li-accent-soft) 20%, transparent);
        color: color-mix(in srgb, var(--li-accent-soft) 38%, var(--li-text));
        border-color: color-mix(in srgb, var(--li-accent-soft) 28%, transparent);
      }

      .medium {
        background: color-mix(in srgb, var(--li-warn) 18%, transparent);
        color: color-mix(in srgb, var(--li-warn) 42%, var(--li-text));
        border-color: color-mix(in srgb, var(--li-warn) 26%, transparent);
      }

      .low {
        background: color-mix(in srgb, var(--li-low) 18%, transparent);
        color: color-mix(in srgb, var(--li-low) 46%, var(--li-text));
        border-color: color-mix(in srgb, var(--li-low) 26%, transparent);
      }

      .unknown {
        background: color-mix(in srgb, var(--li-muted) 16%, transparent);
        color: var(--li-muted);
        border-color: color-mix(in srgb, var(--li-muted) 24%, transparent);
      }
    `
];
De([
  u({ attribute: !1 })
], Z.prototype, "confidence", 2);
Z = De([
  P("li-confidence-chip")
], Z);
var yt = Object.defineProperty, xt = Object.getOwnPropertyDescriptor, pe = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? xt(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (a = (r ? s(e, i, a) : s(a)) || a);
  return r && a && yt(e, i, a), a;
};
let H = class extends f {
  render() {
    const t = Math.max(0, Math.min(100, Math.round((this.confidence ?? 0) * 100))), e = this.bearing ?? 0, i = t >= 80 ? "var(--li-accent)" : t >= 50 ? "var(--li-warn)" : t > 0 ? "var(--li-low)" : "var(--li-muted)";
    return c`
      <div
        class="ring"
        style=${`--bearing:${e}deg; --confidence:${t}%; --confidence-color:${i};`}
      >
        <div class="tick tickNorth"></div>
        <div class="tick tickSouth"></div>
        <div class="tick tickEast"></div>
        <div class="tick tickWest"></div>
        <div class="north">N</div>
        <div class="east">E</div>
        <div class="south">S</div>
        <div class="west">W</div>
        <div class="sweep"></div>
        <div class="needle"></div>
        <div class="core">
          <span>${je(this.bearing)}</span>
        </div>
      </div>
    `;
  }
};
H.styles = [
  M,
  A`
      .ring {
        position: relative;
        width: 14rem;
        aspect-ratio: 1;
        border-radius: 50%;
        background:
          radial-gradient(circle at center, transparent 0 38%, color-mix(in srgb, var(--li-info) 12%, transparent) 39%, transparent 46%),
          conic-gradient(from -90deg, var(--confidence-color) 0 var(--confidence), var(--li-ring-fill) 0),
          var(--li-ring-core);
        border: 1px solid var(--li-border);
        box-shadow: inset 0 0 0 14px var(--li-ring-inner-stroke), var(--li-shadow-strong);
      }

      .sweep {
        position: absolute;
        inset: 17%;
        border-radius: 50%;
        background:
          conic-gradient(
            from calc(var(--bearing) - 18deg),
            color-mix(in srgb, var(--confidence-color) 0%, transparent) 0deg,
            color-mix(in srgb, var(--confidence-color) 55%, transparent) 18deg,
            color-mix(in srgb, var(--confidence-color) 0%, transparent) 50deg
          );
        filter: blur(6px);
        opacity: 0.75;
      }

      .north,
      .east,
      .south,
      .west {
        position: absolute;
        font-size: 0.82rem;
        font-weight: 800;
        color: var(--li-muted);
      }

      .tick {
        position: absolute;
        background: var(--li-axis);
      }

      .tickNorth,
      .tickSouth {
        left: calc(50% - 0.5px);
        width: 1px;
        height: 1rem;
      }

      .tickNorth {
        top: 1rem;
      }

      .tickSouth {
        bottom: 1rem;
      }

      .tickEast,
      .tickWest {
        top: calc(50% - 0.5px);
        height: 1px;
        width: 1rem;
      }

      .tickEast {
        right: 1rem;
      }

      .tickWest {
        left: 1rem;
      }

      .north {
        top: 0.8rem;
        left: calc(50% - 0.35rem);
      }

      .east {
        right: 0.95rem;
        top: calc(50% - 0.5rem);
      }

      .south {
        bottom: 0.8rem;
        left: calc(50% - 0.35rem);
      }

      .west {
        left: 0.95rem;
        top: calc(50% - 0.5rem);
      }

      .needle {
        position: absolute;
        inset: 17%;
        transform: rotate(var(--bearing));
      }

      .needle::before {
        content: "";
        position: absolute;
        top: 1%;
        left: calc(50% - 0.55rem);
        width: 1.1rem;
        height: 50%;
        clip-path: polygon(50% 0, 100% 100%, 0 100%);
        background: linear-gradient(180deg, var(--li-accent-soft) 0%, var(--li-accent) 100%);
        filter: drop-shadow(0 8px 14px color-mix(in srgb, var(--li-accent) 28%, transparent));
      }

      .needle::after {
        content: "";
        position: absolute;
        bottom: 7%;
        left: calc(50% - 0.2rem);
        width: 0.4rem;
        height: 34%;
        border-radius: 999px;
        background: linear-gradient(180deg, color-mix(in srgb, var(--li-info) 32%, transparent), transparent);
      }

      .core {
        position: absolute;
        inset: 36%;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: var(--li-surface-strong);
        border: 1px solid color-mix(in srgb, var(--li-info) 22%, var(--li-border));
        color: var(--li-text);
        font-size: 1.2rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        box-shadow: 0 0 0 6px color-mix(in srgb, var(--li-surface-muted) 92%, transparent);
      }
    `
];
pe([
  u({ type: Number })
], H.prototype, "bearing", 2);
pe([
  u({ type: Number })
], H.prototype, "confidence", 2);
H = pe([
  P("li-direction-ring")
], H);
var _t = Object.defineProperty, wt = Object.getOwnPropertyDescriptor, ge = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? wt(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (a = (r ? s(e, i, a) : s(a)) || a);
  return r && a && _t(e, i, a), a;
};
let z = class extends f {
  setConfig(t) {
    if (!t.entity)
      throw new Error("location-intelligence-compass-card requires an entity");
    this.config = t;
  }
  getCardSize() {
    return 6;
  }
  static async getConfigElement() {
    const t = document.createElement("location-intelligence-card-editor");
    return t.mode = "single", t;
  }
  static getStubConfig() {
    return {
      type: "custom:location-intelligence-compass-card",
      entity: "sensor.subject_status"
    };
  }
  render() {
    const t = this.config?.entity ? this.hass?.states[this.config.entity] : void 0;
    if (!t)
      return c`<ha-card><div class="empty">Entity unavailable</div></ha-card>`;
    const e = de(t);
    return c`
      <ha-card>
        <div class="card">
          <div class="titleBar">
            <div>
              <div class="eyebrow">Compass</div>
              <h2>${this.config?.name ?? e.name}</h2>
            </div>
            <span class="iconChip">${e.subjectTypeLabel}</span>
          </div>

          <section class="subject panel">
            <div class="avatar">${e.name.slice(0, 1).toUpperCase()}</div>
            <div class="subjectCopy">
              <strong>${e.name}</strong>
              <span>${w(e.lastReported)}</span>
            </div>
            <li-confidence-chip .confidence=${e.confidence}></li-confidence-chip>
          </section>

          <section class="hero panel">
            <div class="ringWrap">
              <li-direction-ring
                .bearing=${e.bearingDeg}
                .confidence=${e.confidence}
              ></li-direction-ring>
            </div>

            <div class="summaryCard">
              <div class="summaryHeader">
                <span class="eyebrow">Direction</span>
                <span class="miniTab">Overview</span>
              </div>
              <div class="bearingLine">
                <strong>${e.bearingDeg !== void 0 ? `${Math.round(e.bearingDeg)}deg` : "--"}</strong>
                <span>${R(e)}</span>
              </div>
              <p>${ie(e)}</p>
            </div>
          </section>

          <section class="stats">
            <div class="stat panel">
              <span>Distance</span>
              <strong>${y(e.distanceM)}</strong>
              <small>${e.referencePlaceName ?? "Relative to your reference place"}</small>
            </div>
            <div class="stat panel">
              <span>Confidence</span>
              <strong>${e.confidenceLabel ?? "Estimated"}</strong>
              <small>${e.sourceLabel ?? "Derived from current sources"}</small>
            </div>
            <div class="stat panel">
              <span>Updated</span>
              <strong>${w(e.lastReported)}</strong>
              <small>${e.isAvailable ? "Live" : "Not currently available"}</small>
            </div>
            <div class="stat panel">
              <span>Uncertainty</span>
              <strong>${K(e.accuracyM)}</strong>
              <small>${e.likelyLocation ?? "Probable location area"}</small>
            </div>
          </section>

          <section class="detail panel">
            <div class="detailHeader">
              <div>
                <div class="eyebrow">Selected</div>
                <h3>${e.name}</h3>
              </div>
              ${e.state ? c`<span class="chip">${e.stateLabel}</span>` : g}
            </div>
            <div class="detailGrid">
              <div>
                <span>Direction</span>
                <strong>${R(e)}</strong>
              </div>
              <div>
                <span>Distance</span>
                <strong>${y(e.distanceM)}</strong>
              </div>
              <div>
                <span>Place</span>
                <strong>${e.likelyLocation ?? e.referencePlaceName ?? "Unknown"}</strong>
              </div>
              <div>
                <span>Source</span>
                <strong>${e.sourceLabel ?? e.confidenceLabel ?? "Not classified"}</strong>
              </div>
            </div>
          </section>

          <div class="footer">
            <span class="chip">${K(e.accuracyM)}</span>
            ${e.lastReported ? c`<span class="chip">Seen ${w(e.lastReported)}</span>` : g}
            ${e.state ? c`<span class="chip">${e.stateLabel}</span>` : g}
          </div>
        </div>
      </ha-card>
    `;
  }
};
z.styles = [
  M,
  A`
      .card {
        padding: 1.15rem;
      }

      .titleBar,
      .subject,
      .detailHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.9rem;
      }

      h2,
      h3 {
        margin: 0.25rem 0 0;
      }

      h2 {
        font-size: 1.45rem;
      }

      .iconChip,
      .miniTab {
        display: inline-flex;
        align-items: center;
        padding: 0.3rem 0.72rem;
        border-radius: 999px;
        background: color-mix(in srgb, var(--li-accent) 12%, transparent);
        color: var(--li-accent-soft);
        border: 1px solid color-mix(in srgb, var(--li-accent) 18%, transparent);
        font-size: 0.78rem;
        font-weight: 700;
      }

      .subject {
        margin-top: 0.9rem;
        padding: 0.9rem 1rem;
      }

      .avatar {
        width: 2.5rem;
        height: 2.5rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--li-warn) 24%, transparent),
          color-mix(in srgb, var(--li-info) 20%, transparent)
        );
        border: 1px solid color-mix(in srgb, var(--li-text) 10%, transparent);
        font-weight: 800;
      }

      .subjectCopy {
        flex: 1;
      }

      .subjectCopy strong,
      .subjectCopy span {
        display: block;
      }

      .subjectCopy span,
      .summaryCard p,
      .stat small,
      .detailGrid span {
        color: var(--li-muted);
      }

      .hero {
        margin-top: 1rem;
        padding: 1rem;
        display: grid;
        gap: 1rem;
      }

      .ringWrap {
        position: relative;
        display: grid;
        place-items: center;
        padding: 1.2rem 0.8rem;
        border-radius: 22px;
        background:
          radial-gradient(circle at center, color-mix(in srgb, var(--li-accent) 12%, transparent) 0, transparent 55%),
          var(--li-grid);
        background-size: auto, 1.1rem 1.1rem;
        background-color: color-mix(in srgb, var(--li-surface-muted) 82%, transparent);
        box-shadow: var(--li-glow);
      }

      .summaryCard {
        padding: 1rem;
        border-radius: 18px;
        background: var(--li-surface);
        border: 1px solid var(--li-border);
      }

      .summaryHeader {
        display: flex;
        justify-content: space-between;
        gap: 0.6rem;
        align-items: center;
      }

      .bearingLine {
        display: flex;
        align-items: baseline;
        gap: 0.7rem;
        margin-top: 0.8rem;
      }

      .bearingLine strong {
        font-size: 2rem;
        line-height: 1;
      }

      .bearingLine span {
        color: var(--li-accent-soft);
        font-weight: 700;
      }

      .summaryCard p {
        margin: 0.85rem 0 0;
        line-height: 1.5;
      }

      .stats {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.8rem;
        margin-top: 1rem;
      }

      .stat {
        padding: 1rem;
      }

      .stat span,
      .detailGrid span {
        display: block;
        font-size: 0.76rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .stat strong,
      .detailGrid strong {
        display: block;
        margin-top: 0.35rem;
        font-size: 1.18rem;
      }

      .stat small {
        display: block;
        margin-top: 0.45rem;
        font-size: 0.8rem;
      }

      .detail {
        margin-top: 1rem;
        padding: 1rem;
      }

      .detailGrid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.8rem;
        margin-top: 0.9rem;
      }

      .detailGrid div {
        padding: 0.9rem;
        border-radius: 16px;
        background: var(--li-surface-muted);
        border: 1px solid var(--li-border);
      }

      .footer {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin-top: 1rem;
      }

      .empty {
        padding: 1rem;
      }

      @media (max-width: 640px) {
        .stats,
        .detailGrid {
          grid-template-columns: 1fr;
        }
      }
    `
];
ge([
  u({ attribute: !1 })
], z.prototype, "hass", 2);
ge([
  u({ attribute: !1 })
], z.prototype, "config", 2);
z = ge([
  P("location-intelligence-compass-card")
], z);
var Ct = Object.defineProperty, At = Object.getOwnPropertyDescriptor, me = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? At(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (a = (r ? s(e, i, a) : s(a)) || a);
  return r && a && Ct(e, i, a), a;
};
let I = class extends f {
  setConfig(t) {
    if (!t.entities?.length)
      throw new Error("location-intelligence-dashboard-card requires entities");
    this.config = t;
  }
  getCardSize() {
    return 10;
  }
  static async getConfigElement() {
    const t = document.createElement("location-intelligence-card-editor");
    return t.mode = "multiple", t;
  }
  static getStubConfig() {
    return {
      type: "custom:location-intelligence-dashboard-card",
      title: "Spatial awareness",
      focus_entity: "sensor.subject_status",
      entities: ["sensor.subject_status"]
    };
  }
  render() {
    const t = Ne(
      (this.config?.entities ?? []).map((o) => this.hass?.states[o]).filter((o) => !!o).map(de)
    ), e = this.config?.entities?.length ?? 0, i = Math.max(0, e - t.length), r = t.find((o) => o.entityId === this.config?.focus_entity) ?? t[0];
    if (!r)
      return c`
        <ha-card>
          <div class="card">
            <div class="toolbar">
              <div>
                <div class="eyebrow">Location Intelligence</div>
                <h2>${this.config?.title ?? "Spatial awareness"}</h2>
              </div>
            </div>
            <div class="empty">No configured entities are currently available.</div>
          </div>
        </ha-card>
      `;
    const a = t.filter((o) => o.isAvailable).length, n = t.map((o) => o.confidence).filter((o) => o !== void 0), s = n.length > 0 ? Math.round(
      n.reduce((o, d) => o + d, 0) / n.length * 100
    ) : void 0, l = Math.max(...t.map((o) => o.distanceM ?? 0), 1);
    return c`
      <ha-card>
        <div class="card">
          <div class="toolbar">
            <div class="brand">
              <div class="brandMark"></div>
              <div>
                <div class="eyebrow">Location Intelligence</div>
                <h2>${this.config?.title ?? "Spatial awareness"}</h2>
              </div>
            </div>

            <div class="toolbarRight">
              <div class="navTabs">
                <span class="navTab navTabActive">Overview</span>
                <span class="navTab">Map</span>
                <span class="navTab">History</span>
              </div>
              <span class="chip">${a}/${e} active</span>
            </div>
          </div>

          ${i > 0 ? c`<p class="notice">${i} configured ${i === 1 ? "entity is" : "entities are"} currently unavailable.</p>` : ""}

          <div class="workspace">
            <section class="mapStage panel">
              <div class="mapHeader">
                <div>
                  <div class="eyebrow">Map</div>
                  <h3>Live relative view</h3>
                </div>
                <div class="miniTabs">
                  <span class="miniTab miniTabActive">All</span>
                  <span class="miniTab">People</span>
                  <span class="miniTab">Places</span>
                </div>
              </div>

              <div class="mapCanvas">
                <div class="mapGlow"></div>
                <div class="mapCenter">
                  <span>You</span>
                </div>
                <div class="mapRing mapRingOne"></div>
                <div class="mapRing mapRingTwo"></div>
                <div class="mapAxis mapAxisVertical"></div>
                <div class="mapAxis mapAxisHorizontal"></div>
                ${t.map((o, d) => this.renderTrack(o, d, l))}
              </div>

              <div class="dataTable">
                <div class="tableHead">
                  <span>Tracked</span>
                  <span>Distance</span>
                  <span>Direction</span>
                  <span>Confidence</span>
                  <span>Updated</span>
                </div>
                ${t.map(
      (o) => c`
                    <article class="tableRow ${o.entityId === r.entityId ? "tableRowFocus" : ""}">
                      <div class="trackCell">
                        <span class="avatar">${o.name.slice(0, 1).toUpperCase()}</span>
                        <div>
                          <strong>${o.name}</strong>
                          <small>${o.subjectTypeLabel}</small>
                        </div>
                      </div>
                      <span>${y(o.distanceM)}</span>
                      <span>${R(o)}</span>
                      <span>${o.confidenceLabel ?? "Estimated"}</span>
                      <span>${w(o.lastReported)}</span>
                    </article>
                  `
    )}
              </div>
            </section>

            <aside class="detailRail panel">
              <div class="detailSubject">
                <span class="avatar avatarLarge">${r.name.slice(0, 1).toUpperCase()}</span>
                <div>
                  <h3>${r.name}</h3>
                  <p>${ie(r)}</p>
                </div>
              </div>

              <div class="miniTabs">
                <span class="miniTab miniTabActive">Overview</span>
                <span class="miniTab">History</span>
                <span class="miniTab">Details</span>
              </div>

              <section class="directionCard">
                <div class="eyebrow">Direction (from you)</div>
                <div class="directionLine">
                  <strong>${r.bearingDeg !== void 0 ? `${Math.round(r.bearingDeg)}deg` : "--"}</strong>
                  <span>${R(r)}</span>
                </div>
                <div class="cone">
                  <div class="coneArc"></div>
                  <div class="coneDot">${r.name.slice(0, 1).toUpperCase()}</div>
                  <div class="coneNeedle"></div>
                </div>
              </section>

              <div class="detailStats">
                <article>
                  <span>Distance</span>
                  <strong>${y(r.distanceM)}</strong>
                  <small>${r.referencePlaceName ?? "Relative estimate"}</small>
                </article>
                <article>
                  <span>Confidence</span>
                  <strong>${r.confidenceLabel ?? "Estimated"}</strong>
                  <small>${s !== void 0 ? `${s}/100 average` : "No aggregate"}</small>
                </article>
                <article>
                  <span>Updated</span>
                  <strong>${w(r.lastReported)}</strong>
                  <small>${r.isAvailable ? "Live" : "Unavailable"}</small>
                </article>
                <article>
                  <span>Uncertainty</span>
                  <strong>${K(r.accuracyM)}</strong>
                  <small>Possible area radius</small>
                </article>
              </div>

              <section class="explain panel">
                <div class="sectionTitle">What this means</div>
                <p>${ie(r)}. Move toward the center of the highlighted corridor.</p>
              </section>

              <section class="factors panel">
                <div class="sectionTitle">Main factors</div>
                <div class="factorList">
                  ${this.renderFactor("GPS accuracy", K(r.accuracyM))}
                  ${this.renderFactor("Last update", w(r.lastReported))}
                  ${this.renderFactor("Sources", r.sourceLabel ?? "Current source estimate")}
                  ${this.renderFactor("Status", r.stateLabel)}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderFactor(t, e) {
    return c`
      <div class="factor">
        <span class="factorDot"></span>
        <div class="factorBody">
          <strong>${t}</strong>
          <span>${e}</span>
        </div>
      </div>
    `;
  }
  renderTrack(t, e, i) {
    const a = (t.distanceM !== void 0 ? Math.min(t.distanceM / i, 1) : 0.16 + e * 0.08) * 40, s = ((t.bearingDeg ?? e * 57) - 90) * Math.PI / 180, l = 50 + Math.cos(s) * a, o = 50 + Math.sin(s) * a, d = l - 50, m = o - 50, p = Math.sqrt(d * d + m * m), h = Math.atan2(m, d) * (180 / Math.PI), b = y(t.distanceM).replace(" away", "");
    return c`
      <div class="track" style=${`--x:${l}%; --y:${o}%;`}>
        <div class="trackLine" style=${`width:${p}%; transform: rotate(${h}deg);`}></div>
        <div class="trackNode">
          <span>${t.name.slice(0, 1).toUpperCase()}</span>
        </div>
        <div class="trackLabel">
          <strong>${t.name}</strong>
          <span>${b}</span>
        </div>
      </div>
    `;
  }
};
I.styles = [
  M,
  A`
      .card {
        padding: 1.1rem;
      }

      h2,
      h3 {
        margin: 0.25rem 0 0;
      }

      h2 {
        font-size: 1.3rem;
      }

      .toolbar,
      .toolbarRight,
      .brand,
      .mapHeader,
      .miniTabs,
      .detailSubject,
      .trackCell,
      .factor {
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }

      .toolbar,
      .mapHeader {
        justify-content: space-between;
      }

      .brandMark {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, var(--li-accent-soft), var(--li-accent));
        box-shadow: 0 0 18px color-mix(in srgb, var(--li-accent) 34%, transparent);
      }

      .toolbarRight {
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .navTabs,
      .miniTabs {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.24rem;
        border-radius: 999px;
        background: var(--li-surface-muted);
        border: 1px solid var(--li-border);
      }

      .navTab,
      .miniTab {
        padding: 0.42rem 0.78rem;
        border-radius: 999px;
        font-size: 0.78rem;
        color: var(--li-muted);
      }

      .navTabActive,
      .miniTabActive {
        background: color-mix(in srgb, var(--li-accent) 16%, transparent);
        color: var(--li-accent-soft);
      }

      .notice,
      p,
      small,
      .tableHead span,
      .tableRow span,
      .factorBody span {
        color: var(--li-muted);
      }

      .notice {
        margin: 0.7rem 0 0;
        font-size: 0.88rem;
      }

      .workspace {
        display: grid;
        grid-template-columns: minmax(0, 1.7fr) minmax(18rem, 0.9fr);
        gap: 1rem;
        margin-top: 1rem;
      }

      .mapStage,
      .detailRail {
        padding: 1rem;
      }

      .mapCanvas {
        position: relative;
        margin-top: 1rem;
        min-height: 23rem;
        border-radius: 24px;
        overflow: hidden;
        background:
          radial-gradient(circle at center, color-mix(in srgb, var(--li-info) 22%, transparent) 0, transparent 12%),
          radial-gradient(circle at 35% 72%, color-mix(in srgb, var(--li-accent) 12%, transparent), transparent 26%),
          linear-gradient(180deg, color-mix(in srgb, var(--li-surface-muted) 90%, #081018), color-mix(in srgb, var(--li-panel) 92%, #071018)),
          var(--li-grid);
        background-size: auto, auto, auto, 1.4rem 1.4rem;
        border: 1px solid color-mix(in srgb, var(--li-info) 16%, var(--li-border));
      }

      .mapCanvas::before,
      .mapCanvas::after {
        content: "";
        position: absolute;
        inset: 0;
      }

      .mapCanvas::before {
        background:
          linear-gradient(135deg, transparent 44%, color-mix(in srgb, var(--li-info) 10%, transparent) 45%, transparent 46%),
          linear-gradient(25deg, transparent 54%, color-mix(in srgb, var(--li-accent) 8%, transparent) 55%, transparent 56%);
      }

      .mapCanvas::after {
        background:
          radial-gradient(circle at 20% 28%, color-mix(in srgb, var(--li-info) 22%, transparent), transparent 18%),
          radial-gradient(circle at 77% 70%, color-mix(in srgb, var(--li-warn) 10%, transparent), transparent 16%);
        pointer-events: none;
      }

      .mapGlow,
      .mapCenter,
      .mapRing,
      .mapAxis,
      .track {
        position: absolute;
      }

      .mapGlow {
        inset: 34%;
        border-radius: 50%;
        background: radial-gradient(circle at center, color-mix(in srgb, var(--li-info) 24%, transparent), transparent 65%);
      }

      .mapCenter {
        left: calc(50% - 2.2rem);
        top: calc(50% - 2.2rem);
        width: 4.4rem;
        height: 4.4rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(180deg, color-mix(in srgb, var(--li-info) 48%, var(--li-surface-strong)), color-mix(in srgb, var(--li-info) 30%, var(--li-panel)));
        border: 1px solid color-mix(in srgb, var(--li-info) 34%, var(--li-border));
        box-shadow: 0 0 0 10px color-mix(in srgb, var(--li-info) 10%, transparent);
        font-weight: 800;
      }

      .mapRing {
        border-radius: 50%;
        border: 1px dashed var(--li-dashed-border);
      }

      .mapRingOne {
        inset: 24%;
      }

      .mapRingTwo {
        inset: 10%;
      }

      .mapAxisVertical {
        top: 10%;
        bottom: 10%;
        left: calc(50% - 0.5px);
        width: 1px;
        background: var(--li-axis);
      }

      .mapAxisHorizontal {
        left: 10%;
        right: 10%;
        top: calc(50% - 0.5px);
        height: 1px;
        background: var(--li-axis);
      }

      .track {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .trackLine {
        position: absolute;
        left: 0;
        top: -1px;
        height: 2px;
        transform-origin: left center;
        background: linear-gradient(90deg, color-mix(in srgb, var(--li-accent) 72%, transparent), color-mix(in srgb, var(--li-warn) 76%, transparent));
      }

      .trackNode {
        position: absolute;
        left: var(--x);
        top: var(--y);
        transform: translate(-50%, -50%);
        width: 2.35rem;
        height: 2.35rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(180deg, color-mix(in srgb, var(--li-warn) 82%, white 18%), color-mix(in srgb, var(--li-warn) 78%, #8f5814 22%));
        color: color-mix(in srgb, var(--li-text) 16%, #081018 84%);
        font-weight: 800;
        border: 2px solid color-mix(in srgb, var(--li-text) 12%, transparent);
        box-shadow: var(--li-shadow-strong);
      }

      .trackLabel {
        position: absolute;
        left: calc(var(--x) + 1.6rem);
        top: calc(var(--y) - 0.8rem);
        min-width: 4rem;
        padding: 0.42rem 0.5rem;
        border-radius: 12px;
        background: var(--li-surface-muted);
        border: 1px solid color-mix(in srgb, var(--li-text) 10%, transparent);
      }

      .trackLabel strong,
      .tableRow strong,
      .factorBody strong {
        display: block;
      }

      .dataTable {
        margin-top: 1rem;
      }

      .tableHead,
      .tableRow {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
        gap: 0.7rem;
        align-items: center;
      }

      .tableHead {
        padding: 0 0.4rem 0.55rem;
        font-size: 0.78rem;
      }

      .tableRow {
        padding: 0.75rem 0.85rem;
        border-radius: 16px;
        background: color-mix(in srgb, var(--li-surface-muted) 88%, transparent);
        border: 1px solid var(--li-border);
      }

      .tableRow + .tableRow {
        margin-top: 0.45rem;
      }

      .tableRowFocus {
        background: var(--li-surface-strong);
        box-shadow: var(--li-glow);
      }

      .avatar {
        width: 2rem;
        height: 2rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--li-warn) 24%, transparent),
          color-mix(in srgb, var(--li-info) 20%, transparent)
        );
        border: 1px solid color-mix(in srgb, var(--li-text) 10%, transparent);
        font-weight: 800;
      }

      .avatarLarge {
        width: 2.8rem;
        height: 2.8rem;
        font-size: 1rem;
      }

      .detailSubject {
        align-items: flex-start;
      }

      .detailSubject p {
        margin: 0.35rem 0 0;
        line-height: 1.45;
      }

      .directionCard {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 18px;
        background: var(--li-surface);
        border: 1px solid var(--li-border);
      }

      .directionLine {
        display: flex;
        align-items: baseline;
        gap: 0.7rem;
        margin-top: 0.7rem;
      }

      .directionLine strong {
        font-size: 2rem;
        line-height: 1;
      }

      .directionLine span {
        color: var(--li-accent-soft);
        font-weight: 700;
      }

      .cone {
        position: relative;
        min-height: 7rem;
        margin-top: 0.85rem;
        border-radius: 16px;
        background: color-mix(in srgb, var(--li-surface-muted) 84%, transparent);
        overflow: hidden;
      }

      .coneArc {
        position: absolute;
        right: 0.9rem;
        top: 1rem;
        width: 8.4rem;
        height: 5.4rem;
        border: 2px dashed color-mix(in srgb, var(--li-warn) 58%, transparent);
        border-left: none;
        border-radius: 0 100% 100% 0 / 0 100% 100% 0;
      }

      .coneNeedle {
        position: absolute;
        left: 1rem;
        top: calc(50% - 1px);
        right: 3rem;
        height: 2px;
        background: linear-gradient(90deg, var(--li-accent), color-mix(in srgb, var(--li-warn) 88%, transparent));
      }

      .coneDot {
        position: absolute;
        right: 2.6rem;
        top: calc(50% - 1.15rem);
        width: 2.3rem;
        height: 2.3rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: color-mix(in srgb, var(--li-accent) 28%, transparent);
        color: var(--li-accent-soft);
        border: 1px solid color-mix(in srgb, var(--li-accent) 32%, transparent);
        font-weight: 800;
      }

      .detailStats {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem;
        margin-top: 1rem;
      }

      .detailStats article,
      .explain,
      .factors {
        padding: 0.95rem;
        border-radius: 18px;
        background: var(--li-surface);
        border: 1px solid var(--li-border);
      }

      .detailStats span,
      .sectionTitle {
        display: block;
        font-size: 0.76rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--li-muted);
      }

      .detailStats strong {
        display: block;
        margin-top: 0.35rem;
        font-size: 1.16rem;
      }

      .detailStats small {
        display: block;
        margin-top: 0.4rem;
      }

      .explain,
      .factors {
        margin-top: 1rem;
      }

      .explain p {
        margin: 0.7rem 0 0;
        line-height: 1.55;
      }

      .factorList {
        display: grid;
        gap: 0.8rem;
        margin-top: 0.75rem;
      }

      .factorDot {
        width: 0.52rem;
        height: 0.52rem;
        border-radius: 50%;
        background: var(--li-accent);
        box-shadow: 0 0 14px color-mix(in srgb, var(--li-accent) 34%, transparent);
      }

      .empty {
        padding: 1rem 0;
      }

      @media (max-width: 980px) {
        .workspace {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 760px) {
        .toolbar,
        .mapHeader {
          flex-direction: column;
          align-items: flex-start;
        }

        .detailStats,
        .tableHead,
        .tableRow {
          grid-template-columns: 1fr;
        }
      }
    `
];
me([
  u({ attribute: !1 })
], I.prototype, "hass", 2);
me([
  u({ attribute: !1 })
], I.prototype, "config", 2);
I = me([
  P("location-intelligence-dashboard-card")
], I);
var St = Object.defineProperty, Et = Object.getOwnPropertyDescriptor, ue = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Et(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (a = (r ? s(e, i, a) : s(a)) || a);
  return r && a && St(e, i, a), a;
};
let B = class extends f {
  setConfig(t) {
    if (!t.entities?.length)
      throw new Error("location-intelligence-subject-list-card requires entities");
    this.config = t;
  }
  getCardSize() {
    return Math.max(4, this.config?.entities?.length ?? 4);
  }
  static async getConfigElement() {
    const t = document.createElement("location-intelligence-card-editor");
    return t.mode = "multiple", t;
  }
  static getStubConfig() {
    return {
      type: "custom:location-intelligence-subject-list-card",
      title: "Location overview",
      entities: ["sensor.subject_status"]
    };
  }
  render() {
    const t = this.config?.entities?.length ?? 0, e = Ne(
      (this.config?.entities ?? []).map((r) => this.hass?.states[r]).filter((r) => !!r).map(de)
    ), i = Math.max(0, t - e.length);
    return c`
      <ha-card>
        <div class="card">
          <div class="header">
            <div>
              <div class="eyebrow">Overview</div>
              <h2>${this.config?.title ?? "Location overview"}</h2>
            </div>
            <div class="headerMeta">
              <span class="miniTab miniTabActive">Tracked</span>
              <span class="chip">${e.length} active</span>
            </div>
          </div>

          ${i > 0 ? c`<p class="notice">${i} configured ${i === 1 ? "entity is" : "entities are"} currently unavailable.</p>` : ""}

          <div class="table">
            <div class="tableHead">
              <span>Subject</span>
              <span>Distance</span>
              <span>Direction</span>
              <span>Location</span>
              <span>Updated</span>
            </div>

            ${e.length > 0 ? e.map(
      (r) => c`
                    <article class="row panel">
                      <div class="subject">
                        <span class="avatar">${r.name.slice(0, 1).toUpperCase()}</span>
                        <div>
                          <strong>${r.name}</strong>
                          <small>${r.subjectTypeLabel}</small>
                        </div>
                      </div>
                      <div class="value">
                        <strong>${y(r.distanceM)}</strong>
                      </div>
                      <div class="value">
                        <strong>${R(r)}</strong>
                      </div>
                      <div class="locationCell">
                        <span>${r.likelyLocation ?? r.referencePlaceName ?? "Location unknown"}</span>
                        <li-confidence-chip .confidence=${r.confidence}></li-confidence-chip>
                      </div>
                      <div class="value">
                        <strong>${w(r.lastReported)}</strong>
                      </div>
                    </article>
                  `
    ) : c`<div class="empty panel">No configured entities are currently available.</div>`}
          </div>
        </div>
      </ha-card>
    `;
  }
};
B.styles = [
  M,
  A`
      .card {
        padding: 1.1rem;
      }

      .header,
      .headerMeta,
      .subject,
      .locationCell {
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }

      .header {
        justify-content: space-between;
      }

      h2 {
        margin: 0.25rem 0 0;
        font-size: 1.35rem;
      }

      .miniTab {
        padding: 0.42rem 0.78rem;
        border-radius: 999px;
        font-size: 0.78rem;
        background: var(--li-surface-muted);
        border: 1px solid var(--li-border);
        color: var(--li-muted);
      }

      .miniTabActive {
        color: var(--li-accent-soft);
        background: color-mix(in srgb, var(--li-accent) 14%, transparent);
      }

      .notice,
      .tableHead span,
      small,
      .locationCell span {
        color: var(--li-muted);
      }

      .notice {
        margin: 0.7rem 0 0;
        font-size: 0.88rem;
      }

      .table {
        margin-top: 1rem;
      }

      .tableHead,
      .row {
        display: grid;
        grid-template-columns: 1.35fr 0.9fr 0.8fr 1.4fr 0.95fr;
        gap: 0.8rem;
        align-items: center;
      }

      .tableHead {
        padding: 0 0.45rem 0.55rem;
        font-size: 0.78rem;
      }

      .row {
        padding: 0.85rem 1rem;
      }

      .row + .row {
        margin-top: 0.5rem;
      }

      .avatar {
        width: 2rem;
        height: 2rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--li-warn) 24%, transparent),
          color-mix(in srgb, var(--li-info) 20%, transparent)
        );
        border: 1px solid color-mix(in srgb, var(--li-text) 10%, transparent);
        font-weight: 800;
      }

      strong {
        display: block;
      }

      .locationCell {
        justify-content: space-between;
      }

      .empty {
        padding: 1rem;
      }

      @media (max-width: 860px) {
        .header {
          flex-direction: column;
          align-items: flex-start;
        }

        .tableHead,
        .row {
          grid-template-columns: 1fr;
        }

        .locationCell {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `
];
ue([
  u({ attribute: !1 })
], B.prototype, "hass", 2);
ue([
  u({ attribute: !1 })
], B.prototype, "config", 2);
B = ue([
  P("location-intelligence-subject-list-card")
], B);
window.customCards = window.customCards ?? [];
window.customCards.push(
  {
    type: "location-intelligence-compass-card",
    name: "Location Intelligence Compass",
    description: "Single-subject compass and confidence card for one fused location entity.",
    preview: !0
  },
  {
    type: "location-intelligence-subject-list-card",
    name: "Location Intelligence Subject List",
    description: "Compact overview of multiple location intelligence entities.",
    preview: !0
  },
  {
    type: "location-intelligence-dashboard-card",
    name: "Location Intelligence Dashboard",
    description: "Focus view plus multi-subject overview for spatial awareness dashboards.",
    preview: !0
  }
);
console.info(
  "%cLOCATION-INTELLIGENCE%c cards loaded",
  "color: white; background: #284c3f; font-weight: 700; padding: 2px 6px; border-radius: 999px;",
  "color: #284c3f; font-weight: 600;"
);
//# sourceMappingURL=ha-location-intelligence-cards.js.map
