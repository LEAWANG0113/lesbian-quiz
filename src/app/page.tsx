import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Background gradient overlay for LA sunset vibe */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, rgba(212,119,92,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(200,160,120,0.1) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-md relative z-10">
        {/* Decorative top line */}
        <div className="w-12 h-0.5 bg-accent/40 mx-auto mb-8" />

        <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">
          Los Angeles, circa 2004
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
          你是哪个
          <br />
          拉拉角色？
        </h1>

        <p className="text-muted text-sm mb-2 italic">
          From The L Word to Carol to Portrait of a Lady on Fire
        </p>

        <p className="text-muted text-sm mb-10 leading-relaxed">
          12道题 · 深度性格分析 · 亲密坐标雷达图
        </p>

        <Link
          href="/quiz"
          className="inline-block bg-accent text-white font-semibold px-10 py-4 rounded-full text-base hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          开始测试
        </Link>

        {/* Film strip decoration */}
        <div className="flex justify-center gap-2 mt-12 opacity-30">
          {["The L Word", "Carol", "面子", "燃烧女子", "小姐"].map((film) => (
            <span
              key={film}
              className="text-[10px] text-muted px-2 py-1 border border-muted/30 rounded"
            >
              {film}
            </span>
          ))}
        </div>

        <div className="w-12 h-0.5 bg-accent/20 mx-auto mt-8" />
      </div>
    </main>
  );
}
