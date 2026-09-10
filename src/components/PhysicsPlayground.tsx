import React, { useEffect, useRef, useCallback } from 'react';
import Matter from 'matter-js';
import { skills } from '../data/resumeData';

// Flatten all skills for the playground
const allSkills = Object.values(skills).flat();

// Curated solid pastel tokens with high-contrast text and borders
const pastelPalettes = [
  { bg: '#E8F0E9', border: '#B8D5BA', text: '#214E25' }, // Sage
  { bg: '#EBF2F9', border: '#BCD4EB', text: '#1E4A6F' }, // Dusty Blue
  { bg: '#FDF6EC', border: '#F3DBBE', text: '#7A4B17' }, // Warm Amber
  { bg: '#FBEFEF', border: '#F2D0CE', text: '#803429' }, // Muted Coral
  { bg: '#F3EFF9', border: '#D9CBEE', text: '#4C3766' }, // Soft Lavender
  { bg: '#EFECE6', border: '#DCD6CB', text: '#2A2E33' }, // Warm Gray
];

const PhysicsPlayground: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);

  const initPhysics = useCallback(() => {
    if (!sceneRef.current) return;

    // Teardown previous instances
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current);
    }
    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
      renderRef.current.canvas.remove();
    }
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
    }

    const { Engine, Render, Runner, MouseConstraint, Mouse, World, Bodies, Events } = Matter;
    const width = sceneRef.current.clientWidth;
    const height = 460;

    const engine = Engine.create({
      gravity: { x: 0, y: 0.65, scale: 0.001 },
    });
    engineRef.current = engine;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      },
    });
    renderRef.current = render;

    // Static boundary walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 25, width * 2, 50, wallOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height * 2, wallOptions);
    
    World.add(engine.world, [ground, leftWall, rightWall]);

    // Create interactive skill spheres
    const isMobile = width < 640;
    const radius = isMobile ? 32 : 38;
    const skillList = Array.from(new Set(allSkills)).slice(0, 32);

    const bodies = skillList.map((skill, index) => {
      const x = (width * 0.15) + (index % 8) * (radius * 2.2) + (Math.random() * 20 - 10);
      const y = -60 - Math.floor(index / 8) * (radius * 2.5);

      const palette = pastelPalettes[index % pastelPalettes.length];

      const body = Bodies.circle(x, y, radius, {
        restitution: 0.45,
        friction: 0.15,
        frictionAir: 0.02,
        density: 0.002,
        label: skill,
        plugin: {
          skillName: skill,
          palette,
          isHovered: false,
          radius,
        },
      });

      return body;
    });

    bodiesRef.current = bodies;
    World.add(engine.world, bodies);

    // Mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Custom Canvas Render Loop (SOLID PASTELS, NO GRADIENTS, NO GLOW)
    Events.on(render, 'afterRender', () => {
      const context = render.context;
      if (!context) return;

      bodies.forEach((body) => {
        if (!body.label || body.isStatic) return;

        const { x, y } = body.position;
        const plugin = body.plugin as any;
        const palette = plugin.palette;
        const isHovered = plugin.isHovered;
        const r = plugin.radius || radius;

        context.save();
        context.translate(x, y);
        context.rotate(body.angle);

        const scale = isHovered ? 1.05 : 1.0;
        context.scale(scale, scale);

        // 1. Subtle natural shadow
        context.shadowColor = 'rgba(0, 0, 0, 0.06)';
        context.shadowBlur = isHovered ? 12 : 6;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = isHovered ? 5 : 2;

        // 2. Solid pastel background fill (NO GRADIENTS)
        context.beginPath();
        context.arc(0, 0, r, 0, 2 * Math.PI);
        context.fillStyle = palette.bg;
        context.fill();

        // 3. Crisp hairline border
        context.strokeStyle = isHovered ? '#171717' : palette.border;
        context.lineWidth = isHovered ? 1.5 : 1;
        context.stroke();

        // 4. Typography (High-contrast, monospace engineering aesthetic)
        context.shadowColor = 'transparent';
        context.fillStyle = palette.text;
        context.font = `600 ${isMobile ? '10px' : '11px'} 'JetBrains Mono', monospace`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(plugin.skillName, 0, 0);

        context.restore();
      });
    });

    // Hover detection logic
    Events.on(mouseConstraint, 'mousemove', (event) => {
      const mousePosition = event.mouse.position;
      const hoveredBodies = Matter.Query.point(bodiesRef.current, mousePosition);

      bodiesRef.current.forEach((body) => {
        const plugin = body.plugin as any;
        if (hoveredBodies.includes(body)) {
          plugin.isHovered = true;
          if (sceneRef.current) sceneRef.current.style.cursor = 'grab';
        } else {
          plugin.isHovered = false;
        }
      });

      if (hoveredBodies.length === 0 && sceneRef.current) {
        sceneRef.current.style.cursor = 'default';
      }
    });

    Events.on(mouseConstraint, 'mousedown', () => {
      if (sceneRef.current) sceneRef.current.style.cursor = 'grabbing';
    });
    Events.on(mouseConstraint, 'mouseup', () => {
      if (sceneRef.current) sceneRef.current.style.cursor = 'default';
    });

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    if (render.context) {
      Render.run(render);
    }
  }, []);

  useEffect(() => {
    initPhysics();

    let timeoutId: any;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(initPhysics, 250);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        renderRef.current.canvas?.remove();
      }
      if (engineRef.current) Matter.Engine.clear(engineRef.current);
    };
  }, [initPhysics]);

  return (
    <div className="w-full rounded-2xl bg-white border border-black/8 shadow-sm overflow-hidden p-3 sm:p-4 relative select-none">
      <div className="flex items-center justify-between pb-3 px-2 border-b border-black/5 text-[11px] font-mono text-[#57606A]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#735E8E]" />
          <span>PHYSICS SIMULATION :: RIGID BODY 2D</span>
        </div>
        <span className="hidden sm:inline text-[#8C959F]">CLICK & DRAG CHIPS</span>
      </div>
      <div ref={sceneRef} className="w-full h-[460px] relative overflow-hidden" />
    </div>
  );
};

export default PhysicsPlayground;
