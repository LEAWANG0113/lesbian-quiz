import { characters, type Character } from "@/data/characters";
import type { QuizOption } from "@/data/questions";

export interface QuizResult {
  primaryCharacter: Character;
  scores: { character: Character; percentage: number }[];
  totalResponses?: number;
  sameCharacterPercent?: number;
}

export function calculateResult(
  selectedOptions: QuizOption[]
): QuizResult {
  const totalScores: Record<string, number> = {};

  for (const option of selectedOptions) {
    for (const [charId, score] of Object.entries(option.scores)) {
      totalScores[charId] = (totalScores[charId] || 0) + score;
    }
  }

  const maxScore = Math.max(...Object.values(totalScores), 1);
  const scored = characters
    .map((char) => ({
      character: char,
      raw: totalScores[char.id] || 0,
    }))
    .filter((s) => s.raw > 0)
    .sort((a, b) => b.raw - a.raw);

  const totalRaw = scored.reduce((sum, s) => sum + s.raw, 0) || 1;
  const scores = scored.map((s) => ({
    character: s.character,
    percentage: Math.round((s.raw / totalRaw) * 100),
  }));

  return {
    primaryCharacter: scores[0]?.character || characters[0],
    scores: scores.slice(0, 5),
  };
}

export function encodeResult(scores: Record<string, number>): string {
  const entries = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  const encoded = entries.map(([id, score]) => `${id}:${score}`).join(",");
  return btoa(encoded);
}

export function decodeResult(
  encoded: string
): Record<string, number> | null {
  try {
    const decoded = atob(encoded);
    const scores: Record<string, number> = {};
    for (const pair of decoded.split(",")) {
      const [id, score] = pair.split(":");
      scores[id] = parseInt(score, 10);
    }
    return scores;
  } catch {
    return null;
  }
}
