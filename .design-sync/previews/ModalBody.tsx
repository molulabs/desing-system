import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Field, TextInput, Select } from '@molulabs/ds';

const frame = { position: 'relative', height: 420, width: 760, overflow: 'hidden', background: 'var(--page)' } as const;

export const Form = () => (
  <div style={frame}>
    <Modal open contained size="md" onClose={() => {}}>
      <ModalHeader title="Nuevo cliente" />
      <ModalBody>
        <Field label="Razón social"><TextInput value="Agropecuaria Los Sauces S.R.L." onChange={() => {}} /></Field>
        <Field label="CUIT"><TextInput value="30-71234567-8" mono onChange={() => {}} /></Field>
        <Field label="Condición de IVA">
          <Select value="ri" onChange={() => {}} options={[{ value: 'ri', label: 'Responsable Inscripto' }, { value: 'mono', label: 'Monotributo' }]} />
        </Field>
      </ModalBody>
      <ModalFooter><Button tone="ghost">Cancelar</Button><Button>Crear cliente</Button></ModalFooter>
    </Modal>
  </div>
);

export const Scrolls = () => (
  <div style={{ ...frame, height: 340 }}>
    <Modal open contained size="sm" onClose={() => {}}>
      <ModalHeader title="Términos de la venta" />
      <ModalBody>
        {Array.from({ length: 8 }, (_, i) => (
          <p key={i} style={{ margin: 0 }}>Cláusula {i + 1}. El comprador acepta recibir la mercadería en el depósito indicado.</p>
        ))}
      </ModalBody>
      <ModalFooter><Button>Entendido</Button></ModalFooter>
    </Modal>
  </div>
);
