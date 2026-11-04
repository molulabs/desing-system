import React from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { textChildren, Txt } from '../native/Txt.jsx';
import { nativeTokens } from '../../tokens/native.js';

function tones(t) {
  return {
    info: { icon: 'ti-info-circle', color: t.ink2, bar: t.ink3, bg: t.card, ink: t.ink },
    success: { icon: 'ti-circle-check', color: t.ok, bar: t.ok, bg: t.okBg, ink: t.okInk },
    warning: { icon: 'ti-alert-triangle', color: t.warn, bar: t.warn, bg: t.warnBg, ink: t.warnInk },
    danger: { icon: 'ti-alert-octagon', color: t.alert, bar: t.alert, bg: t.alertBg, ink: t.alertInk },
  };
}

/** The tones with the default theme's colours; the components follow the screen's theme. */
export const TOAST_TONES = tones(nativeTokens());

export function Toast({ tone = 'info', title, children, action, onAction, onClose, style }) {
  const t = useTokens();
  const c = tones(t)[tone] || tones(t).info;

  return (
    <View accessibilityRole="alert" accessibilityLiveRegion="polite" style={[{
      flexDirection: 'row', gap: 11, alignItems: 'flex-start', backgroundColor: c.bg,
      borderWidth: 1, borderColor: t.line, borderLeftWidth: t.barStatus, borderLeftColor: c.bar,
      borderTopRightRadius: t.r, borderBottomRightRadius: t.r,
      paddingTop: 12, paddingRight: 12, paddingBottom: 12, paddingLeft: 14, boxShadow: t.shadowToast,
    }, style]}>
      <Icon name={c.icon} size={20} color={c.color} style={{ marginTop: 1 }} />
      <View style={{ flex: 1, minWidth: 0 }}>
        {textChildren(title, { size: t.textMd, weight: t.weightSemibold, color: c.ink })}
        {children ? textChildren(children, { size: 13, color: t.ink2, style: { marginTop: 1 } }) : null}
        {action ? (
          <Pressable accessibilityRole="button" onPress={onAction} style={({ pressed }) => ({
            alignSelf: 'flex-start', marginTop: 8, borderWidth: 1, borderColor: c.bar, borderRadius: t.r,
            paddingVertical: 5, paddingHorizontal: 11, backgroundColor: pressed ? t.page : 'transparent',
          })}>
            <Txt size={13} weight={t.weightMedium} color={c.ink}>{action}</Txt>
          </Pressable>
        ) : null}
      </View>
      {onClose ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Cerrar aviso" onPress={onClose} hitSlop={9}
          style={{ width: 26, height: 26, alignItems: 'center', justifyContent: 'center', borderRadius: t.rSm }}>
          <Icon name="ti-x" size={16} color={t.ink3} />
        </Pressable>
      ) : null}
    </View>
  );
}

/** The toasts over the bottom of the screen, newest last. */
export function ToastStack({ children, style }) {
  const t = useTokens();

  return (
    <View pointerEvents="box-none" style={[{
      position: 'absolute', left: t.space7, right: t.space7, bottom: t.space7, zIndex: 80, gap: 10,
    }, style]}>
      {children}
    </View>
  );
}
