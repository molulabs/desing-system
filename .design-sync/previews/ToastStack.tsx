import { ToastStack, Toast } from '@molulabs/ds';

// Static position: the stack is fixed bottom-right by default, which would escape the card.
export const Stacked = () => (
  <div style={{ width: 400 }}>
    <ToastStack style={{ position: 'static', width: '100%', maxWidth: '100%' }}>
      <Toast tone="warning" title="Stock bajo" onClose={() => {}}>Quedan 800 kg de fertilizante en Rosario.</Toast>
      <Toast tone="success" title="Pedido confirmado" onClose={() => {}}>Remito 0003-00004112 generado.</Toast>
    </ToastStack>
  </div>
);
