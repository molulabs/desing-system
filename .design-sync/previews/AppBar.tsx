import { AppBar, AppBarAction } from '@molulabs/ds';

const phone = { width: 390 } as const;

export const OnChrome = () => (
  <div style={phone}>
    <AppBar title="Remito 0003-00004112" sub="Pendiente de entrega" onBack={() => {}}
      actions={<><AppBarAction icon="ti-search" label="Buscar" /><AppBarAction icon="ti-bell" label="Avisos" badge={3} /></>} />
  </div>
);

export const OnPaper = () => (
  <div style={phone}>
    <AppBar tone="paper" title="Clientes" sub="128 activos"
      actions={<AppBarAction tone="paper" icon="ti-plus" label="Nuevo cliente" />} />
  </div>
);

export const TitleOnly = () => (
  <div style={phone}>
    <AppBar title="Pedidos de hoy" />
  </div>
);
