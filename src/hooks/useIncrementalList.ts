import { useEffect, useMemo, useRef, useState } from "react";

export function useIncrementalList<T>(
  items: T[],
  batchSize = 12,
  resetKey = "",
) {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(batchSize);
  }, [batchSize, items.length, resetKey]);

  useEffect(() => {
    if (visibleCount >= items.length) {
      return undefined;
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisibleCount(items.length);
      return undefined;
    }

    const node = sentinelRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisibleCount((current) =>
            Math.min(current + batchSize, items.length),
          );
        }
      },
      { rootMargin: "240px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [batchSize, items.length, visibleCount]);

  return {
    visibleItems: useMemo(
      () => items.slice(0, visibleCount),
      [items, visibleCount],
    ),
    sentinelRef,
    hasMore: visibleCount < items.length,
  };
}
