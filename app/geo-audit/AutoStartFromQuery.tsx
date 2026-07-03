"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export default function AutoStartFromQuery({ onUrl }: { onUrl: (url: string) => void }) {
  const searchParams = useSearchParams();
  const autoStarted = useRef(false);

  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam && !autoStarted.current) {
      autoStarted.current = true;
      onUrl(urlParam);
    }
  }, [searchParams, onUrl]);

  return null;
}
