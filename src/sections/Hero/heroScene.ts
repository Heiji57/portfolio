import * as THREE from 'three';

const BG = 0x1b2029;

/*
 * The design was made with three r149, which treated hex colours as linear and
 * used "legacy" light units. Disabling colour management and scaling light
 * intensities by PI reproduces that look on modern three.
 */
THREE.ColorManagement.enabled = false;
const LEGACY = Math.PI;

// r149's point-light falloff: linear-to-cutoff rather than inverse-square.
// Only this scene uses three, so patching the shared chunk is safe.
THREE.ShaderChunk.lights_pars_begin = THREE.ShaderChunk.lights_pars_begin.replace(
  /float getDistanceAttenuation\([^)]*\) \{[\s\S]*?\n\}/,
  `float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
	return 1.0;
}`,
);

function eclipseTexture() {
  const S = 256;
  const C = S / 2;
  const R = S * 0.3;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = S;
  const ctx = canvas.getContext('2d')!;

  const glow = ctx.createRadialGradient(C, C, R * 0.9, C, C, S / 2);
  glow.addColorStop(0, 'rgba(255,250,225,1)');
  glow.addColorStop(0.12, 'rgba(255,236,170,.85)');
  glow.addColorStop(0.4, 'rgba(255,190,150,.35)');
  glow.addColorStop(1, 'rgba(255,150,170,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, S, S);

  ctx.save();
  ctx.shadowColor = '#fbff00';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = -4;
  ctx.shadowOffsetY = 3;
  ctx.fillStyle = '#e3ff4b';
  ctx.beginPath();
  ctx.arc(C, C, R, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const disc = ctx.createLinearGradient(C - R, C - R, C + R, C + R);
  disc.addColorStop(0, '#5c4452');
  disc.addColorStop(1, '#3a2c3a');
  ctx.fillStyle = disc;
  ctx.beginPath();
  ctx.arc(C + 1.5, C - 1.5, R * 0.97, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

function haloSprite(hex: string, size: number, opacity: number, dx: number) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const rg = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  rg.addColorStop(0, hex);
  rg.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, 128, 128);

  const map = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  sprite.scale.set(size, size, 1);
  sprite.position.x = dx;
  return sprite;
}

/**
 * Floating dark blocks lit by a small eclipse-like orb. Mounts a canvas into
 * `el` and returns a cleanup function.
 */
export function mountHeroScene(el: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BG);
  scene.fog = new THREE.Fog(BG, 9, 22);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  scene.add(new THREE.HemisphereLight(0x2c3a52, 0x120c0a, 0.22 * LEGACY));
  const coolFill = new THREE.DirectionalLight(0x4a6a9a, 0.55 * LEGACY);
  coolFill.position.set(-6, 2, 3);
  scene.add(coolFill);
  const rim = new THREE.DirectionalLight(0x6f8fd0, 0.45 * LEGACY);
  rim.position.set(-2, 4, -6);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  const block = (geo: THREE.BufferGeometry, pos: [number, number, number], rot: [number, number, number]) => {
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x15181e, roughness: 0.48, metalness: 0.2 }));
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    mesh.castShadow = mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  };

  const items = [
    block(new THREE.BoxGeometry(2.4, 2.4, 2.4), [0.6, -0.3, 0], [0.5, 0.7, 0.2]),
    block(new THREE.BoxGeometry(1.7, 1.7, 1.7), [-1.4, 1.5, -1.2], [0.3, 0.4, 0.5]),
    block(new THREE.CylinderGeometry(0.45, 0.45, 1.4, 48), [2.2, 0.9, -0.6], [0.2, 0, 0.3]),
    block(new THREE.BoxGeometry(1.2, 1.2, 1.2), [-0.6, -2.4, 1], [0.9, 0.2, 0.6]),
    block(new THREE.CylinderGeometry(0.5, 0.5, 1.6, 48), [-2.1, -1.6, 0.4], [1.1, 0, 0.8]),
  ].map((mesh, i) => ({ mesh, baseY: mesh.position.y, speed: 0.35 + i * 0.11 }));

  // The orb: invisible sphere carrying the lights, eclipse sprite and halos.
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
  orb.position.set(1.2, 1.9, 1.4);
  group.add(orb);

  const light = new THREE.PointLight(0xff5a14, 2.8 * LEGACY, 11, 1.8);
  light.castShadow = true;
  light.shadow.mapSize.set(1024, 1024);
  light.shadow.bias = -0.002;
  light.shadow.normalBias = 0.02;
  light.shadow.radius = 4;
  orb.add(light);
  orb.add(new THREE.PointLight(0xff9a40, 0.5 * LEGACY, 4, 2));

  const face = new THREE.Sprite(new THREE.SpriteMaterial({ map: eclipseTexture(), transparent: true, depthWrite: false }));
  face.scale.set(0.95, 0.95, 1);
  face.renderOrder = 2;
  orb.add(face);
  orb.add(haloSprite('#fff3c8', 1.3, 0.45, 0));
  orb.add(haloSprite('#fbff00', 2.4, 0.22, -0.12));
  orb.add(haloSprite('#ff5555', 2.1, 0.2, 0.12));
  orb.add(haloSprite('#ff40d6', 3.6, 0.12, 0));
  orb.add(haloSprite('#e3ff4b', 3, 0.08, -0.1));
  orb.scale.setScalar(0.6);

  for (const [color, intensity, x, y, z] of [
    [0xffb000, 0.45, -1.6, 0.2, 0.3],
    [0xff3a2a, 0.4, 1.6, 0, 0.3],
  ]) {
    const side = new THREE.PointLight(color, intensity * LEGACY, 12, 1.5);
    side.position.set(x, y, z).add(orb.position);
    group.add(side);
  }

  let visible = true;
  let raf = 0;

  const resize = () => {
    const w = el.clientWidth || 1;
    const h = el.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    group.position.x = w < 800 ? 0 : 1.7;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(el);
  resize();

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  io.observe(el);

  const timer = new THREE.Timer();
  const loop = (time: number) => {
    raf = requestAnimationFrame(loop);
    if (!visible) return;
    timer.update(time);
    const t = timer.getElapsed();
    group.rotation.y = Math.sin(t * 0.15) * 0.35;
    items.forEach(({ mesh, baseY, speed }, i) => {
      mesh.position.y = baseY + Math.sin(t * speed + i) * 0.16;
      mesh.rotation.y += 0.0012;
    });
    orb.position.y = 1.9 + Math.sin(t * 0.8) * 0.25;
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
