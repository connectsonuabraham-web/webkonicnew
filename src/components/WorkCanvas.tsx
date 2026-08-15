"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

const projects = [
  {
    name: "Mavyn",
    description: "Premium real estate digital experience",
    image: "/covers/1.png",
    liveUrl: "https://mavyn.ae/",
  },
  {
    name: "Xarr Studio",
    description: "Creative studio & digital agency",
    image: "/covers/2.png",
    liveUrl: "https://www.xarrstudio.com/",
  },
  {
    name: "Latin Dance",
    description: "Dance community & events platform",
    image: "/covers/3.png",
    liveUrl: "https://latindance.net/",
  },
  {
    name: "Let's Progress",
    description: "Growth & development platform",
    image: "/covers/4.png",
    liveUrl: "https://lets-progress.com/en/",
  },
  {
    name: "Raysaar",
    description: "Brand & digital presence",
    image: "/covers/5.png",
    liveUrl: "https://raysaar.com/",
  },
  {
    name: "Montreal Bachata Festival",
    description: "International dance festival experience",
    image: "/covers/6.png",
    liveUrl: "https://montrealbachatafestival.com/",
  },
];

// Carousel config matching the original
const CONFIG = {
  SLIDE_ASPECT_RATIO: 1.6,
  SLIDE_MAX_VW: 0.5,
  SLIDE_MAX_VH: 0.5,
  SLIDE_GAP_RATIO: 0.04,
  PLANE_SEGMENTS_X: 32,
  PLANE_SEGMENTS_Y: 10,
  VISIBLE_SLIDES: 5,
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
  TRANSITION_DURATION: 1.2,
  TRANSITION_DISPLACEMENT_EFFECT: 1.2,
  ENTRY_REVEAL_DURATION: 1.4,
  ENTRY_REVEAL_STAGGER: 0.14,
  ENTRY_REVEAL_DELAY: 0.1,
  GRID_UV_DISTORT: 0.02,
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

// Global viewport pincushion on Y — continuous across all visible cards.
vec3 globalViewportBarrelY(vec3 pos) {
  float vertexWorldX = uMeshX + pos.x * uMeshWidth;
  float normalizedX = clamp(vertexWorldX / (uViewportWidth * 0.5), -1.0, 1.0);
  float distFromCenter = abs(normalizedX);

  // 1 at viewport center -> max pinch, 0 at edges -> no pinch
  float pinchAtX = cos(distFromCenter * M_PI * 0.5);
  float edgeAtX = 1.0 - pinchAtX;
  float s = uBarrelStrength * uBarrelScale;

  // Inward curve: compress at center, lift at edges
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
uniform sampler2D uDispTexture;
uniform sampler2D uDataTexture;
uniform vec4 uImageCover;
uniform float uReveal;
uniform float uDispEffectFactor;
uniform float uGridUvDistort;

varying vec2 vUv;

vec2 coverUv(vec2 uv, vec4 cover) {
  return uv * cover.xy + cover.zw;
}

void main() {
  vec4 disp = texture2D(uDispTexture, vUv);
  float dispVal = disp.r * uDispEffectFactor;
  float revealDisp = (1.0 - uReveal) * dispVal;

  // Grid mouse distortion (water ripple effect)
  vec4 gridOffset = texture2D(uDataTexture, vUv);
  
  vec2 imgUv = coverUv(vUv, uImageCover);
  imgUv.x += revealDisp;
  imgUv -= uGridUvDistort * gridOffset.rg;

  vec4 color = texture2D(uImageTexture, imgUv);
  color.a *= uReveal;
  gl_FragColor = color;
}
`;

// Compute cover UV to maintain aspect ratio (object-fit: cover)
function computeCoverUv(
  imgW: number,
  imgH: number,
  planeAspect: number
): [number, number, number, number] {
  const imgAspect = imgW / imgH;
  let scaleX = 1,
    scaleY = 1,
    offsetX = 0,
    offsetY = 0;

  if (imgAspect > planeAspect) {
    scaleX = planeAspect / imgAspect;
    offsetX = (1 - scaleX) / 2;
  } else {
    scaleY = imgAspect / planeAspect;
    offsetY = (1 - scaleY) / 2;
  }

  return [scaleX, scaleY, offsetX, offsetY];
}

export function WorkCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const sceneDataRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    slides: {
      mesh: THREE.Mesh;
      material: THREE.ShaderMaterial;
      baseOffsetX: number;
      dataIndex: number;
    }[];
    projectTextures: THREE.Texture[];
    gridTextures: THREE.DataTexture[];
    gridMouseStates: { x: number; y: number; prevX: number; prevY: number; vX: number; vY: number }[];
    globalOffset: number;
    scrollVelocity: number;
    barrelStrength: number;
    hadInput: boolean;
    snapTarget: number;
    animationId: number;
    viewportWidth: number;
    slideWidth: number;
    slideHeight: number;
    stride: number;
  } | null>(null);

  const initScene = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const fov = 75;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Compute slide dimensions (matching original logic)
    const vFov = (fov * Math.PI) / 180;
    const worldHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
    const worldWidth = (width / height) * worldHeight;

    let slideW: number;
    let slideH: number;

    if (width < 768) {
      // Mobile: cards bigger
      slideW = worldWidth * 0.8;
      slideH = slideW / CONFIG.SLIDE_ASPECT_RATIO;
    } else {
      // Desktop: large cards
      slideW = worldWidth * 0.55;
      slideH = worldHeight * 0.5;
      const maxW = slideH * CONFIG.SLIDE_ASPECT_RATIO;
      if (maxW > slideW) {
        slideH = slideW / CONFIG.SLIDE_ASPECT_RATIO;
      } else {
        slideW = maxW;
      }
    }

    const gap = slideW * CONFIG.SLIDE_GAP_RATIO;
    const stride = slideW + gap;

    // Load textures
    const loader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    const dispTexture = loader.load("/images/assets/displacement.png");

    const centerIdx = Math.floor(CONFIG.VISIBLE_SLIDES / 2);
    const slides: {
      mesh: THREE.Mesh;
      material: THREE.ShaderMaterial;
      baseOffsetX: number;
      dataIndex: number;
    }[] = [];

    const geometry = new THREE.PlaneGeometry(
      1,
      1,
      CONFIG.PLANE_SEGMENTS_X,
      CONFIG.PLANE_SEGMENTS_Y
    );

    // Preload all project textures
    const projectTextures: THREE.Texture[] = [];
    for (let p = 0; p < projects.length; p++) {
      projectTextures.push(loader.load(projects[p].image));
    }

    for (let i = 0; i < CONFIG.VISIBLE_SLIDES; i++) {
      const dataIndex =
        ((i - centerIdx) % projects.length + projects.length) % projects.length;
      const texture = projectTextures[dataIndex];
      textures.push(texture);

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uImageTexture: { value: texture },
          uDispTexture: { value: dispTexture },
          uDataTexture: { value: null as unknown as THREE.DataTexture },
          uImageCover: { value: new THREE.Vector4(1, 1, 0, 0) },
          uReveal: { value: 0 },
          uDispEffectFactor: { value: CONFIG.TRANSITION_DISPLACEMENT_EFFECT },
          uGridUvDistort: { value: CONFIG.GRID_UV_DISTORT },
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
      mesh.scale.set(slideW, slideH, 1);
      scene.add(mesh);

      slides.push({ mesh, material, baseOffsetX, dataIndex });
    }

    // Create grid DataTextures for water ripple effect
    const GRID_SIZE = 12;
    const gridTextures: THREE.DataTexture[] = [];
    const gridMouseStates: { x: number; y: number; prevX: number; prevY: number; vX: number; vY: number }[] = [];
    
    for (let i = 0; i < CONFIG.VISIBLE_SLIDES; i++) {
      const data = new Float32Array(4 * GRID_SIZE * GRID_SIZE);
      const tex = new THREE.DataTexture(data, GRID_SIZE, GRID_SIZE, THREE.RGBAFormat, THREE.FloatType);
      tex.needsUpdate = true;
      gridTextures.push(tex);
      slides[i].material.uniforms.uDataTexture.value = tex;
      gridMouseStates.push({ x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 });
    }

    // Step grid distortion (water ripple physics)
    function stepGrid(tex: THREE.DataTexture, mouse: { x: number; y: number; vX: number; vY: number }) {
      const data = tex.image.data as Float32Array;
      const len = GRID_SIZE * GRID_SIZE;
      const relaxation = 0.9;
      const strength = 0.15;
      const radius = 0.1;
      
      // Decay existing distortion
      for (let i = 0; i < len; i++) {
        data[4 * i] *= relaxation;
        data[4 * i + 1] *= relaxation;
      }
      
      // Apply mouse influence
      const mx = GRID_SIZE * mouse.x;
      const my = GRID_SIZE * mouse.y;
      const r = GRID_SIZE * radius;
      
      for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
          const dx = mx - x;
          const dy = my - y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < r * r && dist2 > 0) {
            const idx = 4 * (x + GRID_SIZE * y);
            const factor = Math.min(r / Math.sqrt(dist2), 10);
            data[idx] += 100 * strength * mouse.vX * factor;
            data[idx + 1] -= 100 * strength * mouse.vY * factor;
          }
        }
      }
      
      mouse.vX = 0;
      mouse.vY = 0;
      tex.needsUpdate = true;
    }

    // Entry reveal animation
    slides.forEach((slide, i) => {
      const delay = CONFIG.ENTRY_REVEAL_DELAY;
      const stagger = CONFIG.ENTRY_REVEAL_STAGGER;
      const duration = CONFIG.ENTRY_REVEAL_DURATION;
      const startTime = performance.now() + (delay + i * stagger) * 1000;

      const animateReveal = () => {
        const elapsed = (performance.now() - startTime) / 1000;
        if (elapsed < 0) {
          requestAnimationFrame(animateReveal);
          return;
        }
        const progress = Math.min(elapsed / duration, 1);
        // power2.out easing
        const eased = 1 - Math.pow(1 - progress, 2);
        slide.material.uniforms.uReveal.value = eased;
        if (progress < 1) requestAnimationFrame(animateReveal);
      };
      requestAnimationFrame(animateReveal);
    });

    sceneDataRef.current = {
      scene,
      camera,
      renderer,
      slides,
      projectTextures,
      gridTextures,
      gridMouseStates,
      globalOffset: 0,
      scrollVelocity: 0,
      barrelStrength: 0,
      hadInput: false,
      snapTarget: 0,
      animationId: 0,
      viewportWidth: worldWidth,
      slideWidth: slideW,
      slideHeight: slideH,
      stride,
    };

    // Animation loop
    let lastTime = performance.now();
    const animate = () => {
      const id = requestAnimationFrame(animate);
      sceneDataRef.current!.animationId = id;

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const data = sceneDataRef.current!;

      // Apply damping to scroll velocity
      if (data.hadInput) {
        data.scrollVelocity *= Math.pow(CONFIG.SCROLL_DAMPING, 60 * dt);
        data.globalOffset += data.scrollVelocity * dt * 60;

        // If velocity is low enough, switch to snap mode
        if (Math.abs(data.scrollVelocity) < CONFIG.BARREL_VELOCITY_THRESHOLD) {
          data.hadInput = false;
          // Calculate nearest snap target
          data.snapTarget = Math.round(data.globalOffset / stride) * stride;
        }
      } else {
        // Smooth snap to target (critical damper approach)
        const diff = data.globalOffset - data.snapTarget;
        const omega = 2 / Math.max(0.0001, CONFIG.SNAP_SMOOTH_TIME);
        const x = omega * dt;
        const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
        const deltaVel =
          (data.scrollVelocity + omega * diff) * dt;
        data.scrollVelocity =
          (data.scrollVelocity - omega * deltaVel) * exp;
        data.globalOffset =
          data.snapTarget + (diff + deltaVel) * exp;

        // Settle
        if (
          Math.abs(data.globalOffset - data.snapTarget) <
            CONFIG.SNAP_SETTLE_OFFSET &&
          Math.abs(data.scrollVelocity) < CONFIG.SNAP_SETTLE_VELOCITY
        ) {
          data.globalOffset = data.snapTarget;
          data.scrollVelocity = 0;
        }
      }

      // Update barrel strength based on velocity (jelly effect)
      const absVel = Math.abs(data.scrollVelocity);
      const targetBarrel =
        absVel > CONFIG.BARREL_VELOCITY_THRESHOLD
          ? Math.min(
              absVel * CONFIG.BARREL_SPEED_FACTOR * CONFIG.BARREL_IMPULSE_FACTOR,
              CONFIG.BARREL_MAX_STRENGTH
            )
          : 0;

      const barrelLerp =
        targetBarrel > data.barrelStrength
          ? CONFIG.BARREL_ATTACK_LERP
          : CONFIG.BARREL_RELEASE_LERP;
      data.barrelStrength += (targetBarrel - data.barrelStrength) * barrelLerp;

      // Update slide positions and uniforms — INFINITE LOOP WRAPPING
      const totalWidth = CONFIG.VISIBLE_SLIDES * data.stride;
      const halfTotal = totalWidth / 2;

      for (const slide of data.slides) {
        let worldX = slide.baseOffsetX + data.globalOffset;

        // Wrap around using visible slides width
        while (worldX < -halfTotal) worldX += totalWidth;
        while (worldX > halfTotal) worldX -= totalWidth;

        slide.mesh.position.x = worldX;
        slide.material.uniforms.uBarrelStrength.value = data.barrelStrength;
        slide.material.uniforms.uMeshX.value = worldX;

        // Assign texture based on position — map world position to project index
        const slotIndex = Math.round(worldX / data.stride);
        const centeredProject = Math.round(-data.globalOffset / data.stride);
        const projectIdx = centeredProject + slotIndex;
        const wrappedDataIndex =
          ((projectIdx % projects.length) + projects.length) % projects.length;
        if (wrappedDataIndex !== slide.dataIndex) {
          slide.dataIndex = wrappedDataIndex;
          slide.material.uniforms.uImageTexture.value =
            data.projectTextures[wrappedDataIndex];
        }
      }

      // Determine current centered index
      const centeredSlideIndex = Math.round(-data.globalOffset / data.stride);
      const wrappedIndex =
        ((centeredSlideIndex % projects.length) + projects.length) %
        projects.length;
      setCurrentIndex(wrappedIndex);

      // Step grid distortion for each slide (water ripple)
      for (let i = 0; i < data.slides.length; i++) {
        stepGrid(data.gridTextures[i], data.gridMouseStates[i]);
      }

      renderer.render(scene, camera);
    };

    animate();
    setLoaded(true);

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (sceneDataRef.current) {
        cancelAnimationFrame(sceneDataRef.current.animationId);
      }
      renderer.dispose();
      geometry.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const cleanup = initScene();
    return cleanup;
  }, [initScene]);

  // Scroll/wheel handler
  useEffect(() => {
    let wheelTimeout: ReturnType<typeof setTimeout> | null = null;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const data = sceneDataRef.current;
      if (!data) return;

      // Each wheel tick snaps to next/prev card
      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      
      // Accumulate small velocity for the jelly effect
      data.scrollVelocity += -delta * CONFIG.SCROLL_SPEED;
      data.hadInput = true;
      
      // Debounce: after wheel stops, snap to nearest card
      if (wheelTimeout) clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        data.hadInput = false;
        data.snapTarget = Math.round(data.globalOffset / data.stride) * data.stride;
      }, 150);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      container?.removeEventListener("wheel", handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, []);

  // Touch/drag handler — direct cursor control
  useEffect(() => {
    let isDragging = false;
    let lastX = 0;
    let lastTime = 0;
    let dragVelocity = 0;
    let startX = 0;
    let hasMoved = false;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX;
      lastX = e.clientX;
      lastTime = performance.now();
      dragVelocity = 0;
      hasMoved = false;
      
      // Stop any existing momentum when grabbing
      if (sceneDataRef.current) {
        sceneDataRef.current.hadInput = true;
        sceneDataRef.current.scrollVelocity = 0;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || !sceneDataRef.current) return;
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      const dx = e.clientX - lastX;
      
      if (Math.abs(e.clientX - startX) > 6) hasMoved = true;
      
      // Calculate drag velocity — direct 1:1 control feel
      // Convert pixel movement to world units
      const container = containerRef.current;
      if (!container) return;
      const pixelToWorld = sceneDataRef.current.viewportWidth / container.clientWidth;
      
      // Move the offset directly (feels like grabbing)
      sceneDataRef.current.globalOffset += dx * pixelToWorld;
      
      // Track velocity for momentum on release
      dragVelocity = (dx / dt) * pixelToWorld * 16;
      
      sceneDataRef.current.hadInput = true;
      lastX = e.clientX;
      lastTime = now;
    };

    const handlePointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      
      if (!sceneDataRef.current) return;
      
      // Apply momentum from drag velocity
      if (hasMoved) {
        sceneDataRef.current.scrollVelocity = dragVelocity * 0.5;
      }
      
      // Let it coast then snap
      sceneDataRef.current.hadInput = true;
    };

    // Mouse move for water ripple effect (always active, not just dragging)
    const handleMouseMoveGrid = (e: MouseEvent) => {
      if (!sceneDataRef.current) return;
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width;
      const normY = (e.clientY - rect.top) / rect.height;
      
      // Update all visible slide grid mouse states based on proximity
      const data = sceneDataRef.current;
      for (let i = 0; i < data.slides.length; i++) {
        const slide = data.slides[i];
        const meshScreenX = (slide.mesh.position.x + data.viewportWidth / 2) / data.viewportWidth;
        const slideWidth = data.slideWidth / data.viewportWidth;
        
        // Check if mouse is over this slide
        const slideLeft = meshScreenX - slideWidth / 2;
        const slideRight = meshScreenX + slideWidth / 2;
        
        if (normX >= slideLeft && normX <= slideRight) {
          const localX = (normX - slideLeft) / slideWidth;
          const localY = normY;
          const ms = data.gridMouseStates[i];
          ms.vX = localX - ms.prevX;
          ms.vY = localY - ms.prevY;
          ms.x = localX;
          ms.y = localY;
          ms.prevX = localX;
          ms.prevY = localY;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMoveGrid);

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("mousemove", handleMouseMoveGrid);
    };
  }, []);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const data = sceneDataRef.current;
      if (!data) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        data.snapTarget -= data.stride;
        data.hadInput = false;
        data.scrollVelocity = -0.3;
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        data.snapTarget += data.stride;
        data.hadInput = false;
        data.scrollVelocity = 0.3;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full touch-none" />

      {/* Overlay UI */}
      <div className="fixed inset-0 z-[1000] p-6 md:p-12 lg:p-16 w-full h-full flex flex-col justify-between pointer-events-none">
        {/* Top section */}
        <div
          className={`flex items-start justify-between pt-20 lg:pt-4 transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Mobile: Available + email top-left */}
          <div className="flex lg:hidden flex-col gap-2">
            <span className="pointer-events-auto inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-white/20 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for projects
            </span>
            <a
              href="mailto:hello@webkonic.com"
              className="text-sm pointer-events-auto opacity-70"
            >
              hello@webkonic.com
            </a>
          </div>

          {/* Right: Counter - hidden on desktop */}
          <div className="hidden">
            <span className="font-mono opacity-80">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="opacity-40">/</span>
            <span className="font-mono opacity-40">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Bottom section */}
        <div
          className={`flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          } lg:mb-0 lg:mt-0 mt-auto pb-[15vh] lg:pb-0`}
        >
          {/* Left: Project name + description + See live */}
          <div className="flex flex-row lg:flex-col items-end lg:items-start justify-between lg:justify-start w-full lg:w-auto">
            <div>
              <h2
                className="text-2xl md:text-3xl lg:text-5xl font-medium transition-all duration-500"
                style={{
                  fontFamily:
                    'var(--font-instrument-serif), "Instrument Serif", serif',
                  fontStyle: "italic",
                }}
              >
                {projects[currentIndex].name}
              </h2>
              <p className="text-xs opacity-60 mt-1 max-w-[300px]">
                {projects[currentIndex].description}
              </p>
            </div>
            <a
              href={projects[currentIndex].liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto relative z-[1001] inline-flex items-center gap-2 text-sm italic opacity-70 hover:opacity-100 transition-opacity lg:mt-3"
            >
              See live →
            </a>
          </div>

          {/* Desktop: Available + email bottom-right - aligned right */}
          <div className="hidden lg:flex flex-col items-end gap-3 mb-2">
            <span className="pointer-events-auto inline-flex items-center gap-2 text-base font-medium px-5 py-2.5 rounded-full border border-white/20 w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              Available for projects
            </span>
            <a
              href="mailto:hello@webkonic.com"
              className="nav-link text-base pointer-events-auto relative overflow-hidden inline-block w-fit"
            >
              <span className="block">hello@webkonic.com</span>
              <span className="block">hello@webkonic.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
