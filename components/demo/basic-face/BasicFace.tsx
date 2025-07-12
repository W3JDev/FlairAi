/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { RefObject, useEffect, useState, useRef } from 'react';

import { renderBasicFace } from './basic-face-render';
import useLiveFaceAnims, { useBlink } from '../../../hooks/demo/use-face'; // Import both live hook and blink hook
import useHover from '../../../hooks/demo/use-hover';
import useTilt from '../../../hooks/demo/use-tilt';

// Minimum volume level that indicates audio output is occurring (for live mode)
const AUDIO_OUTPUT_DETECTION_THRESHOLD = 0.05;
// Amount of delay between end of audio output and setting talking state to false (for live mode)
const TALKING_STATE_COOLDOWN_MS = 2000;

type BasicFaceProps = {
  /** The canvas element on which to render the face. */
  canvasRef: RefObject<HTMLCanvasElement | null>;
  /** The radius of the face. */
  radius?: number;
  /** The color of the face. */
  color?: string;
  /** If true, the face uses static animations and does not rely on LiveAPIContext. */
  isStatic?: boolean;
};

export default function BasicFace({
  canvasRef,
  radius = 250,
  color,
  isStatic = false,
}: BasicFaceProps) {
  const timeoutRef = useRef<number | null>(null);
  const [isTalking, setIsTalking] = useState(false);
  const [scale, setScale] = useState(1);

  // Animation values - will be sourced differently based on isStatic
  let derivedEyeScale: number;
  let derivedMouthScale: number;

  // Hooks for physical animation (hover, tilt) are always active
  const hoverPosition = useHover();
  const tiltAngle = useTilt({
    maxAngle: 3,
    speed: 0.05,
    isActive: isTalking,
  });
  
  // State for static mouth animation timer
  const [staticTime, setStaticTime] = useState(Date.now());
  const staticBlinkEyeScale = useBlink({ speed: 0.0125 }); // useBlink is self-contained

  if (isStatic) {
    derivedEyeScale = staticBlinkEyeScale;
    // Simulate gentle mouth pulse for static avatar
    derivedMouthScale = 0.03 + Math.abs(Math.sin(staticTime / 500)) * 0.07;
  } else {
    // LIVE MODE: Call the hook that uses context.
    // This is safe because when !isStatic, BasicFace is within LiveAPIProvider.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const liveAnims = useLiveFaceAnims();
    derivedEyeScale = liveAnims.eyeScale;
    derivedMouthScale = liveAnims.mouthScale;
  }

  // Effect for static mouth animation timer (only runs if isStatic)
  useEffect(() => {
    if (isStatic) {
      const intervalId = setInterval(() => setStaticTime(Date.now()), 50); // Update frequently for smooth animation
      return () => clearInterval(intervalId);
    }
  }, [isStatic]);


  // Effect for calculating overall scale of the face
  useEffect(() => {
    function calculateScale() {
      const baseSize = Math.min(window.innerWidth, window.innerHeight);
      const targetRadius = baseSize / 4; // Aim for radius to be ~1/4 of smaller screen dimension
      setScale(targetRadius / radius);
    }
    window.addEventListener('resize', calculateScale);
    calculateScale();
    return () => window.removeEventListener('resize', calculateScale);
  }, [radius]);

  // Effect for determining 'isTalking' state
  useEffect(() => {
    if (isStatic) {
      // For static avatar, 'talking' is based on its own animated mouth scale
      setIsTalking(derivedMouthScale > 0.05); // Example threshold for static pulse
    } else {
      // For live avatar, 'talking' based on derivedMouthScale (which reflects live audio volume)
      if (derivedMouthScale > AUDIO_OUTPUT_DETECTION_THRESHOLD / 2) { // Adjust threshold based on how mouthScale relates to volume
        setIsTalking(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(
          () => setIsTalking(false),
          TALKING_STATE_COOLDOWN_MS
        );
      } else {
        // If mouthScale is low, the timeout will eventually set isTalking to false.
        // No immediate change to false needed here to allow for cooldown.
      }
    }
  }, [isStatic, derivedMouthScale]);


  // Effect for rendering the face on the canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Update canvas size based on scale and radius
    const newSize = radius * 2 * scale;
    if (canvasRef.current.width !== newSize || canvasRef.current.height !== newSize) {
        canvasRef.current.width = newSize;
        canvasRef.current.height = newSize;
    }
    
    renderBasicFace({ ctx, mouthScale: derivedMouthScale, eyeScale: derivedEyeScale, color, isTalking });
  }, [canvasRef, derivedEyeScale, derivedMouthScale, color, scale, isTalking, radius]);


  return (
    <canvas
      className="basic-face"
      ref={canvasRef}
      // Initial width/height, will be adjusted in useEffect
      width={radius * 2 * scale}
      height={radius * 2 * scale}
      style={{
        display: 'block',
        transform: `translateY(${hoverPosition}px) rotate(${tiltAngle}deg)`,
        transition: 'transform 0.1s linear', // Smooth out slight jitters if any from direct style updates
      }}
      aria-label="Animated face of the AI agent"
      role="img"
    />
  );
}
