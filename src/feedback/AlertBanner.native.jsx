import React from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { textChildren, Txt } from '../native/Txt.jsx';

function tones(t) {
  return {
    danger: { bar: t.alert, bg: t.alertBg, color: t.alert, ink: t.alertInk, sub: '#7E2B22', icon: 'ti-file-alert' },
    warning: { bar: t.warn, bg: t.warnBg, color: t.warn, ink: t.warnInk, sub: '#6B4A0A', icon: 'ti-alert-triangle' },
    success: { bar: t.ok, bg: t.okBg, color: t.ok, ink: t.okInk, sub: '#2C5A3C', icon: 'ti-circle-check' },
    info: { bar: t.ink3, bg: t.card, color: t.ink2, ink: t.ink, sub: t.ink2, icon: 'ti-info-circle' },
  };
}

export function AlertBanner({ tone = 'danger', icon, title, children, action, onAction, style }) {
  const t = useTokens();
  const c = tones(t)[tone] || tones(t).danger;

  return (
    <View accessibilityRole="alert" style={[{
      borderWidth: 1, borderColor: t.line, borderLeftWidth: t.barStatus, borderLeftColor: c.bar,
      backgroundColor: c.bg, paddingVertical: 16, paddingHorizontal: 18,
      flexDirection: 'row', alignItems: 'flex-start', gap: 14,
      borderTopRightRadius: t.r, borderBottomRightRadius: t.r,
    }, style]}>
      <Icon name={icon || c.icon} size={22} color={c.color} style={{ marginTop: 2 }} />
      <View style={{ flex: 1, minWidth: 0 }}>
        {textChildren(title, { size: t.textLg, weight: t.weightSemibold, color: c.ink, style: { marginBottom: 3 } })}
        {children ? textChildren(children, { size: t.textBase, color: c.sub }) : null}
      </View>
      {action ? (
        <Pressable accessibilityRole="button" onPress={onAction} style={({ pressed }) => ({
          alignSelf: 'center', backgroundColor: c.bar, paddingVertical: 8, paddingHorizontal: 14,
          borderRadius: t.r, opacity: pressed ? 0.85 : 1,
        })}>
          <Txt size={t.textBase} weight={t.weightMedium} color="#fff">{action}</Txt>
        </Pressable>
      ) : null}
    </View>
  );
}
