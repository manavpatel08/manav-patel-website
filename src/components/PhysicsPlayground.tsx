import React, { useEffect, useRef, useCallback } from 'react';
import Matter from 'matter-js';
import { skills } from '../data/resumeData';

// Flatten all skills for the playground
const allSkills = Object.values(skills).flat();

// Brand colors for realistic spheres
const brandColors: Record<string, { from: string; to: string; shadow: string }> = {
  'React.js': { from: '#00d8ff', to: '#005f73', shadow: 'rgba(0, 216, 255, 0.5)' },
  'Next.js': { from: '#ffffff', to: '#555555', shadow: 'rgba(255, 255, 255, 0.4)' },
  'Python': { from: '#FFD43B', to: '#306998', shadow: 'rgba(48, 105, 152, 0.6)' },
  'Node.js': { from: '#68a063', to: '#2e4a2b', shadow: 'rgba(104, 160, 99, 0.5)' },
  'TypeScript': { from: '#3178C6', to: '#163b65', shadow: 'rgba(49, 120, 198, 0.5)' },
  'JavaScript': { from: '#F7DF1E', to: '#7a6e0c', shadow: 'rgba(247, 223, 30, 0.5)' },
  'PostgreSQL': { from: '#336791', to: '#183145', shadow: 'rgba(51, 103, 145, 0.5)' },
  'AWS': { from: '#FF9900', to: '#804c00', shadow: 'rgba(255, 153, 0, 0.5)' },
  'Docker': { from: '#2496ED', to: '#104e7e', shadow: 'rgba(36, 150, 237, 0.5)' },
  'Linux': { from: '#FCC624', to: '#333333', shadow: 'rgba(252, 198, 36, 0.4)' },
  'MongoDB': { from: '#47A248', to: '#214e22', shadow: 'rgba(71, 162, 72, 0.5)' },
  'Redis': { from: '#DC382D', to: '#701913', shadow: 'rgba(220, 56, 45, 0.6)' },
  'Tailwind': { from: '#06B6D4', to: '#035c6b', shadow: 'rgba(6, 182, 212, 0.5)' },
  'C++': { from: '#00599C', to: '#002642', shadow: 'rgba(0, 89, 156, 0.5)' },
  'Java': { from: '#ED8B00', to: '#7a4700', shadow: 'rgba(237, 139, 0, 0.5)' },
  'Git': { from: '#F05032', to: '#7d2617', shadow: 'rgba(240, 80, 50, 0.6)' },
  'GitHub': { from: '#ffffff', to: '#333333', shadow: 'rgba(255, 255, 255, 0.4)' },
  'TensorFlow': { from: '#FF6F00', to: '#803700', shadow: 'rgba(255, 111, 0, 0.6)' },
  'Keras': { from: '#D00000', to: '#5c0000', shadow: 'rgba(208, 0, 0, 0.5)' },
  'Scikit-learn': { from: '#F7931E', to: '#8c500c', shadow: 'rgba(247, 147, 30, 0.5)' },
  'Ansible': { from: '#EE0000', to: '#660000', shadow: 'rgba(238, 0, 0, 0.5)' },
  'FastAPI': { from: '#009688', to: '#004a43', shadow: 'rgba(0, 150, 136, 0.5)' },
  'Express.js': { from: '#eeeeee', to: '#555555', shadow: 'rgba(238, 238, 238, 0.5)' },
  'SQL': { from: '#4479A1', to: '#1c3e59', shadow: 'rgba(68, 121, 161, 0.5)' },
  'HTML5': { from: '#E34F26', to: '#7a250e', shadow: 'rgba(227, 79, 38, 0.5)' },
  'CSS3': { from: '#1572B6', to: '#0a426e', shadow: 'rgba(21, 114, 182, 0.5)' },
  'REST APIs': { from: '#009688', to: '#004d40', shadow: 'rgba(0, 150, 136, 0.5)' },
  'WebSockets': { from: '#FFD700', to: '#806c00', shadow: 'rgba(255, 215, 0, 0.5)' },
  'Supabase': { from: '#3ECF8E', to: '#1c6e48', shadow: 'rgba(62, 207, 142, 0.5)' },
  'Prisma': { from: '#2D3748', to: '#1a202c', shadow: 'rgba(45, 55, 72, 0.5)' },
  'FAISS': { from: '#0052CC', to: '#002a6b', shadow: 'rgba(0, 82, 204, 0.5)' },
  'NLP': { from: '#9C27B0', to: '#4a148c', shadow: 'rgba(156, 39, 176, 0.5)' },
  'Transformers': { from: '#FFEB3B', to: '#f57f17', shadow: 'rgba(255, 235, 59, 0.5)' },
  'LSTM': { from: '#FF9800', to: '#e65100', shadow: 'rgba(255, 152, 0, 0.5)' },
  'RAG': { from: '#4CAF50', to: '#1b5e20', shadow: 'rgba(76, 175, 80, 0.5)' },
  'OpenStack': { from: '#ED1944', to: '#7a0a21', shadow: 'rgba(237, 25, 68, 0.5)' },
  'Postman': { from: '#FF6C37', to: '#9e3916', shadow: 'rgba(255, 108, 55, 0.5)' },
  'VS Code': { from: '#007ACC', to: '#003e6b', shadow: 'rgba(0, 122, 204, 0.5)' },
  'Jupyter': { from: '#F37626', to: '#873d0f', shadow: 'rgba(243, 118, 38, 0.5)' },
  'Vercel': { from: '#ffffff', to: '#444444', shadow: 'rgba(255, 255, 255, 0.4)' },
};

const defaultColor = { from: '#7621B0', to: '#3d0a63', shadow: 'rgba(118, 33, 176, 0.4)' };

const PhysicsPlayground: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);

  const initPhysics = useCallback(() => {
    if (!sceneRef.current) return;

    // Teardown previous
    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
      renderRef.current.canvas.remove();
    }
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
    }

    const { Engine, Render, Runner, MouseConstraint, Mouse, World, Bodies, Events } = Matter;
    const width = sceneRef.current.clientWidth;
    const height = 500;

    const engine = Engine.create({
      gravity: { x: 0, y: 0.6, scale: 0.001 } // Smooth gravity
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
        pixelRatio: window.devicePixelRatio,
      },
    });
    renderRef.current = render;

    // Walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, wallOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions);
    
    World.add(engine.world, [ground, leftWall, rightWall]);

    // Create Balls
    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? 35 : 45;

    const balls = allSkills.map((skill) => {
      const x = Math.random() * (width - 100) + 50;
      const y = -Math.random() * 800 - 100;
      const colors = brandColors[skill as keyof typeof brandColors] || defaultColor;

      return Bodies.circle(x, y, radius, {
        restitution: 0.6, // Bounciness
        friction: 0.05,
        frictionAir: 0.01,
        density: 0.04,
        label: skill,
        render: {
          fillStyle: colors.from,
        },
        plugin: {
          colors,
          isHovered: false,
          skillName: skill
        }
      });
    });

    bodiesRef.current = balls;
    World.add(engine.world, balls);

    // Mouse Interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Custom 3D rendering loop
    Events.on(render, 'afterRender', () => {
      const context = render.context;
      if (!context) return;

      const bodies = Matter.Composite.allBodies(engine.world);

      bodies.forEach((body) => {
        if (!body.label || body.isStatic) return;

        const { x, y } = body.position;
        const r = body.circleRadius || radius;
        const plugin = body.plugin as any;
        const colors = plugin.colors;
        const isHovered = plugin.isHovered;

        context.save();
        context.translate(x, y);

        // Apply slight rotation for text alignment
        context.rotate(body.angle);

        // Scale effect on hover
        const scale = isHovered ? 1.1 : 1.0;
        context.scale(scale, scale);

        // 1. Drop shadow for depth
        context.shadowColor = colors.shadow;
        context.shadowBlur = 15;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 10;

        // 2. Base 3D gradient
        const grad = context.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r);
        grad.addColorStop(0, '#ffffff'); // Specular highlight
        grad.addColorStop(0.2, colors.from); // Base color
        grad.addColorStop(1, colors.to); // Dark edge

        context.beginPath();
        context.arc(0, 0, r, 0, 2 * Math.PI);
        context.fillStyle = grad;
        context.fill();

        // 3. Clear shadow for text
        context.shadowColor = 'transparent';

        // 4. Text
        context.fillStyle = '#ffffff';
        context.font = `bold ${isMobile ? '10px' : '12px'} 'Kanit', sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.shadowColor = 'rgba(0,0,0,0.5)';
        context.shadowBlur = 4;
        context.fillText(plugin.skillName, 0, 0);

        // 5. Glassy reflection overlay
        const glassGrad = context.createLinearGradient(-r, -r, r, r);
        glassGrad.addColorStop(0, 'rgba(255,255,255,0.4)');
        glassGrad.addColorStop(0.5, 'rgba(255,255,255,0.0)');
        context.beginPath();
        context.arc(0, 0, r, 0, 2 * Math.PI);
        context.fillStyle = glassGrad;
        context.fill();

        context.restore();
      });
    });

    // Hover detection logic
    Events.on(mouseConstraint, 'mousemove', (event) => {
      const mousePosition = event.mouse.position;
      const hoveredBodies = Matter.Query.point(bodiesRef.current, mousePosition);

      bodiesRef.current.forEach(body => {
        const plugin = body.plugin as any;
        if (hoveredBodies.includes(body)) {
          plugin.isHovered = true;
          document.body.style.cursor = 'grab';
        } else {
          plugin.isHovered = false;
        }
      });

      if (hoveredBodies.length === 0) {
        document.body.style.cursor = 'default';
      }
    });

    Events.on(mouseConstraint, 'mousedown', () => {
      document.body.style.cursor = 'grabbing';
    });
    Events.on(mouseConstraint, 'mouseup', () => {
      document.body.style.cursor = 'default';
    });

    Runner.run(Runner.create(), engine);
    Render.run(render);

  }, []);

  useEffect(() => {
    initPhysics();

    const handleResize = () => {
      initPhysics();
    };
    
    // Debounce resize
    let timeoutId: any;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 300);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, [initPhysics]);

  return (
    <div className="w-full relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.01]">
      {/* Decorative Blueprint Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 pointer-events-none" />
      
      {/* Floating CLI / Decorative Text */}
      <div className="absolute top-4 left-6 opacity-30 font-mono text-xs text-[#D7E2EA] pointer-events-none select-none">
        $ matter-js --engine physics --render 3d --mode interactive
      </div>

      <div
        ref={sceneRef}
        className="w-full h-[500px]"
        style={{ touchAction: 'none' }} // Prevent scrolling when touching canvas
      />
    </div>
  );
};

export default PhysicsPlayground;
