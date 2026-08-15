"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import Link from "next/link";

const projects = [
  { title: "Mavyn", url: "https://mavyn.ae/", image: "/covers/1.png" },
  { title: "Xarr Studio", url: "https://www.xarrstudio.com/", image: "/covers/2.png" },
  { title: "Latin Dance", url: "https://latindance.net/", image: "/covers/3.png" },
];

const CONFIG = {
  SLIDE_ASPECT_RATIO: 1.6,
  SLIDE_GAP_RATIO: 0.06,
  BARREL_SCALE: 0.32,
  BARREL_EDGE_LIFT: 0.25,
  BARREL_ATTACK_LERP: 0.06,
  BARREL_RELEASE_LERP: 0.035,
  BARREL_VELOCITY_THRESHOLD: 0.012,
  BARREL_SPEED_FACTOR: 0.18,
  BARREL_IMPULSE_FACTOR: 1.8,
  BARREL_MAX_STRENGTH: 1,
  SCROLL_SPEED: 0.00112,
  SCROLL_DAMPING: 0.93,
  SNAP_SMOOTH_TIME: 0.9,
  SNAP_SETTLE_OFFSET: 0.0005,
  SNAP_SETTLE_VELOCITY: 0.001,
};

const vertexShader = `
uniform float uBarrelStrength;
uniform float uBarrelScale;
uniform float uBarrelEdgeLift;
uniform float uMeshX;
uniform float uMeshWidth;
uniform float uViewportWidth;
varying vec2 vUv;
const float M_PI = 3.14159265;
vec3 globalViewportBarrelY(vec3 pos) {
  float vertexWorldX = uMeshX + pos.x * uMeshWidth;
  float normalizedX = clamp(vertexWorldX / (uViewportWidth * 0.5), -1.0, 1.0);
  float distFromCenter = abs(normalizedX);
  float pinchAtX = cos(distFromCenter * M_PI * 0.5);
  float edgeAtX = 1.0 - pinchAtX;
  float s = uBarrelStrength * uBarrelScale;
  pos.y *= 1.0 - pinchAtX * s;
  pos.y *= 1.0 + edgeAtX * s * uBarrelEdgeLift;
  return pos;
}
void main() {
  vUv = uv;
  vec3 pos = globalViewportBarrelY(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uImageTexture;
uniform float uReveal;
varying vec2 vUv;
void main() {
  vec4 color = texture2D(uImageTexture, vUv);
  color.a *= uReveal;
  gl_FragColor = color;
}
`;

export function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sceneDataRef = useRef<{
    slides: { mesh: THREE.Mesh; material: THREE.ShaderMaterial; baseOffsetX: number; dataIndex: number }[];
    globalOffset: number;
    scrollVelocity: number;
    barrelStrength: number;
    hadInput: boolean;
    snapTarget: number;
    stride: number;
    viewportWidth: number;
    slideWidth: number;
  } | null>(null);

  const initScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();
    const fov = 75;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const vFov = (fov * Math.PI) / 180;
    const worldHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
    const worldWidth = (width / height) * worldHeight;

    const slideW = worldWidth * (width < 768 ? 0.65 : 0.5);
    const slideH = slideW / CONFIG.SLIDE_ASPECT_RATIO;
    const gap = slideW * CONFIG.SLIDE_GAP_RATIO;
    const stride = slideW + gap;

    const loader = new THREE.TextureLoader();
    const textures = projects.map((p) => loader.load(p.image));
    const geometry = new THREE.PlaneGeometry(1, 1, 32, 10);
    const visibleSlides = 3;
    const slides: { mesh: THREE.Mesh; material: THREE.ShaderMaterial; baseOffsetX: number; dataIndex: number }[] = [];
    const centerIdx = Math.floor(visibleSlides / 2);

    // Push the card down so text has space above
    const planeYOffset = -worldHeight * 0.18;

    for (let i = 0; i < visibleSlides; i++) {
      const dataIndex = i % projects.length;
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uImageTexture: { value: textures[dataIndex] },
          uReveal: { value: 1 },
          uBarrelStrength: { value: 0 },
          uBarrelScale: { value: CONFIG.BARREL_SCALE },
          uBarrelEdgeLift: { value: CONFIG.BARREL_EDGE_LIFT },
          uMeshX: { value: 0 },
          uMeshWidth: { value: slideW },
          uViewportWidth: { value: worldWidth },
        },
        transparent: true,
        side: THREE.FrontSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;
      const baseOffsetX = (i - centerIdx) * stride;
      mesh.position.x = baseOffsetX;
      mesh.position.y = planeYOffset;
      mesh.scale.set(slideW, slideH, 1);
      scene.add(mesh);
      slides.push({ mesh, material, baseOffsetX, dataIndex });
    }

    sceneDataRef.current = {
      slides, globalOffset: 0, scrollVelocity: 0, barrelStrength: 0,
      hadInput: false, snapTarget: 0, stride, viewportWidth: worldWidth, slideWidth: slideW,
    };

    let lastTime = performance.now();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const data = sceneDataRef.current!;

      if (data.hadInput) {
        data.scrollVelocity *= Math.pow(CONFIG.SCROLL_DAMPING, 60 * dt);
        data.globalOffset += data.scrollVelocity * dt * 60;
        if (Math.abs(data.scrollVelocity) < CONFIG.BARREL_VELOCITY_THRESHOLD) {
          data.hadInput = false;
          data.snapTarget = Math.round(data.globalOffset / data.stride) * data.stride;
        }
      } else {
        const diff = data.globalOffset - data.snapTarget;
        const omega = 2 / Math.max(0.0001, CONFIG.SNAP_SMOOTH_TIME);
        const x = omega * dt;
        const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
        const deltaVel = (data.scrollVelocity + omega * diff) * dt;
        data.scrollVelocity = (data.scrollVelocity - omega * deltaVel) * exp;
        data.globalOffset = data.snapTarget + (diff + deltaVel) * exp;
        if (Math.abs(data.globalOffset - data.snapTarget) < CONFIG.SNAP_SETTLE_OFFSET && Math.abs(data.scrollVelocity) < CONFIG.SNAP_SETTLE_VELOCITY) {
          data.globalOffset = data.snapTarget;
          data.scrollVelocity = 0;
        }
      }

      const absVel = Math.abs(data.scrollVelocity);
      const targetBarrel = absVel > CONFIG.BARREL_VELOCITY_THRESHOLD
        ? Math.min(absVel * CONFIG.BARREL_SPEED_FACTOR * CONFIG.BARREL_IMPULSE_FACTOR, CONFIG.BARREL_MAX_STRENGTH) : 0;
      const barrelLerp = targetBarrel > data.barrelStrength ? CONFIG.BARREL_ATTACK_LERP : CONFIG.BARREL_RELEASE_LERP;
      data.barrelStrength += (targetBarrel - data.barrelStrength) * barrelLerp;

      const totalWidth = projects.length * data.stride;
      const halfTotal = totalWidth / 2;

      for (const slide of data.slides) {
        let worldX = slide.baseOffsetX + data.globalOffset;
        while (worldX < -halfTotal) worldX += totalWidth;
        while (worldX > halfTotal) worldX -= totalWidth;
        slide.mesh.position.x = worldX;
        slide.material.uniforms.uBarrelStrength.value = data.barrelStrength;
        slide.material.uniforms.uMeshX.value = worldX;

        const slotIndex = Math.round(worldX / data.stride);
        const centeredProject = Math.round(-data.globalOffset / data.stride);
        const projectIdx = ((centeredProject + slotIndex) % projects.length + projects.length) % projects.length;
        if (projectIdx !== slide.dataIndex) {
          slide.dataIndex = projectIdx;
          slide.material.uniforms.uImageTexture.value = textures[projectIdx];
        }
      }

      const centeredSlideIndex = Math.round(-data.globalOffset / data.stride);
      setCurrentIndex(((centeredSlideIndex % projects.length) + projects.length) % projects.length);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      geometry.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const cleanup = initScene();
    return cleanup;
  }, [initScene]);

  // Wheel handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Don't capture wheel - let page scroll normally
      // Cards only move by dragging
      return;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Drag handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let isDragging = false;
    let lastX = 0;
    let dragVelocity = 0;

    const onDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      dragVelocity = 0;
      (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
      if (sceneDataRef.current) { sceneDataRef.current.hadInput = true; sceneDataRef.current.scrollVelocity = 0; }
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging || !sceneDataRef.current) return;
      const dx = e.clientX - lastX;
      const pixelToWorld = sceneDataRef.current.viewportWidth / container.clientWidth;
      sceneDataRef.current.globalOffset += dx * pixelToWorld;
      dragVelocity = dx * pixelToWorld * 0.3;
      sceneDataRef.current.hadInput = true;
      lastX = e.clientX;
    };
    const onUp = () => {
      if (!isDragging || !sceneDataRef.current) return;
      isDragging = false;
      sceneDataRef.current.scrollVelocity = dragVelocity;
      sceneDataRef.current.hadInput = true;
    };

    container.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      container.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Header text */}
      <div className="absolute top-16 left-0 right-0 text-center z-10 pointer-events-none px-6">
        <p className="text-xs uppercase tracking-widest opacity-40 mb-4">Featured Work</p>
        <p
          className="text-3xl md:text-4xl lg:text-5xl max-w-[700px] mx-auto leading-[1.2]"
          style={{ fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif', fontStyle: "italic" }}
        >
          Real projects we&apos;ve built — websites, AI systems, and digital experiences that drive growth.
        </p>
      </div>

      {/* Three.js canvas */}
      <div ref={containerRef} className="w-full h-full touch-none" />

      {/* Project title left */}
      <div className="absolute bottom-16 md:bottom-8 left-6 md:left-8 z-10 pointer-events-none">
        <p className="text-sm tracking-wide opacity-70">{projects[currentIndex]?.title}</p>
      </div>

      {/* See live right */}
      <div className="absolute bottom-16 md:bottom-8 right-6 md:right-8 z-[1001]">
        <a href={projects[currentIndex]?.url} target="_blank" rel="noopener noreferrer"
          className="text-sm italic opacity-70 hover:opacity-100 transition-opacity pointer-events-auto">
          See live →
        </a>
      </div>

      {/* View more work */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <Link href="/work" className="pointer-events-auto">
          <button className="btn-outline text-xs">View more work</button>
        </Link>
      </div>
    </div>
  );
}
