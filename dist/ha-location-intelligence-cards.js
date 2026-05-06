const B = globalThis, ee = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, te = /* @__PURE__ */ Symbol(), he = /* @__PURE__ */ new WeakMap();
let Ee = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== te) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (ee && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = he.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && he.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const De = (t) => new Ee(typeof t == "string" ? t : t + "", void 0, te), x = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, n, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[r + 1], t[0]);
  return new Ee(i, t, te);
}, ze = (t, e) => {
  if (ee) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), n = B.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, t.appendChild(s);
  }
}, ge = ee ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return De(i);
})(t) : t;
const { is: Re, defineProperty: He, getOwnPropertyDescriptor: Ie, getOwnPropertyNames: Be, getOwnPropertySymbols: We, getPrototypeOf: Ve } = Object, Z = globalThis, me = Z.trustedTypes, qe = me ? me.emptyScript : "", Fe = Z.reactiveElementPolyfillSupport, M = (t, e) => t, W = { toAttribute(t, e) {
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
} }, ie = (t, e) => !Re(t, e), fe = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: ie };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Z.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = fe) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(e, s, i);
      n !== void 0 && He(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: n, set: r } = Ie(this.prototype, e) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: n, set(o) {
      const l = n?.call(this);
      r?.call(this, o), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? fe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const e = Ve(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const i = this.properties, s = [...Be(i), ...We(i)];
      for (const n of s) this.createProperty(n, i[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, n] of i) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const n = this._$Eu(i, s);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const n of s) i.unshift(ge(n));
    } else e !== void 0 && i.push(ge(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ze(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$ET(e, i) {
    const s = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, s);
    if (n !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : W).toAttribute(i, s.type);
      this._$Em = e, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, n = s._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const r = s.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : W;
      this._$Em = n;
      const l = o.fromAttribute(i, r.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, n = !1, r) {
    if (e !== void 0) {
      const o = this.constructor;
      if (n === !1 && (r = this[e]), s ??= o.getPropertyOptions(e), !((s.hasChanged ?? ie)(r, i) || s.useDefault && s.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: n, wrapped: r }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? i ?? this[e]), r !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, r] of s) {
        const { wrapped: o } = r, l = this[n];
        o !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, r, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[M("elementProperties")] = /* @__PURE__ */ new Map(), A[M("finalized")] = /* @__PURE__ */ new Map(), Fe?.({ ReactiveElement: A }), (Z.reactiveElementVersions ??= []).push("2.1.2");
const se = globalThis, be = (t) => t, V = se.trustedTypes, ve = V ? V.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Se = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Pe = "?" + $, Ke = `<${Pe}>`, w = document, j = () => w.createComment(""), N = (t) => t === null || typeof t != "object" && typeof t != "function", ne = Array.isArray, Ze = (t) => ne(t) || typeof t?.[Symbol.iterator] == "function", Q = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $e = /-->/g, ye = />/g, y = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _e = /'/g, we = /"/g, Le = /^(?:script|style|textarea|title)$/i, Je = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), d = Je(1), E = /* @__PURE__ */ Symbol.for("lit-noChange"), u = /* @__PURE__ */ Symbol.for("lit-nothing"), xe = /* @__PURE__ */ new WeakMap(), _ = w.createTreeWalker(w, 129);
function Oe(t, e) {
  if (!ne(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ve !== void 0 ? ve.createHTML(e) : e;
}
const Ge = (t, e) => {
  const i = t.length - 1, s = [];
  let n, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = k;
  for (let l = 0; l < i; l++) {
    const c = t[l];
    let a, h, p = -1, f = 0;
    for (; f < c.length && (o.lastIndex = f, h = o.exec(c), h !== null); ) f = o.lastIndex, o === k ? h[1] === "!--" ? o = $e : h[1] !== void 0 ? o = ye : h[2] !== void 0 ? (Le.test(h[2]) && (n = RegExp("</" + h[2], "g")), o = y) : h[3] !== void 0 && (o = y) : o === y ? h[0] === ">" ? (o = n ?? k, p = -1) : h[1] === void 0 ? p = -2 : (p = o.lastIndex - h[2].length, a = h[1], o = h[3] === void 0 ? y : h[3] === '"' ? we : _e) : o === we || o === _e ? o = y : o === $e || o === ye ? o = k : (o = y, n = void 0);
    const b = o === y && t[l + 1].startsWith("/>") ? " " : "";
    r += o === k ? c + Ke : p >= 0 ? (s.push(a), c.slice(0, p) + Se + c.slice(p) + $ + b) : c + $ + (p === -2 ? l : b);
  }
  return [Oe(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class T {
  constructor({ strings: e, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const l = e.length - 1, c = this.parts, [a, h] = Ge(e, i);
    if (this.el = T.createElement(a, s), _.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = _.nextNode()) !== null && c.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(Se)) {
          const f = h[o++], b = n.getAttribute(p).split($), I = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: r, name: I[2], strings: b, ctor: I[1] === "." ? Xe : I[1] === "?" ? Ye : I[1] === "@" ? et : J }), n.removeAttribute(p);
        } else p.startsWith($) && (c.push({ type: 6, index: r }), n.removeAttribute(p));
        if (Le.test(n.tagName)) {
          const p = n.textContent.split($), f = p.length - 1;
          if (f > 0) {
            n.textContent = V ? V.emptyScript : "";
            for (let b = 0; b < f; b++) n.append(p[b], j()), _.nextNode(), c.push({ type: 2, index: ++r });
            n.append(p[f], j());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Pe) c.push({ type: 2, index: r });
      else {
        let p = -1;
        for (; (p = n.data.indexOf($, p + 1)) !== -1; ) c.push({ type: 7, index: r }), p += $.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const s = w.createElement("template");
    return s.innerHTML = e, s;
  }
}
function S(t, e, i = t, s) {
  if (e === E) return e;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const r = N(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(t), n._$AT(t, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = n : i._$Cl = n), n !== void 0 && (e = S(t, n._$AS(t, e.values), n, s)), e;
}
class Qe {
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
    const { el: { content: i }, parts: s } = this._$AD, n = (e?.creationScope ?? w).importNode(i, !0);
    _.currentNode = n;
    let r = _.nextNode(), o = 0, l = 0, c = s[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let a;
        c.type === 2 ? a = new H(r, r.nextSibling, this, e) : c.type === 1 ? a = new c.ctor(r, c.name, c.strings, this, e) : c.type === 6 && (a = new tt(r, this, e)), this._$AV.push(a), c = s[++l];
      }
      o !== c?.index && (r = _.nextNode(), o++);
    }
    return _.currentNode = w, n;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class H {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, s, n) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    e = S(this, e, i), N(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== E && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ze(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && N(this._$AH) ? this._$AA.nextSibling.data = e : this.T(w.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, n = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = T.createElement(Oe(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const r = new Qe(n, this), o = r.u(this.options);
      r.p(i), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = xe.get(e.strings);
    return i === void 0 && xe.set(e.strings, i = new T(e)), i;
  }
  k(e) {
    ne(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const r of e) n === i.length ? i.push(s = new H(this.O(j()), this.O(j()), this, this.options)) : s = i[n], s._$AI(r), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = be(e).nextSibling;
      be(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class J {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, n, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = i, this._$AM = n, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(e, i = this, s, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = S(this, e, i, 0), o = !N(e) || e !== this._$AH && e !== E, o && (this._$AH = e);
    else {
      const l = e;
      let c, a;
      for (e = r[0], c = 0; c < r.length - 1; c++) a = S(this, l[s + c], i, c), a === E && (a = this._$AH[c]), o ||= !N(a) || a !== this._$AH[c], a === u ? e = u : e !== u && (e += (a ?? "") + r[c + 1]), this._$AH[c] = a;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Xe extends J {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class Ye extends J {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class et extends J {
  constructor(e, i, s, n, r) {
    super(e, i, s, n, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = S(this, e, i, 0) ?? u) === E) return;
    const s = this._$AH, n = e === u && s !== u || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== u && (s === u || n);
    n && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class tt {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    S(this, e);
  }
}
const it = se.litHtmlPolyfillSupport;
it?.(T, H), (se.litHtmlVersions ??= []).push("3.3.2");
const st = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let n = s._$litPart$;
  if (n === void 0) {
    const r = i?.renderBefore ?? null;
    s._$litPart$ = n = new H(e.insertBefore(j(), r), r, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
const re = globalThis;
class m extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = st(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
}
m._$litElement$ = !0, m.finalized = !0, re.litElementHydrateSupport?.({ LitElement: m });
const nt = re.litElementPolyfillSupport;
nt?.({ LitElement: m });
(re.litElementVersions ??= []).push("4.2.2");
const O = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const rt = { attribute: !0, type: String, converter: W, reflect: !1, hasChanged: ie }, ot = (t = rt, e, i) => {
  const { kind: s, metadata: n } = i;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), s === "accessor") {
    const { name: o } = i;
    return { set(l) {
      const c = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, c, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, t, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = i;
    return function(l) {
      const c = this[o];
      e.call(this, l), this.requestUpdate(o, c, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function g(t) {
  return (e, i) => typeof i == "object" ? ot(t, e, i) : ((s, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, s), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(t, e, i);
}
function at(t) {
  return g({ ...t, state: !0, attribute: !1 });
}
var ct = Object.defineProperty, lt = Object.getOwnPropertyDescriptor, G = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? lt(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (n = (s ? o(e, i, n) : o(n)) || n);
  return s && n && ct(e, i, n), n;
};
let P = class extends m {
  constructor() {
    super(...arguments), this.mode = "single", this.config = { type: "" };
  }
  setConfig(t) {
    this.config = { ...t };
  }
  render() {
    const t = this.getEntityCandidates(), e = this.config.entities ?? [], i = t.filter((s) => !e.includes(s.entity_id)).slice(0, 8);
    return d`
      <div class="editor">
        <label>
          <span>Title</span>
          <input
            .value=${this.config.title ?? ""}
            @input=${this.onTextInput("title")}
            placeholder=${this.mode === "single" ? "Optional panel title" : "Location overview"}
          />
        </label>

        ${this.mode === "single" ? d`
              <label>
                <span>Name override</span>
                <input
                  .value=${this.config.name ?? ""}
                  @input=${this.onTextInput("name")}
                  placeholder="Optional display name"
                />
              </label>
            ` : u}

        ${this.mode === "single" ? d`
              <label>
                <span>Entity</span>
                <input
                  list="location-intelligence-entities"
                  .value=${this.config.entity ?? ""}
                  @input=${this.onTextInput("entity")}
                  placeholder="sensor.alice_status"
                />
              </label>
            ` : d`
              <div class="section">
                <div class="sectionHeading">
                  <span>Entities</span>
                  ${e.length > 0 ? d`<small>${e.length} selected</small>` : u}
                </div>
                <textarea
                  @input=${this.onEntitiesInput}
                  placeholder="sensor.alice_status&#10;sensor.car_status"
                >
${e.join(`
`)}</textarea
                >
                ${e.length > 0 ? d`
                      <div class="chips">
                        ${e.map(
      (s) => d`
                            <button type="button" class="entityChip active" @click=${() => this.removeEntity(s)}>
                              ${s}
                            </button>
                          `
    )}
                      </div>
                    ` : u}
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

        ${t.length > 0 ? d`
              <div class="section">
                <div class="sectionHeading">
                  <span>Detected status sensors</span>
                  <small>Click to ${this.mode === "single" ? "use" : "add"}</small>
                </div>
                <div class="chips">
                  ${this.mode === "single" ? t.slice(0, 10).map(
      (s) => d`
                          <button type="button" class="entityChip" @click=${() => this.selectSingleEntity(s.entity_id)}>
                            <strong>${this.entityLabel(s)}</strong>
                            <small>${s.entity_id}</small>
                          </button>
                        `
    ) : i.map(
      (s) => d`
                          <button type="button" class="entityChip" @click=${() => this.addEntity(s.entity_id)}>
                            <strong>${this.entityLabel(s)}</strong>
                            <small>${s.entity_id}</small>
                          </button>
                        `
    )}
                </div>
              </div>
            ` : u}

        <p class="hint">
          ${this.mode === "single" ? "Use one per-subject status sensor. The card derives location, direction, and confidence from whichever supported attributes are available." : "Use one per-subject status sensor per line. The dashboard and list stay frontend-only and tolerate partial entity attributes."}
        </p>

        <datalist id="location-intelligence-entities">
          ${t.map((s) => d`<option value=${s.entity_id}>${this.entityLabel(s)}</option>`)}
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
`).map((i) => i.trim()).filter((i, s, n) => i !== "" && n.indexOf(i) === s);
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
P.styles = x`
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
      color: #5f6b6a;
      font-size: 0.78rem;
    }

    input,
    textarea {
      box-sizing: border-box;
      width: 100%;
      padding: 0.75rem 0.9rem;
      border: 1px solid rgba(127, 127, 127, 0.35);
      border-radius: 10px;
      font: inherit;
      color: inherit;
      background: rgba(255, 255, 255, 0.85);
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
      border: 1px solid rgba(40, 76, 63, 0.16);
      background: rgba(255, 255, 255, 0.7);
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
      background: rgba(40, 76, 63, 0.08);
      border-color: rgba(40, 76, 63, 0.28);
    }

    .hint {
      margin: 0;
      color: #5f6b6a;
      font-size: 0.85rem;
    }
  `;
G([
  g({ attribute: !1 })
], P.prototype, "hass", 2);
G([
  g({ attribute: !1 })
], P.prototype, "mode", 2);
G([
  at()
], P.prototype, "config", 2);
P = G([
  O("location-intelligence-card-editor")
], P);
const Ae = [
  "N",
  "NE",
  "E",
  "SE",
  "S",
  "SW",
  "W",
  "NW"
], Ce = /* @__PURE__ */ new Set(["unknown", "unavailable", "none"]), C = (t) => {
  if (typeof t == "number" && Number.isFinite(t))
    return t;
  if (typeof t == "string" && t.trim() !== "") {
    const e = Number(t);
    return Number.isFinite(e) ? e : void 0;
  }
}, Y = (t) => {
  if (typeof t != "string")
    return;
  const e = t.trim();
  return e === "" ? void 0 : e;
}, X = (t, e) => {
  for (const i of e) {
    const s = C(t[i]);
    if (s !== void 0)
      return s;
  }
}, v = (t, e) => {
  for (const i of e) {
    const s = Y(t[i]);
    if (s !== void 0)
      return s;
  }
}, dt = (t) => t.replace(/^sensor\./, "").replace(/_status$/, "").replace(/_/g, " "), ke = (t) => t.replace(/\b\w/g, (e) => e.toUpperCase()), pt = (t) => {
  if (t !== void 0) {
    if (t > 1 && t <= 100)
      return t / 100;
    if (!(t < 0 || t > 1))
      return t;
  }
}, oe = (t) => ke(t.replace(/[_-]/g, " ")), ut = (t) => t.trim() === "" ? "Unknown" : oe(t), ht = (t) => (v(t.attributes, ["subject_type", "reference_place_kind"]) ?? t.entity_id.split(".")[0]).toLowerCase(), gt = (t) => t === "device_tracker" ? "Device tracker" : oe(t), mt = (t) => {
  if (t !== void 0)
    return `${t} source${t === 1 ? "" : "s"}`;
}, ae = (t) => {
  const e = ht(t), i = String(t.state ?? ""), s = v(t.attributes, ["direction", "direction_from_reference", "direction_from_home"]) ?? void 0, n = pt(C(t.attributes.confidence));
  return {
    subjectId: Y(t.attributes.subject_id),
    entityId: t.entity_id,
    name: ke(
      dt(
        String(
          t.attributes.friendly_name ?? Y(t.attributes.subject_id) ?? t.entity_id
        )
      )
    ),
    subjectType: e,
    subjectTypeLabel: gt(e),
    likelyLocation: v(t.attributes, [
      "likely_location",
      "reference_place_name",
      "geocoded_place_name",
      "place_name"
    ]) ?? (Ce.has(i.toLowerCase()) ? void 0 : i),
    distanceM: X(t.attributes, [
      "distance_m",
      "distance_from_reference_m",
      "distance_from_home_m"
    ]),
    bearingDeg: X(t.attributes, [
      "bearing_deg",
      "bearing_from_reference_deg",
      "bearing_from_home_deg"
    ]),
    directionLabel: s,
    confidence: n,
    confidenceLabel: v(t.attributes, ["confidence_label"]),
    sourceLabel: v(t.attributes, ["source_label", "source_name"]) ?? mt(C(t.attributes.source_count)),
    sourceCount: C(t.attributes.source_count),
    accuracyM: X(t.attributes, ["accuracy_m", "gps_accuracy", "horizontal_accuracy"]),
    latitude: C(t.attributes.latitude),
    longitude: C(t.attributes.longitude),
    referencePlaceName: v(t.attributes, ["reference_place_name", "place_name"]),
    referencePlaceKind: v(t.attributes, ["reference_place_kind"]),
    state: i,
    stateLabel: ut(i),
    isAvailable: !Ce.has(i.toLowerCase()),
    lastReported: v(t.attributes, ["last_reported", "observed_at", "timestamp"]) ?? t.last_updated ?? t.last_changed,
    raw: t
  };
}, Me = (t) => {
  if (t === void 0)
    return "Unknown";
  const e = (t % 360 + 360) % 360, i = Math.round(e / 45) % Ae.length;
  return Ae[i];
}, L = (t) => {
  if (t === void 0)
    return "Distance unknown";
  if (t < 25)
    return "Within 25 m";
  if (t < 1e3)
    return `${Math.round(t / 10) * 10} m away`;
  const e = t / 1e3;
  return `${e < 10 ? e.toFixed(1) : Math.round(e)} km away`;
}, ft = (t) => {
  if (t === void 0)
    return "Confidence unknown";
  const e = Math.max(0, Math.min(100, Math.round(t * 100)));
  return e >= 80 ? `${e}% confident` : e >= 50 ? `${e}% confidence` : `${e}% low confidence`;
}, bt = (t) => t === void 0 ? "unknown" : t >= 0.8 ? "high" : t >= 0.5 ? "medium" : "low", je = (t) => t.likelyLocation && t.distanceM !== void 0 ? `Probably near ${t.likelyLocation}, ${L(t.distanceM).toLowerCase()}` : t.likelyLocation ? `Probably near ${t.likelyLocation}` : t.distanceM !== void 0 ? L(t.distanceM) : "Probable location unknown", q = (t) => t.directionLabel ? oe(t.directionLabel) : Me(t.bearingDeg), Ne = (t) => t === void 0 ? "Accuracy unknown" : t < 25 ? `~${Math.round(t)} m accuracy` : t < 1e3 ? `~${Math.round(t / 5) * 5} m accuracy` : `~${(t / 1e3).toFixed(1)} km accuracy`, F = (t) => {
  if (!t)
    return "No recent update";
  const e = new Date(t);
  return Number.isNaN(e.getTime()) ? t : e.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}, Te = (t) => [...t].sort((e, i) => e.isAvailable !== i.isAvailable ? Number(i.isAvailable) - Number(e.isAvailable) : e.distanceM !== void 0 && i.distanceM !== void 0 && e.distanceM !== i.distanceM ? e.distanceM - i.distanceM : e.confidence !== void 0 && i.confidence !== void 0 && e.confidence !== i.confidence ? i.confidence - e.confidence : e.name.localeCompare(i.name));
var vt = Object.defineProperty, $t = Object.getOwnPropertyDescriptor, Ue = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? $t(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (n = (s ? o(e, i, n) : o(n)) || n);
  return s && n && vt(e, i, n), n;
};
let K = class extends m {
  render() {
    return d`<span class="chip ${bt(this.confidence)}">
      ${ft(this.confidence)}
    </span>`;
  }
};
K.styles = x`
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
      background: rgba(92, 137, 104, 0.16);
      color: #234a2f;
      border-color: rgba(92, 137, 104, 0.22);
    }

    .medium {
      background: rgba(165, 101, 42, 0.14);
      color: #7b4d1f;
      border-color: rgba(165, 101, 42, 0.24);
    }

    .low {
      background: rgba(163, 71, 60, 0.14);
      color: #7d2f2a;
      border-color: rgba(163, 71, 60, 0.24);
    }

    .unknown {
      background: rgba(85, 101, 100, 0.14);
      color: #475655;
      border-color: rgba(85, 101, 100, 0.24);
    }
  `;
Ue([
  g({ attribute: !1 })
], K.prototype, "confidence", 2);
K = Ue([
  O("li-confidence-chip")
], K);
var yt = Object.defineProperty, _t = Object.getOwnPropertyDescriptor, ce = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? _t(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (n = (s ? o(e, i, n) : o(n)) || n);
  return s && n && yt(e, i, n), n;
};
let U = class extends m {
  render() {
    const t = Math.max(0, Math.min(100, Math.round((this.confidence ?? 0) * 100))), e = this.bearing ?? 0, i = t >= 80 ? "#2f6f43" : t >= 50 ? "#a5652a" : t > 0 ? "#a3473c" : "#7b8a86";
    return d`
      <div
        class="ring"
        style=${`--bearing:${e}deg; --confidence:${t}%; --confidence-color:${i};`}
      >
        <div class="north">N</div>
        <div class="east">E</div>
        <div class="south">S</div>
        <div class="west">W</div>
        <div class="needle"></div>
        <div class="core">
          <span>${Me(this.bearing)}</span>
        </div>
      </div>
    `;
  }
};
U.styles = x`
    .ring {
      position: relative;
      width: 13rem;
      aspect-ratio: 1;
      border-radius: 50%;
      background:
        conic-gradient(var(--confidence-color) var(--confidence), rgba(255, 255, 255, 0.15) 0),
        radial-gradient(circle at center, rgba(255, 255, 255, 0.95) 0 39%, rgba(228, 236, 229, 0.92) 40% 100%);
      border: 1px solid rgba(40, 76, 63, 0.14);
      box-shadow: inset 0 0 0 14px rgba(255, 255, 255, 0.62);
    }

    .north,
    .east,
    .south,
    .west {
      position: absolute;
      font-size: 0.85rem;
      font-weight: 800;
      color: #556564;
    }

    .north {
      top: 0.75rem;
      left: calc(50% - 0.35rem);
    }

    .east {
      right: 0.9rem;
      top: calc(50% - 0.55rem);
    }

    .south {
      bottom: 0.75rem;
      left: calc(50% - 0.35rem);
    }

    .west {
      left: 0.9rem;
      top: calc(50% - 0.55rem);
    }

    .needle {
      position: absolute;
      inset: 14%;
      transform: rotate(var(--bearing));
    }

    .needle::before {
      content: "";
      position: absolute;
      top: 5%;
      left: calc(50% - 0.45rem);
      width: 0.9rem;
      height: 48%;
      clip-path: polygon(50% 0, 100% 100%, 0 100%);
      background: linear-gradient(180deg, #284c3f 0%, #5c8968 100%);
      filter: drop-shadow(0 6px 10px rgba(40, 76, 63, 0.2));
    }

    .core {
      position: absolute;
      inset: 34%;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: rgba(255, 252, 245, 0.95);
      border: 1px solid rgba(40, 76, 63, 0.14);
      color: #1f2a2a;
      font-size: 1.2rem;
      font-weight: 800;
      letter-spacing: 0.08em;
    }
  `;
ce([
  g({ type: Number })
], U.prototype, "bearing", 2);
ce([
  g({ type: Number })
], U.prototype, "confidence", 2);
U = ce([
  O("li-direction-ring")
], U);
const le = x`
  :host {
    --li-bg: linear-gradient(180deg, #f6f2e8 0%, #e5ece5 100%);
    --li-panel: rgba(255, 252, 245, 0.8);
    --li-text: #1f2a2a;
    --li-muted: #556564;
    --li-border: rgba(40, 76, 63, 0.14);
    --li-accent: #284c3f;
    --li-accent-soft: #5c8968;
    --li-warn: #a5652a;
    --li-low: #a3473c;
    display: block;
    color: var(--li-text);
    font-family: "Manrope", "Segoe UI", sans-serif;
  }

  ha-card {
    background: var(--li-bg);
    border: 1px solid var(--li-border);
    border-radius: 24px;
    box-shadow: 0 18px 40px rgba(31, 42, 42, 0.08);
  }

  .eyebrow {
    color: var(--li-muted);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.65rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.62);
    border: 1px solid var(--li-border);
    color: var(--li-text);
    font-size: 0.82rem;
    font-weight: 600;
  }

  .panel {
    background: var(--li-panel);
    border: 1px solid var(--li-border);
    border-radius: 20px;
    backdrop-filter: blur(10px);
  }
`;
var wt = Object.defineProperty, xt = Object.getOwnPropertyDescriptor, de = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? xt(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (n = (s ? o(e, i, n) : o(n)) || n);
  return s && n && wt(e, i, n), n;
};
let D = class extends m {
  setConfig(t) {
    if (!t.entity)
      throw new Error("location-intelligence-compass-card requires an entity");
    this.config = t;
  }
  getCardSize() {
    return 5;
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
      return d`<ha-card><div class="empty">Entity unavailable</div></ha-card>`;
    const e = ae(t);
    return d`
      <ha-card>
        <div class="card">
          <div class="header">
            <div>
              <div class="eyebrow">${e.subjectTypeLabel}</div>
              <h2>${this.config?.name ?? e.name}</h2>
              <p>${je(e)}</p>
            </div>
            <li-confidence-chip .confidence=${e.confidence}></li-confidence-chip>
          </div>

          <div class="hero panel">
            <li-direction-ring
              .bearing=${e.bearingDeg}
              .confidence=${e.confidence}
            ></li-direction-ring>

            <div class="metrics">
              <div class="metric">
                <span class="label">Direction</span>
                <strong>${q(e)}</strong>
              </div>
              <div class="metric">
                <span class="label">Distance</span>
                <strong>${L(e.distanceM)}</strong>
              </div>
              <div class="metric">
                <span class="label">Place</span>
                <strong>${e.likelyLocation ?? e.referencePlaceName ?? "Unknown"}</strong>
              </div>
              <div class="metric">
                <span class="label">Source</span>
                <strong>${e.sourceLabel ?? e.confidenceLabel ?? "Not classified"}</strong>
              </div>
            </div>
          </div>

          <div class="footer">
            <span class="chip">Updated ${F(e.lastReported)}</span>
            <span class="chip">${Ne(e.accuracyM)}</span>
            ${e.state ? d`<span class="chip">${e.isAvailable ? "State" : "Availability"} ${e.stateLabel}</span>` : u}
          </div>
        </div>
      </ha-card>
    `;
  }
};
D.styles = [
  le,
  x`
      .card {
        padding: 1.25rem;
      }

      .header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: start;
      }

      h2 {
        margin: 0.25rem 0 0;
        font-size: 1.7rem;
        line-height: 1.1;
      }

      p {
        margin: 0.5rem 0 0;
        color: var(--li-muted);
        max-width: 32ch;
      }

      .hero {
        margin-top: 1rem;
        padding: 1rem;
        display: grid;
        grid-template-columns: minmax(0, 14rem) minmax(0, 1fr);
        gap: 1rem;
        align-items: center;
      }

      .metrics {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.85rem;
      }

      .metric {
        padding: 0.95rem;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid var(--li-border);
      }

      .label {
        display: block;
        color: var(--li-muted);
        font-size: 0.76rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      strong {
        display: block;
        margin-top: 0.3rem;
        font-size: 1rem;
        line-height: 1.3;
      }

      .footer {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-top: 1rem;
      }

      .empty {
        padding: 1rem;
      }

      @media (max-width: 640px) {
        .hero {
          grid-template-columns: 1fr;
          justify-items: center;
        }

        .metrics {
          width: 100%;
          grid-template-columns: 1fr;
        }
      }
    `
];
de([
  g({ attribute: !1 })
], D.prototype, "hass", 2);
de([
  g({ attribute: !1 })
], D.prototype, "config", 2);
D = de([
  O("location-intelligence-compass-card")
], D);
var At = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, pe = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ct(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (n = (s ? o(e, i, n) : o(n)) || n);
  return s && n && At(e, i, n), n;
};
let z = class extends m {
  setConfig(t) {
    if (!t.entities?.length)
      throw new Error("location-intelligence-dashboard-card requires entities");
    this.config = t;
  }
  getCardSize() {
    return 9;
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
    const t = Te(
      (this.config?.entities ?? []).map((a) => this.hass?.states[a]).filter((a) => !!a).map(ae)
    ), e = this.config?.entities?.length ?? 0, i = Math.max(0, e - t.length), s = t.find((a) => a.entityId === this.config?.focus_entity) ?? t[0];
    if (!s)
      return d`
        <ha-card>
          <div class="card">
            <div class="heading">
              <div>
                <div class="eyebrow">Dashboard</div>
                <h2>${this.config?.title ?? "Spatial awareness"}</h2>
              </div>
            </div>
            <div class="empty">No configured entities are currently available.</div>
          </div>
        </ha-card>
      `;
    const n = t.filter((a) => a.isAvailable).length, r = t.map((a) => a.confidence).filter((a) => a !== void 0), o = r.length > 0 ? Math.round(
      r.reduce((a, h) => a + h, 0) / r.length * 100
    ) : void 0, l = new Set(
      t.map((a) => a.likelyLocation ?? a.referencePlaceName).filter((a) => !!a)
    ).size, c = Math.max(
      ...t.map((a) => a.distanceM ?? 0),
      1
    );
    return d`
      <ha-card>
        <div class="card">
          <div class="heading">
            <div>
              <div class="eyebrow">Dashboard</div>
              <h2>${this.config?.title ?? "Spatial awareness"}</h2>
            </div>
            <span class="chip">${n}/${e} active</span>
          </div>

          ${i > 0 ? d`<p class="notice">${i} configured ${i === 1 ? "entity is" : "entities are"} currently unavailable.</p>` : ""}

          <div class="layout">
            <section class="focus panel">
              <div class="focusTop">
                <div class="focusCopy">
                  <div class="eyebrow">${s.subjectTypeLabel}</div>
                  <h3>${s.name}</h3>
                  <p>${je(s)}</p>
                </div>
                <li-confidence-chip .confidence=${s.confidence}></li-confidence-chip>
              </div>

              <div class="focusBody">
                <li-direction-ring
                  .bearing=${s.bearingDeg}
                  .confidence=${s.confidence}
                ></li-direction-ring>

                <div class="focusStats">
                  <div>
                    <span>Direction</span>
                    <strong>${q(s)}</strong>
                  </div>
                  <div>
                    <span>Distance</span>
                    <strong>${L(s.distanceM)}</strong>
                  </div>
                  <div>
                    <span>Place</span>
                    <strong>${s.likelyLocation ?? s.referencePlaceName ?? "Unknown"}</strong>
                  </div>
                  <div>
                    <span>Updated</span>
                    <strong>${F(s.lastReported)}</strong>
                  </div>
                  <div>
                    <span>Accuracy</span>
                    <strong>${Ne(s.accuracyM)}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>${s.stateLabel}</strong>
                  </div>
                </div>
              </div>
            </section>

            <section class="overview panel">
              <div class="eyebrow">Fleet overview</div>
              <h3>Coverage snapshot</h3>

              <div class="kpis">
                <article>
                  <span>Tracked</span>
                  <strong>${t.length}</strong>
                </article>
                <article>
                  <span>Available</span>
                  <strong>${n}</strong>
                </article>
                <article>
                  <span>Places</span>
                  <strong>${l}</strong>
                </article>
                <article>
                  <span>Avg confidence</span>
                  <strong>${o !== void 0 ? `${o}%` : "Unknown"}</strong>
                </article>
              </div>

              <div class="plot">
                <div class="plotLabel">Relative bearing and distance</div>
                <div class="radar">
                  <div class="ring ringOuter"></div>
                  <div class="ring ringInner"></div>
                  <div class="axis axisVertical"></div>
                  <div class="axis axisHorizontal"></div>
                  ${t.map((a, h) => this.renderRadarPoint(a, h, c))}
                </div>
              </div>
            </section>
          </div>

          <section class="roster panel">
            <div class="rosterHeader">
              <div>
                <div class="eyebrow">Subjects</div>
                <h3>Current positions</h3>
              </div>
            </div>

            <div class="rows">
              ${t.map(
      (a) => d`
                  <article class="row ${a.entityId === s.entityId ? "rowFocus" : ""}">
                    <div class="identity">
                      <strong>${a.name}</strong>
                      <span>${a.subjectTypeLabel}</span>
                    </div>
                    <div class="summary">
                      <span>${a.likelyLocation ?? a.referencePlaceName ?? "Location unknown"}</span>
                      <span>${L(a.distanceM)}</span>
                      <span>${q(a)}</span>
                    </div>
                    <div class="meta">
                      <li-confidence-chip .confidence=${a.confidence}></li-confidence-chip>
                      <span class="stamp">${F(a.lastReported)}</span>
                    </div>
                  </article>
                `
    )}
            </div>
          </section>
        </div>
      </ha-card>
    `;
  }
  renderRadarPoint(t, e, i) {
    const n = (t.distanceM !== void 0 ? Math.min(t.distanceM / i, 1) : 0.12 + e * 0.08) * 42, o = ((t.bearingDeg ?? e * 57) - 90) * Math.PI / 180, l = 50 + Math.cos(o) * n, c = 50 + Math.sin(o) * n, a = t.isAvailable ? 1 : 0.5;
    return d`
      <div
        class="point"
        title=${`${t.name}: ${t.likelyLocation ?? t.referencePlaceName ?? "Unknown place"}`}
        style=${`left:${l}%; top:${c}%; opacity:${a};`}
      >
        <span>${t.name.slice(0, 1).toUpperCase()}</span>
      </div>
    `;
  }
};
z.styles = [
  le,
  x`
      .card {
        padding: 1.25rem;
      }

      h2,
      h3 {
        margin: 0.25rem 0 0;
      }

      .heading,
      .rosterHeader {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 1rem;
      }

      .notice,
      p {
        color: var(--li-muted);
      }

      .notice {
        margin: 0.75rem 0 0;
        font-size: 0.88rem;
      }

      .layout {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
        gap: 1rem;
        margin-top: 1rem;
      }

      .focus,
      .overview,
      .roster {
        padding: 1rem;
      }

      .focusTop {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: start;
      }

      .focusCopy p {
        margin-bottom: 0;
        max-width: 36ch;
      }

      .focusBody {
        display: grid;
        grid-template-columns: minmax(0, 14rem) minmax(0, 1fr);
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;
      }

      .focusStats,
      .kpis,
      .rows {
        display: grid;
        gap: 0.8rem;
      }

      .focusStats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .focusStats div,
      .kpis article,
      .row {
        padding: 0.9rem;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.72);
        border: 1px solid var(--li-border);
      }

      .focusStats span,
      .kpis span,
      .identity span,
      .summary span,
      .stamp,
      .plotLabel {
        display: block;
        color: var(--li-muted);
        font-size: 0.82rem;
      }

      .focusStats strong,
      .kpis strong,
      .identity strong {
        display: block;
        margin-top: 0.3rem;
      }

      .kpis {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin-top: 1rem;
      }

      .plot {
        margin-top: 1rem;
      }

      .radar {
        position: relative;
        aspect-ratio: 1;
        margin-top: 0.75rem;
        border-radius: 24px;
        background:
          radial-gradient(circle at center, rgba(255, 255, 255, 0.84) 0 18%, rgba(255, 255, 255, 0) 19%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.64), rgba(255, 255, 255, 0.4));
        border: 1px solid var(--li-border);
        overflow: hidden;
      }

      .ring,
      .axis {
        position: absolute;
      }

      .ring {
        border-radius: 50%;
        border: 1px dashed rgba(40, 76, 63, 0.2);
      }

      .ringOuter {
        inset: 10%;
      }

      .ringInner {
        inset: 28%;
      }

      .axisVertical {
        top: 8%;
        bottom: 8%;
        left: calc(50% - 0.5px);
        width: 1px;
        background: rgba(40, 76, 63, 0.14);
      }

      .axisHorizontal {
        left: 8%;
        right: 8%;
        top: calc(50% - 0.5px);
        height: 1px;
        background: rgba(40, 76, 63, 0.14);
      }

      .point {
        position: absolute;
        width: 2rem;
        height: 2rem;
        margin-left: -1rem;
        margin-top: -1rem;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: linear-gradient(180deg, #284c3f 0%, #5c8968 100%);
        color: white;
        font-size: 0.82rem;
        font-weight: 800;
        border: 2px solid rgba(255, 255, 255, 0.85);
        box-shadow: 0 10px 22px rgba(31, 42, 42, 0.18);
      }

      .roster {
        margin-top: 1rem;
      }

      .rows {
        margin-top: 1rem;
      }

      .row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr) auto;
        gap: 0.9rem;
        align-items: center;
      }

      .rowFocus {
        background: rgba(255, 255, 255, 0.82);
        border-color: rgba(40, 76, 63, 0.28);
      }

      .summary {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .summary span {
        padding: 0.28rem 0.55rem;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid var(--li-border);
      }

      .meta {
        display: flex;
        align-items: center;
        gap: 0.7rem;
      }

      .empty {
        padding: 1rem 0;
      }

      @media (max-width: 900px) {
        .layout,
        .focusBody,
        .focusStats,
        .kpis,
        .row {
          grid-template-columns: 1fr;
        }

        .meta {
          justify-content: space-between;
        }
      }
    `
];
pe([
  g({ attribute: !1 })
], z.prototype, "hass", 2);
pe([
  g({ attribute: !1 })
], z.prototype, "config", 2);
z = pe([
  O("location-intelligence-dashboard-card")
], z);
var Et = Object.defineProperty, St = Object.getOwnPropertyDescriptor, ue = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? St(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (n = (s ? o(e, i, n) : o(n)) || n);
  return s && n && Et(e, i, n), n;
};
let R = class extends m {
  setConfig(t) {
    if (!t.entities?.length)
      throw new Error("location-intelligence-subject-list-card requires entities");
    this.config = t;
  }
  getCardSize() {
    return Math.max(3, this.config?.entities?.length ?? 3);
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
    const t = this.config?.entities?.length ?? 0, e = Te(
      (this.config?.entities ?? []).map((s) => this.hass?.states[s]).filter((s) => !!s).map(ae)
    ), i = Math.max(0, t - e.length);
    return d`
      <ha-card>
        <div class="card">
          <div class="titleRow">
            <div>
              <div class="eyebrow">Subjects</div>
              <h2>${this.config?.title ?? "Location overview"}</h2>
            </div>
            <span class="count chip">${e.length} active</span>
          </div>

          ${i > 0 ? d`<p class="notice">${i} configured ${i === 1 ? "entity is" : "entities are"} currently unavailable.</p>` : ""}

          <div class="list">
            ${e.length > 0 ? e.map(
      (s) => d`
                    <div class="row panel">
                      <div class="identity">
                        <strong>${s.name}</strong>
                        <span>${s.subjectTypeLabel}</span>
                      </div>

                      <div class="summary">
                        <span>${L(s.distanceM)}</span>
                        <span>${q(s)}</span>
                        <span>${s.likelyLocation ?? s.referencePlaceName ?? "Location unknown"}</span>
                      </div>

                      <div class="meta">
                        <li-confidence-chip .confidence=${s.confidence}></li-confidence-chip>
                        <span class="stamp">${F(s.lastReported)}</span>
                      </div>
                    </div>
                  `
    ) : d`<div class="empty panel">No configured entities are currently available.</div>`}
          </div>
        </div>
      </ha-card>
    `;
  }
};
R.styles = [
  le,
  x`
      .card {
        padding: 1.25rem;
      }

      h2 {
        margin: 0.25rem 0 0;
        font-size: 1.5rem;
      }

      .titleRow {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 1rem;
      }

      .notice {
        margin: 0.75rem 0 0;
        color: var(--li-muted);
        font-size: 0.88rem;
      }

      .list {
        display: grid;
        gap: 0.8rem;
        margin-top: 1rem;
      }

      .row {
        padding: 0.9rem 1rem;
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.3fr) auto;
        gap: 0.9rem;
        align-items: center;
      }

      .identity strong {
        display: block;
        font-size: 1rem;
      }

      .identity span,
      .summary span,
      .stamp {
        color: var(--li-muted);
        font-size: 0.86rem;
      }

      .summary {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }

      .summary span {
        padding: 0.28rem 0.55rem;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.65);
        border: 1px solid var(--li-border);
      }

      .meta {
        display: flex;
        align-items: center;
        gap: 0.7rem;
      }

      .empty {
        padding: 1rem;
        color: var(--li-muted);
      }

      @media (max-width: 760px) {
        .row {
          grid-template-columns: 1fr;
        }

        .meta {
          justify-content: space-between;
        }
      }
    `
];
ue([
  g({ attribute: !1 })
], R.prototype, "hass", 2);
ue([
  g({ attribute: !1 })
], R.prototype, "config", 2);
R = ue([
  O("location-intelligence-subject-list-card")
], R);
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
