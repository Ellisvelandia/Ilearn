"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function DroneModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup with dynamic FOV based on screen size
    const getFov = () => {
      if (window.innerWidth < 768) return 30; // Mobile
      if (window.innerWidth < 1024) return 28; // Tablet
      return 25; // Desktop
    };

    // Scale function for responsive sizing
    const getScale = () => {
      if (window.innerWidth < 768) return 0.2; // Mobile
      if (window.innerWidth < 1024) return 0.22; // Tablet
      return 0.25; // Desktop
    };
    
    const camera = new THREE.PerspectiveCamera(getFov(), 1, 0.1, 1000);
    camera.position.set(4, 2, 4);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    
    // Configure controls
    controls.enableDamping = true; // Smooth camera movements
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;
    controls.panSpeed = 0.8;
    controls.zoomSpeed = 0.9;
    controls.minDistance = 2; // Minimum zoom distance
    controls.maxDistance = 10; // Maximum zoom distance
    controls.minPolarAngle = Math.PI / 4; // Limit vertical rotation (upper)
    controls.maxPolarAngle = Math.PI / 1.5; // Limit vertical rotation (lower)
    
    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffd4a6, 1);
    mainLight.position.set(2, 2, 2);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x4b79ff, 0.4);
    fillLight.position.set(-2, 1, -1);
    scene.add(fillLight);

    // Load the model with proper material handling
    const loader = new GLTFLoader();
    
    loader.load(
      "/models/alienware_18_gaming_laptop.glb",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        
        const scale = getScale();
        model.scale.set(scale, scale, scale);
        model.position.y = -0.1;
        model.rotation.set(-0.1, Math.PI / 4, 0);
        
        // Update materials to use standard workflow
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (Array.isArray(mesh.material)) {
              mesh.material = mesh.material.map(mat => {
                if (mat.type === 'MeshStandardMaterial') {
                  return mat as THREE.MeshStandardMaterial;
                }
                // Convert any non-standard materials to MeshStandardMaterial
                const stdMat = new THREE.MeshStandardMaterial({
                  map: (mat as any).map || null,
                  color: (mat as any).color || 0xffffff,
                  roughness: 0.5,
                  metalness: 0.5,
                  transparent: mat.transparent,
                  opacity: mat.opacity,
                  side: mat.side
                });
                return stdMat;
              });
            } else if (mesh.material && mesh.material.type !== 'MeshStandardMaterial') {
              const material = mesh.material;
              mesh.material = new THREE.MeshStandardMaterial({
                map: (material as any).map || null,
                color: (material as any).color || 0xffffff,
                roughness: 0.5,
                metalness: 0.5,
                transparent: material.transparent,
                opacity: material.opacity,
                side: material.side
              });
            }
          }
        });
        
        scene.add(model);
        
        // Animation
        const animate = () => {
          requestAnimationFrame(animate);
          
          if (model) {
            // Smooth floating animation
            const time = Date.now() * 0.001;
            model.position.y = -0.1 + Math.sin(time) * 0.05;
          }
          
          // Update controls
          controls.update();
          
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // Enhanced responsive handling
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      // Update camera
      camera.fov = getFov();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      // Update renderer
      renderer.setSize(width, height, false);
      
      // Update model scale if loaded
      if (modelRef.current) {
        const scale = getScale();
        modelRef.current.scale.set(scale, scale, scale);
      }
    };

    handleResize();
    containerRef.current.appendChild(renderer.domElement);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ cursor: 'grab' }}
      onMouseDown={() => {
        if (containerRef.current) {
          containerRef.current.style.cursor = 'grabbing';
        }
      }}
      onMouseUp={() => {
        if (containerRef.current) {
          containerRef.current.style.cursor = 'grab';
        }
      }}
    />
  );
}
