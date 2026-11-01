/**
 * Share link for WhatsApp, which is how parents and teachers in Arab countries
 * pass worksheets on (class and family groups). A plain wa.me link: no script,
 * no tracking, works on phones (opens the app) and desktop (WhatsApp Web).
 */
export function ShareWhatsApp({ url, text, locale }: { url: string; text: string; locale: string }) {
  const isAr = locale === "ar";
  const href = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-[#25D366]"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-[#1FA855]">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
      </svg>
      {isAr ? "شارك عبر واتساب" : "Share on WhatsApp"}
    </a>
  );
}
