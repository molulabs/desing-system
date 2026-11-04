import React from 'react';
import { View } from 'react-native';

import { useTokens } from '../native/theme.jsx';
import { textChildren } from '../native/Txt.jsx';

export function KeyValueList({ items, style }) {
  const t = useTokens();
  const emph = it => !!(it && (it.emphasis || it.total));

  return (
    <View style={style}>
      {items.map((it, i) => {
        const e = emph(it);
        const nextE = emph(items[i + 1]);
        return (
          <View key={i} style={{
            flexDirection: 'row', gap: 16, alignItems: 'baseline', paddingTop: e ? 10 : 7, paddingBottom: 7,
            borderTopWidth: e && i > 0 ? t.borderHair.width : 0, borderTopColor: t.borderHair.color,
            borderBottomWidth: i < items.length - 1 && !nextE ? t.borderHairSoft.width : 0, borderBottomColor: t.borderHairSoft.color,
          }}>
            <View style={{ flexShrink: 1 }}>
              {textChildren(it.k, { size: t.textBase, color: e ? t.ink : t.ink2, weight: e ? t.weightSemibold : t.weightRegular })}
            </View>
            <View style={{ marginLeft: 'auto', flexShrink: 1, alignItems: 'flex-end' }}>
              {textChildren(it.v, {
                mono: !!it.mono, weight: e ? t.weightSemibold : t.weightRegular, style: { textAlign: 'right' },
                size: it.mono ? (e ? 15 : 13) : e ? t.textMd : t.textBase,
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}
