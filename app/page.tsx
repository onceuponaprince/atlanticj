"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";

import Image from "next/image";
import CountdownTimer from "@/components/organisms/CountdownTimer";

export default function Home() {
  return (
    <div className="font-primary">
      <h1>Hello World</h1>
      <CountdownTimer targetDate="2025-12-31" />
    </div>
  );
}
