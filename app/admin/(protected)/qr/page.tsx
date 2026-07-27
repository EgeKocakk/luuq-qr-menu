"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Logo } from "@/components/Logo";
import { tr } from "@/i18n/tr";
import { PageHeader } from "@/components/admin/PageHeader";

const MENU_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function AdminQrPage() {
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [generatingCard, setGeneratingCard] = useState(false);

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

  async function downloadPrintCard() {
    if (!pngDataUrl) return;
    setGeneratingCard(true);

    try {
      const width = 1240;
      const height = 1748;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#3B2A26";
      ctx.fillRect(0, 0, width, height);

      await document.fonts.ready;

      const logo = await loadImage("/luuq-logo.png");
      const logoW = width * 0.5;
      const logoH = logoW * (logo.height / logo.width);
      const logoX = (width - logoW) / 2;
      const logoY = height * 0.16;
      ctx.drawImage(logo, logoX, logoY, logoW, logoH);

      ctx.fillStyle = "#F5E9DC";
      ctx.font = "italic 400 48px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.fillText(tr.admin.qr.scanToView, width / 2, logoY + logoH + 90);

      const qrBoxSize = width * 0.6;
      const qrBoxX = (width - qrBoxSize) / 2;
      const qrBoxY = logoY + logoH + 140;
      ctx.fillStyle = "#F5E9DC";
      ctx.beginPath();
      ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 32);
      ctx.fill();

      const qrImg = await loadImage(pngDataUrl);
      const qrPadding = qrBoxSize * 0.08;
      ctx.drawImage(
        qrImg,
        qrBoxX + qrPadding,
        qrBoxY + qrPadding,
        qrBoxSize - qrPadding * 2,
        qrBoxSize - qrPadding * 2,
      );

      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "luuq-masa-karti.png";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setGeneratingCard(false);
    }
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <PageHeader title={tr.admin.sidebar.qr} description={MENU_URL} />

      <div className="flex flex-wrap items-start gap-8">
        <div className="flex flex-col items-center gap-3 rounded-lg border border-gold/20 bg-white p-6">
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
              className="rounded-md bg-terra px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-terra/90 disabled:opacity-50"
            >
              {tr.admin.qr.downloadPng}
            </button>
            <button
              onClick={downloadSvg}
              disabled={!svgMarkup}
              className="rounded-md border border-gold/40 px-4 py-2 text-sm font-semibold text-dark transition-colors hover:border-gold disabled:opacity-50"
            >
              {tr.admin.qr.downloadSvg}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-gold/20 bg-white p-6">
          <p className="text-sm font-medium text-dark">{tr.admin.qr.printCardTitle}</p>

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

          <div className="flex gap-2">
            <button
              onClick={downloadPrintCard}
              disabled={!pngDataUrl || generatingCard}
              className="rounded-md bg-terra px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-terra/90 disabled:opacity-50"
            >
              {generatingCard ? tr.admin.qr.generating : tr.admin.qr.downloadCard}
            </button>
            <button
              onClick={() => window.print()}
              className="rounded-md border border-gold/40 px-4 py-2 text-sm font-semibold text-dark transition-colors hover:border-gold"
            >
              {tr.admin.qr.print}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
