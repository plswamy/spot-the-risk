(function (e) {
    "use strict";

    function n(t) {
        var n = t.data;
        if (!t.isDefaultPrevented()) {
            t.preventDefault();
            e(this).ajaxSubmit(n)
        }
    }

    function r(t) {
        var n = t.target;
        var r = e(n);
        if (!r.is(":submit,input:image")) {
            var i = r.closest(":submit");
            if (i.length === 0) {
                return
            }
            n = i[0]
        }
        var s = this;
        s.clk = n;
        if (n.type == "image") {
            if (t.offsetX !== undefined) {
                s.clk_x = t.offsetX;
                s.clk_y = t.offsetY
            } else if (typeof e.fn.offset == "function") {
                var o = r.offset();
                s.clk_x = t.pageX - o.left;
                s.clk_y = t.pageY - o.top
            } else {
                s.clk_x = t.pageX - n.offsetLeft;
                s.clk_y = t.pageY - n.offsetTop
            }
        }
        setTimeout(function () {
            s.clk = s.clk_x = s.clk_y = null
        }, 100)
    }

    function i() {
        if (!e.fn.ajaxSubmit.debug) return;
        var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
        if (window.console && window.console.log) {
            window.console.log(t)
        } else if (window.opera && window.opera.postError) {
            window.opera.postError(t)
        }
    }

    var t = {};
    t.fileapi = e("<input type='file'/>").get(0).files !== undefined;
    t.formdata = window.FormData !== undefined;
    e.fn.ajaxSubmit = function (n) {
        function x(t) {
            var n = e.param(t).split("&");
            var r = n.length;
            var i = {};
            var s, o;
            for (s = 0; s < r; s++) {
                o = n[s].split("=");
                i[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
            }
            return i
        }

        function T(t) {
            var r = new FormData;
            for (var i = 0; i < t.length; i++) {
                r.append(t[i].name, t[i].value)
            }
            if (n.extraData) {
                var s = x(n.extraData);
                for (var o in s) if (s.hasOwnProperty(o)) r.append(o, s[o])
            }
            n.data = null;
            var u = e.extend(true, {}, e.ajaxSettings, n, {
                contentType: false,
                processData: false,
                cache: false,
                type: "POST"
            });
            if (n.uploadProgress) {
                u.xhr = function () {
                    var e = jQuery.ajaxSettings.xhr();
                    if (e.upload) {
                        e.upload.onprogress = function (e) {
                            var t = 0;
                            var r = e.loaded || e.position;
                            var i = e.total;
                            if (e.lengthComputable) {
                                t = Math.ceil(r / i * 100)
                            }
                            n.uploadProgress(e, r, i, t)
                        }
                    }
                    return e
                }
            }
            u.data = null;
            var a = u.beforeSend;
            u.beforeSend = function (e, t) {
                t.data = r;
                if (a) a.call(this, e, t)
            };
            e.ajax(u)
        }

        function N(t) {
            function x(e) {
                var t = e.contentWindow ? e.contentWindow.document : e.contentDocument ? e.contentDocument : e.document;
                return t
            }

            function C() {
                function o() {
                    try {
                        var e = x(d).readyState;
                        i("state = " + e);
                        if (e && e.toLowerCase() == "uninitialized") setTimeout(o, 50)
                    } catch (t) {
                        i("Server abort: ", t, " (", t.name, ")");
                        M(S);
                        if (b) clearTimeout(b);
                        b = undefined
                    }
                }

                var t = u.attr("target"), n = u.attr("action");
                s.setAttribute("target", h);
                if (!r) {
                    s.setAttribute("method", "POST")
                }
                if (n != f.url) {
                    s.setAttribute("action", f.url)
                }
                if (!f.skipEncodingOverride && (!r || /post/i.test(r))) {
                    u.attr({encoding: "multipart/form-data", enctype: "multipart/form-data"})
                }
                if (f.timeout) {
                    b = setTimeout(function () {
                        y = true;
                        M(E)
                    }, f.timeout)
                }
                var a = [];
                try {
                    if (f.extraData) {
                        for (var l in f.extraData) {
                            if (f.extraData.hasOwnProperty(l)) {
                                if (e.isPlainObject(f.extraData[l]) && f.extraData[l].hasOwnProperty("name") && f.extraData[l].hasOwnProperty("value")) {
                                    a.push(e('<input type="hidden" name="' + f.extraData[l].name + '">').attr("value", f.extraData[l].value).appendTo(s)[0])
                                } else {
                                    a.push(e('<input type="hidden" name="' + l + '">').attr("value", f.extraData[l]).appendTo(s)[0])
                                }
                            }
                        }
                    }
                    if (!f.iframeTarget) {
                        p.appendTo("body");
                        if (d.attachEvent) d.attachEvent("onload", M); else d.addEventListener("load", M, false)
                    }
                    setTimeout(o, 15);
                    s.submit()
                } finally {
                    s.setAttribute("action", n);
                    if (t) {
                        s.setAttribute("target", t)
                    } else {
                        u.removeAttr("target")
                    }
                    e(a).remove()
                }
            }

            function M(t) {
                if (v.aborted || O) {
                    return
                }
                try {
                    L = x(d)
                } catch (n) {
                    i("cannot access response document: ", n);
                    t = S
                }
                if (t === E && v) {
                    v.abort("timeout");
                    return
                } else if (t == S && v) {
                    v.abort("server abort");
                    return
                }
                if (!L || L.location.href == f.iframeSrc) {
                    if (!y) return
                }
                if (d.detachEvent) d.detachEvent("onload", M); else d.removeEventListener("load", M, false);
                var r = "success", s;
                try {
                    if (y) {
                        throw"timeout"
                    }
                    var o = f.dataType == "xml" || L.XMLDocument || e.isXMLDoc(L);
                    i("isXml=" + o);
                    if (!o && window.opera && (L.body === null || !L.body.innerHTML)) {
                        if (--A) {
                            i("requeing onLoad callback, DOM not available");
                            setTimeout(M, 250);
                            return
                        }
                    }
                    var u = L.body ? L.body : L.documentElement;
                    v.responseText = u ? u.innerHTML : null;
                    v.responseXML = L.XMLDocument ? L.XMLDocument : L;
                    if (o) f.dataType = "xml";
                    v.getResponseHeader = function (e) {
                        var t = {"content-type": f.dataType};
                        return t[e]
                    };
                    if (u) {
                        v.status = Number(u.getAttribute("status")) || v.status;
                        v.statusText = u.getAttribute("statusText") || v.statusText
                    }
                    var a = (f.dataType || "").toLowerCase();
                    var l = /(json|script|text)/.test(a);
                    if (l || f.textarea) {
                        var h = L.getElementsByTagName("textarea")[0];
                        if (h) {
                            v.responseText = h.value;
                            v.status = Number(h.getAttribute("status")) || v.status;
                            v.statusText = h.getAttribute("statusText") || v.statusText
                        } else if (l) {
                            var m = L.getElementsByTagName("pre")[0];
                            var g = L.getElementsByTagName("body")[0];
                            if (m) {
                                v.responseText = m.textContent ? m.textContent : m.innerText
                            } else if (g) {
                                v.responseText = g.textContent ? g.textContent : g.innerText
                            }
                        }
                    } else if (a == "xml" && !v.responseXML && v.responseText) {
                        v.responseXML = _(v.responseText)
                    }
                    try {
                        k = P(v, a, f)
                    } catch (t) {
                        r = "parsererror";
                        v.error = s = t || r
                    }
                } catch (t) {
                    i("error caught: ", t);
                    r = "error";
                    v.error = s = t || r
                }
                if (v.aborted) {
                    i("upload aborted");
                    r = null
                }
                if (v.status) {
                    r = v.status >= 200 && v.status < 300 || v.status === 304 ? "success" : "error"
                }
                if (r === "success") {
                    if (f.success) f.success.call(f.context, k, "success", v);
                    if (c) e.event.trigger("ajaxSuccess", [v, f])
                } else if (r) {
                    if (s === undefined) s = v.statusText;
                    if (f.error) f.error.call(f.context, v, r, s);
                    if (c) e.event.trigger("ajaxError", [v, f, s])
                }
                if (c) e.event.trigger("ajaxComplete", [v, f]);
                if (c && !--e.active) {
                    e.event.trigger("ajaxStop")
                }
                if (f.complete) f.complete.call(f.context, v, r);
                O = true;
                if (f.timeout) clearTimeout(b);
                setTimeout(function () {
                    if (!f.iframeTarget) p.remove();
                    v.responseXML = null
                }, 100)
            }

            var s = u[0], o, a, f, c, h, p, d, v, m, g, y, b;
            var w = !!e.fn.prop;
            if (e(":input[name=submit],:input[id=submit]", s).length) {
                alert('Error: Form elements must not have name or id of "submit".');
                return
            }
            if (t) {
                for (a = 0; a < l.length; a++) {
                    o = e(l[a]);
                    if (w) o.prop("disabled", false); else o.removeAttr("disabled")
                }
            }
            f = e.extend(true, {}, e.ajaxSettings, n);
            f.context = f.context || f;
            h = "jqFormIO" + (new Date).getTime();
            if (f.iframeTarget) {
                p = e(f.iframeTarget);
                g = p.attr("name");
                if (!g) p.attr("name", h); else h = g
            } else {
                p = e('<iframe name="' + h + '" src="' + f.iframeSrc + '" />');
                p.css({position: "absolute", top: "-1000px", left: "-1000px"})
            }
            d = p[0];
            v = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function () {
                },
                getResponseHeader: function () {
                },
                setRequestHeader: function () {
                },
                abort: function (t) {
                    var n = t === "timeout" ? "timeout" : "aborted";
                    i("aborting upload... " + n);
                    this.aborted = 1;
                    if (d.contentWindow.document.execCommand) {
                        try {
                            d.contentWindow.document.execCommand("Stop")
                        } catch (r) {
                        }
                    }
                    p.attr("src", f.iframeSrc);
                    v.error = n;
                    if (f.error) f.error.call(f.context, v, n, t);
                    if (c) e.event.trigger("ajaxError", [v, f, n]);
                    if (f.complete) f.complete.call(f.context, v, n)
                }
            };
            c = f.global;
            if (c && 0 === e.active++) {
                e.event.trigger("ajaxStart")
            }
            if (c) {
                e.event.trigger("ajaxSend", [v, f])
            }
            if (f.beforeSend && f.beforeSend.call(f.context, v, f) === false) {
                if (f.global) {
                    e.active--
                }
                return
            }
            if (v.aborted) {
                return
            }
            m = s.clk;
            if (m) {
                g = m.name;
                if (g && !m.disabled) {
                    f.extraData = f.extraData || {};
                    f.extraData[g] = m.value;
                    if (m.type == "image") {
                        f.extraData[g + ".x"] = s.clk_x;
                        f.extraData[g + ".y"] = s.clk_y
                    }
                }
            }
            var E = 1;
            var S = 2;
            var T = e("meta[name=csrf-token]").attr("content");
            var N = e("meta[name=csrf-param]").attr("content");
            if (N && T) {
                f.extraData = f.extraData || {};
                f.extraData[N] = T
            }
            if (f.forceSync) {
                C()
            } else {
                setTimeout(C, 10)
            }
            var k, L, A = 50, O;
            var _ = e.parseXML || function (e, t) {
                if (window.ActiveXObject) {
                    t = new ActiveXObject("Microsoft.XMLDOM");
                    t.async = "false";
                    t.loadXML(e)
                } else {
                    t = (new DOMParser).parseFromString(e, "text/xml")
                }
                return t && t.documentElement && t.documentElement.nodeName != "parsererror" ? t : null
            };
            var D = e.parseJSON || function (e) {
                return window["eval"]("(" + e + ")")
            };
            var P = function (t, n, r) {
                var i = t.getResponseHeader("content-type") || "", s = n === "xml" || !n && i.indexOf("xml") >= 0,
                    o = s ? t.responseXML : t.responseText;
                if (s && o.documentElement.nodeName === "parsererror") {
                    if (e.error) e.error("parsererror")
                }
                if (r && r.dataFilter) {
                    o = r.dataFilter(o, n)
                }
                if (typeof o === "string") {
                    if (n === "json" || !n && i.indexOf("json") >= 0) {
                        o = D(o)
                    } else if (n === "script" || !n && i.indexOf("javascript") >= 0) {
                        e.globalEval(o)
                    }
                }
                return o
            }
        }

        if (!this.length) {
            i("ajaxSubmit: skipping submit process - no element selected");
            return this
        }
        var r, s, o, u = this;
        if (typeof n == "function") {
            n = {success: n}
        }
        r = this.attr("method");
        s = this.attr("action");
        o = typeof s === "string" ? e.trim(s) : "";
        o = o || window.location.href || "";
        if (o) {
            o = (o.match(/^([^#]+)/) || [])[1]
        }
        n = e.extend(true, {
            url: o,
            success: e.ajaxSettings.success,
            type: r || "GET",
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, n);
        var a = {};
        this.trigger("form-pre-serialize", [this, n, a]);
        if (a.veto) {
            i("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
            return this
        }
        if (n.beforeSerialize && n.beforeSerialize(this, n) === false) {
            i("ajaxSubmit: submit aborted via beforeSerialize callback");
            return this
        }
        var f = n.traditional;
        if (f === undefined) {
            f = e.ajaxSettings.traditional
        }
        var l = [];
        var c, h = this.formToArray(n.semantic, l);
        if (n.data) {
            n.extraData = n.data;
            c = e.param(n.data, f)
        }
        if (n.beforeSubmit && n.beforeSubmit(h, this, n) === false) {
            i("ajaxSubmit: submit aborted via beforeSubmit callback");
            return this
        }
        this.trigger("form-submit-validate", [h, this, n, a]);
        if (a.veto) {
            i("ajaxSubmit: submit vetoed via form-submit-validate trigger");
            return this
        }
        var p = e.param(h, f);
        if (c) {
            p = p ? p + "&" + c : c
        }
        if (n.type.toUpperCase() == "GET") {
            n.url += (n.url.indexOf("?") >= 0 ? "&" : "?") + p;
            n.data = null
        } else {
            n.data = p
        }
        var d = [];
        if (n.resetForm) {
            d.push(function () {
                u.resetForm()
            })
        }
        if (n.clearForm) {
            d.push(function () {
                u.clearForm(n.includeHidden)
            })
        }
        if (!n.dataType && n.target) {
            var v = n.success || function () {
            };
            d.push(function (t) {
                var r = n.replaceTarget ? "replaceWith" : "html";
                e(n.target)[r](t).each(v, arguments)
            })
        } else if (n.success) {
            d.push(n.success)
        }
        n.success = function (e, t, r) {
            var i = n.context || this;
            for (var s = 0, o = d.length; s < o; s++) {
                d[s].apply(i, [e, t, r || u, u])
            }
        };
        var m = e("input:file:enabled[value]", this);
        var g = m.length > 0;
        var y = "multipart/form-data";
        var b = u.attr("enctype") == y || u.attr("encoding") == y;
        var w = t.fileapi && t.formdata;
        i("fileAPI :" + w);
        var E = (g || b) && !w;
        if (n.iframe !== false && (n.iframe || E)) {
            if (n.closeKeepAlive) {
                e.get(n.closeKeepAlive, function () {
                    N(h)
                })
            } else {
                N(h)
            }
        } else if ((g || b) && w) {
            T(h)
        } else {
            e.ajax(n)
        }
        for (var S = 0; S < l.length; S++) l[S] = null;
        this.trigger("form-submit-notify", [this, n]);
        return this
    };
    e.fn.ajaxForm = function (t) {
        t = t || {};
        t.delegation = t.delegation && e.isFunction(e.fn.on);
        if (!t.delegation && this.length === 0) {
            var s = {s: this.selector, c: this.context};
            if (!e.isReady && s.s) {
                i("DOM not ready, queuing ajaxForm");
                e(function () {
                    e(s.s, s.c).ajaxForm(t)
                });
                return this
            }
            i("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)"));
            return this
        }
        if (t.delegation) {
            e(document).off("submit.form-plugin", this.selector, n).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, t, n).on("click.form-plugin", this.selector, t, r);
            return this
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin", t, n).bind("click.form-plugin", t, r)
    };
    e.fn.ajaxFormUnbind = function () {
        return this.unbind("submit.form-plugin click.form-plugin")
    };
    e.fn.formToArray = function (n, r) {
        var i = [];
        if (this.length === 0) {
            return i
        }
        var s = this[0];
        var o = n ? s.getElementsByTagName("*") : s.elements;
        if (!o) {
            return i
        }
        var u, a, f, l, c, h, p;
        for (u = 0, h = o.length; u < h; u++) {
            c = o[u];
            f = c.name;
            if (!f) {
                continue
            }
            if (n && s.clk && c.type == "image") {
                if (!c.disabled && s.clk == c) {
                    i.push({name: f, value: e(c).val(), type: c.type});
                    i.push({name: f + ".x", value: s.clk_x}, {name: f + ".y", value: s.clk_y})
                }
                continue
            }
            l = e.fieldValue(c, true);
            if (l && l.constructor == Array) {
                if (r) r.push(c);
                for (a = 0, p = l.length; a < p; a++) {
                    i.push({name: f, value: l[a]})
                }
            } else if (t.fileapi && c.type == "file" && !c.disabled) {
                if (r) r.push(c);
                var d = c.files;
                if (d.length) {
                    for (a = 0; a < d.length; a++) {
                        i.push({name: f, value: d[a], type: c.type})
                    }
                } else {
                    i.push({name: f, value: "", type: c.type})
                }
            } else if (l !== null && typeof l != "undefined") {
                if (r) r.push(c);
                i.push({name: f, value: l, type: c.type, required: c.required})
            }
        }
        if (!n && s.clk) {
            var v = e(s.clk), m = v[0];
            f = m.name;
            if (f && !m.disabled && m.type == "image") {
                i.push({name: f, value: v.val()});
                i.push({name: f + ".x", value: s.clk_x}, {name: f + ".y", value: s.clk_y})
            }
        }
        return i
    };
    e.fn.formSerialize = function (t) {
        return e.param(this.formToArray(t))
    };
    e.fn.fieldSerialize = function (t) {
        var n = [];
        this.each(function () {
            var r = this.name;
            if (!r) {
                return
            }
            var i = e.fieldValue(this, t);
            if (i && i.constructor == Array) {
                for (var s = 0, o = i.length; s < o; s++) {
                    n.push({name: r, value: i[s]})
                }
            } else if (i !== null && typeof i != "undefined") {
                n.push({name: this.name, value: i})
            }
        });
        return e.param(n)
    };
    e.fn.fieldValue = function (t) {
        for (var n = [], r = 0, i = this.length; r < i; r++) {
            var s = this[r];
            var o = e.fieldValue(s, t);
            if (o === null || typeof o == "undefined" || o.constructor == Array && !o.length) {
                continue
            }
            if (o.constructor == Array) e.merge(n, o); else n.push(o)
        }
        return n
    };
    e.fieldValue = function (t, n) {
        var r = t.name, i = t.type, s = t.tagName.toLowerCase();
        if (n === undefined) {
            n = true
        }
        if (n && (!r || t.disabled || i == "reset" || i == "button" || (i == "checkbox" || i == "radio") && !t.checked || (i == "submit" || i == "image") && t.form && t.form.clk != t || s == "select" && t.selectedIndex == -1)) {
            return null
        }
        if (s == "select") {
            var o = t.selectedIndex;
            if (o < 0) {
                return null
            }
            var u = [], a = t.options;
            var f = i == "select-one";
            var l = f ? o + 1 : a.length;
            for (var c = f ? o : 0; c < l; c++) {
                var h = a[c];
                if (h.selected) {
                    var p = h.value;
                    if (!p) {
                        p = h.attributes && h.attributes["value"] && !h.attributes["value"].specified ? h.text : h.value
                    }
                    if (f) {
                        return p
                    }
                    u.push(p)
                }
            }
            return u
        }
        return e(t).val()
    };
    e.fn.clearForm = function (t) {
        return this.each(function () {
            e("input,select,textarea", this).clearFields(t)
        })
    };
    e.fn.clearFields = e.fn.clearInputs = function (t) {
        var n = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
            var r = this.type, i = this.tagName.toLowerCase();
            if (n.test(r) || i == "textarea") {
                this.value = ""
            } else if (r == "checkbox" || r == "radio") {
                this.checked = false
            } else if (i == "select") {
                this.selectedIndex = -1
            } else if (t) {
                if (t === true && /hidden/.test(r) || typeof t == "string" && e(this).is(t)) this.value = ""
            }
        })
    };
    e.fn.resetForm = function () {
        return this.each(function () {
            if (typeof this.reset == "function" || typeof this.reset == "object" && !this.reset.nodeType) {
                this.reset()
            }
        })
    };
    e.fn.enable = function (e) {
        if (e === undefined) {
            e = true
        }
        return this.each(function () {
            this.disabled = !e
        })
    };
    e.fn.selected = function (t) {
        if (t === undefined) {
            t = true
        }
        return this.each(function () {
            var n = this.type;
            if (n == "checkbox" || n == "radio") {
                this.checked = t
            } else if (this.tagName.toLowerCase() == "option") {
                var r = e(this).parent("select");
                if (t && r[0] && r[0].type == "select-one") {
                    r.find("option").selected(false)
                }
                this.selected = t
            }
        })
    };
    e.fn.ajaxSubmit.debug = false
})(jQuery)