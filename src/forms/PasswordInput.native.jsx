import React from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { HIDE_PASSWORD, SHOW_PASSWORD } from './passwordLabels.js';
import { TextInput } from './TextInput.native.jsx';

/** A TextInput for passwords, with an eye on its right edge that shows what was typed and hides it again. */
export function PasswordInput({ disabled, readOnly, style, ...rest }) {
  const t = useTokens();
  const [shown, setShown] = React.useState(false);
  const label = shown ? HIDE_PASSWORD : SHOW_PASSWORD;

  return (
    <View style={{ justifyContent: 'center' }}>
      {/* Shown, it is still a password: no capitals, corrections nor suggestions */}
      <TextInput {...rest} disabled={disabled} readOnly={readOnly} type={shown ? 'text' : 'password'}
        autoCapitalize="none" autoCorrect={false} spellCheck={false}
        style={[{ paddingRight: t.tapMin }, style]} />
      <Pressable accessibilityRole="button" accessibilityLabel={label}
        accessibilityState={{ disabled: !!disabled, selected: shown }}
        disabled={disabled} hitSlop={4} onPress={() => setShown(s => !s)}
        style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: t.tapMin,
          alignItems: 'center', justifyContent: 'center', opacity: disabled ? .45 : 1 }}>
        <Icon name={shown ? 'ti-eye-off' : 'ti-eye'} size={20} color={t.ink3} />
      </Pressable>
    </View>
  );
}
