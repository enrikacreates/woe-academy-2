import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ShieldCheck, RefreshCw, ArrowLeft, Phone, Mail, MessageSquareText, LogOut, Bell, Lock } from "lucide-react";
import { Logo } from "@/components/Logo";

const API = `${import.meta.env.VITE_BACKEND_URL}/api`;

const AUDIENCE_LABEL = {
  family: { label: "Parent / Family", cls: "bg-sun/30 text-teal" },
  community: { label: "Community / HOA", cls: "bg-sky/30 text-teal-deep" },
  business: { label: "Business", cls: "bg-sage/40 text-teal-deep" },
};

const CONTACT_LABEL = {
  email: { label: "Prefers Email", icon: Mail, cls: "bg-sky/30 text-teal-deep" },
  text: { label: "Prefers Text", icon: MessageSquareText, cls: "bg-sun/40 text-teal-deep" },
  call: { label: "Prefers Call", icon: Phone, cls: "bg-coral/20 text-coral" },
};

const QUOTE_FIELDS = [
  ["Group size", "group_size"],
  ["Ages", "ages"],
  ["Location", "location_type"],
  ["Frequency", "frequency"],
  ["Timeline", "timeline"],
  ["Budget", "budget"],
];

const formatError = (detail) => {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || "").filter(Boolean).join(" ");
  return String(detail);
};

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("woe_token") || "");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState(null);
  const [quotes, setQuotes] = useState(null);
  const [tab, setTab] = useState("meetings");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [newCount, setNewCount] = useState(0);

  const logout = () => {
    sessionStorage.removeItem("woe_token");
    setToken("");
    setUser(null);
    setRows(null);
    setQuotes(null);
  };

  const loadData = async (tok) => {
    const headers = { Authorization: `Bearer ${tok}` };
    const [inqRes, quoteRes] = await Promise.all([
      axios.get(`${API}/admin/inquiries`, { headers }),
      axios.get(`${API}/admin/quotes`, { headers }),
    ]);
    setRows(inqRes.data);
    setQuotes(quoteRes.data);
    const lastVisit = localStorage.getItem("woe_admin_last_visit");
    const all = [...inqRes.data, ...quoteRes.data];
    setNewCount(lastVisit ? all.filter((x) => x.created_at > lastVisit).length : all.length);
    localStorage.setItem("woe_admin_last_visit", new Date().toISOString());
  };

  useEffect(() => {
    if (!token) return;
    (async () => {
      setBusy(true);
      try {
        const meRes = await axios.get(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        setUser(meRes.data);
        await loadData(token);
      } catch {
        sessionStorage.removeItem("woe_token");
        setToken("");
      } finally {
        setBusy(false);
      }
    })();
  }, [token]);

  const login = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email: email.trim(), password });
      sessionStorage.setItem("woe_token", data.access_token);
      setUser(data.user);
      setToken(data.access_token);
    } catch (err) {
      setError(formatError(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream grain relative" data-testid="admin-page">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex items-center justify-between">
          <Logo />
          <a href="/" data-testid="admin-back-link" className="inline-flex items-center gap-1.5 text-sm font-bold text-teal hover:text-tang transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </a>
        </div>

        {!user ? (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mt-12 max-w-md mx-auto bg-white rounded-[28px] border border-teal/10 shadow-xl p-8 sm:p-10">
            <div className="w-14 h-14 rounded-2xl bg-teal flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7 text-sun" />
            </div>
            <h1 className="mt-5 font-display font-bold text-2xl text-teal text-center" data-testid="admin-login-title">Owner Login</h1>
            <p className="mt-2 text-sm text-ink/60 text-center">Log in to see your meeting &amp; quote requests.</p>
            <form onSubmit={login} className="mt-7 space-y-4" data-testid="admin-login-form">
              <div>
                <label htmlFor="ad-email" className="block text-xs font-bold uppercase tracking-wider text-ink/60 mb-1.5">Email</label>
                <input id="ad-email" type="email" required autoComplete="username" data-testid="admin-email-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="w-full rounded-xl border-2 border-teal/15 bg-cream/60 px-4 py-3 text-sm font-medium focus:outline-none focus:border-teal transition-colors" />
              </div>
              <div>
                <label htmlFor="ad-pass" className="block text-xs font-bold uppercase tracking-wider text-ink/60 mb-1.5">Password</label>
                <input id="ad-pass" type="password" required autoComplete="current-password" data-testid="admin-password-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border-2 border-teal/15 bg-cream/60 px-4 py-3 text-sm font-medium focus:outline-none focus:border-teal transition-colors" />
              </div>
              {error && <p role="alert" data-testid="admin-error-message" className="text-sm font-bold text-coral">{error}</p>}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={busy}
                data-testid="admin-login-btn"
                className="w-full bg-teal text-cream font-display font-semibold text-base py-3.5 rounded-full shadow-[0_4px_0_#07352D] hover:shadow-[0_2px_0_#07352D] hover:translate-y-[2px] transition-all duration-200 disabled:opacity-60"
              >
                {busy ? "Logging in…" : "Log In"}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mt-10 bg-white rounded-[28px] border border-teal/10 shadow-sm p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-teal" />
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-teal">Leads &amp; Requests</h1>
              {newCount > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-coral text-cream text-xs font-bold rounded-full px-3.5 py-1.5 animate-pulse" data-testid="admin-new-count">
                  <Bell className="w-3.5 h-3.5" /> {newCount} new since your last visit
                </span>
              )}
              <div className="ml-auto flex items-center gap-3">
                <span className="text-xs font-semibold text-ink/50" data-testid="admin-logged-in-as">{user.email}</span>
                <button onClick={logout} data-testid="admin-logout-btn" className="inline-flex items-center gap-1.5 text-sm font-bold text-coral hover:text-teal transition-colors">
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </div>
            </div>

            {rows === null ? (
              <p className="mt-8 text-sm text-ink/60 flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Loading your requests…</p>
            ) : (
              <div className="mt-8">
                <div className="flex flex-wrap items-center gap-2 mb-6" role="tablist">
                  <button
                    onClick={() => setTab("meetings")}
                    data-testid="admin-tab-meetings"
                    role="tab"
                    aria-selected={tab === "meetings"}
                    className={`font-display font-semibold text-sm px-5 py-2.5 rounded-full transition-colors duration-200 ${tab === "meetings" ? "bg-teal text-cream" : "bg-teal/10 text-teal hover:bg-teal/20"}`}
                  >
                    Meeting Requests ({rows.length})
                  </button>
                  <button
                    onClick={() => setTab("quotes")}
                    data-testid="admin-tab-quotes"
                    role="tab"
                    aria-selected={tab === "quotes"}
                    className={`font-display font-semibold text-sm px-5 py-2.5 rounded-full transition-colors duration-200 ${tab === "quotes" ? "bg-teal text-cream" : "bg-teal/10 text-teal hover:bg-teal/20"}`}
                  >
                    Quote Requests ({quotes.length})
                  </button>
                  <button
                    onClick={async () => { setBusy(true); await loadData(token); setBusy(false); }}
                    data-testid="admin-refresh-btn"
                    className="ml-auto inline-flex items-center gap-1.5 text-sm font-bold text-teal hover:text-tang transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 ${busy ? "animate-spin" : ""}`} /> Refresh
                  </button>
                </div>

                {tab === "meetings" && (
                  <div data-testid="admin-requests-list">
                    {rows.length === 0 ? (
                      <p className="text-sm text-ink/60 bg-cream/70 rounded-2xl px-5 py-6" data-testid="admin-empty-state">No meeting requests yet — share your page and they'll land here.</p>
                    ) : (
                      <div className="space-y-4">
                        {rows.map((r) => (
                          <div key={r.id} className="rounded-2xl border border-teal/10 bg-cream/50 p-5" data-testid={`admin-request-${r.id}`}>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="font-display font-semibold text-teal">{r.name}</span>
                              <span className={`text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1 ${AUDIENCE_LABEL[r.audience]?.cls || "bg-teal/10 text-teal"}`}>
                                {AUDIENCE_LABEL[r.audience]?.label || r.audience}
                              </span>
                              {r.interest && (
                                <span className="text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1 bg-coral/15 text-coral">{r.interest}</span>
                              )}
                              <span className="ml-auto text-xs text-ink/50">{new Date(r.created_at).toLocaleString()}</span>
                            </div>
                            <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink/70">
                              <a className="hover:text-teal font-medium" href={`mailto:${r.email}`}>{r.email}</a>
                              {r.phone && <a className="hover:text-teal font-medium" href={`tel:${r.phone}`}>{r.phone}</a>}
                              {r.preferred_date && <span className="font-medium">Prefers: {r.preferred_date}</span>}
                            </div>
                            {r.message && <p className="mt-2.5 text-sm text-ink/65 leading-relaxed whitespace-pre-wrap">{r.message}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {tab === "quotes" && (
                  <div data-testid="admin-quotes-list">
                    {quotes.length === 0 ? (
                      <p className="text-sm text-ink/60 bg-cream/70 rounded-2xl px-5 py-6" data-testid="admin-quotes-empty">No quote requests yet — they'll appear here when visitors complete the questionnaire.</p>
                    ) : (
                      <div className="space-y-4">
                        {quotes.map((q) => {
                          const contact = CONTACT_LABEL[q.contact_pref] || { label: q.contact_pref, icon: Mail, cls: "bg-teal/10 text-teal" };
                          return (
                            <div key={q.id} className="rounded-2xl border border-teal/10 bg-cream/50 p-5" data-testid={`admin-quote-${q.id}`}>
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="font-display font-semibold text-teal">{q.name}</span>
                                <span className="text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1 bg-teal text-cream">{q.program}</span>
                                <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1 ${contact.cls}`}>
                                  <contact.icon className="w-3 h-3" /> {contact.label}
                                </span>
                                <span className="ml-auto text-xs text-ink/50">{new Date(q.created_at).toLocaleString()}</span>
                              </div>
                              <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink/70">
                                <a className="hover:text-teal font-medium" href={`mailto:${q.email}`}>{q.email}</a>
                                {q.phone && <a className="hover:text-teal font-medium" href={`tel:${q.phone}`}>{q.phone}</a>}
                                {q.audience && <span className="font-medium">{AUDIENCE_LABEL[q.audience]?.label || q.audience}</span>}
                              </div>
                              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-1.5">
                                {QUOTE_FIELDS.filter(([, k]) => q[k]).map(([label, k]) => (
                                  <p key={k} className="text-xs text-ink/65"><span className="font-bold text-teal/70 uppercase tracking-wider text-[10px]">{label}: </span>{q[k]}</p>
                                ))}
                              </div>
                              {q.notes && <p className="mt-2.5 text-sm text-ink/65 leading-relaxed whitespace-pre-wrap">{q.notes}</p>}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
