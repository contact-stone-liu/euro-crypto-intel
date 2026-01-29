import { buildTfIdf, cosine } from "@/lib/cluster/tfidf";

export type ClusterItem = {
  id: string;
  vector: number[];
};

export type Cluster = {
  ids: string[];
};

export function clusterByCosineThreshold(docs: { id: string; text: string }[], threshold = 0.25): Cluster[] {
  if (docs.length === 0) return [];

  const tfidf = buildTfIdf(docs.map(d => ({ id: d.id, text: d.text })));
  const items: ClusterItem[] = docs.map((d, i) => ({ id: d.id, vector: tfidf.vectors[i] }));

  const unassigned = new Set(items.map(x => x.id));
  const byId = new Map(items.map(x => [x.id, x]));
  const clusters: Cluster[] = [];

  // 贪心聚类：拿一个种子，把相似度>=阈值的都拉进来
  while (unassigned.size > 0) {
    const seedId = unassigned.values().next().value as string;
    unassigned.delete(seedId);

    const seed = byId.get(seedId)!;
    const group = [seedId];

    for (const id of Array.from(unassigned)) {
      const it = byId.get(id)!;
      if (cosine(seed.vector, it.vector) >= threshold) {
        group.push(id);
        unassigned.delete(id);
      }
    }
    clusters.push({ ids: group });
  }

  return clusters;
}
