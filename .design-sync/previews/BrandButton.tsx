import { BrandButton } from '@molulabs/ds';

const row = { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' } as const;

export const Variants = () => (
  <div style={row}>
    <BrandButton label="Ver en Google Earth" icon="ti-world" />
    <BrandButton label="Ver en Google Earth" icon="ti-world" variant="outline" />
  </div>
);

export const Brands = () => (
  <div style={row}>
    <BrandButton label="Enviar por WhatsApp" icon="ti-brand-whatsapp" brandColor="#25D366" />
    <BrandButton label="Cobrar con Mercado Pago" icon="ti-credit-card" brandColor="#009EE3" />
    <BrandButton label="Abrir en Maps" icon="ti-map-pin" brandColor="#EA4335" variant="outline" />
  </div>
);

export const Sizes = () => (
  <div style={row}>
    <BrandButton label="Ver ubicación del lote" icon="ti-map" size="md" href="#lote-12" />
    <BrandButton label="Ver ubicación" icon="ti-map" size="sm" href="#lote-12" />
  </div>
);

export const Disabled = () => (
  <div style={row}>
    <BrandButton label="Enviar por WhatsApp" icon="ti-brand-whatsapp" brandColor="#25D366" disabled />
  </div>
);
