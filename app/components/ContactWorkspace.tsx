"use client";

import { FormEvent, useRef, useState } from "react";

const emptyForm = { name: "", email: "", subject: "", message: "" };
const formEndpoint = "https://formsubmit.co/nguyendragon2000@gmail.com";

export default function ContactWorkspace() {
  const [form, setForm] = useState(emptyForm);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "sending" | "success" | "failed">("idle");
  const [submissionStarted, setSubmissionStarted] = useState(false);
  const submissionTimeout = useRef<number | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    const valid = form.name.trim() && /^\S+@\S+\.\S+$/.test(form.email) && form.message.trim();
    if (!valid) {
      event.preventDefault();
      setStatus("error");
      return;
    }

    if (website) {
      event.preventDefault();
      setStatus("success");
      return;
    }

    setStatus("sending");
    setSubmissionStarted(true);
    if (submissionTimeout.current) window.clearTimeout(submissionTimeout.current);
    submissionTimeout.current = window.setTimeout(() => {
      setStatus("failed");
      setSubmissionStarted(false);
    }, 15000);
  };

  const completeSubmission = () => {
    if (!submissionStarted) return;
    if (submissionTimeout.current) window.clearTimeout(submissionTimeout.current);
    submissionTimeout.current = null;
    setSubmissionStarted(false);
    setStatus("success");
    setForm(emptyForm);
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

      <form className="contact-form-panel" action={formEndpoint} method="POST" target="contact-submit-target" onSubmit={submit} noValidate>
        <input type="hidden" name="_subject" value={`[Nomo Portfolio] ${form.subject.trim() || "New message"}`} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://thainguyen2k.github.io/nomo-portfolio/#contact" />
        <input type="hidden" name="_url" value="https://thainguyen2k.github.io/nomo-portfolio/#contact" />
        <label className="form-honeypot" aria-hidden="true">website:<input name="_honey" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></label>
        <label>_name:<input name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Nguyen Van A" /></label>
        <label>_email:<input name="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label>
        <label>_subject:<input name="subject" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="Frontend opportunity" /></label>
        <label>_message:<textarea name="message" rows={6} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell me about the product, team, or challenge..." /></label>
        <button className="button button-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "sending..." : "send-message"} <span aria-hidden="true">→</span></button>
        {status === "error" && <p className="form-status error">Please add your name, a valid email, and a message.</p>}
        {status === "success" && <p className="form-status success">Message sent successfully. Thank you!</p>}
        {status === "failed" && <p className="form-status error">Could not send right now. Please email me directly at <a href="mailto:nguyendragon2000@gmail.com">nguyendragon2000@gmail.com</a>.</p>}
      </form>
      <iframe className="form-submit-target" name="contact-submit-target" title="Contact form response" onLoad={completeSubmission} />

      <div className="contact-preview" aria-live="polite">
        <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>message.preview.js</span><span>{status}</span></div>
        <div className="contact-code">
          <p><b>01</b> <em>const</em> message = &#123;</p>
          <p><b>02</b> &nbsp;name: <strong>&quot;{form.name || "your name"}&quot;</strong>,</p>
          <p><b>03</b> &nbsp;email: <strong>&quot;{form.email || "you@example.com"}&quot;</strong>,</p>
          <p><b>04</b> &nbsp;subject: <strong>&quot;{form.subject || "let's build"}&quot;</strong>,</p>
          <p><b>05</b> &nbsp;message: <strong>&quot;{form.message ? `${form.message.slice(0, 34)}${form.message.length > 34 ? "…" : ""}` : "your message"}&quot;</strong>,</p>
          <p><b>06</b> &nbsp;sent: <span>{status === "success" ? "true" : "false"}</span></p>
          <p><b>07</b> &#125;;</p>
        </div>
        <div className="terminal-status"><span>● online</span><span>Response time: &lt; 24h</span></div>
      </div>
    </div>
  );
}
