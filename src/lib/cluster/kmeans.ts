function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function kmeans(
  vectors: number[][],
  k: number,
  seed = 42,
  iters = 12
) {
  const n = vectors.length;
  if (n === 0) return { labels: [] as number[], centroids: [] as number[][] };

  k = Math.max(1, Math.min(k, n));
  const rand = mulberry32(seed);

  const centroids: number[][] = [];
  const used = new Set<number>();
  let guard = 0;
  while (centroids.length < k && guard++ < 10_000) {
    const idx = Math.floor(rand() * n);
    if (used.has(idx)) continue;
    used.add(idx);
    centroids.push([...vectors[idx]]);
  }
  for (let i = 0; centroids.length < k && i < n; i++) {
    if (used.has(i)) continue;
    used.add(i);
    centroids.push([...vectors[i]]);
  }

  const labels = new Array<number>(n).fill(0);

  const dist2 = (a: number[], b: number[]) => {
    let s = 0;
    for (let i = 0; i < a.length; i++) {
      const d = a[i] - b[i];
      s += d * d;
    }
    return s;
  };

  for (let iter = 0; iter < iters; iter++) {
    for (let i = 0; i < n; i++) {
      let best = 0;
      let bestD = Infinity;
      for (let c = 0; c < k; c++) {
        const d = dist2(vectors[i], centroids[c]);
        if (d < bestD) {
          bestD = d;
          best = c;
        }
      }
      labels[i] = best;
    }

    const dim = vectors[0]?.length ?? 0;
    const sums = Array.from({ length: k }, () => new Array(dim).fill(0));
    const counts = new Array(k).fill(0);

    for (let i = 0; i < n; i++) {
      const c = labels[i];
      counts[c]++;
      const v = vectors[i];
      for (let j = 0; j < dim; j++) sums[c][j] += v[j];
    }

    for (let c = 0; c < k; c++) {
      if (counts[c] === 0) {
        const idx = Math.floor(rand() * n);
        centroids[c] = [...vectors[idx]];
      } else {
        centroids[c] = sums[c].map((x) => x / counts[c]);
      }
    }
  }

  return { labels, centroids };
}
