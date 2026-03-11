let audioCtx = null;
let currentSound = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function createNoise(ctx) {
  const bufSize = ctx.sampleRate * 3;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  src.start();
  return src;
}

const sceneSounds = {
  dawn: (ctx, out) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine'; osc.frequency.value = 220;
    const gain = ctx.createGain(); gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2);
    osc.connect(gain); gain.connect(out); osc.start();
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine'; osc2.frequency.value = 330;
    const gain2 = ctx.createGain(); gain2.gain.value = 0;
    gain2.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2.5);
    osc2.connect(gain2); gain2.connect(out); osc2.start();
    return {
      stop: () => {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        gain2.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        setTimeout(() => { try { osc.stop(); osc2.stop(); } catch {} }, 1600);
      }
    };
  },
  forest: (ctx, out) => {
    const noise = createNoise(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass'; filter.frequency.value = 700; filter.Q.value = 0.5;
    const gain = ctx.createGain(); gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2);
    noise.connect(filter); filter.connect(gain); gain.connect(out);
    return {
      stop: () => {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        setTimeout(() => { try { noise.stop(); } catch {} }, 1600);
      }
    };
  },
  ocean: (ctx, out) => {
    const noise = createNoise(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 400;
    const gain = ctx.createGain(); gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 2);
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.12;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.12;
    lfo.connect(lfoGain); lfoGain.connect(gain.gain);
    noise.connect(filter); filter.connect(gain); gain.connect(out); lfo.start();
    return {
      stop: () => {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        setTimeout(() => { try { noise.stop(); lfo.stop(); } catch {} }, 1600);
      }
    };
  },
  dusk: (ctx, out) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine'; osc.frequency.value = 110;
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine'; osc2.frequency.value = 165;
    const gain = ctx.createGain(); gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 2);
    osc.connect(gain); osc2.connect(gain); gain.connect(out);
    osc.start(); osc2.start();
    return {
      stop: () => {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        setTimeout(() => { try { osc.stop(); osc2.stop(); } catch {} }, 1600);
      }
    };
  },
};

export function playSceneSound(scene) {
  const ctx = getAudioCtx();
  if (ctx.state === 'suspended') ctx.resume();
  if (currentSound) { currentSound.stop(); currentSound = null; }
  currentSound = sceneSounds[scene](ctx, ctx.destination);
}

export function stopSound() {
  if (currentSound) { currentSound.stop(); currentSound = null; }
}
