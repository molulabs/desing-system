import React from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { Badge } from '../native/Badge.jsx';
import { textChildren } from '../native/Txt.jsx';

/**
 * Top bar for mobile screens — the chrome field, 56px tall at touch density. The status bar's
 * safe area is the screen's: pad it through style (paddingTop) when the bar sits on the edge.
 */
export function AppBar({ title, sub, onBack, backLabel = 'Volver', actions, tone = 'chrome', style, ...rest }) {
  const t = useTokens();
  const dark = tone === 'chrome';

  return (
    <View accessibilityRole="header" {...rest} style={[{
      flexDirection: 'row', alignItems: 'center', gap: 4, minHeight: t.tapMin + 12,
      paddingVertical: 8, paddingRight: 8, paddingLeft: onBack ? 4 : 16,
      backgroundColor: dark ? t.chrome : t.card,
      borderBottomWidth: 1, borderBottomColor: dark ? t.chromeLine : t.line,
    }, style]}>
      {onBack ? (
        <Pressable accessibilityRole="button" accessibilityLabel={backLabel} onPress={onBack}
          style={({ pressed }) => ({
            width: t.tapMin, height: t.tapMin, alignItems: 'center', justifyContent: 'center', borderRadius: t.rSm,
            backgroundColor: pressed ? (dark ? t.chrome2 : t.page) : 'transparent',
          })}>
          <Icon name="ti-chevron-left" size={22} color={dark ? '#fff' : t.ink2} />
        </Pressable>
      ) : null}
      <View style={{ flex: 1, minWidth: 0 }}>
        {textChildren(title, {
          size: t.uiTextLg, weight: t.weightSemibold, color: dark ? '#fff' : t.ink, numberOfLines: 1,
          style: { lineHeight: Math.round(t.uiTextLg * 1.2) },
        })}
        {sub ? textChildren(sub, {
          size: t.uiTextSm, color: dark ? t.chromeMut : t.ink3, numberOfLines: 1,
          style: { lineHeight: Math.round(t.uiTextSm * 1.3), marginTop: 1 },
        }) : null}
      </View>
      {actions ? <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>{actions}</View> : null}
    </View>
  );
}

/** Icon-only action for the AppBar right slot — always a full tap target. */
export function AppBarAction({ icon, label, onClick, tone = 'chrome', badge }) {
  const t = useTokens();
  const dark = tone === 'chrome';

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onClick}
      style={({ pressed }) => ({
        width: t.tapMin, height: t.tapMin, alignItems: 'center', justifyContent: 'center', borderRadius: t.rSm,
        backgroundColor: pressed ? (dark ? t.chrome2 : t.page) : 'transparent',
      })}>
      <Icon name={icon} size={21} color={dark ? '#fff' : t.ink2} />
      {badge ? <Badge value={badge} size={16} style={{ top: 6, right: 6 }} /> : null}
    </Pressable>
  );
}
