"use client";
import { ReactElement, useState } from "react";

export default function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const previous = () => {
    setCurrentStepIndex(i => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const goto = (index: number) => {
    setCurrentStepIndex(() => {
      if (index <= 0) return 0;
      else if (index >= steps.length) return steps.length;
      else return index;
    });
  };
  return {
    steps: steps,
    currentStepIndex,
    step: steps[currentStepIndex],
    goto,
    next,
    previous,
  };
}
