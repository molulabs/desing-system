import React from 'react';
import { TextInput as NativeTextInput, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { controlStyle } from './Field.native.jsx';

// The web input types as the keyboard and entry React Native shows for them
const TYPES = {
  email: { keyboardType: 'email-address', autoCapitalize: 'none', autoCorrect: false },
  password: { secureTextEntry: true, autoCapitalize: 'none', autoCorrect: false },
  number: { keyboardType: 'numeric' },
  tel: { keyboardType: 'phone-pad' },
  url: { keyboardType: 'url', autoCapitalize: 'none', autoCorrect: false },
  search: { returnKeyType: 'search' },
};

export function TextInput({ value, onChange, onFocus, onBlur, placeholder, mono, align, icon, invalid, disabled, id, type = 'text', readOnly, style, ...rest }) {
  const t = useTokens();
  const [focus, setFocus] = React.useState(false);

  const input = (
    <NativeTextInput {...TYPES[type]} {...rest} nativeID={id} value={value} placeholder={placeholder}
      placeholderTextColor={t.ink3} editable={!disabled && !readOnly}
      accessibilityLabelledBy={id ? id + '-label' : undefined}
      onChange={e => onChange && onChange(e.nativeEvent.text, e)}
      onFocus={e => { setFocus(true); onFocus && onFocus(e); }}
      onBlur={e => { setFocus(false); onBlur && onBlur(e); }}
      style={[controlStyle({ invalid, disabled, mono, align, focus, readOnly }, t), icon ? { paddingLeft: 36 } : null, style]} />
  );
  if (!icon) return input;

  return (
    <View style={{ justifyContent: 'center' }}>
      {input}
      <Icon name={icon} size={18} color={t.ink3} pointerEvents="none" style={{ position: 'absolute', left: 11 }} />
    </View>
  );
}
