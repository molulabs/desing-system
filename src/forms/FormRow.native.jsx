import React from 'react';
import { View } from 'react-native';

import { useTokens } from '../native/theme.jsx';
import { textChildren } from '../native/Txt.jsx';

/** Fields wrap instead of shrinking: each takes at least `min` and the row shares what is left. */
export function FormRow({ cols = 2, min = 220, children, style }) {
  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: 14, alignItems: 'flex-start' }, style]}>
      {React.Children.toArray(children).map((child, i) => (
        <View key={child.key ?? i} style={{ flexGrow: 1, flexBasis: min, minWidth: 0 }}>{child}</View>
      ))}
    </View>
  );
}

export function FormActions({ children, note, style }) {
  const t = useTokens();

  return (
    <View style={[{
      flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap', paddingTop: 14,
      borderTopWidth: t.borderHairSoft.width, borderTopColor: t.borderHairSoft.color,
    }, style]}>
      {note ? <View style={{ flex: 1, minWidth: 120 }}>{textChildren(note, { size: t.textSm, color: t.ink3 })}</View> : null}
      <View style={{ flexDirection: 'row', gap: 10, marginLeft: note ? 0 : 'auto' }}>{children}</View>
    </View>
  );
}
