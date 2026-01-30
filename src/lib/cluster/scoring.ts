import { hoursBetweenUtc } from "@/lib/utils/time";

export type ClusterSignals = {
  article_count: number;
  unique_source_count: number;
  last_seen_utc: Date;
};

export function recencyWeight(lastSeenUtc: Date, nowUtc: Date): number {
  // 瓒婃柊鏉冮噸瓒婇珮锛涚畝鍗曞彲瑙ｉ噴锛?灏忔椂琛板噺涓€娆?
  const h = hoursBetweenUtc(nowUtc, lastSeenUtc);
  return 1 / (1 + h / 6);
}

export function mvpScore(sig: ClusterSignals, nowUtc: Date): number {
  // MVP锛歴core = article_count * ln(1+unique_source_count) * recency_weight
  // 鐩磋锛氳浆杞藉埛灞忓線寰€鈥滄簮灏戙€侀噺澶р€濓紝ln(1+source) 璁╁鏉ユ簮鏇村悆棣欙紱
  // 鍚屾椂 recency 闃叉鑰佹柊闂绘粸鐣欍€?
  return sig.article_count * Math.log(1 + sig.unique_source_count) * recencyWeight(sig.last_seen_utc, nowUtc);
}

/**
 * 澧炲己鐗堬紙鍙€夛級鎬濊矾锛堜笉闃诲 MVP锛夛細
 * - 鍚屾簮杞浇鎯╃綒锛氬悓涓€涓?domain 鐨勬枃绔犲崰姣旇秺楂橈紝鎵ｅ垎瓒婂
 * - 鏍囬閲嶅鎯╃綒锛氶珮搴︾浉浼兼爣棰樿秺澶氾紝鎵ｅ垎瓒婂
 * 涓轰粈涔堣兘閬垮厤杞浇鍒峰睆锛氳浆杞?鍚屽煙/鍚屾爣棰樼殑鈥滃鍒剁矘璐粹€濓紝鎯╃綒浼氭妸瀹冧滑鐨勮竟闄呰础鐚帇浣庛€?
 */

