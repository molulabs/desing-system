import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { textChildren, Txt } from '../native/Txt.jsx';
import { multiChoiceState } from './multiChoice.js';

function Box({ on, exclusive }) {
  const t = useTokens();

  return (
    <View style={{
      width: 16, height: 16, borderRadius: exclusive ? 8 : 3, borderWidth: 1,
      borderColor: on ? t.chrome : t.line, backgroundColor: on ? t.chrome : t.card,
      alignItems: 'center', justifyContent: 'center',
    }}>
      {on ? <Icon name="ti-check" size={12} color="#fff" /> : null}
    </View>
  );
}

export function MultiChoice({ value = [], onChange, options = [], name, min = 180, disabled, invalid, max, variant = 'tiles', style }) {
  const t = useTokens();
  const state = multiChoiceState({ value, options, max, disabled });
  const { opts, sel, main, ex } = state;
  const toggle = o => {
    const next = state.toggle(o);
    if (next && onChange) onChange(next);
  };
  const press = (o, style, content) => {
    const on = state.isOn(o);
    const off = state.isOff(o);
    return (
      <Pressable key={String(o.value)} accessibilityRole="checkbox" accessibilityState={{ checked: on, disabled: !!off }}
        disabled={off} onPress={() => toggle(o)} style={[style(on), { opacity: off && !disabled ? 0.5 : 1 }]}>
        {content(on)}
      </Pressable>
    );
  };

  if (variant === 'list') {
    const row = (o, i) => press(o, on => ({
      flexDirection: 'row', gap: 11, alignItems: 'center', minHeight: t.tapMin, paddingVertical: 8, paddingHorizontal: 12,
      borderTopWidth: i === 0 ? 0 : t.borderHairSoft.width, borderTopColor: t.borderHairSoft.color,
      backgroundColor: on ? t.mutBg : 'transparent',
    }), on => (
      <>
        <Box on={on} exclusive={o.exclusive} />
        <View style={{ flex: 1, minWidth: 0 }}>
          {textChildren(o.label, { size: t.uiText, weight: on ? t.weightMedium : t.weightRegular, color: o.exclusive && !on ? t.ink2 : t.ink })}
        </View>
        {o.hint ? textChildren(o.hint, { size: t.uiTextSm, color: t.ink3, style: { textAlign: 'right' } }) : null}
      </>
    ));
    return (
      <View accessibilityRole="list" style={[{ opacity: disabled ? 0.45 : 1 }, style]}>
        <View style={{ borderWidth: 1, borderColor: invalid ? t.alert : t.line, borderRadius: t.r, backgroundColor: t.card, overflow: 'hidden' }}>
          {main.map(row)}
          {ex.length ? <View style={{ borderTopWidth: 1, borderTopColor: t.line, backgroundColor: t.page }}>{ex.map(row)}</View> : null}
        </View>
        <Txt mono size={11} color={t.ink3} style={{ paddingTop: 5, paddingHorizontal: 2 }}>{state.summary}</Txt>
      </View>
    );
  }

  if (variant === 'buttons') {
    const btn = (list) => (o, i) => press(o, on => ({
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
      minWidth: 56, minHeight: t.tapMin, paddingHorizontal: 14, backgroundColor: on ? t.chrome : 'transparent',
      borderLeftWidth: i ? 1 : 0,
      borderLeftColor: on || sel.includes((list[i - 1] || {}).value) ? t.chrome : t.line,
    }), on => (
      <>
        {on ? <Icon name="ti-check" size={14} color="#fff" /> : null}
        {textChildren(o.label, { size: t.uiTextSm, weight: on ? t.weightMedium : t.weightRegular, color: on ? '#fff' : t.ink2, numberOfLines: 1 })}
      </>
    ));
    const group = { flexDirection: 'row', borderWidth: 1, borderColor: invalid ? t.alert : t.line, borderRadius: t.r, overflow: 'hidden', backgroundColor: t.card };
    return (
      <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center', opacity: disabled ? 0.45 : 1 }, style]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, maxWidth: '100%' }}>
          <View style={group}>{main.map(btn(main))}</View>
        </ScrollView>
        {ex.length ? <View style={group}>{ex.map(btn(ex))}</View> : null}
      </View>
    );
  }

  if (variant === 'chips') {
    return (
      <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, opacity: disabled ? 0.45 : 1 }, style]}>
        {opts.map(o => press(o, on => ({
          flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: t.tapMin, paddingHorizontal: 14, borderRadius: 999,
          borderWidth: 1, borderStyle: o.exclusive && !on ? 'dashed' : 'solid',
          borderColor: on ? t.chrome : invalid ? t.alert : t.line, backgroundColor: on ? t.chrome : t.card,
        }), on => (
          <>
            <Icon name={on ? 'ti-check' : o.exclusive ? 'ti-minus' : 'ti-plus'} size={14} color={on ? '#fff' : t.ink3} />
            {textChildren(o.label, { size: t.uiTextSm, weight: on ? t.weightMedium : t.weightRegular, color: on ? '#fff' : t.ink2 })}
          </>
        )))}
      </View>
    );
  }

  // Tiles: a phone is one column wide, tablets fit as many of `min` width as they can
  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, opacity: disabled ? 0.45 : 1 }, style]}>
      {opts.map(o => press(o, on => ({
        flexGrow: 1, flexBasis: min, flexDirection: 'row', gap: 9, alignItems: 'flex-start',
        minHeight: t.tapMin, paddingVertical: 9, paddingHorizontal: 11,
        borderWidth: on ? 2 : 1, borderColor: on ? t.chrome : invalid ? t.alert : t.line,
        // The border grows inward on the web (inset shadow): keep the content where it was
        margin: on ? -1 : 0, marginRight: on ? -1 : 0,
        borderRadius: t.r, backgroundColor: on ? t.mutBg : t.card,
      }), on => (
        <>
          <View style={{ marginTop: 2 }}><Box on={on} exclusive={o.exclusive} /></View>
          <View style={{ flex: 1, minWidth: 0 }}>
            {textChildren(o.label, { size: t.uiText, weight: on ? t.weightMedium : t.weightRegular })}
            {o.hint ? textChildren(o.hint, { size: t.uiTextSm, color: t.ink3 }) : null}
          </View>
        </>
      )))}
    </View>
  );
}
