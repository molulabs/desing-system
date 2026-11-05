import React from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useInsets, useTokens } from '../native/theme.jsx';
import { textChildren } from '../native/Txt.jsx';
import { padding } from '../native/style.js';

/**
 * Bottom sheet — the mobile stand-in for Dialog and for row action menus. A native modal, so it
 * needs no host; Android's back button closes it like a tap on the scrim. It draws behind the system
 * bars and keeps its content above the gesture bar with the provider's insets.
 */
export function Sheet({ open, title, sub, onClose, actions, children, style, ...rest }) {
  const t = useTokens();
  const insets = useInsets();

  return (
    <Modal visible={!!open} transparent animationType="slide" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Pressable accessibilityLabel="Cerrar" onPress={onClose} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: t.scrim }} />
        <View accessibilityViewIsModal {...rest} style={[{
          maxHeight: '86%', backgroundColor: t.card, borderTopLeftRadius: t.rLg, borderTopRightRadius: t.rLg,
          boxShadow: t.shadowDialog, paddingTop: 8, paddingHorizontal: 16, paddingBottom: 16 + insets.bottom,
        }, style]}>
          <View style={{ width: 38, height: 4, borderRadius: t.rPill, backgroundColor: t.line, alignSelf: 'center', marginBottom: 12 }} />
          <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
            {title ? textChildren(title, { size: t.uiTitle, weight: t.weightSemibold, accessibilityRole: 'header', style: { marginBottom: sub ? 2 : 10 } }) : null}
            {sub ? textChildren(sub, { size: t.uiTextSm, color: t.ink2, style: { marginBottom: 12 } }) : null}
            {children}
            {actions ? <View style={{ gap: 8, marginTop: 16 }}>{actions}</View> : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

/** A full-width row inside a Sheet used as an action menu. */
export function SheetAction({ icon, label, meta, tone = 'default', onClick }) {
  const t = useTokens();
  const danger = tone === 'danger';

  return (
    <Pressable accessibilityRole="button" onPress={onClick} style={({ pressed }) => ({
      flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: t.tapMin, ...padding(t.padRow),
      borderTopWidth: t.borderHairSoft.width, borderTopColor: t.borderHairSoft.color,
      backgroundColor: pressed ? t.zebra : 'transparent',
    })}>
      {icon ? <Icon name={icon} size={20} color={danger ? t.alert : t.leather} /> : null}
      <View style={{ flex: 1 }}>{textChildren(label, { size: t.uiText, color: danger ? t.alert : t.ink })}</View>
      {meta ? textChildren(meta, { size: t.uiTextSm, color: t.ink3 }) : null}
    </Pressable>
  );
}
