import { Sheet, SheetAction } from '@molulabs/ds';

const phone = { position: 'relative', width: 390, height: 360, overflow: 'hidden', background: 'var(--page)' } as const;

export const Rows = () => (
  <div data-density="touch" style={phone}>
    <Sheet open title="Acciones" onClose={() => {}}>
      <SheetAction icon="ti-pencil" label="Editar pedido" />
      <SheetAction icon="ti-copy" label="Duplicar" meta="Ctrl+D" />
      <SheetAction icon="ti-trash" label="Eliminar" tone="danger" />
    </Sheet>
  </div>
);
