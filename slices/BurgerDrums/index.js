import React from "react";
import dynamic from "next/dynamic";

const Drums = dynamic(() => import("./Drums"), {
  ssr: false,
});

export default function Index() {
  return (
    <div>
      <Drums />
    </div>
  );
}
