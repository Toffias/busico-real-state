import { BUSINESS } from '../../lib/business';

export function WhatsAppFloat() {
  return (
    <a
      href={BUSINESS.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="group fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-ink/80 text-gold-light shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-700 ease-(--ease-luxe) hover:scale-110 hover:border-gold"
    >
      <span className="absolute inset-0 animate-ping rounded-full border border-gold/30 [animation-duration:3s]" />
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5c0-5.19 4.23-9.42 9.43-9.42 2.52 0 4.88.98 6.66 2.76a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.42 9.42m8.02-17.44A11.27 11.27 0 0 0 12.05.75C5.8.75.72 5.83.72 12.08c0 2 .52 3.95 1.52 5.66L.62 23.25l5.63-1.48a11.3 11.3 0 0 0 5.8 1.48c6.25 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.87-3.32-8.01" />
      </svg>
    </a>
  );
}
