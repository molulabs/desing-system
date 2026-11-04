import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { textChildren, Txt } from '../native/Txt.jsx';
import { statusOf } from './stepStatus.js';

export function Stepper({ steps = [], current = 0, onStep, compact, style }) {
  const t = useTokens();

  if (compact) {
    const s = steps[current] || {};
    const st = statusOf(s, current, current);
    return (
      <View style={[{ gap: 6 }, style]} accessibilityRole="progressbar"
        accessibilityValue={{ min: 1, max: steps.length, now: current + 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <View style={{ flexShrink: 1 }}>
            {textChildren(s.label, { size: t.uiText, weight: t.weightSemibold, color: st === 'error' ? t.alert : t.ink, numberOfLines: 1 })}
          </View>
          <Txt mono size={t.uiTextSm} color={t.ink3}>Paso {current + 1} de {steps.length}</Txt>
        </View>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          {steps.map((x, i) => {
            const st2 = statusOf(x, i, current);
            return <View key={i} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: st2 === 'error' ? t.alert : st2 === 'todo' ? t.line : t.chrome }} />;
          })}
        </View>
      </View>
    );
  }

  // In one line that scrolls sideways: a phone has no room to wrap eight steps
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style}
      contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {steps.map((s, i) => {
        const st = statusOf(s, i, current);
        const reach = onStep && (st === 'done' || st === 'error') && i !== current;
        return (
          <React.Fragment key={i}>
            {i ? <View style={{ width: 24, height: 1, backgroundColor: st === 'todo' ? t.line : t.chrome }} /> : null}
            <Pressable disabled={!reach} onPress={reach ? () => onStep(i) : undefined}
              accessibilityRole="button" accessibilityState={{ disabled: !reach, selected: st === 'current' }}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4, paddingHorizontal: 2 }}>
              <View style={{
                width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1,
                backgroundColor: st === 'current' || st === 'done' ? t.chrome : st === 'error' ? t.alert : t.card,
                borderColor: st === 'todo' ? t.line : 'transparent',
              }}>
                {st === 'done'
                  ? <Icon name="ti-check" size={12} color="#fff" />
                  : <Txt mono size={12} weight={t.weightMedium} color={st === 'todo' ? t.ink3 : '#fff'}>{st === 'error' ? '!' : i + 1}</Txt>}
              </View>
              {textChildren(s.label, {
                size: t.uiTextSm, weight: st === 'current' ? t.weightSemibold : t.weightRegular,
                color: st === 'error' ? t.alert : st === 'todo' ? t.ink3 : t.ink, numberOfLines: 1,
                style: reach ? { textDecorationLine: 'underline', textDecorationColor: t.line } : undefined,
              })}
            </Pressable>
          </React.Fragment>
        );
      })}
    </ScrollView>
  );
}
