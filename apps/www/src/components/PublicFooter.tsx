import { ButtonLink } from "@innbell/components/Button.tsx";
import { Icon, IconName } from "@innbell/components/Icon.tsx";
import { Link, NavLink } from "@innbell/router";
import { WwwRoute } from "@innbell/router/routes";

export function PublicFooter() {
  return (
    <footer
      id="contact"
      className="relative w-full bg-slate-950 pt-20 text-slate-100"
    >
      <div className="mx-auto flex max-w-screen-lg flex-wrap items-end justify-between gap-12 px-8">
        <div className="flex flex-col gap-2">
          <Link to="/">
            <img
              src="/images/MarketingLogo.png"
              alt="InnBell"
              width={140}
              height={140}
            />
          </Link>
          <strong className="text-lg text-accent-accent2">
            Affinity Hospitality Solutions LLP
          </strong>

          <p className="flex gap-4 text-foreground">
            <ButtonLink
              to={"https://linkedin.com/company/innbell"}
              target="_blank"
              rel="noreferrer"
              size={"icon"}
              variant={"outline"}
              aria-label="LinkedIn"
            >
              <Icon name={IconName.LINKEDIN} />
            </ButtonLink>
            <ButtonLink
              to={"https://www.facebook.com/profile.php?id=61556671424730"}
              target="_blank"
              rel="noreferrer"
              size={"icon"}
              variant={"outline"}
              aria-label="Facebook"
            >
              <Icon name={IconName.FACEBOOK} />
            </ButtonLink>
            <ButtonLink
              to={"https://www.instagram.com/innbell.social/"}
              target="_blank"
              rel="noreferrer"
              size={"icon"}
              variant={"outline"}
              aria-label="Instagram"
            >
              <Icon name={IconName.INSTAGRAM} />
            </ButtonLink>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <strong className="text-lg">Contact us</strong>

          <a
            href="mailto:contact@innbell.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 opacity-75 hover:opacity-100"
            aria-label="Email"
          >
            <Icon name={IconName.MAILS} />
            contact@innbell.com
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

      <div className="mt-20 flex flex-col items-center gap-1 bg-slate-950 px-4 py-8 text-sm opacity-70">
        <p>© 2024 Affinity Hospitality Solutions LLP</p>
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
          <NavLink to={WwwRoute.PRIVACY_POLICY}>Privacy Policy</NavLink>
          <span>•</span>
          <NavLink to={WwwRoute.REFUND_POLICY}>Refund Policy</NavLink>
          <span>•</span>
          <span>GST No. 07ACAFA2461P1ZA</span>
        </div>
      </div>
    </footer>
  );
}
