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
