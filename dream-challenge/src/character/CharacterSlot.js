// Character slot: shows the 2D Nubi placeholder, and swaps in the Blender model (GLB/GLTF)
// when assets/manifest.json → character.model is set. Three.js / React Three Fiber are
// imported lazily, only in that case, so the default experience stays lightweight.
// Screens talk to the character through one API: setRelax(v), happy(), fallAsleep().
import { html, React, forwardRef, useImperativeHandle, useRef, useState, useEffect } from '../lib.js';
import { useApp } from '../ui.js';
import { Nubi2D } from './Nubi2D.js';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err) { console.warn('[sweet-dreams] 3D character failed, keeping the 2D placeholder.', err); this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

let character3DModule = null; // shared promise so screens reuse the downloaded module
const load3D = () => (character3DModule ||= import('./Character3D.js'));

export const CharacterSlot = forwardRef(function CharacterSlot(props, ref) {
  const { x, y, scale = 1 } = props;
  const { manifest, reduced } = useApp();
  const model = manifest.character.model;
  const r2d = useRef(null);
  const r3d = useRef(null);
  const [Impl, setImpl] = useState(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!model) return undefined;
    let alive = true;
    const go = () => load3D()
      .then((m) => alive && setImpl(() => m.default))
      .catch((e) => { console.warn('[sweet-dreams] could not load 3D runtime', e); if (alive) setFailed(true); });
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
    idle(go);
    return () => { alive = false; };
  }, [model]);

  const use3D = !!Impl && !failed;
  useImperativeHandle(ref, () => {
    const call = (fn, ...args) => {
      const out = r2d.current && r2d.current[fn] && r2d.current[fn](...args);
      if (use3D && ready && r3d.current && r3d.current[fn]) r3d.current[fn](...args);
      return out;
    };
    return { setRelax: (v) => call('setRelax', v), happy: () => call('happy'), fallAsleep: () => call('fallAsleep') };
  }, [use3D, ready]);

  // 3D canvas box: same anchor as the 2D art, a little larger to leave room for lighting/shadows.
  const box = { left: x - 150 * scale, top: y - 170 * scale, width: 300 * scale, height: 300 * scale };

  return html`<${React.Fragment}>
    <${Nubi2D} ref=${r2d} ...${props} hidden=${use3D && ready} />
    ${use3D ? html`<${ErrorBoundary} onError=${() => setFailed(true)}>
      <${Impl} cfg=${manifest.character} box=${box} asleep=${!!props.asleep} reduced=${reduced}
        apiRef=${r3d} onReady=${() => setReady(true)} onError=${() => setFailed(true)} />
    <//>` : null}
  <//>`;
});
