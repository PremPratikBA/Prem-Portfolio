import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return; // Fallback to CSS gradient
    }

    let animationFrameId: number;
    let stars: Star[] = [];
    
    // Responsive star count
    const getStarCount = () => {
      if (window.innerWidth < 768) return 100; // Mobile
      if (window.innerWidth < 1280) return 200; // Tablet
      return 350; // Desktop
    };

    class Star {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
      twinkleSpeed: number;
      twinkleDir: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.2 + 0.3;
        this.opacity = Math.random();
        this.speed = Math.random() * 0.2 + 0.05;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
      }

      update(width: number, height: number) {
        // Move upwards slowly
        this.y -= this.speed;
        
        // Wrap around
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }

        // Twinkle effect
        this.opacity += this.twinkleSpeed * this.twinkleDir;
        if (this.opacity >= 1) {
          this.opacity = 1;
          this.twinkleDir = -1;
        } else if (this.opacity <= 0.1) {
          this.opacity = 0.1;
          this.twinkleDir = 1;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        
        // Add a slight glow to larger stars
        if (this.radius > 1) {
          ctx.shadowBlur = 5;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const count = getStarCount();
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push(new Star(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      // Create a trailing effect by using a semi-transparent black fill instead of clearRect
      ctx.fillStyle = 'rgba(5, 5, 10, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.update(canvas.width, canvas.height);
        star.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#05050a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};
