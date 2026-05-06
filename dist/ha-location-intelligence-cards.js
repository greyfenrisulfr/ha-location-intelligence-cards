const H = globalThis, G = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Q = /* @__PURE__ */ Symbol(), le = /* @__PURE__ */ new WeakMap();
let ye = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== Q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (G && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = le.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && le.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Pe = (t) => new ye(typeof t == "string" ? t : t + "", void 0, Q), w = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[n + 1], t[0]);
  return new ye(i, t, Q);
}, Oe = (t, e) => {
  if (G) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), r = H.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = i.cssText, t.appendChild(s);
  }
}, ce = G ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return Pe(i);
})(t) : t;
const { is: Me, defineProperty: Ne, getOwnPropertyDescriptor: Te, getOwnPropertyNames: Ue, getOwnPropertySymbols: je, getPrototypeOf: De } = Object, q = globalThis, de = q.trustedTypes, Le = de ? de.emptyScript : "", ke = q.reactiveElementPolyfillSupport, M = (t, e) => t, I = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Le : null;
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
} }, X = (t, e) => !Me(t, e), pe = { attribute: !0, type: String, converter: I, reflect: !1, useDefault: !1, hasChanged: X };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), q.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = pe) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, s, i);
      r !== void 0 && Ne(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: r, set: n } = Te(this.prototype, e) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: r, set(o) {
      const l = r?.call(this);
      n?.call(this, o), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? pe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const e = De(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const i = this.properties, s = [...Ue(i), ...je(i)];
      for (const r of s) this.createProperty(r, i[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, r] of i) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const r = this._$Eu(i, s);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) i.unshift(ce(r));
    } else e !== void 0 && i.push(ce(e));
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
    return Oe(e, this.constructor.elementStyles), e;
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
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : I).toAttribute(i, s.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : I;
      this._$Em = r;
      const l = o.fromAttribute(i, n.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, r = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[e]), s ??= o.getPropertyOptions(e), !((s.hasChanged ?? X)(n, i) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: r, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? i ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: o } = n, l = this[r];
        o !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[M("elementProperties")] = /* @__PURE__ */ new Map(), A[M("finalized")] = /* @__PURE__ */ new Map(), ke?.({ ReactiveElement: A }), (q.reactiveElementVersions ??= []).push("2.1.2");
const Y = globalThis, he = (t) => t, B = Y.trustedTypes, ue = B ? B.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, _e = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, we = "?" + b, Re = `<${we}>`, _ = document, N = () => _.createComment(""), T = (t) => t === null || typeof t != "object" && typeof t != "function", ee = Array.isArray, ze = (t) => ee(t) || typeof t?.[Symbol.iterator] == "function", J = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ge = /-->/g, fe = />/g, v = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), me = /'/g, $e = /"/g, Ae = /^(?:script|style|textarea|title)$/i, He = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), u = He(1), x = /* @__PURE__ */ Symbol.for("lit-noChange"), d = /* @__PURE__ */ Symbol.for("lit-nothing"), be = /* @__PURE__ */ new WeakMap(), y = _.createTreeWalker(_, 129);
function xe(t, e) {
  if (!ee(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ue !== void 0 ? ue.createHTML(e) : e;
}
const Ie = (t, e) => {
  const i = t.length - 1, s = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = O;
  for (let l = 0; l < i; l++) {
    const a = t[l];
    let p, h, c = -1, m = 0;
    for (; m < a.length && (o.lastIndex = m, h = o.exec(a), h !== null); ) m = o.lastIndex, o === O ? h[1] === "!--" ? o = ge : h[1] !== void 0 ? o = fe : h[2] !== void 0 ? (Ae.test(h[2]) && (r = RegExp("</" + h[2], "g")), o = v) : h[3] !== void 0 && (o = v) : o === v ? h[0] === ">" ? (o = r ?? O, c = -1) : h[1] === void 0 ? c = -2 : (c = o.lastIndex - h[2].length, p = h[1], o = h[3] === void 0 ? v : h[3] === '"' ? $e : me) : o === $e || o === me ? o = v : o === ge || o === fe ? o = O : (o = v, r = void 0);
    const $ = o === v && t[l + 1].startsWith("/>") ? " " : "";
    n += o === O ? a + Re : c >= 0 ? (s.push(p), a.slice(0, c) + _e + a.slice(c) + b + $) : a + b + (c === -2 ? l : $);
  }
  return [xe(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: e, _$litType$: i }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const l = e.length - 1, a = this.parts, [p, h] = Ie(e, i);
    if (this.el = U.createElement(p, s), y.currentNode = this.el.content, i === 2 || i === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = y.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(_e)) {
          const m = h[o++], $ = r.getAttribute(c).split(b), z = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: n, name: z[2], strings: $, ctor: z[1] === "." ? We : z[1] === "?" ? qe : z[1] === "@" ? Ve : V }), r.removeAttribute(c);
        } else c.startsWith(b) && (a.push({ type: 6, index: n }), r.removeAttribute(c));
        if (Ae.test(r.tagName)) {
          const c = r.textContent.split(b), m = c.length - 1;
          if (m > 0) {
            r.textContent = B ? B.emptyScript : "";
            for (let $ = 0; $ < m; $++) r.append(c[$], N()), y.nextNode(), a.push({ type: 2, index: ++n });
            r.append(c[m], N());
          }
        }
      } else if (r.nodeType === 8) if (r.data === we) a.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(b, c + 1)) !== -1; ) a.push({ type: 7, index: n }), c += b.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = _.createElement("template");
    return s.innerHTML = e, s;
  }
}
function E(t, e, i = t, s) {
  if (e === x) return e;
  let r = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = T(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(t), r._$AT(t, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = r : i._$Cl = r), r !== void 0 && (e = E(t, r._$AS(t, e.values), r, s)), e;
}
class Be {
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
    const { el: { content: i }, parts: s } = this._$AD, r = (e?.creationScope ?? _).importNode(i, !0);
    y.currentNode = r;
    let n = y.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let p;
        a.type === 2 ? p = new R(n, n.nextSibling, this, e) : a.type === 1 ? p = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (p = new Fe(n, this, e)), this._$AV.push(p), a = s[++l];
      }
      o !== a?.index && (n = y.nextNode(), o++);
    }
    return y.currentNode = _, r;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, s, r) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = E(this, e, i), T(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== x && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ze(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && T(this._$AH) ? this._$AA.nextSibling.data = e : this.T(_.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = U.createElement(xe(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const n = new Be(r, this), o = n.u(this.options);
      n.p(i), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = be.get(e.strings);
    return i === void 0 && be.set(e.strings, i = new U(e)), i;
  }
  k(e) {
    ee(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, r = 0;
    for (const n of e) r === i.length ? i.push(s = new R(this.O(N()), this.O(N()), this, this.options)) : s = i[r], s._$AI(n), r++;
    r < i.length && (this._$AR(s && s._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = he(e).nextSibling;
      he(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, r, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(e, i = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = E(this, e, i, 0), o = !T(e) || e !== this._$AH && e !== x, o && (this._$AH = e);
    else {
      const l = e;
      let a, p;
      for (e = n[0], a = 0; a < n.length - 1; a++) p = E(this, l[s + a], i, a), p === x && (p = this._$AH[a]), o ||= !T(p) || p !== this._$AH[a], p === d ? e = d : e !== d && (e += (p ?? "") + n[a + 1]), this._$AH[a] = p;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class We extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
}
class qe extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class Ve extends V {
  constructor(e, i, s, r, n) {
    super(e, i, s, r, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = E(this, e, i, 0) ?? d) === x) return;
    const s = this._$AH, r = e === d && s !== d || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== d && (s === d || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Fe {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    E(this, e);
  }
}
const Ze = Y.litHtmlPolyfillSupport;
Ze?.(U, R), (Y.litHtmlVersions ??= []).push("3.3.2");
const Je = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = r = new R(e.insertBefore(N(), n), n, void 0, i ?? {});
  }
  return r._$AI(t), r;
};
const te = globalThis;
class f extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Je(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return x;
  }
}
f._$litElement$ = !0, f.finalized = !0, te.litElementHydrateSupport?.({ LitElement: f });
const Ke = te.litElementPolyfillSupport;
Ke?.({ LitElement: f });
(te.litElementVersions ??= []).push("4.2.2");
const P = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const Ge = { attribute: !0, type: String, converter: I, reflect: !1, hasChanged: X }, Qe = (t = Ge, e, i) => {
  const { kind: s, metadata: r } = i;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), s === "accessor") {
    const { name: o } = i;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, a, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, t, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = i;
    return function(l) {
      const a = this[o];
      e.call(this, l), this.requestUpdate(o, a, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function g(t) {
  return (e, i) => typeof i == "object" ? Qe(t, e, i) : ((s, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(t, e, i);
}
function Xe(t) {
  return g({ ...t, state: !0, attribute: !1 });
}
var Ye = Object.defineProperty, et = Object.getOwnPropertyDescriptor, F = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? et(e, i) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (r = (s ? o(e, i, r) : o(r)) || r);
  return s && r && Ye(e, i, r), r;
};
let S = class extends f {
  constructor() {
    super(...arguments), this.mode = "single", this.config = { type: "" };
  }
  setConfig(t) {
    this.config = { ...t };
  }
  render() {
    return u`
      <div class="editor">
        <label>
          <span>Title</span>
          <input
            .value=${this.config.title ?? ""}
            @input=${this.onTextInput("title")}
            placeholder="Optional title"
          />
        </label>

        ${this.mode === "single" ? u`
              <label>
                <span>Name override</span>
                <input
                  .value=${this.config.name ?? ""}
                  @input=${this.onTextInput("name")}
                  placeholder="Optional display name"
                />
              </label>
            ` : d}

        ${this.mode === "single" ? u`
              <label>
                <span>Entity</span>
                <input
                  .value=${this.config.entity ?? ""}
                  @input=${this.onTextInput("entity")}
                  placeholder="sensor.alice_location_intelligence"
                />
              </label>
            ` : u`
              <label>
                <span>Entities</span>
                <textarea
                  @input=${this.onEntitiesInput}
                  placeholder="sensor.alice_location_intelligence&#10;sensor.car_location_intelligence"
                >
${(this.config.entities ?? []).join(`
`)}</textarea
                >
              </label>

              <label>
                <span>Focus entity</span>
                <input
                  .value=${this.config.focus_entity ?? ""}
                  @input=${this.onTextInput("focus_entity")}
                  placeholder="Optional primary entity"
                />
              </label>
            `}

        <p class="hint">
          ${this.mode === "single" ? "Use a single location intelligence entity." : "Enter one entity id per line."}
        </p>
      </div>
    `;
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
    const i = t.target.value.split(`
`).map((s) => s.trim()).filter((s) => s !== "");
    this.updateConfig({
      entities: i.length > 0 ? i : void 0
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
S.styles = w`
    :host {
      display: block;
    }

    .editor {
      display: grid;
      gap: 1rem;
      padding: 0.25rem 0;
    }

    label {
      display: grid;
      gap: 0.35rem;
    }

    span {
      font-size: 0.9rem;
      font-weight: 600;
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

    .hint {
      margin: 0;
      color: #5f6b6a;
      font-size: 0.85rem;
    }
  `;
F([
  g({ attribute: !1 })
], S.prototype, "hass", 2);
F([
  g({ attribute: !1 })
], S.prototype, "mode", 2);
F([
  Xe()
], S.prototype, "config", 2);
S = F([
  P("location-intelligence-card-editor")
], S);
const ve = [
  "N",
  "NE",
  "E",
  "SE",
  "S",
  "SW",
  "W",
  "NW"
], K = (t) => {
  if (typeof t == "number" && Number.isFinite(t))
    return t;
  if (typeof t == "string" && t.trim() !== "") {
    const e = Number(t);
    return Number.isFinite(e) ? e : void 0;
  }
}, ie = (t) => ({
  entityId: t.entity_id,
  name: String(t.attributes.friendly_name ?? t.entity_id).replace(/^sensor\./, "").replace(/_/g, " "),
  subjectType: String(t.attributes.subject_type ?? "subject"),
  likelyLocation: typeof t.attributes.likely_location == "string" ? t.attributes.likely_location : void 0,
  distanceM: K(t.attributes.distance_m),
  bearingDeg: K(t.attributes.bearing_deg),
  confidence: K(t.attributes.confidence),
  sourceLabel: typeof t.attributes.source_label == "string" ? t.attributes.source_label : void 0,
  state: t.state,
  lastReported: typeof t.attributes.last_reported == "string" ? t.attributes.last_reported : t.last_updated ? t.last_updated : void 0,
  raw: t
}), Z = (t) => {
  if (t === void 0)
    return "Unknown";
  const e = (t % 360 + 360) % 360, i = Math.round(e / 45) % ve.length;
  return ve[i];
}, C = (t) => {
  if (t === void 0)
    return "Distance unknown";
  if (t < 25)
    return "Within 25 m";
  if (t < 1e3)
    return `${Math.round(t / 10) * 10} m away`;
  const e = t / 1e3;
  return `${e < 10 ? e.toFixed(1) : Math.round(e)} km away`;
}, tt = (t) => {
  if (t === void 0)
    return "Confidence unknown";
  const e = Math.max(0, Math.min(100, Math.round(t * 100)));
  return e >= 80 ? `${e}% confident` : e >= 50 ? `${e}% confidence` : `${e}% low confidence`;
}, it = (t) => t === void 0 ? "unknown" : t >= 0.8 ? "high" : t >= 0.5 ? "medium" : "low", Ee = (t) => t.likelyLocation && t.distanceM !== void 0 ? `Probably at ${t.likelyLocation}, ${C(t.distanceM).toLowerCase()}` : t.likelyLocation ? `Probably at ${t.likelyLocation}` : t.distanceM !== void 0 ? C(t.distanceM) : "Probable location unknown", Se = (t) => {
  if (!t)
    return "No recent update";
  const e = new Date(t);
  return Number.isNaN(e.getTime()) ? t : e.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};
var st = Object.defineProperty, rt = Object.getOwnPropertyDescriptor, Ce = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? rt(e, i) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (r = (s ? o(e, i, r) : o(r)) || r);
  return s && r && st(e, i, r), r;
};
let W = class extends f {
  render() {
    return u`<span class="chip ${it(this.confidence)}">
      ${tt(this.confidence)}
    </span>`;
  }
};
W.styles = w`
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
Ce([
  g({ attribute: !1 })
], W.prototype, "confidence", 2);
W = Ce([
  P("li-confidence-chip")
], W);
var nt = Object.defineProperty, ot = Object.getOwnPropertyDescriptor, se = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ot(e, i) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (r = (s ? o(e, i, r) : o(r)) || r);
  return s && r && nt(e, i, r), r;
};
let j = class extends f {
  render() {
    const t = Math.max(0, Math.min(100, Math.round((this.confidence ?? 0) * 100))), e = this.bearing ?? 0, i = t >= 80 ? "#2f6f43" : t >= 50 ? "#a5652a" : t > 0 ? "#a3473c" : "#7b8a86";
    return u`
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
          <span>${Z(this.bearing)}</span>
        </div>
      </div>
    `;
  }
};
j.styles = w`
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
se([
  g({ type: Number })
], j.prototype, "bearing", 2);
se([
  g({ type: Number })
], j.prototype, "confidence", 2);
j = se([
  P("li-direction-ring")
], j);
const re = w`
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
var at = Object.defineProperty, lt = Object.getOwnPropertyDescriptor, ne = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? lt(e, i) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (r = (s ? o(e, i, r) : o(r)) || r);
  return s && r && at(e, i, r), r;
};
let D = class extends f {
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
      entity: "sensor.location_intelligence"
    };
  }
  render() {
    const t = this.config?.entity ? this.hass?.states[this.config.entity] : void 0;
    if (!t)
      return u`<ha-card><div class="empty">Entity unavailable</div></ha-card>`;
    const e = ie(t);
    return u`
      <ha-card>
        <div class="card">
          <div class="header">
            <div>
              <div class="eyebrow">${e.subjectType}</div>
              <h2>${this.config?.name ?? e.name}</h2>
              <p>${Ee(e)}</p>
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
                <strong>${Z(e.bearingDeg)}</strong>
              </div>
              <div class="metric">
                <span class="label">Distance</span>
                <strong>${C(e.distanceM)}</strong>
              </div>
              <div class="metric">
                <span class="label">Likely place</span>
                <strong>${e.likelyLocation ?? "Unknown"}</strong>
              </div>
              <div class="metric">
                <span class="label">Source</span>
                <strong>${e.sourceLabel ?? "Not classified"}</strong>
              </div>
            </div>
          </div>

          <div class="footer">
            <span class="chip">Updated ${Se(e.lastReported)}</span>
            ${e.state ? u`<span class="chip">State ${e.state}</span>` : d}
          </div>
        </div>
      </ha-card>
    `;
  }
};
D.styles = [
  re,
  w`
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
ne([
  g({ attribute: !1 })
], D.prototype, "hass", 2);
ne([
  g({ attribute: !1 })
], D.prototype, "config", 2);
D = ne([
  P("location-intelligence-compass-card")
], D);
var ct = Object.defineProperty, dt = Object.getOwnPropertyDescriptor, oe = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? dt(e, i) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (r = (s ? o(e, i, r) : o(r)) || r);
  return s && r && ct(e, i, r), r;
};
let L = class extends f {
  setConfig(t) {
    if (!t.entities?.length)
      throw new Error("location-intelligence-dashboard-card requires entities");
    this.config = t;
  }
  getCardSize() {
    return 8;
  }
  static async getConfigElement() {
    const t = document.createElement("location-intelligence-card-editor");
    return t.mode = "multiple", t;
  }
  static getStubConfig() {
    return {
      type: "custom:location-intelligence-dashboard-card",
      title: "Spatial awareness",
      focus_entity: "sensor.location_intelligence",
      entities: ["sensor.location_intelligence"]
    };
  }
  render() {
    const t = (this.config?.entities ?? []).map((i) => this.hass?.states[i]).filter((i) => !!i).map(ie), e = t.find((i) => i.entityId === this.config?.focus_entity) ?? t[0];
    return u`
      <ha-card>
        <div class="card">
          <div class="heading">
            <div>
              <div class="eyebrow">Dashboard</div>
              <h2>${this.config?.title ?? "Spatial awareness"}</h2>
            </div>
          </div>

          ${e ? u`
                <div class="layout">
                  <section class="focus panel">
                    <div class="focusTop">
                      <div>
                        <div class="eyebrow">${e.subjectType}</div>
                        <h3>${e.name}</h3>
                        <p>${Ee(e)}</p>
                      </div>
                      <li-confidence-chip .confidence=${e.confidence}></li-confidence-chip>
                    </div>

                    <div class="focusStats">
                      <div>
                        <span>Distance</span>
                        <strong>${C(e.distanceM)}</strong>
                      </div>
                      <div>
                        <span>Direction</span>
                        <strong>${Z(e.bearingDeg)}</strong>
                      </div>
                      <div>
                        <span>Likely place</span>
                        <strong>${e.likelyLocation ?? "Unknown"}</strong>
                      </div>
                    </div>
                  </section>

                  <section class="map panel">
                    <div class="eyebrow">Map surface</div>
                    <h3>Desktop map placeholder</h3>
                    <p>
                      Reserve this area for a future fused-position map, trail view, or leader/follower
                      relative layout.
                    </p>
                    <div class="grid">
                      ${t.map(
      (i) => u`
                          <article>
                            <strong>${i.name}</strong>
                            <span>${i.likelyLocation ?? "Unknown place"}</span>
                            <span>${C(i.distanceM)}</span>
                          </article>
                        `
    )}
                    </div>
                  </section>
                </div>
              ` : u`<div class="empty">No configured entities are currently available.</div>`}
        </div>
      </ha-card>
    `;
  }
};
L.styles = [
  re,
  w`
      .card {
        padding: 1.25rem;
      }

      h2,
      h3 {
        margin: 0.25rem 0 0;
      }

      .layout {
        display: grid;
        grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
        gap: 1rem;
        margin-top: 1rem;
      }

      .focus,
      .map {
        padding: 1rem;
      }

      .focusTop {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: start;
      }

      p {
        color: var(--li-muted);
      }

      .focusStats {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.8rem;
      }

      .focusStats div,
      article {
        padding: 0.9rem;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.72);
        border: 1px solid var(--li-border);
      }

      .focusStats span,
      article span {
        display: block;
        color: var(--li-muted);
        font-size: 0.82rem;
      }

      .focusStats strong,
      article strong {
        display: block;
        margin-top: 0.3rem;
      }

      .grid {
        display: grid;
        gap: 0.7rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin-top: 1rem;
      }

      .empty {
        padding: 1rem 0;
      }

      @media (max-width: 900px) {
        .layout,
        .focusStats,
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `
];
oe([
  g({ attribute: !1 })
], L.prototype, "hass", 2);
oe([
  g({ attribute: !1 })
], L.prototype, "config", 2);
L = oe([
  P("location-intelligence-dashboard-card")
], L);
var pt = Object.defineProperty, ht = Object.getOwnPropertyDescriptor, ae = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ht(e, i) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (r = (s ? o(e, i, r) : o(r)) || r);
  return s && r && pt(e, i, r), r;
};
let k = class extends f {
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
      entities: ["sensor.location_intelligence"]
    };
  }
  render() {
    const t = (this.config?.entities ?? []).map((e) => this.hass?.states[e]).filter((e) => !!e).map(ie);
    return u`
      <ha-card>
        <div class="card">
          <div class="titleRow">
            <div>
              <div class="eyebrow">Subjects</div>
              <h2>${this.config?.title ?? "Location overview"}</h2>
            </div>
          </div>

          <div class="list">
            ${t.length > 0 ? t.map(
      (e) => u`
                    <div class="row panel">
                      <div class="identity">
                        <strong>${e.name}</strong>
                        <span>${e.subjectType}</span>
                      </div>

                      <div class="summary">
                        <span>${C(e.distanceM)}</span>
                        <span>${Z(e.bearingDeg)}</span>
                        <span>${e.likelyLocation ?? "Location unknown"}</span>
                      </div>

                      <div class="meta">
                        <li-confidence-chip .confidence=${e.confidence}></li-confidence-chip>
                        <span class="stamp">${Se(e.lastReported)}</span>
                      </div>
                    </div>
                  `
    ) : u`<div class="empty panel">No configured entities are currently available.</div>`}
          </div>
        </div>
      </ha-card>
    `;
  }
};
k.styles = [
  re,
  w`
      .card {
        padding: 1.25rem;
      }

      h2 {
        margin: 0.25rem 0 0;
        font-size: 1.5rem;
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
ae([
  g({ attribute: !1 })
], k.prototype, "hass", 2);
ae([
  g({ attribute: !1 })
], k.prototype, "config", 2);
k = ae([
  P("location-intelligence-subject-list-card")
], k);
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
