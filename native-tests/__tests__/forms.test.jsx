import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import {
    Autocomplete, AutocompleteMulti, Checkbox, DateInput, Dialog, KeyValueList, MultiChoice, NumberInput, RadioGroup,
    SectionHeader, SegmentedControl, Select, Sheet, SheetAction, Stepper, Switch, Textarea, Wizard,
} from '@molulabs/ds';
import { fontFamily, nativeTokens } from '@molulabs/ds/native';

const t = nativeTokens();
const flat = (style) => Object.assign({}, ...[style].flat(Infinity).filter(Boolean));

test('NumberInput: mono, right aligned, the number pad, and the text as typed', () => {
    const onChange = jest.fn();
    render(<NumberInput id="cows" value={12} unit="cabezas" onChange={onChange} />);

    const input = screen.getByDisplayValue('12');
    expect(input.props.keyboardType).toBe('decimal-pad');
    expect(flat(input.props.style)).toMatchObject({ textAlign: 'right', fontFamily: fontFamily(t.mono) });
    expect(screen.getByText('cabezas')).toBeTruthy();

    fireEvent.changeText(input, '12,5');
    expect(onChange).toHaveBeenCalledWith('12,5');
});

test('NumberInput readOnly shows the figure and takes no edits', () => {
    render(<NumberInput value="40" readOnly />);

    expect(screen.getByDisplayValue('40').props.editable).toBe(false);
    expect(flat(screen.getByDisplayValue('40').props.style).backgroundColor).toBe(t.zebra);
});

test('Textarea is multiline and as tall as its rows', () => {
    render(<Textarea rows={4} placeholder="Observaciones" />);

    const input = screen.getByPlaceholderText('Observaciones');
    expect(input.props.multiline).toBe(true);
    expect(flat(input.props.style).minHeight).toBeGreaterThan(4 * 20);
});

test('Checkbox, Switch and RadioGroup toggle by tapping the whole row', () => {
    const onCheck = jest.fn();
    const onSwitch = jest.fn();
    const onRadio = jest.fn();
    render(
        <>
            <Checkbox label="Vive en el predio" checked={false} onChange={onCheck} />
            <Switch label="Sincronizar con datos" checked onChange={onSwitch} />
            <RadioGroup value="a" onChange={onRadio} options={[{ value: 'a', label: 'Propietario' }, { value: 'b', label: 'Arrendatario', hint: 'Con contrato' }]} />
        </>
    );

    fireEvent.press(screen.getByText('Vive en el predio'));
    expect(onCheck).toHaveBeenCalledWith(true);
    fireEvent.press(screen.getByRole('switch'));
    expect(onSwitch).toHaveBeenCalledWith(false);
    expect(screen.getByRole('radio', { name: 'Propietario', checked: true })).toBeTruthy();
    fireEvent.press(screen.getByText('Con contrato'));
    expect(onRadio).toHaveBeenCalledWith('b');
});

test('SegmentedControl starts unanswered and answers with the option value', () => {
    const onChange = jest.fn();
    render(<SegmentedControl value={null} onChange={onChange} options={[{ value: true, label: 'Sí' }, { value: false, label: 'No' }]} />);

    expect(screen.queryByRole('radio', { checked: true })).toBeNull();
    fireEvent.press(screen.getByText('No'));
    expect(onChange).toHaveBeenCalledWith(false);
});

test('MultiChoice: every variant draws the options and an exclusive one clears the rest', () => {
    const options = ['Vacunos', 'Ovinos', { value: 'none', label: 'Ninguno', exclusive: true }];

    for (const variant of ['tiles', 'chips', 'list', 'buttons']) {
        const onChange = jest.fn();
        const { unmount } = render(<MultiChoice variant={variant} value={['Vacunos']} onChange={onChange} options={options} />);

        expect(screen.getByRole('checkbox', { name: 'Vacunos', checked: true })).toBeTruthy();
        fireEvent.press(screen.getByText('Ninguno'));
        expect(onChange).toHaveBeenCalledWith(['none']);
        unmount();
    }

    render(<MultiChoice variant="list" value={['Vacunos']} options={options} />);
    expect(screen.getByText('1 de 2 seleccionadas')).toBeTruthy();
});

test('Select opens its options in a sheet and answers with the value', () => {
    const onChange = jest.fn();
    render(<Select placeholder="Elegir departamento" value="" onChange={onChange} options={[{ value: '1', label: 'Tilcara' }, 'Humahuaca']} />);

    expect(screen.queryByText('Tilcara')).toBeNull();
    fireEvent.press(screen.getByRole('combobox'));
    fireEvent.press(screen.getByText('Humahuaca'));
    expect(onChange).toHaveBeenCalledWith('Humahuaca');
    expect(screen.queryByText('Tilcara')).toBeNull();
});

test('DateInput takes dd/mm/aaaa and gives the ISO date once it is a real day', () => {
    const onChange = jest.fn();
    render(<DateInput value="2026-11-02" onChange={onChange} />);

    const input = screen.getByDisplayValue('02/11/2026');
    expect(input.props.keyboardType).toBe('number-pad');

    fireEvent.changeText(input, '3110');
    expect(screen.getByDisplayValue('31/10')).toBeTruthy();
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.changeText(screen.getByDisplayValue('31/10'), '31102026');
    expect(onChange).toHaveBeenCalledWith('2026-10-31');

    fireEvent.changeText(screen.getByDisplayValue('31/10/2026'), '');
    expect(onChange).toHaveBeenLastCalledWith('');
});

test('Autocomplete searches in a sheet, picks, and offers to create what is missing', () => {
    function Breed({ onSelect, onCreate }) {
        const [text, setText] = React.useState('');
        return <Autocomplete value={text} onChange={setText} onSelect={onSelect} onCreate={onCreate} placeholder="Raza"
            items={[{ label: 'Criolla', value: 1 }, { label: 'Hereford', value: 2 }]} />;
    }
    const onSelect = jest.fn();
    const onCreate = jest.fn();
    render(<Breed onSelect={onSelect} onCreate={onCreate} />);

    fireEvent.press(screen.getByRole('combobox'));
    const search = screen.getByRole('search');
    fireEvent.changeText(search, 'crió');
    expect(screen.queryByText('Hereford')).toBeNull();
    fireEvent.press(screen.getByText('Criolla'));
    expect(onSelect).toHaveBeenCalledWith({ label: 'Criolla', value: 1 });

    fireEvent.press(screen.getByRole('combobox'));
    fireEvent.changeText(screen.getByRole('search'), 'Angus');
    fireEvent.press(screen.getByText('Crear «Angus»'));
    expect(onCreate).toHaveBeenCalledWith('Angus');
});

test('AutocompleteMulti shows the picks as chips, hides them from the list and removes them', () => {
    function Crops({ onChange }) {
        const [value, setValue] = React.useState([{ label: 'Maíz', value: 'maiz' }]);
        return <AutocompleteMulti value={value} onChange={(next) => { setValue(next); onChange(next); }} placeholder="Cultivos"
            items={[{ label: 'Maíz', value: 'maiz' }, { label: 'Papa', value: 'papa' }]} />;
    }
    const onChange = jest.fn();
    render(<Crops onChange={onChange} />);

    fireEvent.press(screen.getByRole('combobox'));
    expect(screen.getAllByText('Maíz')).toHaveLength(2); // the chip in the field and the one in the sheet
    fireEvent.press(screen.getByText('Papa'));
    expect(onChange).toHaveBeenLastCalledWith([{ label: 'Maíz', value: 'maiz' }, { label: 'Papa', value: 'papa' }]);

    fireEvent.press(screen.getAllByLabelText('Quitar Maíz')[0]);
    expect(onChange).toHaveBeenLastCalledWith([{ label: 'Papa', value: 'papa' }]);
});

test('Stepper compact says where the census is; the full one jumps back to done steps', () => {
    const steps = [{ label: 'Productor' }, { label: 'Familia' }, { label: 'Pecuaria' }];
    const onStep = jest.fn();
    const { rerender } = render(<Stepper compact steps={steps} current={1} />);

    expect(screen.getByText('Paso 2 de 3')).toBeTruthy();
    rerender(<Stepper steps={steps} current={1} onStep={onStep} />);
    fireEvent.press(screen.getByText('Productor'));
    expect(onStep).toHaveBeenCalledWith(0);
    fireEvent.press(screen.getByText('Pecuaria'));
    expect(onStep).toHaveBeenCalledTimes(1);
});

test('Wizard moves with Anterior / Siguiente and confirms on the last step', () => {
    const steps = [{ label: 'Productor' }, { label: 'Resumen' }];
    const onNext = jest.fn();
    const onBack = jest.fn();
    const onFinish = jest.fn();
    const { rerender } = render(<Wizard compact steps={steps} current={0} onNext={onNext}><Text>Paso uno</Text></Wizard>);

    expect(screen.queryByText('Anterior')).toBeNull();
    fireEvent.press(screen.getByText('Siguiente'));
    expect(onNext).toHaveBeenCalled();

    rerender(<Wizard compact steps={steps} current={1} onBack={onBack} onFinish={onFinish} finishLabel="Marcar listo"><Text>Resumen</Text></Wizard>);
    fireEvent.press(screen.getByText('Anterior'));
    fireEvent.press(screen.getByText('Marcar listo'));
    expect(onBack).toHaveBeenCalled();
    expect(onFinish).toHaveBeenCalled();
});

test('Dialog and Sheet are modal: confirm, cancel, and nothing while closed', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const onDelete = jest.fn();
    const { rerender } = render(
        <>
            <Dialog title="¿Descartar el censo?" tone="danger" confirmLabel="Descartar" onConfirm={onConfirm} onCancel={onCancel}>Se pierde lo cargado.</Dialog>
            <Sheet open title="Ana Martínez"><SheetAction icon="ti-trash" tone="danger" label="Eliminar" onClick={onDelete} /></Sheet>
        </>
    );

    fireEvent.press(screen.getByText('Descartar'));
    fireEvent.press(screen.getByText('Volver'));
    fireEvent.press(screen.getByText('Eliminar'));
    expect(onConfirm).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();

    rerender(<Sheet open={false} title="Ana Martínez" />);
    expect(screen.queryByText('Ana Martínez')).toBeNull();
});

test('SectionHeader and KeyValueList draw their text', () => {
    render(
        <>
            <SectionHeader index={2} title="Composición familiar" description="Quiénes viven en el predio" />
            <KeyValueList items={[{ k: 'Documento', v: '30111222', mono: true }, { k: 'Total', v: '12', emphasis: true }]} />
        </>
    );

    expect(screen.getByText('02')).toBeTruthy();
    expect(screen.getByText('Quiénes viven en el predio')).toBeTruthy();
    expect(flat(screen.getByText('30111222').props.style).fontFamily).toBe(fontFamily(t.mono));
    expect(flat(screen.getByText('12').props.style).fontFamily).toBe(fontFamily(t.sans, t.weightSemibold));
});
