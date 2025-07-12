/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
type BasicFaceProps = {
  ctx: CanvasRenderingContext2D;
  mouthScale: number; // Controls smile intensity when talking
  eyeScale: number;   // Controls eye blink
  color?: string;      // Face color
  isTalking: boolean; // True if the agent is speaking
};

const HAIR_COLOR = '#3A2F2F'; // Dark Brown
const BOWTIE_COLOR = '#D92F2F'; // Red
const BOWTIE_KNOT_COLOR = '#A02020'; // Darker Red
const EYE_HIGHLIGHT_COLOR = 'white';
const EYE_COLOR = 'black';
const MOUTH_COLOR = 'black';
const EYEBROW_COLOR = '#4A3F3F'; // Softer brown for eyebrows

// Helper to draw an ellipse, used for hair and knot
const drawEllipse = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radiusX: number,
  radiusY: number
) => {
  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.fill();
};

const eye = (
  ctx: CanvasRenderingContext2D,
  pos: [number, number],
  radius: number,
  scaleY: number,
  faceRadius: number // Main face radius for relative sizing
) => {
  ctx.save();
  ctx.translate(pos[0], pos[1]);

  // Main eye shape (black part)
  ctx.fillStyle = EYE_COLOR;
  ctx.beginPath();
  // Ensure eyes are at least a thin line when scaleY is very low (e.g., during a blink)
  ctx.ellipse(0, 0, radius, radius * Math.max(0.1, scaleY), 0, 0, Math.PI * 2);
  ctx.fill();

  // Eye Highlights (if eyes are substantially open)
  if (scaleY > 0.2) {
    ctx.fillStyle = EYE_HIGHLIGHT_COLOR;
    const highlightRadius = radius * 0.3;
    const highlightOffsetX = radius * 0.25;
    const highlightOffsetY = -radius * 0.25;
    drawEllipse(ctx, highlightOffsetX, highlightOffsetY, highlightRadius, highlightRadius);
  }
  ctx.restore();
};

const drawEyebrow = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  baseY: number, // Base Y position above the eye
  width: number,
  thickness: number,
  liftAmount: number, // Dynamic lift based on expression
  archAmount: number // Dynamic arch amount
) => {
  ctx.fillStyle = EYEBROW_COLOR;
  ctx.beginPath();
  const startX = centerX - width / 2;
  const endX = centerX + width / 2;
  const currentY = baseY - liftAmount; // Apply lift

  // Control point for the arch, influenced by archAmount
  const controlY = currentY - archAmount;

  ctx.moveTo(startX, currentY);
  ctx.quadraticCurveTo(centerX, controlY, endX, currentY);
  // Create thickness by drawing a slightly lower curve
  ctx.quadraticCurveTo(centerX, controlY + thickness, startX, currentY + thickness * 0.8); // make it slightly tapered
  ctx.closePath();
  ctx.fill();
};


export function renderBasicFace(props: BasicFaceProps) {
  const {
    ctx,
    eyeScale: eyesOpenness, // This is the blink animation value (0 to 1)
    mouthScale,
    color,
    isTalking,
  } = props;
  const { width, height } = ctx.canvas;

  // Clear the canvas
  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const faceRadius = Math.min(width, height) / 2 - (width * 0.04); // Main radius for face parts, with a small padding


  // --- 1. Hair ---
  ctx.fillStyle = HAIR_COLOR;
  drawEllipse(ctx, centerX, centerY - faceRadius * 0.5, faceRadius * 0.7, faceRadius * 0.5);
  drawEllipse(ctx, centerX, centerY - faceRadius * 0.85, faceRadius * 0.2, faceRadius * 0.25);


  // --- 2. Face Base ---
  ctx.fillStyle = color || 'white';
  drawEllipse(ctx, centerX, centerY, faceRadius, faceRadius);


  // --- 3. Eyes ---
  const eyeRadius = faceRadius * 0.12;
  const eyeOffsetY = centerY - faceRadius * 0.25;
  const eyeSeparation = faceRadius * 0.3;
  const leftEyeX = centerX - eyeSeparation;
  const rightEyeX = centerX + eyeSeparation;

  let finalEyeVerticalScale = eyesOpenness;
  if (isTalking) {
    const speechEyeWidenAmount = Math.min(0.25, mouthScale * 0.5); 
    finalEyeVerticalScale = Math.min(1, eyesOpenness + speechEyeWidenAmount);
  }

  eye(ctx, [leftEyeX, eyeOffsetY], eyeRadius, finalEyeVerticalScale, faceRadius);
  eye(ctx, [rightEyeX, eyeOffsetY], eyeRadius, finalEyeVerticalScale, faceRadius);

  // --- 3.5 Eyebrows ---
  const eyebrowWidth = faceRadius * 0.28;
  const eyebrowThickness = faceRadius * 0.04;
  const eyebrowBaseY = eyeOffsetY - eyeRadius * 1.5; // Position above the eyes

  let eyebrowLift = 0;
  let eyebrowArch = faceRadius * 0.02; // Slight default arch

  if (isTalking) {
    eyebrowLift = Math.min(faceRadius * 0.08, mouthScale * faceRadius * 0.15); // Lift with volume
    eyebrowArch += Math.min(faceRadius * 0.03, mouthScale * faceRadius * 0.05); // Arch more with volume
  }

  drawEyebrow(ctx, leftEyeX, eyebrowBaseY, eyebrowWidth, eyebrowThickness, eyebrowLift, eyebrowArch);
  drawEyebrow(ctx, rightEyeX, eyebrowBaseY, eyebrowWidth, eyebrowThickness, eyebrowLift, eyebrowArch);


  // --- 4. Mouth (Two-line curved expression, filled) ---
  const mouthBaseY = centerY + faceRadius * 0.35;
  const mouthBaseWidth = faceRadius * 0.4; 
  
  ctx.fillStyle = MOUTH_COLOR;

  if (isTalking) {
    const dynamicWidthFactor = Math.min(0.5, mouthScale * 0.8); 
    const mouthCurrentWidth = mouthBaseWidth * (1 + dynamicWidthFactor);

    const minOpenFactor = faceRadius * 0.01; 
    const dynamicOpenFactor = Math.min(faceRadius * 0.15, mouthScale * faceRadius * 0.3); 
    const mouthOpenness = minOpenFactor + dynamicOpenFactor;

    const baseCurvature = faceRadius * 0.03; 
    const dynamicCurvature = Math.min(faceRadius * 0.1, mouthScale * faceRadius * 0.2); 
    const smileCurvature = baseCurvature + dynamicCurvature;

    const mouthLeftX = centerX - mouthCurrentWidth / 2;
    const mouthRightX = centerX + mouthCurrentWidth / 2;

    const upperControlY = mouthBaseY - smileCurvature * 0.3; 
    const lowerControlY = mouthBaseY + mouthOpenness + smileCurvature;

    ctx.beginPath();
    ctx.moveTo(mouthLeftX, mouthBaseY); 
    ctx.quadraticCurveTo(centerX, upperControlY, mouthRightX, mouthBaseY);
    ctx.quadraticCurveTo(centerX, lowerControlY, mouthLeftX, mouthBaseY);
    ctx.closePath();
    ctx.fill();

  } else {
    // Neutral, closed, gently smiling mouth
    const neutralMouthY = mouthBaseY + faceRadius * 0.05;
    const neutralMouthWidth = mouthBaseWidth * 0.9; 
    const neutralSmileCurvature = faceRadius * 0.02; 

    const mouthLeftX = centerX - neutralMouthWidth / 2;
    const mouthRightX = centerX + neutralMouthWidth / 2;

    const upperControlY = neutralMouthY - neutralSmileCurvature * 0.5; 
    const lowerControlY = neutralMouthY + neutralSmileCurvature * 0.5; 

    ctx.beginPath();
    ctx.moveTo(mouthLeftX, neutralMouthY);
    ctx.quadraticCurveTo(centerX, upperControlY, mouthRightX, neutralMouthY);
    ctx.quadraticCurveTo(centerX, lowerControlY, mouthLeftX, neutralMouthY);
    ctx.closePath();
    ctx.fill();
  }


  // --- 5. Bowtie ---
  const bowtieY = centerY + faceRadius * 0.85; 
  const bowtieWingWidth = faceRadius * 0.22;
  const bowtieWingHeight = faceRadius * 0.15;
  const bowtieKnotRadiusX = faceRadius * 0.06;
  const bowtieKnotRadiusY = faceRadius * 0.08;

  ctx.fillStyle = BOWTIE_COLOR;
  ctx.beginPath();
  ctx.moveTo(centerX - bowtieKnotRadiusX / 2, bowtieY); 
  ctx.lineTo(centerX - bowtieKnotRadiusX / 2 - bowtieWingWidth, bowtieY - bowtieWingHeight / 2);
  ctx.lineTo(centerX - bowtieKnotRadiusX / 2 - bowtieWingWidth, bowtieY + bowtieWingHeight / 2);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(centerX + bowtieKnotRadiusX / 2, bowtieY); 
  ctx.lineTo(centerX + bowtieKnotRadiusX / 2 + bowtieWingWidth, bowtieY - bowtieWingHeight / 2);
  ctx.lineTo(centerX + bowtieKnotRadiusX / 2 + bowtieWingWidth, bowtieY + bowtieWingHeight / 2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = BOWTIE_KNOT_COLOR;
  drawEllipse(ctx, centerX, bowtieY, bowtieKnotRadiusX, bowtieKnotRadiusY);
}
