import { FormActions, Button } from '@molulabs/ds';

const box = { width: 560 } as const;

export const WithNote = () => (
  <div style={box}>
    <FormActions note="Al confirmar se descuenta el stock del depósito.">
      <Button tone="ghost">Cancelar</Button>
      <Button tone="secondary">Guardar borrador</Button>
      <Button icon="ti-check">Confirmar venta</Button>
    </FormActions>
  </div>
);

export const ActionsOnly = () => (
  <div style={box}>
    <FormActions>
      <Button tone="ghost">Cancelar</Button>
      <Button>Guardar</Button>
    </FormActions>
  </div>
);
