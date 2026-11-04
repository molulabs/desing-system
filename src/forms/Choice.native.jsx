import React from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { textChildren } from '../native/Txt.jsx';

// The box is small, the row is what is tapped: it reaches the touch target
const HIT = { top: 8, bottom: 8 };

function Label({ label, hint }) {
  const t = useTokens();

  return (
    <View style={{ flex: 1, minWidth: 0 }}>
      {label ? textChildren(label, { size: t.uiText }) : null}
      {hint ? textChildren(hint, { size: t.uiTextSm, color: t.ink3 }) : null}
    </View>
  );
}

export function Checkbox({ checked, onChange, label, hint, disabled, style }) {
  const t = useTokens();

  return (
    <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: !!checked, disabled: !!disabled }}
      disabled={disabled} hitSlop={HIT} onPress={() => onChange && onChange(!checked)}
      style={[{ flexDirection: 'row', gap: 9, alignItems: 'flex-start', opacity: disabled ? 0.45 : 1 }, style]}>
      <View style={{
        width: 16, height: 16, marginTop: 2, borderRadius: 3, borderWidth: 1,
        borderColor: checked ? t.chrome : t.line, backgroundColor: checked ? t.chrome : t.card,
        alignItems: 'center', justifyContent: 'center',
      }}>
        {checked ? <Icon name="ti-check" size={12} color="#fff" /> : null}
      </View>
      <Label label={label} hint={hint} />
    </Pressable>
  );
}

export function RadioGroup({ value, onChange, options = [], name, style }) {
  const t = useTokens();

  return (
    <View accessibilityRole="radiogroup" style={[{ gap: 8 }, style]}>
      {options.map(o => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        const on = value === opt.value;
        return (
          <Pressable key={opt.value} accessibilityRole="radio" accessibilityState={{ checked: on }} hitSlop={{ top: 4, bottom: 4 }}
            onPress={() => onChange && onChange(opt.value)} style={{ flexDirection: 'row', gap: 9, alignItems: 'flex-start' }}>
            <View style={{
              width: 16, height: 16, marginTop: 2, borderRadius: 8, borderWidth: 1,
              borderColor: on ? t.chrome : t.line, backgroundColor: t.card, alignItems: 'center', justifyContent: 'center',
            }}>
              {on ? <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: t.chrome }} /> : null}
            </View>
            <Label label={opt.label} hint={opt.hint} />
          </Pressable>
        );
      })}
    </View>
  );
}

export function Switch({ checked, onChange, label, hint, disabled, style }) {
  const t = useTokens();

  return (
    <Pressable accessibilityRole="switch" accessibilityState={{ checked: !!checked, disabled: !!disabled }}
      disabled={disabled} hitSlop={HIT} onPress={() => onChange && onChange(!checked)}
      style={[{ flexDirection: 'row', gap: 11, alignItems: 'center', opacity: disabled ? 0.45 : 1 }, style]}>
      <View style={{
        width: 34, height: 20, borderRadius: 10, padding: 2, borderWidth: 1,
        backgroundColor: checked ? t.chrome : t.mutBg, borderColor: checked ? t.chrome : t.line,
        flexDirection: 'row', justifyContent: checked ? 'flex-end' : 'flex-start', alignItems: 'center',
      }}>
        <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#fff' }} />
      </View>
      <Label label={label} hint={hint} />
    </Pressable>
  );
}

export function Choice({ type = 'checkbox', ...props }) {
  if (type === 'radio') return <RadioGroup {...props} />;
  if (type === 'switch') return <Switch {...props} />;
  return <Checkbox {...props} />;
}
