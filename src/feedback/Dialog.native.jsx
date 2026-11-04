import React from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';

import { useTokens } from '../native/theme.jsx';
import { textChildren, Txt } from '../native/Txt.jsx';
import { lineHeight, padding } from '../native/style.js';

/** Confirmation before an irreversible operation. A native modal: `contained` has nothing to do. */
export function Dialog({ open = true, title, children, note, confirmLabel = 'Confirmar', cancelLabel = 'Volver', onConfirm, onCancel, tone = 'primary', contained }) {
  const t = useTokens();
  const danger = tone === 'danger';
  const btn = { borderRadius: t.r, ...padding(t.padControl), minHeight: t.tapMin, borderWidth: 1, alignItems: 'center', justifyContent: 'center' };

  return (
    <Modal visible={!!open} transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onCancel}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: t.dialogPad }}>
        <Pressable accessibilityLabel={cancelLabel} onPress={onCancel} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: t.scrim }} />
        <View accessibilityViewIsModal style={{
          width: '100%', maxHeight: '100%', backgroundColor: t.card, borderRadius: t.r, padding: t.dialogPad, boxShadow: t.shadowDialog,
        }}>
          <ScrollView bounces={false}>
            {textChildren(title, { size: t.uiTitle, weight: t.weightSemibold, accessibilityRole: 'header', style: { marginBottom: 8 } })}
            {children ? (
              <View style={{ marginBottom: 14 }}>
                {textChildren(children, { size: t.uiText, color: t.ink2, style: { lineHeight: lineHeight(t.uiText, 1.5) } })}
              </View>
            ) : null}
            {note ? textChildren(note, { size: t.uiTextSm, color: t.ink3, style: { marginBottom: 18 } }) : null}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'flex-end' }}>
              <Pressable accessibilityRole="button" onPress={onCancel}
                style={({ pressed }) => [btn, { backgroundColor: pressed ? t.page : t.card, borderColor: t.line }]}>
                <Txt size={t.uiText}>{cancelLabel}</Txt>
              </Pressable>
              <Pressable accessibilityRole="button" onPress={onConfirm}
                style={({ pressed }) => [btn, {
                  backgroundColor: danger ? (pressed ? '#8C2219' : t.alert) : pressed ? t.chrome2 : t.chrome,
                  borderColor: danger ? t.alert : t.chrome,
                }]}>
                <Txt size={t.uiText} weight={t.weightMedium} color="#fff">{confirmLabel}</Txt>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
