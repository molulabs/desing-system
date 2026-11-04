import React from 'react';
import { View } from 'react-native';

import { useTokens } from '../native/theme.jsx';
import { textChildren } from '../native/Txt.jsx';
import { border, padding } from '../native/style.js';

export function Card({ title, meta, pad = true, actions, children, style }) {
  const t = useTokens();

  return (
    <View style={[{ backgroundColor: t.card, ...border(t.borderHair), borderRadius: t.r, overflow: 'hidden' }, style]}>
      {title || actions ? (
        <View style={{
          flexDirection: 'row', alignItems: 'baseline', gap: 12, paddingVertical: 12, paddingHorizontal: 16,
          borderBottomWidth: t.borderHairSoft.width, borderBottomColor: t.borderHairSoft.color,
        }}>
          {title ? textChildren(title, { size: t.textMd, weight: t.weightSemibold }) : null}
          {meta ? textChildren(meta, { size: t.textBase, color: t.ink3 }) : null}
          {actions ? <View style={{ marginLeft: 'auto' }}>{actions}</View> : null}
        </View>
      ) : null}
      <View style={pad ? padding(t.padCard) : undefined}>{children}</View>
    </View>
  );
}
