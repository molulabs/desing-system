import { useEffect } from 'react';
import { ToastProvider, useToasts, Button } from '@molulabs/ds';

// Pushes two toasts on mount so the card shows the stack. Infinity keeps them from auto-closing.
function Demo() {
  const { push } = useToasts();
  useEffect(() => {
    push('success', 'Factura emitida', 'FA-A 0003-00012841 por $ 482.300,00.');
    push('danger', 'No se pudo enviar el mail', 'El servidor no respondió.', { label: 'Reintentar' });
  }, []);
  return <Button tone="secondary" icon="ti-bell" onClick={() => push('info', 'Sincronizando', 'Descargando padrón de ARCA.')}>Avisar</Button>;
}

export const Stack = () => (
  <ToastProvider duration={Infinity} dangerDuration={Infinity} stackStyle={{ position: 'static' }}>
    <div style={{ width: 400, display: 'grid', gap: 12, justifyItems: 'start' }}>
      <Demo />
    </div>
  </ToastProvider>
);
