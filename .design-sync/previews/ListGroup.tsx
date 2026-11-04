import { ListGroup, ListRow, Tag } from '@molulabs/ds';

export const Grouped = () => (
  <div data-density="touch" style={{ width: 390, background: 'var(--page)', padding: 12 }}>
    <ListGroup label="Hoy">
      <ListRow first icon="ti-truck-delivery" title="Remito 0003-00004112" meta="Agropecuaria Los Sauces" tag={<Tag tone="warn">Pendiente</Tag>} onClick={() => {}} />
      <ListRow icon="ti-truck-delivery" title="Remito 0003-00004109" meta="Cooperativa San Jorge" tag={<Tag tone="ok">Entregado</Tag>} onClick={() => {}} />
    </ListGroup>
  </div>
);

export const TwoGroups = () => (
  <div data-density="touch" style={{ width: 390, background: 'var(--page)', padding: 12, display: 'grid', gap: 16 }}>
    <ListGroup label="Esta semana">
      <ListRow first title="FA-A 0003-00012841" meta="02/09/2026" value="$ 482.300" onClick={() => {}} />
      <ListRow title="FA-A 0003-00012838" meta="01/09/2026" value="$ 96.450" onClick={() => {}} />
    </ListGroup>
    <ListGroup label="Semana pasada">
      <ListRow first title="FA-A 0003-00012810" meta="26/08/2026" value="$ 1.204.000" onClick={() => {}} />
    </ListGroup>
  </div>
);
