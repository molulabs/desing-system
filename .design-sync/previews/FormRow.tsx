import { FormRow, Field, TextInput, Select, NumberInput } from '@molulabs/ds';

export const TwoFields = () => (
  <div style={{ width: 560 }}>
    <FormRow>
      <Field label="Razón social"><TextInput value="Agropecuaria Los Sauces S.R.L." onChange={() => {}} /></Field>
      <Field label="CUIT"><TextInput value="30-71234567-8" mono onChange={() => {}} /></Field>
    </FormRow>
  </div>
);

export const ThreeFields = () => (
  <div style={{ width: 760 }}>
    <FormRow min={200}>
      <Field label="Condición de IVA">
        <Select value="ri" onChange={() => {}} options={[{ value: 'ri', label: 'Responsable Inscripto' }, { value: 'mono', label: 'Monotributo' }]} />
      </Field>
      <Field label="Cantidad"><NumberInput value="1.250" unit="kg" onChange={() => {}} /></Field>
      <Field label="Precio unitario"><NumberInput value="385,50" prefix="$" onChange={() => {}} /></Field>
    </FormRow>
  </div>
);

export const Wraps = () => (
  <div style={{ width: 320 }}>
    <FormRow>
      <Field label="Razón social"><TextInput value="Agropecuaria Los Sauces" onChange={() => {}} /></Field>
      <Field label="CUIT"><TextInput value="30-71234567-8" mono onChange={() => {}} /></Field>
    </FormRow>
  </div>
);
