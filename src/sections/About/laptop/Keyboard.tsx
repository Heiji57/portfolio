import type { CSSProperties } from 'react';

type Key = { label: string; units?: number; kind?: 'touch' | 'half' | 'arrows' };

const k = (label: string, units = 1): Key => ({ label, units });
const chars = (s: string) => s.split('').map((c) => k(c));

const rows: { height?: number; keys: Key[] }[] = [
  {
    height: 0.55,
    keys: [k('esc', 1.5), ...Array.from({ length: 12 }, (_, i) => k(`F${i + 1}`)), { label: '', kind: 'touch' }],
  },
  { keys: [k('`'), ...chars('1234567890'), k('-'), k('='), k('delete', 1.5)] },
  { keys: [k('⇥', 1.5), ...chars('QWERTYUIOP'), k('['), k(']'), k('\\')] },
  { keys: [k('⇪', 1.8), ...chars('ASDFGHJKL'), k(';'), k("'"), k('return', 1.7)] },
  { keys: [k('⇧', 2.3), ...chars('ZXCVBNM'), k(','), k('.'), k('/'), k('⇧', 2.2)] },
  {
    keys: [
      k('fn'), k('⌃'), k('⌥'), k('⌘', 1.25), k('', 5), k('⌘', 1.25), k('⌥'),
      { label: '◀', kind: 'half' }, { label: '', kind: 'arrows' }, { label: '▶', kind: 'half' },
    ],
  },
];

const keyBase: CSSProperties = {
  background: 'linear-gradient(180deg,#1b1b1e 0%,#0f0f11 100%)',
  borderRadius: 4,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.07), 0 1px 1.5px rgba(0,0,0,.8)',
  color: '#c9c9ce',
  fontFamily: "-apple-system,'Pretendard Variable',sans-serif",
  fontSize: 8.5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

function KeyCap({ k: key, row, index }: { k: Key; row: number; index: number }) {
  switch (key.kind) {
    case 'arrows':
      return (
        <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          <span style={{ ...keyBase, flex: 1, fontSize: 6 }}>▲</span>
          <span style={{ ...keyBase, flex: 1, fontSize: 6 }}>▼</span>
        </div>
      );
    case 'half':
      return (
        <span style={{ ...keyBase, flex: '1 1 0', height: '48%', alignSelf: 'flex-end', fontSize: 6 }}>{key.label}</span>
      );
    case 'touch':
      return (
        <span style={{ ...keyBase, flex: '1 1 0', background: 'linear-gradient(180deg,#16161a,#0c0c0e)' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', border: '1px solid #3a3a40' }} />
        </span>
      );
  }
  const long = key.label.length > 2;
  return (
    <span
      style={{
        ...keyBase,
        flex: `${key.units} 1 0`,
        fontSize: long ? 7 : row === 0 ? 6.5 : 8.5,
        justifyContent: long && row > 0 ? (index === 0 ? 'flex-start' : 'flex-end') : 'center',
        padding: '0 5px',
      }}
    >
      {key.label}
    </span>
  );
}

export function Keyboard() {
  return (
    <div
      className="absolute top-[26px] right-[46px] left-[46px] flex flex-col gap-1 rounded-lg bg-[#08080a] p-1.5"
      style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,.9)' }}
    >
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-1" style={{ height: 30 * (row.height ?? 1) }}>
          {row.keys.map((key, ki) => (
            <KeyCap key={ki} k={key} row={ri} index={ki} />
          ))}
        </div>
      ))}
    </div>
  );
}
