import { NavItem } from '@molulabs/ds';

const rail = { width: 258, background: 'var(--chrome)', padding: 10, display: 'grid', gap: 2 } as const;

export const States = () => (
  <div style={rail}>
    <NavItem icon="ti-home" label="Inicio" active onClick={() => {}} />
    <NavItem icon="ti-file-invoice" label="Ventas" onClick={() => {}} />
    <NavItem icon="ti-package" label="Stock" onClick={() => {}} />
    <NavItem icon="ti-users" label="Clientes" onClick={() => {}} />
  </div>
);

export const WithBadge = () => (
  <div style={rail}>
    <NavItem icon="ti-bell" label="Avisos" badge={3} onClick={() => {}} />
    <NavItem icon="ti-alert-triangle" label="Pendientes" badge={12} active onClick={() => {}} />
  </div>
);
