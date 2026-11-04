import React from 'react';
import { Text } from 'react-native';

import { useTokens } from './theme.jsx';
import { fontFamily } from './typography.js';

/**
 * Text in the system's faces. React Native does not inherit fonts, so every text the components
 * draw goes through it. The weight picks the font file: fontWeight would make Android fake it.
 */
export function Txt({ size, weight, mono, color, style, children, ...rest }) {
    const tokens = useTokens();

    return (
        <Text
            style={[
                {
                    fontFamily: fontFamily(mono ? tokens.mono : tokens.sans, weight ?? tokens.weightRegular),
                    fontSize: size ?? tokens.uiText,
                    color: color ?? tokens.ink,
                },
                style,
            ]}
            {...rest}
        >
            {children}
        </Text>
    );
}

/** Children as they can sit in a View: strings and numbers go inside a Txt with these props. */
export function textChildren(children, props) {
    const isText = (child) => typeof child === 'string' || typeof child === 'number';
    const list = React.Children.toArray(children);

    if (list.length > 0 && list.every(isText)) {
        return <Txt {...props}>{list.join('')}</Txt>;
    }

    return list.map((child, index) => (isText(child) ? <Txt key={index} {...props}>{child}</Txt> : child));
}
