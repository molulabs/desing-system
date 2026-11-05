import React from 'react';
import { Pressable, TextInput as NativeTextInput } from 'react-native';

import { useTokens } from '../native/theme.jsx';
import { Txt } from '../native/Txt.jsx';
import { controlStyle } from './Field.native.jsx';

export function NumberInput({ value, onChange, unit, prefix, invalid, disabled, readOnly, name, id, step, style }) {
  const t = useTokens();
  const input = React.useRef(null);
  const [focus, setFocus] = React.useState(false);
  // The box holds the affixes beside the figure, in a row: padding the input by their measured
  // width (the web's way) is not always applied by Android once the input is drawn
  const { color, fontFamily, fontSize, textAlign, ...box } = controlStyle({ invalid, disabled, readOnly, mono: true, align: 'right', focus }, t);

  return (
    <Pressable accessible={false} disabled={disabled || readOnly} onPress={() => input.current?.focus()}
      style={[box, { flexDirection: 'row', alignItems: 'center', gap: 6 }, style]}>
      {prefix ? <Txt mono size={13} color={t.ink3} numberOfLines={1}>{prefix}</Txt> : null}
      <NativeTextInput ref={input} nativeID={id} keyboardType="decimal-pad" value={value == null ? '' : String(value)}
        editable={!disabled && !readOnly} accessibilityState={{ disabled: !!disabled }}
        accessibilityLabelledBy={id ? id + '-label' : undefined}
        onChangeText={text => !readOnly && onChange && onChange(text)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ flex: 1, minWidth: 0, padding: 0, margin: 0, color, fontFamily, fontSize, textAlign, backgroundColor: box.backgroundColor }} />
      {unit ? <Txt size={t.textSm} color={t.ink3} numberOfLines={1}>{unit}</Txt> : null}
    </Pressable>
  );
}
