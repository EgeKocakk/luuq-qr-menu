"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Logo } from "@/components/Logo";
import { tr } from "@/i18n/tr";

const MENU_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function AdminQrPage() {
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);

  useEffect(() => {
    QRCode.toDataURL(MENU_URL, { width: 512, margin: 1, color: { dark: "#3B2A26", light: "#F5E9DC" } })
      .then(setPngDataUrl)
      .catch(() => setPngDataUrl(null));

    QRCode.toString(MENU_URL, { type: "svg", margin: 1, color: { dark: "#3B2A26", light: "#F5E9DC" } })
      .then(setSvgMarkup)
      .catch(() => setSvgMarkup(null));
  }, []);

  function downloadPng() {
    if (!pngDataUrl) return;
    const a = document.createElement("a");
    a.href = pngDataUrl;
    a.download = "luuq-menu-qr.png";
    a.click();
  }

  function downloadSvg() {
    if (!svgMarkup) return;
    const blob = new Blob([svgMarkup], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "luuq-menu-qr.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <div>
        <h1 className="font-serif text-2xl text-dark">{tr.admin.sidebar.qr}</h1>
        <p className="mt-1 text-sm text-muted">{MENU_URL}</p>
      </div>

      <div className="flex flex-wrap items-start gap-8">
        <div className="flex flex-col items-center gap-3 rounded-lg border border-gold/20 bg-white/40 p-6">
          {pngDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={pngDataUrl} alt={tr.admin.qr.altText} width={220} height={220} />
          ) : (
            <div className="h-[220px] w-[220px] animate-pulse rounded-md bg-cream-dark" />
          )}
          <div className="flex gap-2">
            <button
              onClick={downloadPng}
              disabled={!pngDataUrl}
              className="rounded-md bg-terra px-4 py-2 text-sm font-semibold text-cream disabled:opacity-50"
            >
              {tr.admin.qr.downloadPng}
            </button>
            <button
              onClick={downloadSvg}
              disabled={!svgMarkup}
              className="rounded-md border border-gold/40 px-4 py-2 text-sm font-semibold text-dark disabled:opacity-50"
            >
              {tr.admin.qr.downloadSvg}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-dark">{tr.admin.qr.printCardTitle}</p>
          <button
            onClick={() => window.print()}
            className="self-start rounded-md border border-gold/40 px-4 py-2 text-sm font-semibold text-dark"
          >
            {tr.admin.qr.print}
          </button>

          <div className="print-card flex w-[280px] flex-col items-center justify-center gap-6 rounded-lg bg-dark px-6 py-10 text-center text-cream">
            <Logo />
            <p className="font-serif text-lg italic">{tr.admin.qr.scanToView}</p>
            {pngDataUrl ? (
              <div className="rounded-md bg-cream p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pngDataUrl} alt={tr.admin.qr.altText} width={180} height={180} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
