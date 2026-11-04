import React from 'react';
import { Pressable } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { Txt } from '../native/Txt.jsx';
import { controlStyle } from './Field.native.jsx';
import { AcSheet } from './AcSheet.native.jsx';

/**
 * Type-ahead over a long list. The field shows the text; tapping it opens the search in a Sheet,
 * and picking an item (or creating one) closes it.
 */
export function Autocomplete({ value, onChange, onSelect, items = [], placeholder, icon = 'ti-search', emptyLabel, onCreate, createLabel, matchExact, name, invalid, disabled, id, style }) {
  const t = useTokens();
  const [open, setOpen] = React.useState(false);
  const { color, fontFamily, fontSize, textAlign, ...box } = controlStyle({ invalid, disabled, focus: open }, t);

  return (
    <>
      <Pressable nativeID={id} accessibilityRole="combobox" accessibilityState={{ disabled: !!disabled, expanded: open }}
        accessibilityLabelledBy={id ? id + '-label' : undefined} accessibilityValue={{ text: value || placeholder }}
        disabled={disabled} onPress={() => setOpen(true)}
        style={[box, { flexDirection: 'row', alignItems: 'center', paddingLeft: 36 }, style]}>
        <Icon name={icon} size={18} color={t.ink3} style={{ position: 'absolute', left: 11 }} />
        <Txt size={fontSize} color={value ? t.ink : t.ink3} numberOfLines={1} style={{ flex: 1 }}>{value || placeholder || ''}</Txt>
      </Pressable>
      <AcSheet open={open} onClose={() => setOpen(false)} query={value} onQuery={text => onChange && onChange(text)}
        items={items} placeholder={placeholder} icon={icon} emptyLabel={emptyLabel} createLabel={createLabel} matchExact={matchExact}
        onPick={it => { setOpen(false); onSelect && onSelect(it); }}
        onCreate={onCreate ? text => { setOpen(false); onCreate(text); } : undefined} />
    </>
  );
}
