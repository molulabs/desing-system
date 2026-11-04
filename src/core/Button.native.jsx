import React from 'react';
import { Linking, Pressable } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { textChildren } from '../native/Txt.jsx';
import { padding } from '../native/style.js';

const ICON_SIZE = { sm: 17, md: 18, lg: 20 };

function tones(t) {
  return {
    primary: { background: t.chrome, border: t.chrome, color: '#fff', weight: t.weightMedium },
    secondary: { background: t.card, border: t.line, color: t.ink, weight: t.weightRegular },
    ghost: { background: 'transparent', border: 'transparent', color: t.ink2, weight: t.weightRegular },
    danger: { background: t.alert, border: t.alert, color: '#fff', weight: t.weightMedium },
  };
}

// What hover is on the web: the look while pressed
function pressedTones(t) {
  return {
    primary: { background: t.chrome2, border: t.chrome2 },
    secondary: { border: t.ink3 },
    ghost: { background: t.page, color: t.ink },
    danger: { background: '#8C2219', border: '#8C2219' },
  };
}

export function Button({ tone = 'primary', size = 'md', icon, disabled, href, onClick, style, children, ...rest }) {
  const t = useTokens();
  const sizes = {
    md: { pad: t.padButton, text: t.textMd },
    sm: { pad: t.padButtonSm, text: t.textBase },
    lg: { pad: t.padControl, text: t.uiTextLg, minHeight: t.tapMin },
  };
  const s = sizes[size] || sizes.md;
  const base = tones(t)[tone] || tones(t).primary;
  const onPress = onClick ?? (href ? () => Linking.openURL(href) : undefined);

  return (
    <Pressable accessibilityRole={href ? 'link' : 'button'} accessibilityState={{ disabled: !!disabled }}
      disabled={disabled} onPress={onPress} {...rest}
      style={({ pressed }) => {
        const c = { ...base, ...(pressed && !disabled ? pressedTones(t)[tone] : {}) };
        return [{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9,
          borderRadius: t.r, borderWidth: 1, borderColor: c.border, backgroundColor: c.background,
          minHeight: s.minHeight, opacity: disabled ? 0.45 : 1, ...padding(s.pad),
        }, style];
      }}>
      {({ pressed }) => {
        const color = pressed && !disabled && tone === 'ghost' ? t.ink : base.color;
        return (
          <>
            {icon ? <Icon name={icon} size={ICON_SIZE[size] || ICON_SIZE.md} color={color} /> : null}
            {textChildren(children, { size: s.text, weight: base.weight, color, numberOfLines: 1 })}
          </>
        );
      }}
    </Pressable>
  );
}
