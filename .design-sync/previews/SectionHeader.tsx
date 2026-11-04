import { SectionHeader, Field, TextInput, Button } from '@molulabs/ds';

export const Numbered = () => (
  <div style={{ width: 560, display: 'grid', gap: 14 }}>
    <SectionHeader first index={1} title="Datos fiscales" description="Como figuran en la constancia de AFIP." />
    <Field label="CUIT"><TextInput value="30-71234567-8" mono onChange={() => {}} /></Field>
    <SectionHeader index={2} title="Domicilio" description="Se imprime en los comprobantes."
      actions={<Button size="sm" tone="ghost" icon="ti-copy">Copiar del domicilio fiscal</Button>} />
    <Field label="Calle"><TextInput value="Av. Pellegrini 1450" onChange={() => {}} /></Field>
  </div>
);

export const Plain = () => (
  <div style={{ width: 560 }}>
    <SectionHeader first title="Observaciones" description="Se imprimen en el pie del comprobante." />
  </div>
);
