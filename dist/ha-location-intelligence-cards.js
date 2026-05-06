const W = globalThis, te = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ie = /* @__PURE__ */ Symbol(), he = /* @__PURE__ */ new WeakMap();
let Ee = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== ie) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (te && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = he.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && he.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const De = (t) => new Ee(typeof t == "string" ? t : t + "", void 0, ie), w = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, s, n) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[n + 1], t[0]);
  return new Ee(i, t, ie);
}, ze = (t, e) => {
  if (te) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), s = W.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = i.cssText, t.appendChild(r);
  }
}, ge = te ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return De(i);
})(t) : t;
const { is: Re, defineProperty: He, getOwnPropertyDescriptor: Ie, getOwnPropertyNames: Be, getOwnPropertySymbols: We, getPrototypeOf: Ve } = Object, J = globalThis, me = J.trustedTypes, qe = me ? me.emptyScript : "", Fe = J.reactiveElementPolyfillSupport, j = (t, e) => t, V = { toAttribute(t, e) {
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
} }, re = (t, e) => !Re(t, e), fe = { attribute: !0, type: String, converter: V, reflect: !1, useDefault: !1, hasChanged: re };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), J.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = fe) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, r, i);
      s !== void 0 && He(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: s, set: n } = Ie(this.prototype, e) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: s, set(o) {
      const l = s?.call(this);
      n?.call(this, o), this.requestUpdate(e, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? fe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(j("elementProperties"))) return;
    const e = Ve(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(j("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(j("properties"))) {
      const i = this.properties, r = [...Be(i), ...We(i)];
      for (const s of r) this.createProperty(s, i[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [r, s] of i) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const s = this._$Eu(i, r);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const s of r) i.unshift(ge(s));
    } else e !== void 0 && i.push(ge(e));
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
  attributeChangedCallback(e, i, r) {
    this._$AK(e, r);
  }
  _$ET(e, i) {
    const r = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, r);
    if (s !== void 0 && r.reflect === !0) {
      const n = (r.converter?.toAttribute !== void 0 ? r.converter : V).toAttribute(i, r.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const r = this.constructor, s = r._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = r.getPropertyOptions(s), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : V;
      this._$Em = s;
      const l = o.fromAttribute(i, n.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, s = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (s === !1 && (n = this[e]), r ??= o.getPropertyOptions(e), !((r.hasChanged ?? re)(n, i) || r.useDefault && r.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, r)))) return;
      this.C(e, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: r, reflect: s, wrapped: n }, o) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? i ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (i = void 0), this._$AL.set(e, i)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, n] of r) {
        const { wrapped: o } = n, l = this[s];
        o !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, n, l);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[j("elementProperties")] = /* @__PURE__ */ new Map(), A[j("finalized")] = /* @__PURE__ */ new Map(), Fe?.({ ReactiveElement: A }), (J.reactiveElementVersions ??= []).push("2.1.2");
const se = globalThis, be = (t) => t, q = se.trustedTypes, ve = q ? q.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Se = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, ke = "?" + $, Ke = `<${ke}>`, x = document, N = () => x.createComment(""), T = (t) => t === null || typeof t != "object" && typeof t != "function", ne = Array.isArray, Ze = (t) => ne(t) || typeof t?.[Symbol.iterator] == "function", X = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $e = /-->/g, ye = />/g, y = RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _e = /'/g, xe = /"/g, Pe = /^(?:script|style|textarea|title)$/i, Je = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), d = Je(1), E = /* @__PURE__ */ Symbol.for("lit-noChange"), u = /* @__PURE__ */ Symbol.for("lit-nothing"), we = /* @__PURE__ */ new WeakMap(), _ = x.createTreeWalker(x, 129);
function Le(t, e) {
  if (!ne(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ve !== void 0 ? ve.createHTML(e) : e;
}
const Ge = (t, e) => {
  const i = t.length - 1, r = [];
  let s, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = M;
  for (let l = 0; l < i; l++) {
    const c = t[l];
    let a, h, p = -1, f = 0;
    for (; f < c.length && (o.lastIndex = f, h = o.exec(c), h !== null); ) f = o.lastIndex, o === M ? h[1] === "!--" ? o = $e : h[1] !== void 0 ? o = ye : h[2] !== void 0 ? (Pe.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = y) : h[3] !== void 0 && (o = y) : o === y ? h[0] === ">" ? (o = s ?? M, p = -1) : h[1] === void 0 ? p = -2 : (p = o.lastIndex - h[2].length, a = h[1], o = h[3] === void 0 ? y : h[3] === '"' ? xe : _e) : o === xe || o === _e ? o = y : o === $e || o === ye ? o = M : (o = y, s = void 0);
    const b = o === y && t[l + 1].startsWith("/>") ? " " : "";
    n += o === M ? c + Ke : p >= 0 ? (r.push(a), c.slice(0, p) + Se + c.slice(p) + $ + b) : c + $ + (p === -2 ? l : b);
  }
  return [Le(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class U {
  constructor({ strings: e, _$litType$: i }, r) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const l = e.length - 1, c = this.parts, [a, h] = Ge(e, i);
    if (this.el = U.createElement(a, r), _.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = _.nextNode()) !== null && c.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(Se)) {
          const f = h[o++], b = s.getAttribute(p).split($), B = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: n, name: B[2], strings: b, ctor: B[1] === "." ? Xe : B[1] === "?" ? Ye : B[1] === "@" ? et : G }), s.removeAttribute(p);
        } else p.startsWith($) && (c.push({ type: 6, index: n }), s.removeAttribute(p));
        if (Pe.test(s.tagName)) {
          const p = s.textContent.split($), f = p.length - 1;
          if (f > 0) {
            s.textContent = q ? q.emptyScript : "";
            for (let b = 0; b < f; b++) s.append(p[b], N()), _.nextNode(), c.push({ type: 2, index: ++n });
            s.append(p[f], N());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ke) c.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = s.data.indexOf($, p + 1)) !== -1; ) c.push({ type: 7, index: n }), p += $.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const r = x.createElement("template");
    return r.innerHTML = e, r;
  }
}
function S(t, e, i = t, r) {
  if (e === E) return e;
  let s = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const n = T(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== n && (s?._$AO?.(!1), n === void 0 ? s = void 0 : (s = new n(t), s._$AT(t, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = s : i._$Cl = s), s !== void 0 && (e = S(t, s._$AS(t, e.values), s, r)), e;
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
    const { el: { content: i }, parts: r } = this._$AD, s = (e?.creationScope ?? x).importNode(i, !0);
    _.currentNode = s;
    let n = _.nextNode(), o = 0, l = 0, c = r[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let a;
        c.type === 2 ? a = new I(n, n.nextSibling, this, e) : c.type === 1 ? a = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (a = new tt(n, this, e)), this._$AV.push(a), c = r[++l];
      }
      o !== c?.index && (n = _.nextNode(), o++);
    }
    return _.currentNode = x, s;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class I {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, r, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    e = S(this, e, i), T(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== E && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ze(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && T(this._$AH) ? this._$AA.nextSibling.data = e : this.T(x.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: r } = e, s = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = U.createElement(Le(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const n = new Qe(s, this), o = n.u(this.options);
      n.p(i), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = we.get(e.strings);
    return i === void 0 && we.set(e.strings, i = new U(e)), i;
  }
  k(e) {
    ne(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, s = 0;
    for (const n of e) s === i.length ? i.push(r = new I(this.O(N()), this.O(N()), this, this.options)) : r = i[s], r._$AI(n), s++;
    s < i.length && (this._$AR(r && r._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const r = be(e).nextSibling;
      be(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class G {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, r, s, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = u;
  }
  _$AI(e, i = this, r, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = S(this, e, i, 0), o = !T(e) || e !== this._$AH && e !== E, o && (this._$AH = e);
    else {
      const l = e;
      let c, a;
      for (e = n[0], c = 0; c < n.length - 1; c++) a = S(this, l[r + c], i, c), a === E && (a = this._$AH[c]), o ||= !T(a) || a !== this._$AH[c], a === u ? e = u : e !== u && (e += (a ?? "") + n[c + 1]), this._$AH[c] = a;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Xe extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class Ye extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class et extends G {
  constructor(e, i, r, s, n) {
    super(e, i, r, s, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = S(this, e, i, 0) ?? u) === E) return;
    const r = this._$AH, s = e === u && r !== u || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== u && (r === u || s);
    s && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
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
    S(this, e);
  }
}
const it = se.litHtmlPolyfillSupport;
it?.(U, I), (se.litHtmlVersions ??= []).push("3.3.2");
const rt = (t, e, i) => {
  const r = i?.renderBefore ?? e;
  let s = r._$litPart$;
  if (s === void 0) {
    const n = i?.renderBefore ?? null;
    r._$litPart$ = s = new I(e.insertBefore(N(), n), n, void 0, i ?? {});
  }
  return s._$AI(t), s;
};
const oe = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = rt(i, this.renderRoot, this.renderOptions);
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
m._$litElement$ = !0, m.finalized = !0, oe.litElementHydrateSupport?.({ LitElement: m });
const st = oe.litElementPolyfillSupport;
st?.({ LitElement: m });
(oe.litElementVersions ??= []).push("4.2.2");
const L = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const nt = { attribute: !0, type: String, converter: V, reflect: !1, hasChanged: re }, ot = (t = nt, e, i) => {
  const { kind: r, metadata: s } = i;
  let n = globalThis.litPropertyMetadata.get(s);
  if (n === void 0 && globalThis.litPropertyMetadata.set(s, n = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), r === "accessor") {
    const { name: o } = i;
    return { set(l) {
      const c = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, c, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, t, l), l;
    } };
  }
  if (r === "setter") {
    const { name: o } = i;
    return function(l) {
      const c = this[o];
      e.call(this, l), this.requestUpdate(o, c, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function g(t) {
  return (e, i) => typeof i == "object" ? ot(t, e, i) : ((r, s, n) => {
    const o = s.hasOwnProperty(n);
    return s.constructor.createProperty(n, r), o ? Object.getOwnPropertyDescriptor(s, n) : void 0;
  })(t, e, i);
}
function at(t) {
  return g({ ...t, state: !0, attribute: !1 });
}
const O = w`
  :host {
    --li-bg:
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--card-background-color, #f6f2e8) 82%, #f1e7d2 18%) 0%,
        color-mix(in srgb, var(--card-background-color, #e5ece5) 76%, #d5e0d4 24%) 100%
      );
    --li-panel: color-mix(in srgb, var(--card-background-color, #fff) 76%, transparent);
    --li-surface: color-mix(in srgb, var(--card-background-color, #fff) 84%, transparent);
    --li-surface-strong: color-mix(in srgb, var(--card-background-color, #fff) 92%, transparent);
    --li-text: var(--primary-text-color, #1f2a2a);
    --li-muted: var(--secondary-text-color, #556564);
    --li-border: color-mix(in srgb, var(--divider-color, rgba(40, 76, 63, 0.14)) 78%, transparent);
    --li-accent: #284c3f;
    --li-accent-soft: #5c8968;
    --li-warn: #a5652a;
    --li-low: #a3473c;
    --li-shadow: 0 18px 40px rgba(31, 42, 42, 0.08);
    --li-shadow-strong: 0 10px 22px rgba(31, 42, 42, 0.18);
    --li-ring-fill: rgba(255, 255, 255, 0.15);
    --li-ring-core:
      radial-gradient(
        circle at center,
        color-mix(in srgb, var(--card-background-color, #fff) 96%, white 4%) 0 39%,
        color-mix(in srgb, var(--card-background-color, #e4ece5) 90%, transparent) 40% 100%
      );
    --li-ring-inner-stroke: color-mix(in srgb, var(--card-background-color, #fff) 62%, transparent);
    --li-axis: color-mix(in srgb, var(--divider-color, rgba(40, 76, 63, 0.14)) 90%, transparent);
    --li-dashed-border: color-mix(in srgb, var(--divider-color, rgba(40, 76, 63, 0.2)) 92%, transparent);
    --li-point-border: color-mix(in srgb, var(--card-background-color, #fff) 85%, white 15%);
    --li-editor-input-bg: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
    --li-editor-chip-bg: color-mix(in srgb, var(--card-background-color, #fff) 74%, transparent);
    --li-editor-chip-active: color-mix(in srgb, var(--li-accent) 12%, var(--card-background-color, #fff));
    display: block;
    color: var(--li-text);
    font-family: "Manrope", "Segoe UI", sans-serif;
  }

  :host([data-theme="dark"]),
  :host-context(.theme-dark),
  :host-context([data-theme="dark"]) {
    --li-bg:
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--card-background-color, #151d1d) 92%, #243328 8%) 0%,
        color-mix(in srgb, var(--card-background-color, #101716) 88%, #1a2724 12%) 100%
      );
    --li-panel: color-mix(in srgb, var(--card-background-color, #121919) 82%, #23312d 18%);
    --li-surface: color-mix(in srgb, var(--card-background-color, #121919) 88%, #293633 12%);
    --li-surface-strong: color-mix(in srgb, var(--card-background-color, #121919) 94%, #31423d 6%);
    --li-border: color-mix(in srgb, var(--divider-color, rgba(132, 168, 150, 0.26)) 88%, transparent);
    --li-shadow: 0 20px 44px rgba(0, 0, 0, 0.28);
    --li-shadow-strong: 0 12px 28px rgba(0, 0, 0, 0.34);
    --li-ring-fill: rgba(255, 255, 255, 0.08);
    --li-ring-core:
      radial-gradient(
        circle at center,
        color-mix(in srgb, var(--card-background-color, #0f1515) 96%, white 4%) 0 39%,
        color-mix(in srgb, var(--card-background-color, #162120) 94%, transparent) 40% 100%
      );
    --li-ring-inner-stroke: rgba(255, 255, 255, 0.08);
    --li-axis: rgba(190, 214, 204, 0.14);
    --li-dashed-border: rgba(190, 214, 204, 0.18);
    --li-point-border: rgba(255, 255, 255, 0.18);
    --li-editor-input-bg: color-mix(in srgb, var(--card-background-color, #121919) 94%, #26332f 6%);
    --li-editor-chip-bg: color-mix(in srgb, var(--card-background-color, #121919) 82%, #273530 18%);
    --li-editor-chip-active: color-mix(in srgb, var(--li-accent-soft) 18%, var(--card-background-color, #121919));
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --li-bg:
        linear-gradient(
          180deg,
          color-mix(in srgb, var(--card-background-color, #151d1d) 92%, #243328 8%) 0%,
          color-mix(in srgb, var(--card-background-color, #101716) 88%, #1a2724 12%) 100%
        );
      --li-panel: color-mix(in srgb, var(--card-background-color, #121919) 82%, #23312d 18%);
      --li-surface: color-mix(in srgb, var(--card-background-color, #121919) 88%, #293633 12%);
      --li-surface-strong: color-mix(in srgb, var(--card-background-color, #121919) 94%, #31423d 6%);
      --li-border: color-mix(in srgb, var(--divider-color, rgba(132, 168, 150, 0.26)) 88%, transparent);
      --li-shadow: 0 20px 44px rgba(0, 0, 0, 0.28);
      --li-shadow-strong: 0 12px 28px rgba(0, 0, 0, 0.34);
      --li-ring-fill: rgba(255, 255, 255, 0.08);
      --li-ring-core:
        radial-gradient(
          circle at center,
          color-mix(in srgb, var(--card-background-color, #0f1515) 96%, white 4%) 0 39%,
          color-mix(in srgb, var(--card-background-color, #162120) 94%, transparent) 40% 100%
        );
      --li-ring-inner-stroke: rgba(255, 255, 255, 0.08);
      --li-axis: rgba(190, 214, 204, 0.14);
      --li-dashed-border: rgba(190, 214, 204, 0.18);
      --li-point-border: rgba(255, 255, 255, 0.18);
      --li-editor-input-bg: color-mix(in srgb, var(--card-background-color, #121919) 94%, #26332f 6%);
      --li-editor-chip-bg: color-mix(in srgb, var(--card-background-color, #121919) 82%, #273530 18%);
      --li-editor-chip-active: color-mix(in srgb, var(--li-accent-soft) 18%, var(--card-background-color, #121919));
    }
  }

  ha-card {
    background: var(--li-bg);
    border: 1px solid var(--li-border);
    border-radius: 24px;
    box-shadow: var(--li-shadow);
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
    background: var(--li-surface);
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
var ct = Object.defineProperty, lt = Object.getOwnPropertyDescriptor, Q = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? lt(e, i) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (s = (r ? o(e, i, s) : o(s)) || s);
  return r && s && ct(e, i, s), s;
};
let k = class extends m {
  constructor() {
    super(...arguments), this.mode = "single", this.config = { type: "" };
  }
  setConfig(t) {
    this.config = { ...t };
  }
  render() {
    const t = this.getEntityCandidates(), e = this.config.entities ?? [], i = t.filter((r) => !e.includes(r.entity_id)).slice(0, 8);
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
      (r) => d`
                            <button type="button" class="entityChip active" @click=${() => this.removeEntity(r)}>
                              ${r}
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
      (r) => d`
                          <button type="button" class="entityChip" @click=${() => this.selectSingleEntity(r.entity_id)}>
                            <strong>${this.entityLabel(r)}</strong>
                            <small>${r.entity_id}</small>
                          </button>
                        `
    ) : i.map(
      (r) => d`
                          <button type="button" class="entityChip" @click=${() => this.addEntity(r.entity_id)}>
                            <strong>${this.entityLabel(r)}</strong>
                            <small>${r.entity_id}</small>
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
          ${t.map((r) => d`<option value=${r.entity_id}>${this.entityLabel(r)}</option>`)}
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
`).map((i) => i.trim()).filter((i, r, s) => i !== "" && s.indexOf(i) === r);
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
k.styles = [
  O,
  w`
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
  g({ attribute: !1 })
], k.prototype, "hass", 2);
Q([
  g({ attribute: !1 })
], k.prototype, "mode", 2);
Q([
  at()
], k.prototype, "config", 2);
k = Q([
  L("location-intelligence-card-editor")
], k);
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
}, ee = (t) => {
  if (typeof t != "string")
    return;
  const e = t.trim();
  return e === "" ? void 0 : e;
}, Y = (t, e) => {
  for (const i of e) {
    const r = C(t[i]);
    if (r !== void 0)
      return r;
  }
}, v = (t, e) => {
  for (const i of e) {
    const r = ee(t[i]);
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
}, ae = (t) => Oe(t.replace(/[_-]/g, " ")), ut = (t) => t.trim() === "" ? "Unknown" : ae(t), ht = (t) => (v(t.attributes, ["subject_type", "reference_place_kind"]) ?? t.entity_id.split(".")[0]).toLowerCase(), gt = (t) => t === "device_tracker" ? "Device tracker" : ae(t), mt = (t) => {
  if (t !== void 0)
    return `${t} source${t === 1 ? "" : "s"}`;
}, ce = (t) => {
  const e = ht(t), i = String(t.state ?? ""), r = v(t.attributes, ["direction", "direction_from_reference", "direction_from_home"]) ?? void 0, s = pt(C(t.attributes.confidence));
  return {
    subjectId: ee(t.attributes.subject_id),
    entityId: t.entity_id,
    name: Oe(
      dt(
        String(
          t.attributes.friendly_name ?? ee(t.attributes.subject_id) ?? t.entity_id
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
    distanceM: Y(t.attributes, [
      "distance_m",
      "distance_from_reference_m",
      "distance_from_home_m"
    ]),
    bearingDeg: Y(t.attributes, [
      "bearing_deg",
      "bearing_from_reference_deg",
      "bearing_from_home_deg"
    ]),
    directionLabel: r,
    confidence: s,
    confidenceLabel: v(t.attributes, ["confidence_label"]),
    sourceLabel: v(t.attributes, ["source_label", "source_name"]) ?? mt(C(t.attributes.source_count)),
    sourceCount: C(t.attributes.source_count),
    accuracyM: Y(t.attributes, ["accuracy_m", "gps_accuracy", "horizontal_accuracy"]),
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
}, P = (t) => {
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
}, bt = (t) => t === void 0 ? "unknown" : t >= 0.8 ? "high" : t >= 0.5 ? "medium" : "low", je = (t) => t.likelyLocation && t.distanceM !== void 0 ? `Probably near ${t.likelyLocation}, ${P(t.distanceM).toLowerCase()}` : t.likelyLocation ? `Probably near ${t.likelyLocation}` : t.distanceM !== void 0 ? P(t.distanceM) : "Probable location unknown", F = (t) => t.directionLabel ? ae(t.directionLabel) : Me(t.bearingDeg), Ne = (t) => t === void 0 ? "Accuracy unknown" : t < 25 ? `~${Math.round(t)} m accuracy` : t < 1e3 ? `~${Math.round(t / 5) * 5} m accuracy` : `~${(t / 1e3).toFixed(1)} km accuracy`, K = (t) => {
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
var vt = Object.defineProperty, $t = Object.getOwnPropertyDescriptor, Ue = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? $t(e, i) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (s = (r ? o(e, i, s) : o(s)) || s);
  return r && s && vt(e, i, s), s;
};
let Z = class extends m {
  render() {
    return d`<span class="chip ${bt(this.confidence)}">
      ${ft(this.confidence)}
    </span>`;
  }
};
Z.styles = [
  O,
  w`
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
Ue([
  g({ attribute: !1 })
], Z.prototype, "confidence", 2);
Z = Ue([
  L("li-confidence-chip")
], Z);
var yt = Object.defineProperty, _t = Object.getOwnPropertyDescriptor, le = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? _t(e, i) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (s = (r ? o(e, i, s) : o(s)) || s);
  return r && s && yt(e, i, s), s;
};
let D = class extends m {
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
D.styles = [
  O,
  w`
      .ring {
      position: relative;
      width: 13rem;
      aspect-ratio: 1;
      border-radius: 50%;
      background:
        conic-gradient(var(--confidence-color) var(--confidence), var(--li-ring-fill) 0),
        var(--li-ring-core);
        border: 1px solid var(--li-border);
        box-shadow: inset 0 0 0 14px var(--li-ring-inner-stroke);
      }

      .north,
      .east,
      .south,
      .west {
        position: absolute;
        font-size: 0.85rem;
        font-weight: 800;
        color: var(--li-muted);
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
        background: linear-gradient(180deg, var(--li-accent) 0%, var(--li-accent-soft) 100%);
        filter: drop-shadow(0 6px 10px color-mix(in srgb, var(--li-accent) 30%, transparent));
      }

      .core {
        position: absolute;
        inset: 34%;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: var(--li-surface-strong);
        border: 1px solid var(--li-border);
        color: var(--li-text);
        font-size: 1.2rem;
        font-weight: 800;
        letter-spacing: 0.08em;
      }
    `
];
le([
  g({ type: Number })
], D.prototype, "bearing", 2);
le([
  g({ type: Number })
], D.prototype, "confidence", 2);
D = le([
  L("li-direction-ring")
], D);
var xt = Object.defineProperty, wt = Object.getOwnPropertyDescriptor, de = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? wt(e, i) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (s = (r ? o(e, i, s) : o(s)) || s);
  return r && s && xt(e, i, s), s;
};
let z = class extends m {
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
    const e = ce(t);
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
                <strong>${F(e)}</strong>
              </div>
              <div class="metric">
                <span class="label">Distance</span>
                <strong>${P(e.distanceM)}</strong>
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
            <span class="chip">Updated ${K(e.lastReported)}</span>
            <span class="chip">${Ne(e.accuracyM)}</span>
            ${e.state ? d`<span class="chip">${e.isAvailable ? "State" : "Availability"} ${e.stateLabel}</span>` : u}
          </div>
        </div>
      </ha-card>
    `;
  }
};
z.styles = [
  O,
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
        background: var(--li-surface);
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
], z.prototype, "hass", 2);
de([
  g({ attribute: !1 })
], z.prototype, "config", 2);
z = de([
  L("location-intelligence-compass-card")
], z);
var At = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, pe = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ct(e, i) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (s = (r ? o(e, i, s) : o(s)) || s);
  return r && s && At(e, i, s), s;
};
let R = class extends m {
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
      (this.config?.entities ?? []).map((a) => this.hass?.states[a]).filter((a) => !!a).map(ce)
    ), e = this.config?.entities?.length ?? 0, i = Math.max(0, e - t.length), r = t.find((a) => a.entityId === this.config?.focus_entity) ?? t[0];
    if (!r)
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
    const s = t.filter((a) => a.isAvailable).length, n = t.map((a) => a.confidence).filter((a) => a !== void 0), o = n.length > 0 ? Math.round(
      n.reduce((a, h) => a + h, 0) / n.length * 100
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
            <span class="chip">${s}/${e} active</span>
          </div>

          ${i > 0 ? d`<p class="notice">${i} configured ${i === 1 ? "entity is" : "entities are"} currently unavailable.</p>` : ""}

          <div class="layout">
            <section class="focus panel">
              <div class="focusTop">
                <div class="focusCopy">
                  <div class="eyebrow">${r.subjectTypeLabel}</div>
                  <h3>${r.name}</h3>
                  <p>${je(r)}</p>
                </div>
                <li-confidence-chip .confidence=${r.confidence}></li-confidence-chip>
              </div>

              <div class="focusBody">
                <li-direction-ring
                  .bearing=${r.bearingDeg}
                  .confidence=${r.confidence}
                ></li-direction-ring>

                <div class="focusStats">
                  <div>
                    <span>Direction</span>
                    <strong>${F(r)}</strong>
                  </div>
                  <div>
                    <span>Distance</span>
                    <strong>${P(r.distanceM)}</strong>
                  </div>
                  <div>
                    <span>Place</span>
                    <strong>${r.likelyLocation ?? r.referencePlaceName ?? "Unknown"}</strong>
                  </div>
                  <div>
                    <span>Updated</span>
                    <strong>${K(r.lastReported)}</strong>
                  </div>
                  <div>
                    <span>Accuracy</span>
                    <strong>${Ne(r.accuracyM)}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>${r.stateLabel}</strong>
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
                  <strong>${s}</strong>
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
                  <article class="row ${a.entityId === r.entityId ? "rowFocus" : ""}">
                    <div class="identity">
                      <strong>${a.name}</strong>
                      <span>${a.subjectTypeLabel}</span>
                    </div>
                    <div class="summary">
                      <span>${a.likelyLocation ?? a.referencePlaceName ?? "Location unknown"}</span>
                      <span>${P(a.distanceM)}</span>
                      <span>${F(a)}</span>
                    </div>
                    <div class="meta">
                      <li-confidence-chip .confidence=${a.confidence}></li-confidence-chip>
                      <span class="stamp">${K(a.lastReported)}</span>
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
    const s = (t.distanceM !== void 0 ? Math.min(t.distanceM / i, 1) : 0.12 + e * 0.08) * 42, o = ((t.bearingDeg ?? e * 57) - 90) * Math.PI / 180, l = 50 + Math.cos(o) * s, c = 50 + Math.sin(o) * s, a = t.isAvailable ? 1 : 0.5;
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
R.styles = [
  O,
  w`
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
        background: var(--li-surface);
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
          radial-gradient(circle at center, var(--li-surface-strong) 0 18%, transparent 19%),
          linear-gradient(180deg, var(--li-surface), color-mix(in srgb, var(--li-surface) 72%, transparent));
        border: 1px solid var(--li-border);
        overflow: hidden;
      }

      .ring,
      .axis {
        position: absolute;
      }

      .ring {
        border-radius: 50%;
        border: 1px dashed var(--li-dashed-border);
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
        background: var(--li-axis);
      }

      .axisHorizontal {
        left: 8%;
        right: 8%;
        top: calc(50% - 0.5px);
        height: 1px;
        background: var(--li-axis);
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
        border: 2px solid var(--li-point-border);
        box-shadow: var(--li-shadow-strong);
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
        background: var(--li-surface-strong);
        border-color: color-mix(in srgb, var(--li-accent-soft) 26%, transparent);
      }

      .summary {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .summary span {
        padding: 0.28rem 0.55rem;
        border-radius: 999px;
        background: var(--li-surface);
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
], R.prototype, "hass", 2);
pe([
  g({ attribute: !1 })
], R.prototype, "config", 2);
R = pe([
  L("location-intelligence-dashboard-card")
], R);
var Et = Object.defineProperty, St = Object.getOwnPropertyDescriptor, ue = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? St(e, i) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (s = (r ? o(e, i, s) : o(s)) || s);
  return r && s && Et(e, i, s), s;
};
let H = class extends m {
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
      (this.config?.entities ?? []).map((r) => this.hass?.states[r]).filter((r) => !!r).map(ce)
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
      (r) => d`
                    <div class="row panel">
                      <div class="identity">
                        <strong>${r.name}</strong>
                        <span>${r.subjectTypeLabel}</span>
                      </div>

                      <div class="summary">
                        <span>${P(r.distanceM)}</span>
                        <span>${F(r)}</span>
                        <span>${r.likelyLocation ?? r.referencePlaceName ?? "Location unknown"}</span>
                      </div>

                      <div class="meta">
                        <li-confidence-chip .confidence=${r.confidence}></li-confidence-chip>
                        <span class="stamp">${K(r.lastReported)}</span>
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
H.styles = [
  O,
  w`
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
        background: var(--li-surface);
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
], H.prototype, "hass", 2);
ue([
  g({ attribute: !1 })
], H.prototype, "config", 2);
H = ue([
  L("location-intelligence-subject-list-card")
], H);
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
