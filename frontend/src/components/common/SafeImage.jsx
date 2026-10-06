import { useState } from "react";

const fallback = "/image-placeholder.svg";
function Image({ src, alt = "", onError, ...props }) {
  const [failed, setFailed] = useState(false);
  return <img {...props} src={failed || !src ? fallback : src} alt={alt}
    loading={props.loading || "lazy"} decoding="async"
    onError={(event) => { if (!failed) setFailed(true); onError?.(event); }} />;
}
export default function SafeImage(props) {
  return <Image key={props.src || "placeholder"} {...props} />;
}
