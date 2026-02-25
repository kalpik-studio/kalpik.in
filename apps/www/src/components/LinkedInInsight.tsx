import { useEffect, useRef } from "react";
import { useNonceContext } from "@innbell/contexts/nonce";

export function LinkedInInsight({
  linkedinPartnerId,
}: {
  linkedinPartnerId: string | undefined;
}) {
  const scriptNodeRef = useRef<HTMLScriptElement>();
  const nonce = useNonceContext();

  useEffect(() => {
    if (!linkedinPartnerId?.length || scriptNodeRef.current) {
      return;
    }

    const linkedinScript = document.createElement("script");
    linkedinScript.id = "linkedin-insight-tag";
    linkedinScript.type = "text/javascript";
    linkedinScript.innerHTML = `
           _linkedin_partner_id = "${linkedinPartnerId}"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id); </script><script type="text/javascript"> (function(l) { if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]} var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})(window.lintrk);`;

    document.body.insertAdjacentElement("beforeend", linkedinScript);
    scriptNodeRef.current = linkedinScript;
  }, [linkedinPartnerId]);

  if (!linkedinPartnerId) {
    return null;
  }

  return (
    <noscript>
      <img
        nonce={nonce}
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://px.ads.linkedin.com/collect/?pid=${linkedinPartnerId}fmt=gif`}
      />
    </noscript>
  );
}
