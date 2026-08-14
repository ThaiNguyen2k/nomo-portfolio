"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const emptyForm = { name: "", email: "", subject: "", message: "" };
const formEndpoint = "https://formsubmit.co/nguyendragon2000@gmail.com";

export default function ContactWorkspace() {
  const [form, setForm] = useState(emptyForm);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "verifying" | "success" | "failed">("idle");
  const [verificationOpen, setVerificationOpen] = useState(false);
  const submissionStarted = useRef(false);
  const verificationFrame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("contact") !== "sent") return;

    window.history.replaceState({}, "", `${url.pathname}#contact`);
    const showSuccess = window.setTimeout(() => setStatus("success"), 0);
    return () => window.clearTimeout(showSuccess);
  }, []);

  useEffect(() => {
    if (status !== "success" && status !== "error" && status !== "failed") return;
    const dismissToast = window.setTimeout(() => setStatus("idle"), 4500);
    return () => window.clearTimeout(dismissToast);
  }, [status]);

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

    submissionStarted.current = true;
    setVerificationOpen(true);
    setStatus("verifying");
  };

  const completeVerification = () => {
    if (!submissionStarted.current || !verificationFrame.current) return;

    try {
      const frameUrl = new URL(verificationFrame.current.contentWindow?.location.href ?? "");
      if (frameUrl.origin !== window.location.origin || frameUrl.searchParams.get("contact") !== "sent") return;

      submissionStarted.current = false;
      setVerificationOpen(false);
      setStatus("success");
      setForm(emptyForm);
      verificationFrame.current.src = "about:blank";
    } catch {
      // The cross-origin FormSubmit CAPTCHA is expected while verification is active.
    }
  };

  const cancelVerification = () => {
    submissionStarted.current = false;
    setVerificationOpen(false);
    setStatus("idle");
    if (verificationFrame.current) verificationFrame.current.src = "about:blank";
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

      <form className="contact-form-panel" action={formEndpoint} method="POST" target="contact-verification-frame" onSubmit={submit} noValidate>
        <input type="hidden" name="_subject" value={`[Nomo Portfolio] ${form.subject.trim() || "New message"}`} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://thainguyen2k.github.io/nomo-portfolio/?contact=sent#contact" />
        <input type="hidden" name="_url" value="https://thainguyen2k.github.io/nomo-portfolio/#contact" />
        <label className="form-honeypot" aria-hidden="true">website:<input name="_honey" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></label>
        <label>_name:<input name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Nguyen Van A" /></label>
        <label>_email:<input name="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label>
        <label>_subject:<input name="subject" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="Frontend opportunity" /></label>
        <label>_message:<textarea name="message" rows={6} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell me about the product, team, or challenge..." /></label>
        <button className="button button-primary" type="submit" disabled={status === "verifying"}>{status === "verifying" ? "complete-verification..." : "send-message"} <span aria-hidden="true">→</span></button>
        <div className={`form-verification ${verificationOpen ? "is-open" : ""}`} aria-hidden={!verificationOpen}>
          <div><span>human-verification</span><button type="button" onClick={cancelVerification} aria-label="Cancel verification">×</button></div>
          <iframe ref={verificationFrame} name="contact-verification-frame" title="Complete the contact form CAPTCHA" onLoad={completeVerification} />
        </div>
      </form>

      {(status === "error" || status === "success" || status === "failed") && (
        <div className={`form-toast ${status}`} role={status === "success" ? "status" : "alert"} aria-live="polite">
          <span aria-hidden="true">{status === "success" ? "✓" : "!"}</span>
          <p>
            {status === "error" && "Please add your name, a valid email, and a message."}
            {status === "success" && "Message sent successfully. Thank you!"}
            {status === "failed" && <>Could not send. Email me at <a href="mailto:nguyendragon2000@gmail.com">nguyendragon2000@gmail.com</a>.</>}
          </p>
          <button type="button" onClick={() => setStatus("idle")} aria-label="Close notification">×</button>
        </div>
      )}

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
