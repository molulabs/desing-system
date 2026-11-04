import React from 'react';
import { TextInput as NativeTextInput } from 'react-native';

import { useTokens } from '../native/theme.jsx';
import { lineHeight } from '../native/style.js';
import { controlStyle } from './Field.native.jsx';

export function Textarea({ value, onChange, onFocus, onBlur, placeholder, rows = 3, invalid, disabled, id, style, ...rest }) {
  const t = useTokens();
  const [focus, setFocus] = React.useState(false);
  const line = lineHeight(t.uiText, 1.4);
  const box = controlStyle({ invalid, disabled, focus }, t);

  return (
    <NativeTextInput {...rest} multiline numberOfLines={rows} textAlignVertical="top" nativeID={id} value={value}
      placeholder={placeholder} placeholderTextColor={t.ink3} editable={!disabled}
      accessibilityLabelledBy={id ? id + '-label' : undefined}
      onChange={e => onChange && onChange(e.nativeEvent.text, e)}
      onFocus={e => { setFocus(true); onFocus && onFocus(e); }}
      onBlur={e => { setFocus(false); onBlur && onBlur(e); }}
      style={[box, { lineHeight: line, minHeight: rows * line + box.paddingTop + box.paddingBottom + 2 }, style]} />
  );
}
