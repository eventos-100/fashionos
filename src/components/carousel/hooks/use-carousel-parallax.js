import { useRef, useEffect, useCallback } from 'react';

import { carouselClasses } from '../classes';

// ----------------------------------------------------------------------

export function useParallax(mainApi, parallax) {
  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);

  const TWEEN_FACTOR_BASE = typeof parallax === 'number' ? parallax : 0.24;

  const setTweenNodes = useCallback((carouselApi) => {
    tweenNodes.current = carouselApi
      .slideNodes()
      .map((slideNode) => slideNode.querySelector(`.${carouselClasses.slide.parallax}`));
  }, []);

  const setTweenFactor = useCallback(
    (carouselApi) => {
      tweenFactor.current = TWEEN_FACTOR_BASE * carouselApi.scrollSnapList().length;
    },
    [TWEEN_FACTOR_BASE]
  );

  const tweenParallax = useCallback((carouselApi, eventName) => {
    const engine = carouselApi.internalEngine();
    const scrollProgress = carouselApi.scrollProgress();
    const slidesInView = carouselApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    carouselApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const translateValue = diffToTarget * (-1 * tweenFactor.current) * 100;
        const tweenNode = tweenNodes.current[slideIndex];

        if (tweenNode) {
          tweenNode.style.transform = `translateX(${translateValue}%)`;
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!mainApi || !parallax) return;

    setTweenNodes(mainApi);
    setTweenFactor(mainApi);
    tweenParallax(mainApi);

    mainApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainApi, tweenParallax]);

  return null;
}
