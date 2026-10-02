import type { CSSProperties, ReactNode } from 'react';
import { cx } from '@/lib/format';
import { Keyboard } from './Keyboard';
import { LaptopScreen } from './LaptopScreen';

/** Laptop footprint in px: width, lid height, base depth. */
const W = 600;
const H = 400;
const D = 400;
/** Desk plane size and the pivot line it is rotated around. */
const DESK_W = 1500;
const DESK_H = 1200;
const PIVOT = 420;

const HAIRLINE = 'repeating-linear-gradient(90deg,rgba(255,255,255,.022) 0 1px,rgba(0,0,0,0) 1px 3px)';
const ALUMINIUM = 'linear-gradient(160deg,#4a4b50 0%,#36373b 40%,#2a2b2f 100%)';
const STAGE_POSE = 'scale(.8) translateZ(-200px) rotateX(-19deg) rotateY(30deg)';

function Layer({ style, className, children }: { style?: CSSProperties; className?: string; children?: ReactNode }) {
  return (
    <div className={cx('absolute', className)} style={style}>
      {children}
    </div>
  );
}

/** A thin side face of the base or lid. */
const Edge = ({ style }: { style: CSSProperties }) => (
  <Layer style={{ background: 'linear-gradient(180deg,#3d3e43 0%,#1b1b1e 100%)', ...style }} />
);

/** Fades in once the lid has finished opening. */
const afterOpen = (closed: boolean): CSSProperties => ({
  opacity: closed ? 0 : 1,
  transition: closed ? 'opacity .2s' : 'opacity .8s ease 1.75s',
});

function Wall() {
  return (
    <Layer
      className="pointer-events-none"
      style={{
        left: (W - 1600) / 2,
        top: H + 12 - 820,
        width: 1600,
        height: 820,
        transform: `translateZ(${-PIVOT}px)`,
        background:
          'radial-gradient(ellipse 55% 75% at 22% 0%,rgba(255,236,214,.05) 0%,rgba(255,236,214,0) 70%),radial-gradient(ellipse 22% 30% at 50% 92%,rgba(190,205,235,.06) 0%,rgba(190,205,235,0) 100%),linear-gradient(180deg,rgba(11,11,12,0) 0%,#121214 70%,#151518 100%)',
      }}
    >
      <Layer
        style={{ left: '15%', right: '15%', bottom: 0, height: 60, background: 'linear-gradient(0deg,rgba(0,0,0,.55),rgba(0,0,0,0))' }}
      />
    </Layer>
  );
}

function Desk({ closed }: { closed: boolean }) {
  const x = (DESK_W - W) / 2;
  return (
    <Layer
      style={{
        left: (W - DESK_W) / 2,
        top: H + 12 - PIVOT,
        width: DESK_W,
        height: DESK_H,
        transformOrigin: `50% ${PIVOT}px`,
        transform: 'rotateX(90deg)',
        transformStyle: 'preserve-3d',
        background:
          'radial-gradient(ellipse 42% 40% at 50% 42%,#1e1b1a 0%,rgba(20,18,18,.85) 40%,rgba(11,11,12,0) 75%)',
      }}
    >
      {/* wood grain */}
      <Layer
        className="pointer-events-none inset-0"
        style={{
          background:
            'repeating-linear-gradient(90deg,rgba(255,255,255,.014) 0 1px,rgba(255,255,255,0) 1px 7px,rgba(0,0,0,.05) 7px 9px,rgba(255,255,255,0) 9px 16px)',
          maskImage: 'radial-gradient(ellipse 45% 42% at 50% 42%,#000 30%,transparent 75%)',
        }}
      />
      {/* contact shadows, soft to hard */}
      <Layer
        style={{ left: x - 60, top: PIVOT - 30, width: W + 120, height: D + 110, background: 'rgba(0,0,0,.55)', filter: 'blur(34px)', borderRadius: 60 }}
      />
      <Layer
        style={{ left: x - 12, top: PIVOT - 6, width: W + 24, height: D + 20, background: 'rgba(0,0,0,.8)', filter: 'blur(12px)', borderRadius: 26 }}
      />
      <Layer style={{ left: x + 6, top: PIVOT + 2, width: W - 12, height: D - 2, background: '#000', filter: 'blur(3px)', borderRadius: 16 }} />
      {/* screen light spilling onto the desk */}
      <Layer
        style={{
          ...afterOpen(closed),
          left: x - 80,
          top: PIVOT + D + 6,
          width: W + 160,
          height: 260,
          background:
            'radial-gradient(ellipse 46% 70% at 50% 0%,rgba(190,205,235,.10) 0%,rgba(190,205,235,.04) 40%,rgba(190,205,235,0) 100%)',
        }}
      />
      <Layer
        style={{
          left: x + 60,
          top: PIVOT - 220,
          width: W + 140,
          height: 240,
          background: 'radial-gradient(ellipse 60% 70% at 50% 100%,rgba(0,0,0,.35),rgba(0,0,0,0) 100%)',
        }}
      />
    </Layer>
  );
}

const Grille = ({ side }: { side: 'left' | 'right' }) => (
  <Layer
    style={{
      top: 30,
      [side]: 14,
      width: 22,
      height: 204,
      backgroundImage: 'radial-gradient(circle,#101012 0.9px,transparent 1.2px)',
      backgroundSize: '4px 4px',
      opacity: 0.9,
    }}
  />
);

function Base({ closed }: { closed: boolean }) {
  return (
    <Layer
      style={{
        left: 0,
        top: H,
        width: W,
        height: D,
        transformOrigin: 'top',
        transform: 'rotateX(90deg)',
        transformStyle: 'preserve-3d',
        background: `${HAIRLINE},${ALUMINIUM}`,
        borderRadius: '4px 4px 16px 16px',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.12)',
      }}
    >
      <Layer style={{ left: 0, right: 0, top: 0, height: 10, background: 'linear-gradient(180deg,#141416,rgba(20,20,22,0))' }} />
      <Grille side="left" />
      <Grille side="right" />
      <Keyboard />
      {/* trackpad */}
      <Layer
        style={{
          left: '50%',
          bottom: 16,
          width: 290,
          height: 128,
          marginLeft: -145,
          borderRadius: 9,
          background: 'linear-gradient(170deg,#3b3c41 0%,#2d2e32 60%,#292a2e 100%)',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.08)',
        }}
      />
      {/* reflections */}
      <Layer
        className="pointer-events-none inset-0"
        style={{
          borderRadius: 'inherit',
          background:
            'radial-gradient(ellipse 70% 80% at 0% 0%,rgba(255,236,214,.07),rgba(255,236,214,0) 70%),linear-gradient(115deg,rgba(255,255,255,0) 40%,rgba(255,255,255,.06) 50%,rgba(255,255,255,0) 60%)',
        }}
      />
      <Layer
        className="pointer-events-none inset-0"
        style={{
          ...afterOpen(closed),
          borderRadius: 'inherit',
          background: 'linear-gradient(180deg,rgba(160,185,240,.14) 0%,rgba(160,185,240,0) 45%)',
        }}
      />
      <Layer
        style={{
          left: 16,
          right: 16,
          bottom: 0,
          height: 2,
          background: 'linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.28) 30%,rgba(255,255,255,.18) 70%,rgba(255,255,255,0))',
        }}
      />
      <Layer style={{ left: 0, top: 16, bottom: 16, width: 1.5, background: 'rgba(255,255,255,.14)' }} />
      <Layer style={{ right: 0, top: 16, bottom: 16, width: 1.5, background: 'rgba(255,255,255,.05)' }} />
      <Layer style={{ left: '50%', top: 0, width: 150, height: 3, marginLeft: -75, background: '#0c0c0e', borderRadius: '0 0 3px 3px' }} />
      {/* side faces */}
      <Edge
        style={{ left: 16, top: 0, width: W - 32, height: 13, transformOrigin: 'top', transform: 'rotateX(-90deg)', background: 'linear-gradient(180deg,#2a2b2f,#101012)' }}
      />
      <Edge
        style={{
          left: 0,
          top: D,
          width: W,
          height: 13,
          transformOrigin: 'top',
          transform: 'rotateX(-90deg)',
          borderRadius: '0 0 12px 12px',
          background: 'linear-gradient(180deg,#55565b 0%,#3a3b40 25%,#1d1d20 100%)',
        }}
      />
      <Edge
        style={{
          left: '50%',
          top: D,
          width: 90,
          height: 5,
          marginLeft: -45,
          transformOrigin: 'top',
          transform: 'translateZ(0.5px) rotateX(-90deg)',
          background: '#101012',
          borderRadius: '0 0 8px 8px',
        }}
      />
      <Edge
        style={{ left: 0, top: 0, width: 13, height: D, transformOrigin: 'left', transform: 'rotateY(90deg)', background: 'linear-gradient(90deg,#3a3b40,#1c1c1f)' }}
      />
      <Edge
        style={{ left: W - 13, top: 0, width: 13, height: D, transformOrigin: 'right', transform: 'rotateY(-90deg)', background: 'linear-gradient(90deg,#1c1c1f,#45464b)' }}
      />
    </Layer>
  );
}

const screenInset: CSSProperties = { left: 12, right: 12, top: 12, bottom: 16, borderRadius: 6 };

function Lid({ open }: { open: boolean }) {
  const closed = !open;
  return (
    <Layer
      className={cx('inset-0', open ? 'animate-lid-open' : 'animate-lid-close')}
      style={{
        transformOrigin: 'bottom',
        transform: closed ? 'translateY(-2px) rotateX(-90deg)' : 'translateY(0px) rotateX(14deg)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* back shell */}
      <Layer
        className="inset-0 overflow-hidden"
        style={{
          transform: 'translateZ(-8px) rotateY(180deg)',
          background: `${HAIRLINE},linear-gradient(0deg,#4a4b50 0%,#3a3b3f 45%,#2c2d31 100%)`,
          borderRadius: '16px 16px 4px 4px',
          boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,.16), inset 0 0 0 1px rgba(255,255,255,.05)',
        }}
      >
        <Layer
          className="inset-0"
          style={{
            background: 'linear-gradient(180deg,rgba(255,240,225,0) 35%,rgba(255,240,225,.09) 50%,rgba(255,240,225,0) 65%)',
            backgroundSize: '100% 300%',
            backgroundPosition: closed ? '0% 85%' : '0% 15%',
            transition: closed
              ? 'background-position 1.1s cubic-bezier(.5,0,.85,.3)'
              : 'background-position 1.9s cubic-bezier(.45,0,.25,1)',
          }}
        />
        <Layer
          className="inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 90% at 100% 100%,rgba(255,236,214,.07),rgba(255,236,214,0) 70%)',
            opacity: closed ? 1 : 0.4,
            transition: 'opacity 1s',
          }}
        />
      </Layer>
      {/* lid edges and hinge */}
      <Edge
        style={{
          left: 16,
          top: 0,
          width: W - 32,
          height: 8,
          transformOrigin: 'top',
          transform: 'rotateX(-90deg)',
          background: 'linear-gradient(180deg,#0a0a0b 0 1.5px,#2e2f33 1.5px,#4a4b50 70%,#7a7b80 100%)',
        }}
      />
      <Edge
        style={{
          left: 0,
          top: 16,
          width: 8,
          height: H - 22,
          transformOrigin: 'left',
          transform: 'rotateY(90deg)',
          background: 'linear-gradient(90deg,#0a0a0b 0 1.5px,#2a2b2f 1.5px,#4f5055 100%)',
        }}
      />
      <Edge
        style={{
          left: W - 8,
          top: 16,
          width: 8,
          height: H - 22,
          transformOrigin: 'right',
          transform: 'rotateY(-90deg)',
          background: 'linear-gradient(270deg,#0a0a0b 0 1.5px,#26272b 1.5px,#3e3f44 100%)',
        }}
      />
      <Layer
        style={{
          left: 36,
          right: 36,
          bottom: -9,
          height: 16,
          borderRadius: 8,
          transform: 'translateZ(-5px)',
          background: 'linear-gradient(180deg,#0b0b0d 0%,#2e2f33 45%,#141416 70%,#060607 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,.8)',
        }}
      />
      {/* bezel + screen */}
      <Layer
        className="inset-0"
        style={{
          background: '#040405',
          borderRadius: '16px 16px 6px 6px',
          boxShadow: closed ? '0 0 0 1.5px #3a3b40' : '0 0 0 1.5px #3a3b40, 0 0 90px rgba(190,205,235,.08)',
          transition: 'box-shadow .8s',
        }}
      >
        <LaptopScreen lidOpen={open} />
        {/* screen stays dark until the lid is fully open */}
        <Layer
          className="pointer-events-none"
          style={{
            ...screenInset,
            background: '#040405',
            opacity: open ? 0 : 1,
            transition: open ? 'opacity .7s ease 1.75s' : 'opacity .15s ease',
          }}
        />
        <Layer
          className="pointer-events-none"
          style={{ ...screenInset, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.9), inset 0 6px 14px rgba(0,0,0,.55)' }}
        />
        <Layer
          className="pointer-events-none inset-0"
          style={{
            borderRadius: 'inherit',
            background:
              'linear-gradient(160deg,rgba(255,255,255,.07) 0%,rgba(255,255,255,0) 22%),linear-gradient(0deg,rgba(255,255,255,.04),rgba(255,255,255,0) 8%)',
          }}
        />
      </Layer>
    </Layer>
  );
}

/** CSS-3D laptop on a desk. The lid opens and the screen boots when `open` turns true. */
export function Laptop({ open }: { open: boolean }) {
  const closed = !open;
  return (
    <div className="absolute inset-0" style={{ perspective: 1450, perspectiveOrigin: '50% 12%' }}>
      <div
        className="absolute top-[60px] left-1/2"
        style={{ width: W, height: H, marginLeft: -W / 2 - 120, transformStyle: 'preserve-3d', transform: STAGE_POSE }}
      >
        <Wall />
        <Desk closed={closed} />
        <Base closed={closed} />
        <Lid open={open} />
      </div>
    </div>
  );
}
