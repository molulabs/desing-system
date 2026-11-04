import React from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { Txt } from '../native/Txt.jsx';
import { Badge } from '../native/Badge.jsx';

/**
 * Bottom tab bar — 3–5 destinations, each a 44px+ tap target. The bottom safe area is the
 * screen's: pad it through style (paddingBottom) when the bar sits on the edge.
 */
export function TabBar({ items = [], current, onNavigate, style, ...rest }) {
  const t = useTokens();

  return (
    <View accessibilityRole="tablist" {...rest} style={[{
      flexDirection: 'row', backgroundColor: t.card, borderTopWidth: 1, borderTopColor: t.line,
    }, style]}>
      {items.map(it => {
        const on = it.key === current;
        const color = on ? t.chrome : t.ink3;
        return (
          <Pressable key={it.key} accessibilityRole="tab" accessibilityState={{ selected: on }} accessibilityLabel={it.label}
            onPress={() => onNavigate && onNavigate(it.key)}
            style={{ flex: 1, minHeight: t.tapMin, paddingTop: 7, paddingHorizontal: 4, paddingBottom: 9, alignItems: 'center', gap: 3 }}>
            <View>
              <Icon name={it.icon} size={23} color={color} />
              {it.badge ? <Badge value={it.badge} size={15} style={{ top: -3, right: -8 }} /> : null}
            </View>
            <Txt size={t.textXs} weight={on ? t.weightSemibold : t.weightRegular} color={color} numberOfLines={1}
              style={{ lineHeight: t.textXs + 2 }}>{it.label}</Txt>
            {on ? <View style={{ position: 'absolute', top: 0, width: 28, height: 2, backgroundColor: t.leather }} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}
