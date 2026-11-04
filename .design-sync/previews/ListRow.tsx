import { ListRow, Tag } from '@molulabs/ds';

const list = { width: 390, background: 'var(--card)' } as const;

export const WithValue = () => (
  <div data-density="touch" style={list}>
    <ListRow first title="FA-A 0003-00012841" meta="Agropecuaria Los Sauces · 02/09" value="$ 482.300" valueMeta="Autorizada" onClick={() => {}} />
    <ListRow title="FA-A 0003-00012838" meta="Cooperativa San Jorge · 01/09" value="$ 96.450" valueMeta="Pendiente" onClick={() => {}} />
  </div>
);

export const WithIconAndTag = () => (
  <div data-density="touch" style={list}>
    <ListRow first icon="ti-truck-delivery" title="Remito 0003-00004112" meta="Rosario · 3 ítems" tag={<Tag tone="warn">Pendiente</Tag>} onClick={() => {}} />
    <ListRow icon="ti-truck-delivery" title="Remito 0003-00004109" meta="Santa Fe · 5 ítems" tag={<Tag tone="ok">Entregado</Tag>} onClick={() => {}} />
  </div>
);

export const Static = () => (
  <div data-density="touch" style={list}>
    <ListRow first title="Depósito Rosario" meta="Av. Pellegrini 1450" />
    <ListRow title="Depósito Santa Fe" meta="Ruta 11 km 4" />
  </div>
);
