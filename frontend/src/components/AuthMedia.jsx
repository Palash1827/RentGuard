import { useEffect, useState } from "react";
import { api } from "../services/api";

/** Shows a protected image/video by fetching it with the auth header. */
function AuthMedia({ url, contentType, alt }) {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let objectUrl;
    let cancelled = false;
    api.fetchBlob(url)
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [url]);

  if (failed) return <span>⚠️</span>;
  if (!src) return <span className="media-loading">…</span>;
  if (contentType?.startsWith("video/")) return <video className="evidence-media" src={src} controls />;
  return <img className="evidence-media" src={src} alt={alt || "Evidence"} />;
}

export default AuthMedia;
