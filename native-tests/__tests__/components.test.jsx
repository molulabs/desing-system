import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import * as ds from '@molulabs/ds';
import { DesignSystemProvider, fontFamily, nativeTokens } from '@molulabs/ds/native';

const {
    AlertBanner, AppBar, AppBarAction, Button, Card, EmptyState, Field, IconButton, ListGroup, ListRow, TabBar, Tag,
    TextInput, Toast, ToastProvider, useToasts,
} = ds;

const t = nativeTokens();
const flat = (style) => Object.assign({}, ...[style].flat(Infinity).filter(Boolean));

test('the package resolves the native renderers', () => {
    expect(Object.keys(ds).sort()).toEqual([
        'AlertBanner', 'AppBar', 'AppBarAction', 'Autocomplete', 'AutocompleteMulti', 'Button', 'Card', 'Checkbox', 'Choice',
        'DateInput', 'DateRange', 'Dialog', 'EmptyState', 'Field', 'FormActions', 'FormRow', 'IconButton', 'KeyValueList',
        'ListGroup', 'ListRow', 'MultiChoice', 'NumberInput', 'RadioGroup', 'SectionHeader', 'SegmentedControl', 'Select',
        'Sheet', 'SheetAction', 'Stepper', 'Switch', 'TOAST_TONES', 'TabBar', 'Tag', 'TextInput', 'Textarea', 'Toast',
        'ToastProvider', 'ToastStack', 'Wizard', 'controlStyle', 'useToasts',
    ]);
});

test('Button: onClick on press, text in the system face, disabled does nothing', () => {
    const onClick = jest.fn();
    render(<Button icon="ti-send" onClick={onClick}>Enviar</Button>);

    fireEvent.press(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
    expect(flat(screen.getByText('Enviar').props.style)).toMatchObject({
        fontFamily: fontFamily(t.sans, t.weightMedium), fontSize: t.textMd, color: '#fff',
    });

    const onDisabled = jest.fn();
    render(<Button disabled onClick={onDisabled}>No</Button>);
    fireEvent.press(screen.getByText('No'));
    expect(onDisabled).not.toHaveBeenCalled();
});

test('Button lg is a full tap target and secondary keeps the hairline', () => {
    render(<Button size="lg" tone="secondary">Grande</Button>);

    expect(flat(screen.getByRole('button').props.style)).toMatchObject({ minHeight: 44, borderColor: t.line, backgroundColor: t.card });
});

test('the theme of the provider reaches the components', () => {
    render(<DesignSystemProvider theme="carbon"><Button>Carbón</Button></DesignSystemProvider>);

    expect(flat(screen.getByRole('button').props.style).backgroundColor).toBe(nativeTokens({ theme: 'carbon' }).chrome);
});

test('IconButton and AppBarAction are labelled for screen readers', () => {
    const onBack = jest.fn();
    render(
        <AppBar title="Censos" sub="3 pendientes" onBack={onBack} actions={<AppBarAction icon="ti-refresh" label="Enviar" badge={3} />} />
    );

    fireEvent.press(screen.getByLabelText('Volver'));
    expect(onBack).toHaveBeenCalled();
    expect(screen.getByLabelText('Enviar')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
    expect(flat(screen.getByText('Censos').props.style).color).toBe('#fff');

    render(<IconButton icon="ti-dots" label="Más acciones" />);
    expect(screen.getByLabelText('Más acciones')).toBeTruthy();
});

test('Field shows the error instead of the hint, and TextInput reports the text first', () => {
    const onChange = jest.fn();
    render(
        <Field label="Documento" required hint="Sin puntos" error="Ya está registrado" htmlFor="doc">
            <TextInput id="doc" mono invalid value="" onChange={onChange} placeholder="30111222" />
        </Field>
    );

    expect(screen.getByText('Ya está registrado')).toBeTruthy();
    expect(screen.queryByText('Sin puntos')).toBeNull();

    const input = screen.getByPlaceholderText('30111222');
    expect(flat(input.props.style)).toMatchObject({ borderColor: t.alert, fontFamily: fontFamily(t.mono), fontSize: t.fieldMono, minHeight: 44 });

    fireEvent(input, 'change', { nativeEvent: { text: '301' } });
    expect(onChange).toHaveBeenCalledWith('301', { nativeEvent: { text: '301' } });
});

test('TextInput maps the web types to the keyboard', () => {
    render(<TextInput type="password" placeholder="Clave" disabled />);

    const input = screen.getByPlaceholderText('Clave');
    expect(input.props.secureTextEntry).toBe(true);
    expect(input.props.editable).toBe(false);
});

test('Card, Tag, AlertBanner and EmptyState draw their text', () => {
    const onAction = jest.fn();
    render(
        <>
            <Card title="Productor" meta="Paso 1 de 8"><Text>Cuerpo</Text></Card>
            <Tag tone="warn">En conflicto</Tag>
            <AlertBanner tone="warning" title="Sin conexión" action="Reintentar" onAction={onAction}>Se envían después.</AlertBanner>
            <EmptyState title="Nada para enviar">Los censos listos aparecen acá.</EmptyState>
        </>
    );

    expect(flat(screen.getByText('En conflicto').props.style).color).toBe(t.warn);
    fireEvent.press(screen.getByText('Reintentar'));
    expect(onAction).toHaveBeenCalled();
    ['Productor', 'Paso 1 de 8', 'Cuerpo', 'Sin conexión', 'Se envían después.', 'Nada para enviar'].forEach((text) =>
        expect(screen.getByText(text)).toBeTruthy()
    );
});

test('ListRow is tappable only with onClick and drops its rule when first', () => {
    const onClick = jest.fn();
    render(
        <ListGroup label="Pendientes">
            <ListRow first title="Ana Martínez" meta="F-100" onClick={onClick} />
            <ListRow title="Juan Pérez" value="12" valueMeta="vacas" />
        </ListGroup>
    );

    fireEvent.press(screen.getByText('Ana Martínez'));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(flat(screen.getByRole('button').props.style).borderTopWidth).toBe(0);
    expect(flat(screen.getByText('12').props.style).fontFamily).toBe(fontFamily(t.mono));
});

test('TabBar marks the current tab and navigates by key', () => {
    const onNavigate = jest.fn();
    render(
        <TabBar current="censos" onNavigate={onNavigate}
            items={[{ key: 'censos', label: 'Censos', icon: 'ti-clipboard-list' }, { key: 'mapa', label: 'Mapa', icon: 'ti-map' }]} />
    );

    expect(screen.getByRole('tab', { name: 'Censos', selected: true })).toBeTruthy();
    fireEvent.press(screen.getByRole('tab', { name: 'Mapa' }));
    expect(onNavigate).toHaveBeenCalledWith('mapa');
});

test('ToastProvider shows a pushed toast and closes it after its duration', () => {
    jest.useFakeTimers();

    function Push() {
        const toasts = useToasts();
        return <Button onClick={() => toasts.push('danger', 'No se pudo enviar', 'Sin señal')}>Enviar</Button>;
    }

    render(<ToastProvider><Push /></ToastProvider>);
    fireEvent.press(screen.getByText('Enviar'));
    expect(screen.getByText('No se pudo enviar')).toBeTruthy();

    React.act(() => jest.advanceTimersByTime(8999));
    expect(screen.getByText('Sin señal')).toBeTruthy();
    React.act(() => jest.advanceTimersByTime(1));
    expect(screen.queryByText('No se pudo enviar')).toBeNull();

    jest.useRealTimers();
});

test('Toast closes on its button', () => {
    const onClose = jest.fn();
    render(<Toast tone="success" title="Censo enviado" onClose={onClose}>F-100</Toast>);

    fireEvent.press(screen.getByLabelText('Cerrar aviso'));
    expect(onClose).toHaveBeenCalled();
});

test('an icon Tabler lacks warns and draws nothing', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Button icon="ti-not-an-icon">Texto</Button>);

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('ti-not-an-icon'));
    warn.mockRestore();
});
