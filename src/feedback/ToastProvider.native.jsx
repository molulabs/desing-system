import React from 'react';
import { View } from 'react-native';

import { Toast, ToastStack } from './Toast.native.jsx';
import { DANGER_DURATION, DEFAULT_DURATION, toastAction, useToastQueue } from './toastQueue.js';

const ToastCtx = React.createContext(null);

// No hover to pause on: it closes after its duration
function TimedToast({ t, onDismiss }) {
  React.useEffect(() => {
    if (!isFinite(t.duration)) return undefined;
    const timer = setTimeout(() => onDismiss(t.id), t.duration);
    return () => clearTimeout(timer);
  }, [t.id, t.duration, onDismiss]);

  return (
    <Toast tone={t.tone} title={t.title} action={t.action ? t.action.label : undefined}
      onAction={toastAction(t, onDismiss)} onClose={() => onDismiss(t.id)}>{t.msg}</Toast>
  );
}

/** Wrap the app once: the toasts are drawn over it, at the bottom of the screen. */
export function ToastProvider({ children, max = 4, duration = DEFAULT_DURATION, dangerDuration = DANGER_DURATION, stackStyle }) {
  const { list, api } = useToastQueue({ max, duration, dangerDuration });

  return (
    <ToastCtx.Provider value={api}>
      <View style={{ flex: 1 }}>
        {children}
        {list.length ? (
          <ToastStack style={stackStyle}>
            {list.map(t => <TimedToast key={t.id} t={t} onDismiss={api.dismiss} />)}
          </ToastStack>
        ) : null}
      </View>
    </ToastCtx.Provider>
  );
}

export function useToasts() {
  const api = React.useContext(ToastCtx);
  if (!api) throw new Error('useToasts() necesita un <ToastProvider> arriba en el árbol.');
  return api;
}

ToastProvider.useToasts = useToasts;
