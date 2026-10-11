// The fixed 3D stage behind the page: the three-layer mark, drifting between sections as you scroll.
const isSmall = () => innerWidth < 900;

export function initStage(THREE, canvas, reduce) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch (e) {
    return null;
  }
  if (!renderer || !renderer.getContext()) return null;
  const mobile = innerWidth < 760;
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = new THREE.Scene();
  env.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(30, 30, 30),
      new THREE.MeshBasicMaterial({ color: 0x03050c, side: THREE.BackSide }),
    ),
  );
  function panel(w, h, hex, k, pos) {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(hex).multiplyScalar(k),
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    );
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    env.add(m);
  }
  panel(14, 4, 0xffffff, 5, [0, 9, 3]);
  panel(3, 14, 0xf4f0e8, 2.5, [-9, 0, 4]);
  panel(2, 12, 0x5265ff, 7, [9, -1, -2]);
  panel(1.2, 6, 0x00f0ff, 4, [6, 6, -6]);
  panel(10, 2, 0xffffff, 1.4, [0, -8, 6]);
  panel(4, 4, 0xffffff, 2, [4, 4, 10]);
  panel(24, 9, 0xdce5ff, 1.25, [0, 4, 13]);
  panel(24, 6, 0x2f49e0, 0.7, [0, -7, 11]);
  scene.environment = pmrem.fromScene(env, 0.03).texture;

  // three plates: a solid top carrying the cyan core, two fading layers beneath
  const plateG = new THREE.BoxGeometry(2.5, 0.12, 2.5);
  const plateMat = (o) =>
    new THREE.MeshPhysicalMaterial(
      Object.assign(
        {
          color: 0xede8dd,
          metalness: 0.15,
          roughness: 0.5,
          clearcoat: 0.25,
          clearcoatRoughness: 0.4,
          envMapIntensity: 0.55,
        },
        o,
      ),
    );
  const edgeG = new THREE.EdgesGeometry(plateG);
  const mkPlate = (mat, edgeOp) => {
    const m = new THREE.Mesh(plateG, mat);
    m.add(
      new THREE.LineSegments(
        edgeG,
        new THREE.LineBasicMaterial({ color: 0x9fefff, transparent: true, opacity: edgeOp }),
      ),
    );
    return m;
  };
  const L1 = mkPlate(plateMat({}), 0),
    L2 = mkPlate(plateMat({ transparent: true, opacity: 0.5, depthWrite: false }), 0.5),
    L3 = mkPlate(plateMat({ transparent: true, opacity: 0.22, depthWrite: false }), 0.4);
  const node = new THREE.Mesh(
    new THREE.BoxGeometry(0.86, 0.05, 0.86),
    new THREE.MeshBasicMaterial({ color: 0x00e4f5, toneMapped: false }),
  );
  node.position.y = 0.085;
  node.add(new THREE.PointLight(0x00f0ff, 0.5, 2.5));
  L1.add(node);

  const sc = document.createElement("canvas");
  sc.width = sc.height = 128;
  const sx = sc.getContext("2d");
  const g = sx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(0,0,0,.75)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  sx.fillStyle = g;
  sx.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 1.6),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.75;

  const spin = new THREE.Group();
  spin.add(L1, L2, L3);
  const tilt = new THREE.Group();
  tilt.add(spin);
  const rootG = new THREE.Group();
  rootG.add(tilt, shadow);
  scene.add(rootG);

  const N = mobile ? 160 : 520;
  const pg = new THREE.BufferGeometry();
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 22;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
  }
  pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(
    pg,
    new THREE.PointsMaterial({
      color: 0xbfc8ee,
      size: mobile ? 0.03 : 0.022,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    }),
  );
  scene.add(pts);
  const key = new THREE.DirectionalLight(0xffffff, 1.2);
  key.position.set(3, 5, 6);
  scene.add(key);
  const rim = new THREE.PointLight(0x5265ff, 7, 14);
  rim.position.set(-4, -1, -3);
  scene.add(rim);

  const St = (id, st) => ({ el: document.getElementById(id), ...st });
  let anchors = [];
  function buildAnchors() {
    const m = isSmall();
    // desktop: keep the whole mark inside the right edge on narrower windows
    const halfWidth = Math.tan((16 * Math.PI) / 180) * 11 * (innerWidth / innerHeight);
    const heroX = Math.min(2.95, halfWidth - 1.9);
    // phone: sit the mark in the gap between the tagline and the headline, sized to fit it
    const mt = { x: 0, y: 1.6, s: 0.58, ry: 0, op: 1 };
    if (m) {
      const a = document.querySelector(".hero-top"),
        b = document.querySelector(".hero-head h1");
      if (a && b) {
        const t0 = a.getBoundingClientRect().bottom + scrollY,
          t1 = b.getBoundingClientRect().top + scrollY,
          ppu = innerHeight / 6.31;
        mt.s = Math.max(0.36, Math.min(0.8, (t1 - t0 - 28) / (3.3 * ppu)));
        mt.y = (innerHeight / 2 - (t0 + t1) / 2) / ppu;
      }
    }
    anchors = [
      St("top", m ? mt : { x: heroX, y: 0.1, s: 0.78, ry: 0, op: 1 }),
      St(
        "statement",
        m ? { x: 1.2, y: 0.8, s: 0.42, ry: -1, op: 0.35 } : { x: -3.4, y: 0, s: 0.72, ry: -0.9, op: 0.55 },
      ),
      St("services", { x: 4.5, y: 0, s: 0.4, ry: 2.4, op: 0 }),
      St("mission", { x: -4, y: 0, s: 0.4, ry: -2, op: 0 }),
      St("cta", m ? { x: 0, y: 0.2, s: 0.62, ry: 0, op: 0.85 } : { x: 0, y: 0.1, s: 0.9, ry: 0, op: 1 }),
      St("contact", { x: 0, y: 2.4, s: 0.5, ry: 0.6, op: 0 }),
    ]
      .filter((a) => a.el)
      .map((a) => {
        const r = a.el.getBoundingClientRect();
        a.c = r.top + scrollY + r.height / 2;
        return a;
      });
  }
  const cur = { x: 2.4, y: 0.1, s: 0.78, ry: 0, op: 1 };
  function target() {
    const y = scrollY + innerHeight / 2;
    if (y <= anchors[0].c) return anchors[0];
    for (let i = 0; i < anchors.length - 1; i++) {
      const a = anchors[i],
        b = anchors[i + 1];
      if (y <= b.c) {
        let t = (y - a.c) / (b.c - a.c);
        t = t * t * (3 - 2 * t);
        const o = {};
        ["x", "y", "s", "ry", "op"].forEach((k) => (o[k] = a[k] + (b[k] - a[k]) * t));
        return o;
      }
    }
    return anchors[anchors.length - 1];
  }
  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    buildAnchors();
  }
  addEventListener("resize", resize);
  resize();
  let mx = 0,
    my = 0,
    tmx = 0,
    tmy = 0;
  if (!reduce)
    addEventListener(
      "pointermove",
      (e) => {
        tmx = e.clientX / innerWidth - 0.5;
        tmy = e.clientY / innerHeight - 0.5;
      },
      { passive: true },
    );
  let introT = reduce ? 1 : 0,
    revealing = reduce,
    last = performance.now(),
    t = 0;
  const easeOut = (x) => 1 - Math.pow(1 - x, 4);
  rootG.scale.setScalar(0.0001);
  let raf = 0,
    dead = false;
  function loop(now) {
    if (dead) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!reduce) t += dt;
    if (revealing && introT < 1) introT = Math.min(1, introT + dt / 1.8);
    const e = easeOut(introT),
      tg = target(),
      k = reduce ? 1 : 1 - Math.pow(0.0015, dt);
    ["x", "y", "s", "ry", "op"].forEach((q) => (cur[q] += (tg[q] - cur[q]) * k));
    mx += (tmx - mx) * 0.05;
    my += (tmy - my) * 0.05;
    rootG.position.set(cur.x, cur.y, 0);
    rootG.scale.setScalar(Math.max(0.0001, cur.s * Math.min(1, e * 1.4)));
    rootG.rotation.y = cur.ry + mx * 0.5;
    rootG.rotation.x = my * 0.3;
    // seen from above at an angle, so the plates read as the flat mark; they swing gently and breathe
    tilt.rotation.x = 0.66 + Math.sin(t * 0.27) * 0.04;
    spin.rotation.y = Math.PI / 4 + Math.sin(t * 0.3) * 0.32 + (1 - e) * Math.PI * 1.1;
    spin.position.y = Math.sin(t * 0.8) * 0.06;
    const gap = 0.52 + Math.sin(t * 0.9) * 0.03 + (1 - e) * 2.1;
    L1.position.y = gap;
    L3.position.y = -gap;
    L1.rotation.y = (1 - e) * 1.3;
    L3.rotation.y = -(1 - e) * 1.3;
    node.scale.setScalar(introT < 0.6 ? 0.0001 : easeOut((introT - 0.6) / 0.4));
    pts.rotation.y = t * 0.01;
    pts.position.y = Math.sin(t * 0.1) * 0.2;
    camera.position.x = mx * 0.6;
    camera.position.y = -my * 0.4;
    camera.lookAt(0, 0, 0);
    const op = Math.max(0, Math.min(1, cur.op));
    canvas.style.opacity = op.toFixed(3);
    if (op > 0.01) renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
  return {
    reveal() {
      revealing = true;
    },
    refresh: buildAnchors,
    dispose() {
      dead = true;
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      renderer.dispose();
    },
  };
}
