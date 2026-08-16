"use client";

import { useState } from "react";
import { Send, CheckCircle, HelpCircle, MessageSquare } from "lucide-react";

export function ContactForm({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const topics = [
    { id: "general", en: "General Inquiry", ar: "استفسار عام" },
    { id: "feedback", en: "Feedback & Suggestions", ar: "ملاحظات واقتراحات" },
    { id: "bug", en: "Technical Issue / Bug", ar: "مشكلة تقنية أو خطأ" },
    { id: "education", en: "Classroom / Educational Use", ar: "استخدام تعليمي أو مدرسي" },
    { id: "privacy", en: "Privacy / Legal Question", ar: "خصوصية أو شؤون قانونية" },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Prepares mailto with prefilled content as standard client-side fallback
    const subject = encodeURIComponent(`[ArabFingers ${topic.toUpperCase()}] from ${name || "Visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`);
    window.location.href = `mailto:ibhartech39@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card-stock card-stock-qalam p-8 text-center space-y-4">
        <CheckCircle className="h-12 w-12 text-qalam mx-auto" />
        <h3 className="text-2xl font-extrabold text-ink font-display">
          {isAr ? "شكراً لتواصلك معنا!" : "Thank you for reaching out!"}
        </h3>
        <p className="text-sm font-semibold text-ink/75 max-w-md mx-auto leading-relaxed">
          {isAr
            ? "تم فتح برنامج بريدك الإلكتروني لإرسال الرسالة. سأقوم بمراجعتها والرد عليك في أقرب وقت (عادة خلال ٤٨ ساعة)."
            : "Your email client was opened to dispatch the message. I will review and reply personally as soon as possible (usually within 48 hours)."}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="btn-chunky-ghost text-sm mt-3"
        >
          {isAr ? "إرسال رسالة أخرى" : "Send another message"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-stock p-6 sm:p-8 space-y-5">
      <div className="flex items-center gap-2 text-ink font-display text-lg font-extrabold pb-2 border-b-2 border-ink/10">
        <MessageSquare className="h-5 w-5 text-qalam" />
        <span>{isAr ? "نموذج المراسلة المباشرة" : "Direct Message Form"}</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/70">
            {isAr ? "الاسم أو اللقب" : "Your Name"}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isAr ? "مثال: سارة أحمد" : "e.g. Sarah Jenkins"}
            className="w-full rounded-xl border-2 border-ink bg-card px-3.5 py-2.5 text-sm font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-qalam"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/70">
            {isAr ? "بريدك الإلكتروني" : "Your Email"}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isAr ? "name@example.com" : "name@example.com"}
            className="w-full rounded-xl border-2 border-ink bg-card px-3.5 py-2.5 text-sm font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-qalam"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/70">
          {isAr ? "موضوع الرسالة" : "Topic of Inquiry"}
        </label>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full rounded-xl border-2 border-ink bg-card px-3.5 py-2.5 text-sm font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-qalam"
        >
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {isAr ? t.ar : t.en}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-ink/70">
          {isAr ? "نص الرسالة أو الاقتراح" : "Your Message"}
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isAr
              ? "اكتب استفسارك أو ملاحظتك بالتفصيل..."
              : "Share your questions, classroom experiences, or suggestions..."
          }
          className="w-full rounded-xl border-2 border-ink bg-card px-3.5 py-2.5 text-sm font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-qalam"
        />
      </div>

      <button type="submit" className="btn-chunky w-full sm:w-auto">
        <Send className="h-4 w-4" />
        <span>{isAr ? "إرسال الرسالة عبر البريد" : "Send via Email"}</span>
      </button>

      <p className="text-xs text-ink/50 flex items-center gap-1.5 pt-1">
        <HelpCircle className="h-3.5 w-3.5 shrink-0" />
        <span>
          {isAr
            ? "يتم فتح تطبيق البريد لإرسال رسالتك مباشرة دون تخزينها في وسيط."
            : "Opens your preferred email client directly to dispatch securely."}
        </span>
      </p>
    </form>
  );
}
