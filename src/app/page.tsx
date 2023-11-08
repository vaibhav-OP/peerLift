import dynamic from "next/dynamic";
import { Suspense } from "react";
const Test = dynamic(() => import("./test"));

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>loading</div>}>
        <Test />
      </Suspense>
    </>
  );
}
