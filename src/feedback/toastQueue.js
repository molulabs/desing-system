import React from 'react';

export const DEFAULT_DURATION = 5000;
export const DANGER_DURATION = 9000;

/**
 * The toasts on screen and the push / dismiss / clear API, the same for every renderer: each one
 * draws the list and closes a toast after its duration.
 */
export function useToastQueue({ max = 4, duration = DEFAULT_DURATION, dangerDuration = DANGER_DURATION } = {}) {
  const [list, setList] = React.useState([]);
  const seq = React.useRef(0);
  const dismiss = React.useCallback(id => setList(l => l.filter(t => t.id !== id)), []);
  const push = React.useCallback((tone, title, msg, action) => {
    const id = 't' + (++seq.current);
    const d = action && action.duration != null ? action.duration : tone === 'danger' ? dangerDuration : duration;
    setList(l => [...l, { id, tone: tone || 'info', title, msg, action, duration: d }].slice(-max));
    return id;
  }, [max, duration, dangerDuration]);
  const clear = React.useCallback(() => setList([]), []);
  const api = React.useMemo(() => ({ push, dismiss, clear }), [push, dismiss, clear]);

  return { list, api };
}

/** What the toast's action button does: its onClick, then closing the toast unless dismiss is false. */
export function toastAction(t, onDismiss) {
  const a = t.action;
  if (!a) return undefined;
  return () => { a.onClick && a.onClick(); if (a.dismiss !== false) onDismiss(t.id); };
}
