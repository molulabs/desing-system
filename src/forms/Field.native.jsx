import React from 'react';
import { View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { Txt } from '../native/Txt.jsx';
import { nativeTokens } from '../../tokens/native.js';
import { fontFamily } from '../native/typography.js';
import { padding } from '../native/style.js';

// Kept for screen readers, out of sight
const hidden = { position: 'absolute', width: 1, height: 1, opacity: 0 };

export function Field({ label, hideLabel, hint, error, required, htmlFor, children, style }) {
  const t = useTokens();

  return (
    <View style={[{ gap: 4, minWidth: 0 }, style]}>
      {label ? (
        <Txt nativeID={htmlFor ? htmlFor + '-label' : undefined} size={t.uiTextSm} color={t.ink2} style={hideLabel ? hidden : undefined}>
          {label}{required ? <Txt size={t.uiTextSm} color={t.alert}> *</Txt> : null}
        </Txt>
      ) : null}
      {children}
      {error ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Icon name="ti-alert-circle" size={14} color={t.alert} />
          <Txt size={t.uiTextSm} color={t.alert} style={{ flexShrink: 1 }}>{error}</Txt>
        </View>
      ) : hint ? (
        <Txt size={t.uiTextSm} color={t.ink3}>{hint}</Txt>
      ) : null}
    </View>
  );
}

/**
 * The box every control shares, as React Native style. Takes the tokens of the screen
 * (useTokens()); without them, the default theme and density.
 */
export function controlStyle({ invalid, disabled, mono, align, focus, readOnly } = {}, t = nativeTokens()) {
  if (readOnly) focus = false;
  return {
    width: '100%', backgroundColor: readOnly ? t.zebra : t.card, color: t.ink,
    borderWidth: 1, borderStyle: 'solid',
    borderColor: invalid ? t.alert : focus ? t.leather : readOnly ? t.lineSoft : t.line,
    borderRadius: t.r, ...padding(t.padField), minHeight: t.tapMin,
    fontFamily: fontFamily(mono ? t.mono : t.sans, t.weightRegular),
    fontSize: mono ? t.fieldMono : t.uiText,
    textAlign: align || 'left',
    opacity: disabled ? 0.45 : 1,
  };
}
