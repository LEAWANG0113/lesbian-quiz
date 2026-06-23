"use client";

import Link from "next/link";

const films = [
  { name: "The L Word", year: "2004", color: "#1a1a2e", accent: "#e94560" },
  { name: "Carol", year: "2015", color: "#2d1f0e", accent: "#c9a96e" },
  { name: "面子", year: "2004", color: "#0e2a1f", accent: "#4ecdc4" },
  { name: "燃烧女子的肖像", year: "2019", color: "#1a0a2e", accent: "#a855f7" },
  { name: "阿黛尔的生活", year: "2013", color: "#0a1a3e", accent: "#3b82f6" },
  { name: "小姐", year: "2016", color: "#2e0a1a", accent: "#f43f5e" },
];

function PosterCard({ film }: { film: (typeof films)[0] }) {
  return (
    <div
      className="flex-shrink-0 w-36 sm:w-44 h-52 sm:h-64 rounded-lg overflow-hidden relative"
      style={{
        backgroundImage: `linear-gradient(160deg, ${film.color} 0%, ${film.accent}30 100%)`,
        border: `1px solid ${film.accent}25`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
        <div
          className="text-3xl sm:text-4xl font-black mb-2 opacity-10"
          style={{ color: film.accent }}
        >
          ♀
        </div>
        <p className="text-sm sm:text-base font-bold" style={{ color: `${film.accent}dd` }}>
          {film.name}
        </p>
        <p className="text-[10px] mt-1" style={{ color: `${film.accent}66` }}>
          {film.year}
        </p>
      </div>
    </div>
  );
}

function ScrollRow({ direction }: { direction: "left" | "right" }) {
  const items = direction === "left" ? films : [...films].reverse();
  const doubled = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex gap-3"
        style={{
          animation: `scroll-${direction} 30s linear infinite`,
          width: "max-content",
        }}
      >
        {doubled.map((film, i) => (
          <PosterCard key={`${film.name}-${i}`} film={film} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main
      className="flex flex-1 flex-col relative overflow-hidden"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Scrolling poster rows */}
      <div className="absolute inset-0 flex flex-col justify-center gap-3 opacity-40 pointer-events-none">
        <ScrollRow direction="left" />
        <ScrollRow direction="right" />
        <ScrollRow direction="left" />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(10,10,15,0.75) 0%, rgba(10,10,15,0.92) 60%, rgba(10,10,15,1) 100%)",
        }}
      />

      {/* Colored glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(233,69,96,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(168,85,247,0.1) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center relative z-10">
        <div className="max-w-lg">
          <p
            className="text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-6"
            style={{ color: "rgba(233,69,96,0.7)" }}
          >
            Los Angeles · Since 2004
          </p>

          <h1
            className="text-4xl sm:text-6xl font-black mb-4 leading-tight"
            style={{
              background:
                "linear-gradient(135deg, #f43f5e 0%, #e040a0 30%, #a855f7 60%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            你这款拉子
            <br />
            早有原型
          </h1>

          <p
            className="text-base sm:text-lg mb-2"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            测测你的电影原型
          </p>

          <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.35)" }}>
            12道题 · 深度性格分析 · 亲密坐标雷达图
          </p>

          <Link
            href="/quiz"
            className="inline-block font-bold px-12 py-4 rounded-full text-base transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f43f5e, #e040a0, #a855f7)",
              color: "#fff",
              boxShadow: "0 0 40px rgba(224,64,160,0.3)",
            }}
          >
            开始测试
          </Link>

          {/* Film tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-12">
            {films.map((film) => (
              <span
                key={film.name}
                className="text-[11px] px-3 py-1.5 rounded-full"
                style={{
                  border: `1px solid ${film.accent}35`,
                  color: `${film.accent}bb`,
                  backgroundColor: `${film.accent}0a`,
                }}
              >
                {film.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center pb-6">
        <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.12)" }}>
          18个经典角色 · 5部电影 · 1部剧集
        </p>
      </div>
    </main>
  );
}
