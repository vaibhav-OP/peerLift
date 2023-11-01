"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function Avatar({
  alt,
  src,
  width,
  height,
  className,
}: {
  alt: string;
  className: string;
  src?: string | StaticImport;
  height: number | `${number}`;
  width: number | `${number}`;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <>
      {!failed && src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={clsx(className, "bg-secondary")} />
      )}
    </>
  );
}
