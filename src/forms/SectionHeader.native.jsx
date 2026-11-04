import React from 'react';
import { View } from 'react-native';

import { useTokens } from '../native/theme.jsx';
import { textChildren, Txt } from '../native/Txt.jsx';
import { lineHeight } from '../native/style.js';

export function SectionHeader({ title, description, index, actions, first, style }) {
  const t = useTokens();

  return (
    <View style={[{
      flexDirection: 'row', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap',
      paddingTop: first ? 0 : t.gapSection, marginTop: first ? 0 : 4,
      borderTopWidth: first ? 0 : t.borderHairSoft.width, borderTopColor: t.borderHairSoft.color,
    }, style]}>
      {index != null ? (
        <Txt mono size={t.uiTextSm} color={t.ink3} style={{ lineHeight: lineHeight(t.uiTextSm, 1.6), minWidth: 18 }}>
          {String(index).padStart(2, '0')}
        </Txt>
      ) : null}
      <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: 200, minWidth: 0 }}>
        {textChildren(title, { size: t.uiText, weight: t.weightSemibold, accessibilityRole: 'header', style: { lineHeight: lineHeight(t.uiText, 1.4) } })}
        {description ? textChildren(description, { size: t.uiTextSm, color: t.ink3, style: { marginTop: 2 } }) : null}
      </View>
      {actions ? <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>{actions}</View> : null}
    </View>
  );
}
