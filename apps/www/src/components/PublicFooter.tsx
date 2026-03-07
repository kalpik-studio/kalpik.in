import { ButtonLink } from "@innbell/components/Button.tsx";
import { Icon, IconName } from "@innbell/components/Icon.tsx";
import { Link } from "@innbell/router";

export function PublicFooter() {
  return (
    <footer
      id="contact"
      className="relative w-full bg-slate-950 pt-20 text-slate-100"
    >
      <div className="mx-auto flex max-w-screen-lg flex-wrap items-center justify-between gap-12 px-8">
        <div className="flex flex-col gap-2">
          <Link to="/">
            <img
              src="/images/kalpik-full-light.png"
              alt="Kalpik"
              width={140}
              height={140}
            />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <a
            href={"https://www.linkedin.com/company/kalpik-interiors/"}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex items-center gap-2 opacity-75 hover:opacity-100"
          >
            <Icon name={IconName.LINKEDIN} />
            Kalpik Interiors
          </a>

          <a
            href="mailto:info@kalpik.in"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 opacity-75 hover:opacity-100"
            aria-label="Email"
          >
            <Icon name={IconName.MAILS} />
            info@kalpik.in
          </a>

          <a
            href="tel:+911145672128"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 opacity-75 hover:opacity-100"
            aria-label="Phone"
          >
            <Icon name={IconName.PHONE} />
            +91 11 45672128
          </a>

          <a
            href="https://maps.app.goo.gl/aZs81UCA8LfhUcdb7"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 opacity-75 hover:opacity-100"
            aria-label="Address"
          >
            <Icon name={IconName.MAP_PINHEAD} />
            314 Ansal Majestic Tower, <br />
            Vikaspuri, Delhi - 110018, India
          </a>
        </div>
      </div>

      <div className="mt-20 flex items-center justify-center gap-1 bg-slate-950 px-4 py-8 text-sm opacity-70">
        <span>© 2000 Kalpik</span> |<span>GST No. </span>
      </div>
    </footer>
  );
}
