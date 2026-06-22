import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          你是哪个拉拉角色？
        </h1>
        <p className="text-muted text-lg mb-2">
          From The L Word to Carol to Portrait of a Lady on Fire
        </p>
        <p className="text-muted mb-8">
          12道题，测出你的经典角色匹配 + 百分比成分分析
        </p>
        <Link
          href="/quiz"
          className="inline-block bg-accent text-white font-semibold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity"
        >
          开始测试 →
        </Link>
        <p className="text-sm text-muted mt-6 opacity-60">
          Los Angeles, circa 2004
        </p>
      </div>
    </main>
  );
}
