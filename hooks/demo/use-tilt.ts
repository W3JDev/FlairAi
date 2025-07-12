/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useEffect, useRef, useState } from 'react';

export type UseTiltProps = {
  /** Maximum tilt angle (degrees) in either direction for sway. */
  maxAngle: number;
  /** Influences sway frequency and return-to-center speed. Lower values create slower movement. */
  speed?: number;
  /** Whether tilt mode (sway) is currently active. */
  isActive: boolean;
};

export default function useTilt({
  maxAngle = 5, // Default max sway angle
  speed = 0.1,  // Default speed factor
  isActive = false,
}: UseTiltProps) {
  const [angle, setAngle] = useState<number>(0);
  const animationFrameRef = useRef<number>(0);
  const swayStartTimeRef = useRef<number>(Date.now()); // Initialize with current time

  useEffect(() => {
    const animate = () => {
      const currentTime = Date.now();
      if (isActive) {
        // Gentle sway using sine wave
        const elapsed = (currentTime - swayStartTimeRef.current) * 0.001; // Time in seconds
        
        // swayFrequency: higher speed means faster sway
        // Base frequency of 0.25 Hz (one full sway cycle every 4 seconds)
        // Speed acts as a multiplier. speed = 0.1 -> 0.25Hz. speed = 0.2 -> 0.5Hz
        const swayFrequency = 1.5 * speed; 
        setAngle(Math.sin(elapsed * swayFrequency * Math.PI * 2) * maxAngle);
      } else {
        // Reset sway start time for next activation
        swayStartTimeRef.current = currentTime; 
        
        // Smoothly return to 0 (neutral position)
        setAngle(currentAngle => {
          if (Math.abs(currentAngle) < 0.05) { // Threshold to snap to 0
            return 0;
          }
          // returnSpeed: higher speed means faster return
          // Use a lerp factor influenced by speed
          const returnFactor = Math.min(0.1, speed * 0.5); // Adjust lerp factor for smoothness
          return currentAngle * (1 - returnFactor);
        });
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Optionally reset angle to 0 on cleanup if desired,
      // though continuous animation should handle it.
      // setAngle(0); 
    };
  }, [isActive, maxAngle, speed]);

  return angle;
}
