import React from 'react';
import { View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { textChildren } from '../native/Txt.jsx';
import { border } from '../native/style.js';

export function EmptyState({ icon = 'ti-inbox', title, children, actions, style }) {
  const t = useTokens();

  return (
    <View style={[{
      backgroundColor: t.card, ...border(t.borderHair), borderRadius: t.r,
      paddingVertical: 48, paddingHorizontal: 28, alignItems: 'center',
    }, style]}>
      <Icon name={icon} size={30} color={t.ink3} />
      {textChildren(title, { size: t.textLg, weight: t.weightSemibold, style: { marginTop: 10, marginBottom: 4, textAlign: 'center' } })}
      {children ? textChildren(children, { size: t.textBase, color: t.ink2, style: { textAlign: 'center' } }) : null}
      {actions ? <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 16 }}>{actions}</View> : null}
    </View>
  );
}
