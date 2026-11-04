import React from 'react';
import { Pressable, View } from 'react-native';

import { useTokens } from '../native/theme.jsx';
import { textChildren } from '../native/Txt.jsx';

export function SegmentedControl({ value, onChange, options = ['Sí', 'No'], name, disabled, invalid, style }) {
  const t = useTokens();
  const opts = options.map(o => (typeof o === 'object' ? o : { value: o, label: o }));

  return (
    <View accessibilityRole="radiogroup" style={[{
      flexDirection: 'row', alignSelf: 'flex-start', borderWidth: 1, borderColor: invalid ? t.alert : t.line,
      borderRadius: t.r, overflow: 'hidden', backgroundColor: t.card, opacity: disabled ? 0.45 : 1,
    }, style]}>
      {opts.map((o, i) => {
        const on = value === o.value;
        return (
          <Pressable key={String(o.value)} accessibilityRole="radio" accessibilityState={{ checked: on, disabled: !!disabled }}
            disabled={disabled} onPress={() => onChange && onChange(o.value)}
            style={{
              alignItems: 'center', justifyContent: 'center', minWidth: 56, minHeight: t.tapMin, paddingHorizontal: 12,
              backgroundColor: on ? t.chrome : 'transparent', borderLeftWidth: i ? 1 : 0, borderLeftColor: t.line,
            }}>
            {textChildren(o.label, { size: t.uiTextSm, weight: on ? t.weightMedium : t.weightRegular, color: on ? '#fff' : t.ink2, numberOfLines: 1 })}
          </Pressable>
        );
      })}
    </View>
  );
}
