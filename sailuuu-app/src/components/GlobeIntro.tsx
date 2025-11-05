"use client";

import { useEffect, useRef, useState } from 'react';
import './GlobeIntro.css';

interface GlobeIntroProps {
  onComplete: () => void;
}

export default function GlobeIntro({ onComplete }: GlobeIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    let rotation = 0;
    let scale = 1;

    // Draw 3D globe
    const drawGlobe = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      // Center point
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 150 * scale;

      // Outer glow
      const glowGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.3);
      glowGradient.addColorStop(0, 'rgba(255, 105, 180, 0.3)');
      glowGradient.addColorStop(0.5, 'rgba(218, 112, 214, 0.2)');
      glowGradient.addColorStop(1, 'rgba(255, 105, 180, 0)');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Globe sphere with gradient
      const sphereGradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      sphereGradient.addColorStop(0, '#3a3a6e');
      sphereGradient.addColorStop(0.5, '#1a1a3e');
      sphereGradient.addColorStop(1, '#0a0a1e');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGradient;
      ctx.fill();

      // Inner shadow
      const shadowGradient = ctx.createRadialGradient(
        centerX + radius * 0.3,
        centerY + radius * 0.3,
        0,
        centerX,
        centerY,
        radius
      );
      shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadowGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.3)');
      shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
      ctx.fillStyle = shadowGradient;
      ctx.fill();

      // Draw latitude lines
      ctx.strokeStyle = 'rgba(255, 105, 180, 0.2)';
      ctx.lineWidth = 1;
      for (let i = -2; i <= 2; i++) {
        const y = centerY + (i * radius * 0.4);
        const width = Math.sqrt(radius * radius - (i * radius * 0.4) * (i * radius * 0.4)) * 2;
        ctx.beginPath();
        ctx.ellipse(centerX, y, width / 2, width / 8, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw longitude lines with rotation
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI / 4) + rotation;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 0.3, radius, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
      }

      // Draw continents (simplified landmasses)
      ctx.fillStyle = 'rgba(255, 105, 180, 0.3)';
      const continents = [
        { x: 0.3, y: -0.2, size: 0.3, rotation: rotation * 0.8 },
        { x: -0.4, y: 0.1, size: 0.25, rotation: rotation * 1.2 },
        { x: 0.2, y: 0.4, size: 0.2, rotation: rotation * 0.6 },
        { x: -0.3, y: -0.4, size: 0.22, rotation: rotation * 1.5 },
      ];

      continents.forEach(continent => {
        const x = centerX + continent.x * radius * Math.cos(continent.rotation);
        const y = centerY + continent.y * radius;
        const visible = Math.cos(continent.rotation);
        
        if (visible > 0) {
          ctx.globalAlpha = visible * 0.6;
          ctx.beginPath();
          ctx.ellipse(x, y, continent.size * radius * 0.5, continent.size * radius * 0.3, continent.rotation, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      ctx.restore();

      // Update rotation
      rotation += 0.01;

      if (isZooming) {
        scale += 0.05;
      }

      if (!isZooming || scale < 5) {
        requestAnimationFrame(drawGlobe);
      }
    };

    drawGlobe();

    // Start zoom animation after 3 seconds
    const zoomTimer = setTimeout(() => {
      setIsZooming(true);
    }, 3000);

    // Complete the intro after zoom completes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(completeTimer);
    };
  }, [isZooming, onComplete]);

  return (
    <div className={`globe-intro-overlay ${isZooming ? 'zooming' : ''}`}>
      <div className="globe-intro-container">
        <div className="globe-wrapper">
          <canvas ref={canvasRef} className="globe-canvas" />
        </div>
        
        <h1 className="globe-intro-text">Entering to our Worlds</h1>
        
        {/* Sparkles */}
        <div className="sparkles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
