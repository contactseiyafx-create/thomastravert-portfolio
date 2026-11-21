// Blender character renderer (React Three Fiber). Loaded on demand by CharacterSlot.
//
// Expected Blender export (File → Export → glTF 2.0, .glb):
//   • Animation actions named as in assets/manifest.json → character.animations
//     (Idle, Breathe, Blink, Happy, FallAsleep, Sleep, WakeUp). Missing clips are fine:
//     breathing and reactions then fall back to procedural GSAP motion.
//   • Optional Draco or Meshopt compression is supported.
//   • Any size/orientation: the model is normalised to ~1.6 units tall, feet on the ground.
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import { html, gsap, useEffect, useMemo, useRef, Suspense } from '../lib.js';

function useClip(gltf, names) {
  return (slot) => {
    const wanted = names[slot];
    return gltf.animations.find((c) => c.name === wanted)
      || gltf.animations.find((c) => c.name.toLowerCase().includes(slot.toLowerCase()))
      || null;
  };
}

function Model({ cfg, asleep, apiRef, onReady, reduced }) {
  const gltf = useLoader(GLTFLoader, cfg.model, (loader) => {
    const draco = new DRACOLoader();
    draco.setDecoderPath(cfg.dracoDecoderPath);
    loader.setDRACOLoader(draco);
    loader.setMeshoptDecoder(MeshoptDecoder);
  });
  const { camera, invalidate } = useThree();
  const root = useRef(null);
  const motion = useRef({ speed: 1, breath: 2.2, baseY: 1, t: 0 });
  const scene = useMemo(() => cloneSkinned(gltf.scene), [gltf]);
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  const clip = useClip(gltf, cfg.animations);
  const actions = useMemo(() => {
    const a = {};
    for (const slot of Object.keys(cfg.animations)) {
      const c = clip(slot);
      if (c) a[slot] = mixer.clipAction(c);
    }
    if (!a.idle && gltf.animations[0]) a.idle = mixer.clipAction(gltf.animations[0]);
    return a;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mixer]);

  // Normalise size & ground the model.
  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const s = (1.6 / (size.y || 1)) * (cfg.transform.scale || 1);
    const center = box.getCenter(new THREE.Vector3());
    return { s, offset: [-center.x * s, -box.min.y * s, -center.z * s] };
  }, [scene, cfg.transform.scale]);

  const current = useRef(null);
  const fadeTo = (slot, { once = false, fade = 0.5 } = {}) => {
    const next = actions[slot];
    if (!next || next === current.current) return next;
    next.reset();
    next.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, once ? 1 : Infinity);
    next.clampWhenFinished = once;
    next.enabled = true;
    if (current.current) next.crossFadeFrom(current.current, fade, false);
    next.play();
    current.current = next;
    return next;
  };

  useEffect(() => {
    scene.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    const target = new THREE.Vector3(...cfg.camera.target);
    camera.lookAt(target);

    if (asleep && actions.sleep) fadeTo('sleep', { fade: 0 });
    else fadeTo('idle', { fade: 0 });
    if (actions.breathe && !asleep) { actions.breathe.play(); actions.breathe.setEffectiveWeight(1); }

    let blinkTimer;
    const blink = () => {
      blinkTimer = setTimeout(() => {
        if (actions.blink && !motion.current.asleep) {
          actions.blink.reset().setLoop(THREE.LoopOnce, 1).play();
        }
        blink();
      }, 2200 + Math.random() * 2400);
    };
    blink();

    const onFinished = (e) => {
      if (e.action === actions.happy) fadeTo(motion.current.asleep ? 'sleep' : 'idle', { fade: 0.4 });
      if (e.action === actions.fallAsleep && actions.sleep) fadeTo('sleep', { fade: 0.6 });
    };
    mixer.addEventListener('finished', onFinished);

    const dolly = (pos, dur = 1.4) => {
      if (reduced) { camera.position.set(...pos); camera.lookAt(target); invalidate(); return; }
      gsap.to(camera.position, { x: pos[0], y: pos[1], z: pos[2], duration: dur, ease: 'power2.inOut', onUpdate: () => { camera.lookAt(target); invalidate(); } });
    };
    const base = cfg.camera.position;

    apiRef.current = {
      setRelax(v) {
        motion.current.speed = 1 - 0.35 * v;
        motion.current.breath = 2.2 - v;
        dolly([base[0], base[1] - 0.1 * v, base[2] - 0.5 * v], 1.2);
      },
      happy() {
        if (motion.current.asleep) return;
        if (actions.happy) { fadeTo('happy', { once: true, fade: 0.2 }); return; }
        if (reduced || !root.current) return;
        gsap.timeline()
          .to(root.current.position, { y: 0.12, duration: 0.18, ease: 'power2.out' })
          .to(root.current.position, { y: 0, duration: 0.5, ease: 'bounce.out' });
      },
      fallAsleep() {
        motion.current.asleep = true;
        if (actions.breathe) gsap.to(actions.breathe, { timeScale: 0.6, duration: 1.5 });
        if (actions.fallAsleep) fadeTo('fallAsleep', { once: true, fade: 0.6 });
        else if (actions.sleep) fadeTo('sleep', { fade: 1.2 });
        motion.current.speed = 0.7;
        dolly([base[0], base[1] - 0.2, base[2] - 0.8], 2.6);
      },
    };
    onReady();
    return () => { clearTimeout(blinkTimer); mixer.removeEventListener('finished', onFinished); mixer.stopAllAction(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useFrame((_, dt) => {
    const m = motion.current;
    mixer.update(Math.min(dt, 0.05) * m.speed);
    if (!actions.breathe && root.current && !reduced) {
      m.t += dt;
      root.current.scale.y = 1 + Math.sin(m.t * m.breath) * 0.012;
    }
  });

  return html`<group ref=${root} rotation-y=${cfg.transform.rotationY || 0} position=${cfg.transform.position || [0, 0, 0]}>
    <primitive object=${scene} scale=${fit.s} position=${fit.offset} />
  </group>`;
}

export default function Character3D({ cfg, box, asleep, apiRef, onReady, reduced }) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  return html`<div aria-hidden="true" style=${{ position: 'absolute', left: box.left, top: box.top, width: box.width, height: box.height, pointerEvents: 'none' }}>
    <${Canvas} shadows dpr=${[1, dpr]} frameloop=${reduced ? 'demand' : 'always'}
      gl=${{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      camera=${{ fov: cfg.camera.fov, position: cfg.camera.position, near: 0.1, far: 50 }}>
      <hemisphereLight args=${['#CFC8FF', '#1D2168', 1.2]} />
      <directionalLight position=${[2.5, 4, 3]} intensity=${1.8} color="#FFF1B8" castShadow
        shadow-mapSize-width=${512} shadow-mapSize-height=${512} shadow-radius=${8} shadow-bias=${-0.0005} />
      <pointLight position=${[-2.5, 1.6, 1.5]} intensity=${6} distance=${8} color="#A796FF" />
      <${Suspense} fallback=${null}>
        <${Model} cfg=${cfg} asleep=${asleep} apiRef=${apiRef} onReady=${onReady} reduced=${reduced} />
      <//>
      <mesh rotation-x=${-Math.PI / 2} position=${[0, 0.001, 0]} receiveShadow>
        <circleGeometry args=${[1.3, 48]} />
        <shadowMaterial transparent opacity=${0.35} />
      </mesh>
    <//>
  </div>`;
}
