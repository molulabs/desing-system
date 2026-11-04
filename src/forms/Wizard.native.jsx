import React from 'react';
import { View } from 'react-native';

import { Button } from '../core/Button.native.jsx';
import { useTokens } from '../native/theme.jsx';
import { textChildren } from '../native/Txt.jsx';
import { border, padding } from '../native/style.js';
import { Stepper } from './Stepper.native.jsx';

export function Wizard({ steps = [], current = 0, onStep, onBack, onNext, onDraft, onFinish, finishLabel = 'Confirmar', nextLabel = 'Siguiente', note, draftNote, busy, compact, children, style }) {
  const t = useTokens();
  const last = current === steps.length - 1;
  const rule = { borderColor: t.borderHairSoft.color };
  const line = note || draftNote;

  return (
    <View style={[{ backgroundColor: t.card, ...border(t.borderHair), borderRadius: t.r }, style]}>
      <View style={[padding(t.padCard), rule, { borderBottomWidth: t.borderHairSoft.width }]}>
        <Stepper steps={steps} current={current} onStep={onStep} compact={compact} />
      </View>
      <View style={[padding(t.padCard), { gap: 14 }]}>{children}</View>
      <View style={[rule, {
        borderTopWidth: t.borderHairSoft.width, paddingVertical: 12, paddingHorizontal: padding(t.padCard).paddingLeft,
        flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap',
      }]}>
        {current > 0 ? <Button tone="ghost" icon="ti-arrow-left" onClick={onBack}>Anterior</Button> : null}
        <View style={{ flex: 1, minWidth: 80 }}>{line ? textChildren(line, { size: t.uiTextSm, color: t.ink3 }) : null}</View>
        {onDraft && !last ? <Button tone="secondary" onClick={onDraft}>Guardar borrador</Button> : null}
        {last
          ? <Button onClick={onFinish} disabled={busy}>{finishLabel}</Button>
          : <Button onClick={onNext} disabled={busy}>{nextLabel}</Button>}
      </View>
    </View>
  );
}
