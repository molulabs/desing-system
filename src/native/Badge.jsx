import React from 'react';
import { View } from 'react-native';

import { useTokens } from './theme.jsx';
import { Txt } from './Txt.jsx';

/** The red count on an icon (AppBarAction, TabBar). */
export function Badge({ value, size, style }) {
  const t = useTokens();

  return (
    <View pointerEvents="none" style={[{
      position: 'absolute', minWidth: size, height: size, borderRadius: t.rPill, backgroundColor: t.alert,
      alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4,
    }, style]}>
      <Txt size={size - 5.5} weight={t.weightSemibold} color="#fff" style={{ lineHeight: size }}>{value}</Txt>
    </View>
  );
}
