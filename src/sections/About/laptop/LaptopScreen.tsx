import { useEffect, useState } from 'react';
import { useInterval } from '@/hooks/useInterval';
import { C, codeLength, codeLines, responseLines } from './code';

const TICK_MS = 80;
const LOOP_TICKS = 170;
const CHARS_PER_TICK = 3.2;
const SYSTEM_FONT = "-apple-system,'Pretendard Variable',sans-serif";

/** IDE screen that types out a controller, then shows the API response. Restarts when the lid opens. */
export function LaptopScreen({ lidOpen }: { lidOpen: boolean }) {
  const [tick, setTick] = useState(0);
  useInterval(() => setTick((t) => t + 1), TICK_MS);
  useEffect(() => {
    if (lidOpen) setTick(0);
  }, [lidOpen]);

  const budget = (tick % LOOP_TICKS) * CHARS_PER_TICK;
  const done = budget >= codeLength;
  const shownResponse = done ? Math.min(responseLines.length, Math.floor((budget - codeLength) / 8)) : 0;

  let used = 0;
  let cursorLine = -1;
  const lines = codeLines.map((segments, li) => {
    const parts = segments.map(([text, color], si) => {
      const take = Math.max(0, Math.min(text.length, budget - used));
      used += text.length;
      return take > 0 ? (
        <span key={si} style={{ color }}>
          {text.slice(0, take)}
        </span>
      ) : null;
    });
    if (cursorLine < 0 && used >= budget) cursorLine = li;
    return (
      <div key={li} className="flex min-h-[17px] whitespace-pre">
        <span className="mr-3.5 w-[26px] flex-none text-right" style={{ color: C.gutter }}>
          {li + 1}
        </span>
        {parts}
        {li === cursorLine && !done && <span className="mt-0.5 inline-block h-[13px] w-1.5 bg-fg" />}
      </div>
    );
  });

  return (
    <div
      className="absolute top-3 right-3 bottom-4 left-3 flex flex-col overflow-hidden rounded-md bg-[#0d0d0f] font-mono text-fg"
      style={{ fontSize: 11.5, lineHeight: '17px' }}
    >
      {/* macOS menu bar */}
      <div
        className="flex h-4 flex-none items-center gap-3 bg-[#141417] px-2.5 text-fg-subtle"
        style={{ fontFamily: SYSTEM_FONT, fontSize: 8.5 }}
      >
        <span className="font-bold text-fg">IntelliJ IDEA</span>
        {['File', 'Edit', 'View', 'Run'].map((item) => (
          <span key={item}>{item}</span>
        ))}
        <span className="ml-auto">Wed 7:04 PM</span>
      </div>

      {/* Editor tabs */}
      <div
        className="flex h-6 flex-none items-center gap-1.5 border-b border-line bg-surface px-2.5 text-fg-muted"
        style={{ fontSize: 10.5 }}
      >
        <span className="border-b border-fg pb-0.5 text-fg">MeController.java</span>
        <span>UserService.java</span>
        <span className={done ? 'ml-auto text-fg' : 'ml-auto'}>{done ? '▶ Running :8080' : '● Building'}</span>
      </div>

      <div className="flex-1 overflow-hidden px-1.5 py-2">{lines}</div>

      {/* Response panel */}
      <div
        className="h-20 flex-none border-t border-line bg-surface px-3.5 py-1.5"
        style={{ fontSize: 10.5, lineHeight: '14px' }}
      >
        <div className="mb-[3px] text-fg-muted uppercase" style={{ fontSize: 9 }}>
          Response
        </div>
        {responseLines.slice(0, shownResponse).map(([text, color]) => (
          <div key={text} className="whitespace-pre" style={{ color }}>
            {text}
          </div>
        ))}
      </div>

      {/* Notch and glare */}
      <div className="absolute top-0 left-1/2 -ml-[46px] h-4 w-[92px] rounded-b-lg bg-[#050506]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(118deg,rgba(255,255,255,.09) 0%,rgba(255,255,255,.02) 30%,rgba(255,255,255,0) 31%,rgba(255,255,255,0) 100%)',
        }}
      />
    </div>
  );
}
