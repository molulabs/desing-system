import React from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { textChildren, Txt } from '../native/Txt.jsx';
import { border } from '../native/style.js';
import { controlStyle } from './Field.native.jsx';
import { AcSheet } from './AcSheet.native.jsx';

const keyOf = it => String(it.value != null ? it.value : it.label);

function Chip({ item, onRemove, disabled }) {
  const t = useTokens();

  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', gap: 2, maxWidth: '100%', backgroundColor: t.mutBg, ...border(t.borderHair),
      borderRadius: t.rSm, paddingVertical: 1, paddingLeft: 8, paddingRight: disabled ? 8 : 2,
    }}>
      <View style={{ flexShrink: 1 }}>{textChildren(item.label, { size: t.uiTextSm, numberOfLines: 1 })}</View>
      {!disabled ? (
        <Pressable accessibilityRole="button" accessibilityLabel={'Quitar ' + (typeof item.label === 'string' ? item.label : '')}
          hitSlop={10} onPress={() => onRemove(item)} style={{ paddingHorizontal: 3 }}>
          <Icon name="ti-x" size={14} color={t.ink3} />
        </Pressable>
      ) : null}
    </View>
  );
}

/**
 * Several records from a long or open catalog. Picked items are removable chips in the field;
 * tapping the field opens the search in a Sheet, which stays open after each pick.
 */
export function AutocompleteMulti({ value = [], onChange, query: queryProp, onQueryChange, items = [], placeholder, icon = 'ti-search', emptyLabel, onCreate, createLabel, matchExact, max, name, invalid, disabled, id, style }) {
  const t = useTokens();
  const [open, setOpen] = React.useState(false);
  const [own, setOwn] = React.useState('');
  const query = queryProp != null ? queryProp : own;
  const setQuery = text => { if (queryProp == null) setOwn(text); onQueryChange && onQueryChange(text); };
  const keys = value.map(keyOf);
  const full = max != null && value.length >= max;
  const remove = it => onChange && onChange(value.filter(x => keyOf(x) !== keyOf(it)));
  const { color, fontFamily, fontSize, textAlign, ...box } = controlStyle({ invalid, disabled, focus: open }, t);
  const chips = value.map(it => <Chip key={keyOf(it)} item={it} onRemove={remove} disabled={disabled} />);

  return (
    <>
      <Pressable nativeID={id} accessibilityRole="combobox" accessibilityState={{ disabled: !!disabled, expanded: open }}
        accessibilityLabelledBy={id ? id + '-label' : undefined} disabled={disabled} onPress={() => setOpen(true)}
        style={[box, { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 4, paddingTop: 6, paddingBottom: 6, paddingLeft: 36 }, style]}>
        <Icon name={icon} size={18} color={t.ink3} style={{ position: 'absolute', left: 11, top: (t.tapMin - 18) / 2 }} />
        {chips}
        {!value.length ? <Txt size={fontSize} color={t.ink3} numberOfLines={1}>{placeholder || ''}</Txt> : null}
      </Pressable>
      <AcSheet open={open} onClose={() => { setOpen(false); setQuery(''); }} query={query} onQuery={setQuery}
        items={full ? [] : items.filter(it => !keys.includes(keyOf(it)))} exclude={value}
        placeholder={placeholder} icon={icon} createLabel={createLabel} matchExact={matchExact}
        emptyLabel={full ? 'Máximo ' + max + ' seleccionados' : emptyLabel}
        header={value.length ? <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>{chips}</View> : null}
        onPick={it => { onChange && onChange([...value, it]); setQuery(''); }}
        onCreate={onCreate && !full ? text => { onCreate(text); setQuery(''); } : undefined} />
    </>
  );
}
