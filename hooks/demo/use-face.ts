/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useEffect, useRef, useState } from 'react';
import { useLiveAPIContext } from '../../src-business/contexts/LiveAPIContext';

// --- Reusable Animation Helper Functions ---
function easeOutQuint(x: number): number {
  return 1 - Math.pow(1 - x, 5);
}

function clamp(x: number, lowerlimit: number, upperlimit: number) {
  if (x < lowerlimit) x = lowerlimit;
  if (x > upperlimit) x = upperlimit;
  return x;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  // Scale, bias, and saturate to range [0,1]
  x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  // Apply cubic polynomial smoothing
  return x * x * (3 - 2 * x);
}

// --- useBlink Hook (self-contained) ---
type BlinkProps = {
  speed: number;
};

export function useBlink({ speed }: BlinkProps) {
  const [eyeScale, setEyeScale] = useState(1);
  const [frame, setFrame] = useState(0);
  const frameId = useRef(-1);

  useEffect(() => {
    function nextFrame() {
      frameId.current = window.requestAnimationFrame(() => {
        setFrame(frame + 1);
        let s = easeOutQuint((Math.sin(frame * speed) + 1) * 2);
        s = smoothstep(0.1, 0.25, s);
        s = Math.min(1, s);
        setEyeScale(s);
        nextFrame();
      });
    }

    nextFrame();

    return () => {
      window.cancelAnimationFrame(frameId.current);
    };
  }, [speed, eyeScale, frame]);

  return eyeScale;
}

// --- useLiveFaceAnims Hook (context-dependent) ---
// This hook is intended for use when the component is within a LiveAPIProvider.
// It combines blinking with mouth animation driven by live audio volume.
export default function useLiveFaceAnims() {
  const { volume } = useLiveAPIContext(); // Relies on the context
  const eyeScale = useBlink({ speed: 0.0125 }); // Re-uses useBlink for eye animation

  return { eyeScale, mouthScale: volume / 2 };
}
