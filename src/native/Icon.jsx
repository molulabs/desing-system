import React from 'react';
import { Text } from 'react-native';

import { iconGlyph } from './icons.js';
import { useTokens } from './theme.jsx';
import { ICON_FONT } from './typography.js';

/**
 * A Tabler icon, by the same name the web components take: <Icon name="ti-plus" />. The fonts
 * must be loaded (see fonts).
 */
export function Icon({ name, size = 18, color, style, ...rest }) {
    const tokens = useTokens();
    const glyph = iconGlyph(name);

    if (glyph === undefined) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn(`@molulabs/ds: Tabler has no icon "${name}"`);
        }

        return null;
    }

    return (
        <Text
            accessible={false}
            allowFontScaling={false}
            style={[{ fontFamily: ICON_FONT, fontSize: size, lineHeight: size, color: color ?? tokens.ink }, style]}
            {...rest}
        >
            {glyph}
        </Text>
    );
}
