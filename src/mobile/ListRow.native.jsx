import React from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { textChildren } from '../native/Txt.jsx';
import { border, padding } from '../native/style.js';

/** The mobile replacement for a DataTable row: one record per row, tappable. */
export function ListRow({ title, meta, value, valueMeta, icon, tag, chevron, onClick, first, style, ...rest }) {
  const t = useTokens();
  const showChevron = chevron === undefined ? !value : chevron;
  const rowStyle = (pressed) => [{
    flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%',
    minHeight: t.rowH, ...padding(t.padRow), backgroundColor: pressed ? t.zebra : t.card,
    borderTopWidth: first ? 0 : t.borderHairSoft.width, borderTopColor: t.borderHairSoft.color,
  }, style];
  const Row = onClick ? Pressable : View;
  const rowProps = onClick
    ? { accessibilityRole: 'button', onPress: onClick, style: ({ pressed }) => rowStyle(pressed) }
    : { style: rowStyle(false) };

  return (
    <Row {...rest} {...rowProps}>
      {icon ? (
        <View style={{ width: 34, height: 34, borderRadius: t.r, backgroundColor: t.page, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={19} color={t.leather} />
        </View>
      ) : null}
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ flexShrink: 1, minWidth: 0 }}>
            {textChildren(title, { size: t.uiText, weight: t.weightMedium, numberOfLines: 1, style: { lineHeight: Math.round(t.uiText * 1.3) } })}
          </View>
          {tag ? <View style={{ flexShrink: 0 }}>{tag}</View> : null}
        </View>
        {meta ? textChildren(meta, {
          size: t.uiTextSm, color: t.ink3, numberOfLines: 1,
          style: { lineHeight: Math.round(t.uiTextSm * 1.35), marginTop: 2 },
        }) : null}
      </View>
      {value ? (
        <View style={{ alignItems: 'flex-end' }}>
          {textChildren(value, { mono: true, size: t.uiText, style: { fontVariant: ['tabular-nums'] } })}
          {valueMeta ? textChildren(valueMeta, { size: t.textXs, color: t.ink3, style: { marginTop: 2 } }) : null}
        </View>
      ) : null}
      {showChevron && onClick ? <Icon name="ti-chevron-right" size={18} color={t.ink3} /> : null}
    </Row>
  );
}

/** Card-like container that groups ListRows, with an optional section label. */
export function ListGroup({ label, children, style, ...rest }) {
  const t = useTokens();

  return (
    <View style={style} {...rest}>
      {label ? textChildren(label, {
        size: t.textXs, weight: t.weightSemibold, color: t.ink3,
        style: { textTransform: 'uppercase', letterSpacing: t.textXs * 0.07, paddingHorizontal: 4, paddingBottom: 6 },
      }) : null}
      <View style={{ backgroundColor: t.card, ...border(t.borderHair), borderRadius: t.r, overflow: 'hidden' }}>{children}</View>
    </View>
  );
}
