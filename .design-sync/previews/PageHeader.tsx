import { PageHeader, Button, Tag } from '@molulabs/ds';

export const List = () => (
  <div style={{ width: 720 }}>
    <PageHeader title="Ventas" sub="Comprobantes emitidos en septiembre"
      actions={<Button icon="ti-plus">Nueva venta</Button>} />
  </div>
);

export const Detail = () => (
  <div style={{ width: 720 }}>
    <PageHeader back="Ventas" onBack={() => {}}
      title="FA-A 0003-00012841"
      tags={<><Tag tone="ok">Autorizada</Tag><Tag tone="mut">Cta. cte.</Tag></>}
      sub="Agropecuaria Los Sauces · 02/09/2026"
      actions={<><Button tone="secondary" icon="ti-download">PDF</Button><Button tone="danger" icon="ti-trash">Anular</Button></>} />
  </div>
);
