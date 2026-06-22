"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useRef, useCallback } from "react";
import Link from "next/link";
import { decodeResult } from "@/lib/quiz-engine";
import { characters, getCharacterById } from "@/data/characters";

function ResultContent() {
  const searchParams = useSearchParams();
  const resultCardRef = useRef<HTMLDivElement>(null);
  const encoded = searchParams.get("r");

  if (!encoded) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p>
          没有找到测试结果。
          <Link href="/" className="text-accent underline ml-1">
            重新测试
          </Link>
        </p>
      </main>
    );
  }

  const rawScores = decodeResult(encoded);
  if (!rawScores) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p>
          结果解析失败。
          <Link href="/" className="text-accent underline ml-1">
            重新测试
          </Link>
        </p>
      </main>
    );
  }

  const totalRaw = Object.values(rawScores).reduce((a, b) => a + b, 0) || 1;
  const scored = Object.entries(rawScores)
    .map(([id, raw]) => ({
      character: getCharacterById(id),
      percentage: Math.round((raw / totalRaw) * 100),
      raw,
    }))
    .filter((s) => s.character)
    .sort((a, b) => b.raw - a.raw)
    .slice(0, 5);

  const primary = scored[0];
  if (!primary?.character) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p>
          未知角色。
          <Link href="/" className="text-accent underline ml-1">
            重新测试
          </Link>
        </p>
      </main>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("链接已复制！");
    } catch {
      alert("复制失败，请手动复制链接");
    }
  }, [shareUrl]);

  const handleSaveImage = useCallback(async () => {
    const el = resultCardRef.current;
    if (!el) return;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(el, {
        backgroundColor: "#fdf6ec",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = `我是${primary.character!.name}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch {
      alert("图片生成失败");
    }
  }, [primary.character]);

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-8">
      <div className="w-full max-w-xl">
        {/* Result card */}
        <div
          ref={resultCardRef}
          className="bg-card-bg rounded-2xl p-8 mb-6 border border-accent-light/30"
        >
          <p className="text-sm text-muted mb-2">你的测试结果</p>
          <div className="text-5xl mb-3">{primary.character.emoji}</div>
          <h1 className="text-3xl font-bold mb-1">
            {primary.character.name}
          </h1>
          <p className="text-sm text-muted mb-4">
            {primary.character.source}
          </p>

          {/* Traits */}
          <div className="flex flex-wrap gap-2 mb-4">
            {primary.character.traits.map((t) => (
              <span
                key={t}
                className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-base leading-relaxed mb-4">
            {primary.character.description}
          </p>

          {/* Quote */}
          <blockquote className="border-l-3 border-accent pl-4 italic text-muted text-sm">
            &ldquo;{primary.character.quote}&rdquo;
          </blockquote>

          {/* CP */}
          {primary.character.cpName && (
            <div className="mt-4 p-3 bg-accent/5 rounded-xl text-sm">
              <span className="text-muted">你的理想CP类型：</span>{" "}
              <span className="font-semibold">{primary.character.cpName}</span>
            </div>
          )}

          {/* Percentage breakdown */}
          <div className="mt-6">
            <p className="text-sm text-muted mb-3">你的角色成分：</p>
            {scored.map((s) => (
              <div key={s.character!.id} className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>
                    {s.character!.emoji} {s.character!.name}
                  </span>
                  <span className="text-muted">{s.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-accent-light/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-700"
                    style={{ width: `${s.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={handleSaveImage}
            className="flex-1 bg-accent text-white font-semibold py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            保存结果图片
          </button>
          <button
            onClick={handleCopyLink}
            className="flex-1 border-2 border-accent text-accent font-semibold py-3 rounded-full hover:bg-accent/5 transition-colors"
          >
            复制分享链接
          </button>
        </div>

        {/* Retake */}
        <Link
          href="/"
          className="block text-center text-muted text-sm hover:text-accent transition-colors"
        >
          重新测试
        </Link>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted">加载结果中...</p>
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
