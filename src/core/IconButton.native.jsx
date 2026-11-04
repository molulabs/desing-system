import React from 'react';
import { Pressable } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';

export function IconButton({ icon, label, on = 'light', size = 30, onClick, style, ...rest }) {
  const t = useTokens();
  const dark = on === 'chrome';

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onClick} hitSlop={Math.max(0, (t.tapMin - size) / 2)} {...rest}
      style={({ pressed }) => [{
        width: size, height: size, borderRadius: t.rSm, alignItems: 'center', justifyContent: 'center',
        backgroundColor: pressed ? (dark ? t.chrome2 : t.page) : 'transparent',
      }, style]}>
      {({ pressed }) => (
        <Icon name={icon} size={Math.round(size * 0.56)} color={dark ? t.chromeInk : pressed ? t.ink : t.ink3} />
      )}
    </Pressable>
  );
}
