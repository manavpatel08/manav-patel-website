import React, { useEffect, useRef } from 'react';

interface Node3D {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  x: number;
  y: number;
  z: number;
  baseAngle: number;
  radius: number;
  speed: number;
  elevation: number;
}

const SystemArchitectureNode: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = 300);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Architectural System Pipeline Nodes
    const nodes: Node3D[] = [
      { id: 'client', label: 'Clients', sublabel: 'Web / Mobile', color: '#3A6D8C', x: 0, y: 0, z: 0, baseAngle: 0, radius: 100, speed: 0.005, elevation: -20 },
      { id: 'gateway', label: 'API Gateway', sublabel: 'Rate Limit & Auth', color: '#BD5338', x: 0, y: 0, z: 0, baseAngle: 1.05, radius: 90, speed: 0.005, elevation: 25 },
      { id: 'services', label: 'Core Services', sublabel: 'Business Logic', color: '#3F6E50', x: 0, y: 0, z: 0, baseAngle: 2.1, radius: 105, speed: 0.005, elevation: -15 },
      { id: 'cache', label: 'Cache Layer', sublabel: 'Redis Cluster', color: '#C48229', x: 0, y: 0, z: 0, baseAngle: 3.14, radius: 95, speed: 0.005, elevation: 30 },
      { id: 'db', label: 'Database', sublabel: 'PostgreSQL', color: '#141413', x: 0, y: 0, z: 0, baseAngle: 4.2, radius: 110, speed: 0.005, elevation: -25 },
      { id: 'crdt', label: 'Sync Engine', sublabel: 'CRDTs & Sockets', color: '#6B587B', x: 0, y: 0, z: 0, baseAngle: 5.25, radius: 85, speed: 0.005, elevation: 15 },
    ];

    const hub = { label: 'Event Core', sublabel: 'Sub-100ms Bus', color: '#141413' };

    // Directed edges connecting the architectural pipeline
    const connections: [number, number][] = [
      [0, 1], // Clients -> Gateway
      [1, 2], // Gateway -> Services
      [2, 3], // Services <-> Cache
      [2, 4], // Services <-> Database
      [2, 5], // Services <-> Sync Engine
      [5, 0], // Sync Engine -> Clients
      [3, 4], // Cache <-> DB warm-up
    ];

    let time = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseRef.current.targetX = nx * 0.45;
      mouseRef.current.targetY = ny * 0.35;
    };

    const container = canvas.parentElement;
    container?.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      if (!isVisible) {
        animIdRef.current = requestAnimationFrame(render);
        return;
      }

      time += 0.009;
      
      // Smooth mouse tilt interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const tiltX = 0.45 + mouseRef.current.y;
      const rotY = time * 0.35 + mouseRef.current.x;

      // 3D projections
      const projected = nodes.map((node) => {
        const currentAngle = node.baseAngle + time * 0.25;
        const rawX = Math.cos(currentAngle) * node.radius;
        const rawZ = Math.sin(currentAngle) * node.radius;
        const rawY = node.elevation;

        const cosR = Math.cos(rotY);
        const sinR = Math.sin(rotY);
        const rx = rawX * cosR - rawZ * sinR;
        const rz = rawX * sinR + rawZ * cosR;

        const cosT = Math.cos(tiltX);
        const sinT = Math.sin(tiltX);
        const ry = rawY * cosT - rz * sinT;
        const fz = rawY * sinT + rz * cosT;

        const perspective = 300 / (300 + fz);
        const px = cx + rx * perspective;
        const py = cy + ry * perspective;

        return {
          ...node,
          px,
          py,
          scale: perspective,
          depth: fz,
        };
      });

      const hubScale = 1;
      const hubPx = cx;
      const hubPy = cy;

      // Orbit guide ring
      ctx.beginPath();
      ctx.ellipse(cx, cy, 98, 98 * Math.sin(tiltX), 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(20, 20, 19, 0.07)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Connection edges
      connections.forEach(([i, j]) => {
        const n1 = projected[i];
        const n2 = projected[j];
        ctx.beginPath();
        ctx.moveTo(n1.px, n1.py);
        ctx.lineTo(n2.px, n2.py);
        ctx.strokeStyle = 'rgba(20, 20, 19, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Data packets flowing through architecture pipeline
        const packetProgress = (time * 0.75 + (i * 0.3 + j * 0.15)) % 1;
        const packetX = n1.px + (n2.px - n1.px) * packetProgress;
        const packetY = n1.py + (n2.py - n1.py) * packetProgress;
        ctx.beginPath();
        ctx.arc(packetX, packetY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = n1.color;
        ctx.fill();
      });

      // Connections to Hub
      projected.slice(1, 4).forEach((n) => {
        ctx.beginPath();
        ctx.moveTo(hubPx, hubPy);
        ctx.lineTo(n.px, n.py);
        ctx.strokeStyle = 'rgba(20, 20, 19, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Depth sorting
      const sorted = [...projected].sort((a, b) => a.depth - b.depth);

      // Hub Node
      ctx.beginPath();
      ctx.arc(hubPx, hubPy, 6 * hubScale, 0, Math.PI * 2);
      ctx.fillStyle = hub.color;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Outer Nodes
      sorted.forEach((node) => {
        const nodeR = 5 * node.scale;

        ctx.beginPath();
        ctx.arc(node.px, node.py, Math.max(3.5, nodeR), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node Title
        ctx.fillStyle = '#141413';
        ctx.font = `600 ${Math.max(9, Math.round(10 * node.scale))}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.px, node.py - nodeR - 4);
      });

      animIdRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 360;
      height = canvas.height = 300;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      observer.disconnect();
      container?.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full relative flex flex-col items-center select-none">
      <div className="w-full flex items-center justify-between px-4 py-2.5 border-b border-black/8 text-[11px] font-mono text-[#524F4A] bg-[#ECE6DC]/50">
        <span className="flex items-center gap-1.5 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3F6E50]" />
          SCHEMATIC :: DISTRIBUTED PIPELINE
        </span>
        <span className="text-[#827E77]">INTERACTIVE 3D MESH</span>
      </div>
      <canvas ref={canvasRef} className="w-full block cursor-crosshair bg-white" />
    </div>
  );
};

export default SystemArchitectureNode;

// done
