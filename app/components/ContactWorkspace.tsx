"use client";

import { FormEvent, useMemo, useState } from "react";

const emptyForm = { name: "", email: "", subject: "", message: "" };

export default function ContactWorkspace() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "error" | "ready">("idle");

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(form.subject || `Portfolio message from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    return `mailto:nguyendragon2000@gmail.com?subject=${subject}&body=${body}`;
  }, [form]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = form.name.trim() && /^\S+@\S+\.\S+$/.test(form.email) && form.message.trim();
    setStatus(valid ? "ready" : "error");
  };

  return (
    <div className="contact-workspace">
      <aside className="contact-sidebar">
        <p># contacts</p>
        <a href="mailto:nguyendragon2000@gmail.com">✉ nguyendragon2000@gmail.com</a>
        <a href="tel:+84939205421">⌕ +84 939 205 421</a>
        <p># find-me-also-in</p>
        <a href="https://github.com/ThaiNguyen2k" target="_blank" rel="noreferrer">↗ GitHub</a>
      </aside>

      <form className="contact-form-panel" onSubmit={submit} noValidate>
        <label>_name:<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Nguyen Van A" /></label>
        <label>_email:<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label>
        <label>_subject:<input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="Frontend opportunity" /></label>
        <label>_message:<textarea rows={6} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell me about the product, team, or challenge..." /></label>
        <button className="button button-primary" type="submit">prepare-message <span aria-hidden="true">→</span></button>
        {status === "error" && <p className="form-status error">Please add your name, a valid email, and a message.</p>}
        {status === "ready" && <p className="form-status success">Message ready. <a href={mailto}>Open your email app ↗</a></p>}
      </form>

      <div className="contact-preview" aria-live="polite">
        <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>message.preview.js</span><span>{status}</span></div>
        <div className="contact-code">
          <p><b>01</b> <em>const</em> message = &#123;</p>
          <p><b>02</b> &nbsp;name: <strong>&quot;{form.name || "your name"}&quot;</strong>,</p>
          <p><b>03</b> &nbsp;email: <strong>&quot;{form.email || "you@example.com"}&quot;</strong>,</p>
          <p><b>04</b> &nbsp;subject: <strong>&quot;{form.subject || "let's build"}&quot;</strong>,</p>
          <p><b>05</b> &nbsp;message: <strong>&quot;{form.message ? `${form.message.slice(0, 34)}${form.message.length > 34 ? "…" : ""}` : "your message"}&quot;</strong>,</p>
          <p><b>06</b> &nbsp;ready: <span>{status === "ready" ? "true" : "false"}</span></p>
          <p><b>07</b> &#125;;</p>
        </div>
        <div className="terminal-status"><span>● online</span><span>Response time: &lt; 24h</span></div>
      </div>
    </div>
  );
}
