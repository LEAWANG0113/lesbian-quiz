"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useRef, useCallback, useState } from "react";
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

  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSaveImage = useCallback(async () => {
    const el = resultCardRef.current;
    if (!el) return;
    setSaving(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(el, { backgroundColor: theme.bg, scale: 2, useCORS: true });
      const dataUrl = canvas.toDataURL("image/png");

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        setSavedImageUrl(dataUrl);
        setTimeout(() => {
          document.getElementById("saved-image-section")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const link = document.createElement("a");
        link.download = `我是${char.name}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch {
      alert("图片生成失败，请尝试截屏保存");
    }
    setSaving(false);
  }, [char.name, theme.bg]);

  // LESE 彩蛋专属页面
  if (char.id === "lese") {
    const lesePhotos = ["/characters/lese-1.webp", "/characters/lese-2.webp", "/characters/lese-3.webp", "/characters/lese-4.webp"];
    const allPhotos = [...lesePhotos, ...lesePhotos, ...lesePhotos, ...lesePhotos, ...lesePhotos, ...lesePhotos];

    return (
      <main className="flex flex-1 flex-col relative overflow-hidden" style={{ backgroundColor: "#0a0a0a", color: "#e8e0f8" }}>
        <style>{`
          @keyframes lese-scroll-up { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
          @keyframes lese-scroll-down { 0% { transform: translateY(-50%); } 100% { transform: translateY(0); } }
          @keyframes firework1 { 0% { transform: scale(0); opacity: 1; } 50% { opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
          @keyframes firework2 { 0% { transform: scale(0) rotate(45deg); opacity: 1; } 50% { opacity: 1; } 100% { transform: scale(1.8) rotate(45deg); opacity: 0; } }
          @keyframes firework3 { 0% { transform: scale(0) rotate(90deg); opacity: 1; } 50% { opacity: 1; } 100% { transform: scale(1.2) rotate(90deg); opacity: 0; } }
        `}</style>

        {/* 满屏照片滚动背景 */}
        <div className="fixed inset-0 flex gap-1 pointer-events-none opacity-15">
          {[0, 1, 2, 3, 4].map((col) => (
            <div key={col} className="flex-1 overflow-hidden">
              <div className="flex flex-col gap-1" style={{ animation: `lese-scroll-${col % 2 === 0 ? 'up' : 'down'} ${15 + col * 3}s linear infinite` }}>
                {allPhotos.map((src, i) => (
                  <img key={`${col}-${i}`} src={src} alt="" className="w-full aspect-[3/4] object-cover rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 烟花特效 */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-32 h-32 rounded-full border-2 border-purple-400" style={{ animation: "firework1 2s ease-out infinite" }} />
          <div className="absolute top-[15%] right-[25%] w-24 h-24 rounded-full border-2 border-pink-400" style={{ animation: "firework2 2.5s ease-out infinite 0.3s" }} />
          <div className="absolute bottom-[30%] left-[30%] w-20 h-20 rounded-full border-2 border-violet-300" style={{ animation: "firework3 1.8s ease-out infinite 0.6s" }} />
          <div className="absolute top-[40%] right-[15%] w-28 h-28 rounded-full border-2 border-fuchsia-400" style={{ animation: "firework1 2.2s ease-out infinite 1s" }} />
        </div>

        {/* 暗色覆盖 */}
        <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.88) 100%)" }} />

        {/* 内容 */}
        <div className="flex flex-col items-center px-4 py-8 relative z-10">
          <div className="w-full max-w-md">

            {/* 惊喜头部 */}
            <div className="text-center mb-8">
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "rgba(139,92,246,0.7)" }}>系统检测到异常匹配</p>
              <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ background: "linear-gradient(135deg, #8b5cf6, #f472b6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                你中彩蛋了！
              </h1>
              <p className="text-base mb-1" style={{ color: "#c0b8d8" }}>你选的每一个答案</p>
              <p className="text-base mb-4" style={{ color: "#c0b8d8" }}>都是这个帅T的心声</p>
              <p className="text-sm" style={{ color: "#9080b0" }}>灵魂匹配度：<span className="font-bold text-lg" style={{ color: "#8b5cf6" }}>99%</span></p>
            </div>

            {/* 相亲档案 */}
            <div ref={resultCardRef} className="rounded-2xl overflow-hidden mb-6" style={{ backgroundColor: "rgba(26,26,46,0.95)", border: "1px solid rgba(139,92,246,0.3)" }}>

              {/* 大头照 */}
              <img src="/characters/lese-1.webp" alt="LESE" className="w-full aspect-square object-cover" />

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-black" style={{ color: "#e8e0f8" }}>LESE</h2>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "rgba(139,92,246,0.2)", color: "#8b5cf6" }}>25岁</span>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "rgba(244,114,182,0.2)", color: "#f472b6" }}>Switch</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {["艺术家", "颜值担当", "橘子念念未来第八位主演", "灵感太多容易忘事", "美甲爱好者"].map((tag) => (
                    <span key={tag} className="text-[11px] px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(139,92,246,0.1)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <hr style={{ borderColor: "rgba(139,92,246,0.15)" }} className="mb-5" />

                <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(139,92,246,0.5)" }}>关于 TA</p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "#c0b8d8" }}>
                  艺术家，颜值担当，橘子念念未来第八位主演。脑子里灵感多到排队，经常画到一半忘了自己要干嘛——但这没关系，忘了就再来一遍，反正每次画出来的都不一样。
                </p>

                <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(139,92,246,0.5)" }}>特长</p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "#c0b8d8" }}>
                  手指特长（物理意义上的长）。手速快（害羞）。美甲爱好者——毕竟这么好看的手不装饰一下说不过去。
                </p>

                <p className="text-xs tracking-widest mb-2" style={{ color: "rgba(139,92,246,0.5)" }}>注意事项</p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#c0b8d8" }}>
                  跟TA聊天的时候不要介意话题突然跳到另一个星球，那只是灵感又来了。如果TA突然沉默了，大概率是在脑子里构图。
                </p>

                {/* 更多照片 */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  <img src="/characters/lese-2.webp" alt="LESE" className="w-full aspect-square object-cover rounded-lg" />
                  <img src="/characters/lese-3.webp" alt="LESE" className="w-full aspect-square object-cover rounded-lg" />
                  <img src="/characters/lese-4.webp" alt="LESE" className="w-full aspect-square object-cover rounded-lg" />
                </div>

                <hr style={{ borderColor: "rgba(139,92,246,0.15)" }} className="mb-5" />

                <div className="rounded-xl p-5 text-center" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(244,114,182,0.1))", border: "1px solid rgba(139,92,246,0.25)" }}>
                  <p className="text-lg font-bold mb-2" style={{ color: "#e8e0f8" }}>心动了？</p>
                  <p className="text-sm mb-4" style={{ color: "#9080b0" }}>打赏主创 ¥10 解锁这位帅T的微信号</p>
                  <p className="text-[10px]" style={{ color: "#605080" }}>（主创保证TA本人比照片更帅）</p>
                </div>

                <p className="text-center text-xs italic mt-5" style={{ color: "#605080" }}>谨慎地拥有，珍惜地使用，勇敢地放弃</p>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <button onClick={handleSaveImage} disabled={saving} className="flex-1 font-semibold py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50" style={{ backgroundColor: "#8b5cf6", color: "#fff" }}>
                {saving ? "生成中..." : "保存结果图片"}
              </button>
              <button onClick={handleCopyLink} className="flex-1 font-semibold py-3 rounded-full transition-colors" style={{ border: "2px solid #8b5cf6", color: "#8b5cf6", backgroundColor: "transparent" }}>
                复制分享链接
              </button>
            </div>

            {savedImageUrl && (
              <div id="saved-image-section" className="mb-6 rounded-xl p-4 text-center" style={{ backgroundColor: "#1a1a2e", border: "1px solid rgba(139,92,246,0.3)" }}>
                <p className="text-sm mb-3" style={{ color: "#9080b0" }}>长按下方图片保存到相册</p>
                <img src={savedImageUrl} alt="测试结果" className="rounded-lg" style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }} />
                <button onClick={() => setSavedImageUrl(null)} className="text-xs mt-3" style={{ color: "#9080b0" }}>关闭</button>
              </div>
            )}

            <Link href="/" className="block text-center text-sm transition-colors" style={{ color: "#605080" }}>
              重新测试
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-8 transition-colors duration-700" style={{ backgroundColor: theme.bg, color: theme.text }}>
      <div className="w-full max-w-xl">
        {/* Result card */}
        <div ref={resultCardRef} className="rounded-2xl p-6 sm:p-8 mb-6" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.accentLight}40`, color: theme.text }}>

          {/* Character avatar + info */}
          <div className="flex gap-4 mb-6">
            <img
              src={`/characters/${char.id}.jpg`}
              alt={char.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover flex-shrink-0"
              style={{ border: `3px solid ${theme.accent}` }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="flex flex-col justify-center min-w-0">
              <p className="text-[10px] tracking-widest mb-1" style={{ color: theme.muted }}>你的拉拉人物类型是</p>
              <h1 className="text-xl sm:text-2xl font-bold mb-0.5 truncate">{char.name}</h1>
              <p className="text-xs mb-1" style={{ color: theme.muted }}>— {char.source}</p>
              {char.doubanUrl && (
                <a href={char.doubanUrl} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: theme.accent }}>
                  豆瓣 →
                </a>
              )}
            </div>
          </div>

          {/* Film poster */}
          {char.poster && (
            <a href={char.doubanUrl || "#"} target="_blank" rel="noopener noreferrer" className="block mb-6">
              <img
                src={char.poster}
                alt={char.source}
                className="w-full h-40 sm:h-48 object-cover rounded-lg opacity-80"
              />
            </a>
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
          <button onClick={handleSaveImage} disabled={saving} className="flex-1 font-semibold py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50" style={{ backgroundColor: theme.accent, color: theme.cardBg }}>
            {saving ? "生成中..." : "保存结果图片"}
          </button>
          <button onClick={handleCopyLink} className="flex-1 font-semibold py-3 rounded-full transition-colors" style={{ border: `2px solid ${theme.accent}`, color: theme.accent, backgroundColor: "transparent" }}>
            复制分享链接
          </button>
        </div>

        {/* Mobile saved image */}
        {savedImageUrl && (
          <div id="saved-image-section" className="mb-6 rounded-xl p-4 text-center" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.accentLight}40` }}>
            <p className="text-sm mb-3" style={{ color: theme.muted }}>长按下方图片保存到相册</p>
            <img src={savedImageUrl} alt="测试结果" className="rounded-lg" style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }} />
            <button onClick={() => setSavedImageUrl(null)} className="text-xs mt-3" style={{ color: theme.muted }}>关闭</button>
          </div>
        )}

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
