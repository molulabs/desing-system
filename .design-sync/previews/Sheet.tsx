import { Sheet, SheetAction, Button } from '@molulabs/ds';

const phone = { position: 'relative', width: 390, height: 460, overflow: 'hidden', background: 'var(--page)' } as const;

export const ActionMenu = () => (
  <div data-density="touch" style={phone}>
    <Sheet open title="Remito 0003-00004112" sub="Pendiente de entrega" onClose={() => {}}>
      <SheetAction icon="ti-eye" label="Ver detalle" />
      <SheetAction icon="ti-truck-delivery" label="Marcar como entregado" meta="Hoy" />
      <SheetAction icon="ti-share" label="Compartir PDF" />
      <SheetAction icon="ti-trash" label="Anular remito" tone="danger" />
    </Sheet>
  </div>
);

export const Confirm = () => (
  <div data-density="touch" style={{ ...phone, height: 360 }}>
    <Sheet open title="¿Confirmar el pedido?" sub="Se descuentan 800 kg del depósito Rosario."
      actions={<><Button size="lg">Confirmar</Button><Button size="lg" tone="secondary">Volver</Button></>} />
  </div>
);
