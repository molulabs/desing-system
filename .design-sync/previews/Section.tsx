import { Section, FeatureGrid, Button } from '@molulabs/ds';

const items = [
  { icon: 'ti-file-invoice', title: 'Facturación con ARCA', body: 'Emití facturas A, B y C y notas de crédito sin salir del sistema.' },
  { icon: 'ti-package', title: 'Stock por depósito', body: 'Cada venta descuenta del depósito que corresponde.' },
  { icon: 'ti-chart-bar', title: 'Cierre del mes', body: 'IVA ventas, cuentas corrientes y rankings en un clic.' },
];

export const Left = () => (
  <div data-density="comfortable" style={{ width: 1000 }}>
    <Section eyebrow="Qué incluye" title="Todo lo que necesita una cooperativa"
      lead="Un solo sistema para vender, controlar el stock y cerrar el mes.">
      <FeatureGrid items={items} />
    </Section>
  </div>
);

export const CenteredCard = () => (
  <div data-density="comfortable" style={{ width: 1000 }}>
    <Section tone="card" align="center" title="Probalo con tus datos"
      lead="Cargamos tu padrón y tus productos para que lo veas funcionando."
      actions={<><Button size="lg">Pedir una demo</Button><Button size="lg" tone="secondary">Hablar con ventas</Button></>} />
  </div>
);

export const Chrome = () => (
  <div data-density="comfortable" style={{ width: 1000 }}>
    <Section tone="chrome" eyebrow="Seguridad" title="Tus datos, en tu país"
      lead="Copias diarias y acceso por usuario con registro de auditoría." />
  </div>
);
