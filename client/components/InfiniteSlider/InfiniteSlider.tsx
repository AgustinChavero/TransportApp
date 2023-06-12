import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { slider } from "../../assets/data";
import styles from "./InfiniteSlider.module.css";

const InfiniteSlider = () => {
  const [currentLogo, setCurrentLogo] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const animateSlider = () => {
    setCurrentLogo((prevLogo) => (prevLogo + 1) % clonedSlider.length);

    if (currentLogo === clonedSlider.length - 1) {
      sliderRef.current?.addEventListener("transitionend", handleTransitionEnd);
    } else {
      animationRef.current = requestAnimationFrame(animateSlider);
    }
  };

  const handleTransitionEnd = () => {
    sliderRef.current?.removeEventListener("transitionend", handleTransitionEnd);
    setCurrentLogo(0);
    animationRef.current = requestAnimationFrame(animateSlider);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateSlider);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const sliderContainer = sliderRef.current;
    if (sliderContainer) {
      sliderContainer.style.transform = `translate3d(-${currentLogo * 25}%, 0, 0)`;
    }
  }, [currentLogo]);

  const clonedSlider = [...slider, ...slider, ...slider]; // Clone and concatenate the slider array

  return (
    <article className="relative h-20 w-full overflow-hidden py-6 text-sm">
      <div ref={sliderRef} className={`${styles.sliderContainer} absolute flex`}>
        {clonedSlider.map((s, index) => (
          <article
            key={s.id}
            className={`flex w-full items-center justify-center px-4 ${
              index < slider.length ? "active" : ""
            }`}
          >
            <span className="w-10 ">
              <Image src={s.logo} alt="" width={40} height={40} />
            </span>
            <p className="w-auto whitespace-nowrap ">{s.description}</p>
          </article>
        ))}
      </div>
    </article>
  );
};

export default InfiniteSlider;
