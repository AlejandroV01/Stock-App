import React, { useCallback, useEffect, useState } from "react";

function useInViewport(): {
  isInViewport: boolean;
  ref: React.RefCallback<HTMLElement>;
} {
  const [isInViewport, setIsInViewport] = useState(false);
  const [refElement, setRefElement] = useState<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setRefElement(node);
    }
  }, []);

  useEffect(() => {
    if (refElement) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
        } else {
          setIsInViewport(false);
        }
      });

      observer.observe(refElement);

      return () => {
        observer.disconnect();
      };
    }
  }, [isInViewport, refElement]);

  return { isInViewport, ref: setRef };
}

export default useInViewport;
