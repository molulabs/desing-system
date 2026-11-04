import React from 'react';
import { View } from 'react-native';

import { useTokens } from '../native/theme.jsx';
import { textChildren } from '../native/Txt.jsx';

export function Tag({ tone = 'mut', children, style }) {
  const t = useTokens();
  const tones = {
    ok: [t.okBg, t.ok],
    warn: [t.warnBg, t.warn],
    bad: [t.alertBg, t.alert],
    mut: [t.mutBg, t.ink2],
  };
  const [bg, fg] = tones[tone] || tones.mut;

  return (
    <View style={[{
      flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
      paddingVertical: 2, paddingHorizontal: 8, borderRadius: t.rPill, backgroundColor: bg,
    }, style]}>
      {textChildren(children, { size: t.textPill, color: fg, numberOfLines: 1 })}
    </View>
  );
}
