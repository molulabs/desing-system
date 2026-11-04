import React from 'react';
import { Toast, ToastStack } from './Toast.jsx';
import { DANGER_DURATION, DEFAULT_DURATION, toastAction, useToastQueue } from './toastQueue.js';

const ToastCtx = React.createContext(null);

function TimedToast({ t, onDismiss }) {
  const left = React.useRef(t.duration);
  const started = React.useRef(0);
  const timer = React.useRef(null);
  const [paused, setPaused] = React.useState(false);
  const start = () => {
    if (!isFinite(left.current)) return;
    started.current = Date.now();
    timer.current = setTimeout(() => onDismiss(t.id), left.current);
  };
  const pause = () => {
    if (!timer.current) return;
    clearTimeout(timer.current); timer.current = null;
    left.current = Math.max(0, left.current - (Date.now() - started.current));
    setPaused(true);
  };
  const resume = () => { setPaused(false); if (!timer.current) start(); };
  React.useEffect(() => { start(); return () => clearTimeout(timer.current); }, []);
  return (
    <div onMouseEnter={pause} onMouseLeave={resume} onFocus={pause} onBlur={resume} data-paused={paused || undefined}>
      <Toast tone={t.tone} title={t.title}
        action={t.action ? t.action.label : undefined}
        onAction={toastAction(t, onDismiss)}
        onClose={() => onDismiss(t.id)}>{t.msg}</Toast>
    </div>
  );
}

export function ToastProvider({ children, max = 4, duration = DEFAULT_DURATION, dangerDuration = DANGER_DURATION, stackStyle }) {
  const { list, api } = useToastQueue({ max, duration, dangerDuration });
  return (
    <ToastCtx.Provider value={api}>
      {children}
      {list.length ? (
        <ToastStack style={stackStyle}>
          <div aria-live="polite" style={{ display: 'contents' }}>
            {list.map(t => <TimedToast key={t.id} t={t} onDismiss={api.dismiss} />)}
          </div>
        </ToastStack>
      ) : null}
    </ToastCtx.Provider>
  );
}

export function useToasts() {
  const api = React.useContext(ToastCtx);
  if (!api) throw new Error('useToasts() necesita un <ToastProvider> arriba en el árbol.');
  return api;
}

ToastProvider.useToasts = useToasts;
