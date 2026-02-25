import { useEffect, useRef } from "react";
import { useNonceContext } from "@innbell/contexts/nonce";

export function GTM(props: { gtmTrackingId: string | undefined }) {
  const scriptNodeRef = useRef<HTMLScriptElement>();
  const nonce = useNonceContext();
  const { gtmTrackingId } = props;

  useEffect(() => {
    if (!gtmTrackingId?.length || scriptNodeRef.current) {
      return;
    }

    const gtmScript = document.createElement("script");
    gtmScript.id = "google-tag-manager";
    gtmScript.type = "text/javascript";
    gtmScript.innerHTML = `
        (function(w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
              event: 'gtm.js',
              'gtm.start': new Date().getTime(),
          }, {
              event: 'page_view',
              eventModel: { page_location: "${window.location.href}", },
          });

          var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
          j.async = true;          
          j.src =
              'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', '${gtmTrackingId}');`;

    document.head.append(gtmScript);
    scriptNodeRef.current = gtmScript;
  }, [gtmTrackingId]);

  return gtmTrackingId ? (
    <>
      {/* GOOGLE TAG MANAGER NOSCRIPT */}
      <noscript>
        <iframe
          nonce={nonce}
          src={`https://www.googletagmanager.com/ns.html?id=${gtmTrackingId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          suppressHydrationWarning
        />
      </noscript>
    </>
  ) : null;
}
