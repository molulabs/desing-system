import React from 'react';
import { TextInput as NativeTextInput, View } from 'react-native';

import { useTokens } from '../native/theme.jsx';
import { Txt } from '../native/Txt.jsx';
import { controlStyle } from './Field.native.jsx';

export function NumberInput({ value, onChange, unit, prefix, invalid, disabled, readOnly, name, id, step, style }) {
  const t = useTokens();
  const [focus, setFocus] = React.useState(false);
  // The affixes are measured, as on the web, so the figure never runs under them
  const [w, setW] = React.useState({ unit: 0, pre: 0 });
  const measure = key => e => {
    const width = Math.ceil(e.nativeEvent.layout.width);
    setW(prev => (prev[key] === width ? prev : { ...prev, [key]: width }));
  };
  const affix = { position: 'absolute', top: 0, bottom: 0, justifyContent: 'center' };

  return (
    <View>
      <NativeTextInput nativeID={id} keyboardType="decimal-pad" value={value == null ? '' : String(value)}
        editable={!disabled && !readOnly} accessibilityState={{ disabled: !!disabled }}
        accessibilityLabelledBy={id ? id + '-label' : undefined}
        onChangeText={text => !readOnly && onChange && onChange(text)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={[
          controlStyle({ invalid, disabled, readOnly, mono: true, align: 'right', focus }, t),
          unit ? { paddingRight: 19 + w.unit } : null,
          prefix ? { paddingLeft: 17 + w.pre } : null,
          style,
        ]} />
      {prefix ? (
        <View pointerEvents="none" style={[affix, { left: 11 }]}>
          <Txt mono size={13} color={t.ink3} numberOfLines={1} onLayout={measure('pre')}>{prefix}</Txt>
        </View>
      ) : null}
      {unit ? (
        <View pointerEvents="none" style={[affix, { right: 11 }]}>
          <Txt size={t.textSm} color={t.ink3} numberOfLines={1} onLayout={measure('unit')}>{unit}</Txt>
        </View>
      ) : null}
    </View>
  );
}
