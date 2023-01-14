// ImageWithFallback.tsx
import React, { ImgHTMLAttributes, useState } from "react";

interface Props extends ImgHTMLAttributes<any> {
  fallback: string;
}

export default function ImageWithFallback({ fallback, src, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const onError = () => setImgSrc(fallback);

  return <img alt="" onError={onError} src={imgSrc ?? fallback} {...props} />;
}