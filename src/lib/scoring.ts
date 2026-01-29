export function recencyWeight(lastSeenUtc: Date) {
  const hours = (Date.now() - lastSeenUtc.getTime()) / 36e5;
  return 1 / (1 + Math.max(0, hours));
}

export function scoreCluster(
  articleCount: number,
  uniqueSourceCount: number,
  lastSeenUtc: Date
) {
  return articleCount * Math.log(1 + uniqueSourceCount) * recencyWeight(lastSeenUtc);
}

type ArticleScoreInput = {
  text: string;
  lastSeenUtc: Date;
  uniqueSourceCount: number;
  relatedCount: number;
  isEurope: boolean;
};

export function scoreArticle(input: ArticleScoreInput) {
  const t = input.text.toLowerCase();

  const hits = [
    { w: 3.4, re: /(exchange|listing|delist|pair|spot|margin|leverage|derivative|perpetual|futures|orderbook)/ },
    { w: 3.0, re: /(deposit|withdraw|on-?ramp|off-?ramp|sepa|iban|swift|bank|card|fiat|payment)/ },
    { w: 2.8, re: /(mica|esma|eba|fca|bafin|amf|kyc|aml|license|compliance|regulat)/ },
    { w: 2.2, re: /(lawsuit|court|fine|penalty|investigation|raid|charge|enforcement)/ },
    { w: 2.0, re: /(stablecoin|usdc|usdt|e-?money|emoney|payment token)/ },
    { w: 1.8, re: /(hack|exploit|breach|theft|drain|phish|ransom)/ },
    { w: 1.4, re: /(etf|institution|asset manager|blackrock|fidelity)/ },
  ];

  let weight = 1;
  for (const h of hits) {
    if (h.re.test(t)) weight += h.w;
  }

  const recency = recencyWeight(input.lastSeenUtc);
  const diversity = Math.log(1 + Math.max(0, input.uniqueSourceCount));
  const coverage = Math.log(1 + Math.max(0, input.relatedCount));

  let score = weight * recency * (1 + 0.35 * diversity) * (1 + 0.25 * coverage);
  if (input.isEurope) score *= 1.1;

  return score;
}
