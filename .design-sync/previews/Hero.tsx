import { Hero, Button } from '@molulabs/ds';

const media = (
  <div style={{
    height: 260, borderRadius: 'var(--r)', border: '1px solid var(--chrome-line)', background: 'var(--chrome-2)',
    display: 'grid', placeItems: 'center', color: 'var(--chrome-mut)', fontFamily: 'var(--mono)', fontSize: 'var(--ui-text-sm)',
  }}>captura del sistema</div>
);

export const WithMedia = () => (
  <div data-density="comfortable" style={{ width: 1000 }}>
    <Hero
      eyebrow="Gestión para cooperativas"
      title="Stock, ventas y comprobantes en un solo lugar"
      lead="Emití facturas con ARCA, controlá el stock por depósito y cerrá el mes sin planillas."
      actions={<><Button size="lg" tone="secondary">Pedir una demo</Button><Button size="lg" tone="ghost" style={{ color: '#fff', borderColor: 'var(--chrome-line)' }}>Ver precios</Button></>}
      note="Sin tarjeta · Soporte en español"
      media={media}
    />
  </div>
);

export const Paper = () => (
  <div data-density="comfortable" style={{ width: 1000 }}>
    <Hero
      tone="paper"
      eyebrow="Novedades"
      title="Ahora también desde el celular"
      lead="Cargá pedidos y consultá remitos en campo, aunque no tengas señal."
      actions={<Button size="lg" icon="ti-device-mobile">Probar la app</Button>}
    />
  </div>
);
