"use client";
import clsx from "clsx";
import Image from "next/image";
import { useMemo, useState } from "react";

import Avatar1 from "@/../public/avatars/1.png";
import Avatar2 from "@/../public/avatars/2.png";
import Avatar3 from "@/../public/avatars/3.png";
import Avatar4 from "@/../public/avatars/4.png";
import Avatar5 from "@/../public/avatars/5.png";
import Avatar6 from "@/../public/avatars/6.png";
import Avatar7 from "@/../public/avatars/7.png";
import Avatar8 from "@/../public/avatars/8.png";
import Avatar9 from "@/../public/avatars/9.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const defaultImageSrc = (letter: string) => {
  if (letter > "a" && letter <= "c") return Avatar1;
  else if (letter > "c" && letter <= "e") return Avatar2;
  else if (letter > "e" && letter <= "g") return Avatar3;
  else if (letter > "g" && letter <= "j") return Avatar4;
  else if (letter > "j" && letter <= "m") return Avatar5;
  else if (letter > "m" && letter <= "p") return Avatar6;
  else if (letter > "p" && letter <= "s") return Avatar7;
  else if (letter > "s" && letter <= "v") return Avatar8;
  else return Avatar9;
};

export default function Avatar({
  alt,
  src,
  name,
  width,
  height,
  className,
}: {
  alt: string;
  name: string;
  className?: string;
  width: number | `${number}`;
  src?: string | StaticImport;
  height: number | `${number}`;
}) {
  const [failed, setFailed] = useState(false);
  const imageSrc = useMemo(
    () => (src ? src : defaultImageSrc(name.charAt(0).toLowerCase())),
    [src, name]
  );

  return (
    <>
      {!failed && imageSrc ? (
        <Image
          alt={alt}
          unoptimized
          width={width}
          src={imageSrc}
          height={height}
          className={clsx(className, "object-cover object-center")}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={clsx(className, "bg-secondary")} />
      )}
    </>
  );
}
