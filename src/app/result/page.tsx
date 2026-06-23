"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useRef, useCallback } from "react";
import Link from "next/link";
import { decodeResult } from "@/lib/quiz-engine";
import { getCharacterById } from "@/data/characters";
import type { RadarScores, CharacterTheme } from "@/data/characters";

function RadarChart({ scores, theme }: { scores: RadarScores; theme: CharacterTheme }) {
  const dims = [
    { key: "avoidance", label: "回避程度", value: scores.avoidance },
    { key: "attachment", label: "依恋程度", value: scores.attachment },
    { key: "boundary", label: "边界感", value: scores.boundary },
    { key: "intimacy", label: "亲密渴望", value: scores.intimacy },
    { key: "loyalty", label: "忠诚度", value: scores.loyalty },
  ];

  const cx = 130, cy = 130, r = 90;
  const angleStep = (2 * Math.PI) / 5;
  const startAngle = -Math.PI / 2;

  function polarToCart(angle: number, radius: number) {
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  }

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const axes = dims.map((_, i) => {
    const angle = startAngle + i * angleStep;
    const outer = polarToCart(angle, r);
    return { angle, outer };
  });

  const dataPoints = dims.map((d, i) => {
    const angle = startAngle + i * angleStep;
    return polarToCart(angle, r * (d.value / 100));
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 260 260" width="260" height="260">
        {/* Grid */}
        {gridLevels.map((level) => {
          const pts = dims.map((_, i) => {
            const angle = startAngle + i * angleStep;
            return polarToCart(angle, r * level);
          });
          const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
          return <path key={level} d={path} fill="none" stroke={theme.accentLight} strokeWidth="0.5" opacity="0.5" />;
        })}
        {/* Axes */}
        {axes.map((a, i) => (
          <line key={i} x1={cx} y1={cy} x2={a.outer.x} y2={a.outer.y} stroke={theme.accentLight} strokeWidth="0.5" opacity="0.5" />
        ))}
        {/* Data */}
        <path d={dataPath} fill={theme.accent} fillOpacity="0.2" stroke={theme.accent} strokeWidth="2" />
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill={theme.accent} />
        ))}
        {/* Labels */}
        {dims.map((d, i) => {
          const angle = startAngle + i * angleStep;
          const labelPos = polarToCart(angle, r + 22);
          return (
            <text key={d.key} x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill={theme.muted}>
              {d.label}
            </text>
          );
        })}
      </svg>
      {/* Scores */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-2 mt-2">
        {dims.map((d) => (
          <div key={d.key} className="text-center">
            <span className="text-xs" style={{ color: theme.muted }}>{d.label}</span>
            <span className="block text-sm font-bold" style={{ color: theme.accent }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ children, theme }: { children: React.ReactNode; theme: CharacterTheme }) {
  return (
    <h2 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: theme.accent }}>
      {children}
    </h2>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const resultCardRef = useRef<HTMLDivElement>(null);
  const encoded = searchParams.get("r");

  if (!encoded) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p>没有找到测试结果。<Link href="/" className="text-accent underline ml-1">重新测试</Link></p>
      </main>
    );
  }

  const rawScores = decodeResult(encoded);
  if (!rawScores) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p>结果解析失败。<Link href="/" className="text-accent underline ml-1">重新测试</Link></p>
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
    .slice(0, 3);

  const primary = scored[0];
  if (!primary?.character) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p>未知角色。<Link href="/" className="text-accent underline ml-1">重新测试</Link></p>
      </main>
    );
  }

  const char = primary.character;
  const theme = char.theme;
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
      const canvas = await html2canvas(el, { backgroundColor: theme.bg, scale: 2 });
      const link = document.createElement("a");
      link.download = `我是${char.name}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch {
      alert("图片生成失败");
    }
  }, [char.name, theme.bg]);

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-8 transition-colors duration-700" style={{ backgroundColor: theme.bg, color: theme.text }}>
      <div className="w-full max-w-xl">
        {/* Result card */}
        <div ref={resultCardRef} className="rounded-2xl p-6 sm:p-8 mb-6" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.accentLight}40`, color: theme.text }}>

          {/* Poster + Header */}
          {char.poster && (
            <div className="flex gap-5 mb-6">
              <a href={char.doubanUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                <img
                  src={char.poster}
                  alt={char.source}
                  className="w-24 sm:w-28 h-36 sm:h-40 object-cover rounded-lg"
                />
              </a>
              <div className="flex flex-col justify-center">
                <p className="text-[10px] tracking-widest mb-2" style={{ color: theme.muted }}>你的拉拉人物类型是</p>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">{char.name}</h1>
                <p className="text-xs mb-2" style={{ color: theme.muted }}>— {char.source}</p>
                {char.doubanUrl && (
                  <a href={char.doubanUrl} target="_blank" rel="noopener noreferrer" className="text-xs inline-flex items-center gap-1 mt-1" style={{ color: theme.accent }}>
                    豆瓣 →
                  </a>
                )}
              </div>
            </div>
          )}
          {!char.poster && (
            <>
              <p className="text-xs tracking-widest mb-4" style={{ color: theme.muted }}>你的拉拉人物类型是</p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">{char.name}</h1>
              <p className="text-sm mb-2" style={{ color: theme.muted }}>— {char.source}</p>
            </>
          )}

          {/* Quote */}
          <blockquote className="italic text-sm mb-5 pl-4" style={{ borderLeft: `3px solid ${theme.accent}`, color: theme.muted }}>
            &ldquo;{char.quote}&rdquo;
          </blockquote>

          {/* Traits */}
          <div className="flex flex-wrap gap-2 mb-6">
            {char.traits.map((t) => (
              <span key={t} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: theme.accentLight + "30", color: theme.accent }}>
                {t}
              </span>
            ))}
          </div>

          {/* Divider */}
          <hr style={{ borderColor: theme.accentLight + "30" }} className="mb-6" />

          {/* 灵魂素描 */}
          <SectionTitle theme={theme}>灵魂素描</SectionTitle>
          <p className="text-sm leading-relaxed mb-6">{char.soulSketch}</p>

          {/* 亲密坐标 */}
          <SectionTitle theme={theme}>亲密坐标</SectionTitle>
          <RadarChart scores={char.radar} theme={theme} />
          <div className="mt-3 mb-6">
            {char.radarNotes.map((note, i) => (
              <p key={i} className="text-xs leading-relaxed mb-1" style={{ color: theme.muted }}>• {note}</p>
            ))}
          </div>

          {/* 平日速写 */}
          <SectionTitle theme={theme}>平日速写</SectionTitle>
          <p className="text-sm leading-relaxed mb-6">{char.modernProfile}</p>

          {/* 恋爱模式 */}
          <SectionTitle theme={theme}>恋爱模式</SectionTitle>
          <p className="text-sm leading-relaxed mb-6">{char.loveStyle}</p>

          {/* 恋爱处方 */}
          <SectionTitle theme={theme}>恋爱处方</SectionTitle>
          <ol className="text-sm leading-relaxed mb-6 list-decimal list-inside space-y-2">
            {char.prescription.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>

          {/* CP */}
          {char.cpName && (
            <div className="p-3 rounded-xl text-sm mb-6" style={{ backgroundColor: theme.accentLight + "20" }}>
              <span style={{ color: theme.muted }}>你的理想CP类型：</span>{" "}
              <span className="font-semibold">{char.cpName}</span>
            </div>
          )}

          {/* Top 3 成分 */}
          <SectionTitle theme={theme}>角色成分</SectionTitle>
          {scored.map((s, i) => (
            <div key={s.character!.id} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>
                  {s.character!.emoji} {s.character!.name}
                  {i === 0 && (
                    <span className="text-xs ml-2 px-2 py-0.5 rounded-full" style={{ backgroundColor: theme.accent, color: theme.cardBg }}>
                      主人格
                    </span>
                  )}
                </span>
                <span className="font-semibold">{s.percentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.accentLight + "30" }}>
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.percentage}%`, backgroundColor: theme.accent, opacity: 1 - i * 0.25 }} />
              </div>
            </div>
          ))}

          {/* Footer */}
          <p className="text-center text-xs mt-6 italic" style={{ color: theme.muted }}>{theme.vibe}</p>
        </div>

        {/* Share buttons */}
        <div className="flex gap-3 mb-4">
          <button onClick={handleSaveImage} className="flex-1 font-semibold py-3 rounded-full hover:opacity-90 transition-opacity" style={{ backgroundColor: theme.accent, color: theme.cardBg }}>
            保存结果图片
          </button>
          <button onClick={handleCopyLink} className="flex-1 font-semibold py-3 rounded-full transition-colors" style={{ border: `2px solid ${theme.accent}`, color: theme.accent, backgroundColor: "transparent" }}>
            复制分享链接
          </button>
        </div>

        <Link href="/" className="block text-center text-sm transition-colors" style={{ color: theme.muted }}>
          重新测试
        </Link>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<main className="flex flex-1 items-center justify-center"><p className="text-muted">加载结果中...</p></main>}>
      <ResultContent />
    </Suspense>
  );
}
