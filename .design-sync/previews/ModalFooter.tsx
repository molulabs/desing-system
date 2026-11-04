import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@molulabs/ds';

const frame = { position: 'relative', height: 300, width: 760, overflow: 'hidden', background: 'var(--page)' } as const;

export const NoteAndActions = () => (
  <div style={frame}>
    <Modal open contained size="md" onClose={() => {}}>
      <ModalHeader title="Anular comprobante" />
      <ModalBody><p style={{ margin: 0 }}>Se emite una nota de crédito por el total de la factura.</p></ModalBody>
      <ModalFooter note="Esta acción queda registrada en la auditoría.">
        <Button tone="ghost">Volver</Button>
        <Button tone="danger" icon="ti-trash">Anular</Button>
      </ModalFooter>
    </Modal>
  </div>
);

export const ActionsOnly = () => (
  <div style={frame}>
    <Modal open contained size="sm" onClose={() => {}}>
      <ModalHeader title="Exportar listado" />
      <ModalBody><p style={{ margin: 0 }}>Se genera un archivo con los 128 clientes activos.</p></ModalBody>
      <ModalFooter><Button tone="secondary">Cancelar</Button><Button icon="ti-download">Descargar</Button></ModalFooter>
    </Modal>
  </div>
);
