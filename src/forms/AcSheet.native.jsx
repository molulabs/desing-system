import React from 'react';
import { Pressable, TextInput as NativeTextInput, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { Hosted, useTokens } from '../native/theme.jsx';
import { textChildren, Txt } from '../native/Txt.jsx';
import { Sheet } from '../mobile/Sheet.native.jsx';
import { controlStyle } from './Field.native.jsx';
import { acResults, defaultCreateLabel } from './acResults.js';

/**
 * The search an Autocomplete opens on a phone: a Sheet with the field on top, focused, and the
 * matches below it, where a dropdown under the field would sit behind the keyboard. Hosted at the
 * DesignSystemProvider: inside the screen's ScrollView the first tap on a match would only close
 * the keyboard.
 */
export function AcSheet({ open, onClose, query, onQuery, items, exclude, placeholder, icon, emptyLabel = 'Sin resultados', onPick, onCreate, createLabel = defaultCreateLabel, matchExact, header }) {
  const t = useTokens();
  const { text, list, canCreate } = acResults({ items, query, onCreate, matchExact, exclude });
  const row = (i, pressed) => ({
    flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: t.tapMin, paddingVertical: 7, paddingHorizontal: 9,
    borderRadius: t.rSm, backgroundColor: pressed ? t.page : 'transparent',
  });

  return (
    <Hosted>
      <Sheet open={open} onClose={onClose} style={{ minHeight: '60%' }}>
        {header}
        <View style={{ justifyContent: 'center', marginBottom: 8 }}>
          <NativeTextInput autoFocus value={query || ''} onChangeText={onQuery} placeholder={placeholder} placeholderTextColor={t.ink3}
            returnKeyType={canCreate ? 'done' : 'search'} onSubmitEditing={() => canCreate && onCreate(text)}
            accessibilityRole="search" style={[controlStyle({ focus: true }, t), { paddingLeft: 36 }]} />
          <Icon name={icon} size={18} color={t.ink3} pointerEvents="none" style={{ position: 'absolute', left: 11 }} />
        </View>
        {list.map((it, i) => (
          <Pressable key={String(it.value ?? i)} accessibilityRole="button" onPress={() => onPick(it)} style={({ pressed }) => row(i, pressed)}>
            <View style={{ flex: 1, minWidth: 0 }}>{textChildren(it.label, { size: t.uiText })}</View>
            {it.meta ? <Txt mono size={12} color={t.ink3}>{it.meta}</Txt> : null}
          </Pressable>
        ))}
        {!list.length && !canCreate ? <Txt size={t.uiText} color={t.ink3} style={{ padding: 9 }}>{emptyLabel}</Txt> : null}
        {canCreate ? (
          <View style={list.length ? { borderTopWidth: t.borderHairSoft.width, borderTopColor: t.borderHairSoft.color, marginTop: 4, paddingTop: 4 } : null}>
            <Pressable accessibilityRole="button" onPress={() => onCreate(text)} style={({ pressed }) => row(list.length, pressed)}>
              <Icon name="ti-plus" size={16} color={t.leather} />
              <View style={{ flex: 1, minWidth: 0 }}>
                {textChildren(createLabel(text), { size: t.uiText, weight: t.weightMedium, color: t.leather, numberOfLines: 1 })}
              </View>
            </Pressable>
          </View>
        ) : null}
      </Sheet>
    </Hosted>
  );
}
