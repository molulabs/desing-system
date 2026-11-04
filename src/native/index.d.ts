import * as React from 'react';
import type { StyleProp, TextProps, TextStyle } from 'react-native';

import type { DensityName, NativeTokens, ThemeName } from '../../tokens/native';

export type { DensityName, DensityTokens, NativeTokens, ThemeName, ThemeTokens } from '../../tokens/native';
export { densities, nativeTokens, themes } from '../../tokens/native';

/**
 * What data-theme and data-density are on the web, for React Native: the tokens every component
 * below reads. Without it they take the "campo" theme in the "touch" density.
 */
export declare function DesignSystemProvider(props: {
    /** Default "campo". */
    theme?: ThemeName;
    /** Default "touch". */
    density?: DensityName;
    children?: React.ReactNode;
}): React.JSX.Element;

/** The tokens of the closest DesignSystemProvider. */
export declare function useTokens(): NativeTokens;

export interface IconProps extends Omit<TextProps, 'children'> {
    /** Tabler icon, as the web components take it: "ti-plus" (or "plus"). */
    name: string;
    /** Default 18. */
    size?: number;
    /** Default the ink token. */
    color?: string;
    style?: StyleProp<TextStyle>;
}

/** A Tabler icon. Nothing for a name Tabler does not have. */
export declare function Icon(props: IconProps): React.JSX.Element | null;

/** The font files for expo-font: `useFonts(fonts)`. */
export declare const fonts: Record<string, number>;

export declare const ICON_FONT: 'tabler-icons';

/**
 * The font file to draw a family token at a weight token:
 * `fontFamily(tokens.sans, tokens.weightMedium)` is "IBMPlexSans-Medium".
 */
export declare function fontFamily(family: string, weight?: number): string;

/** The character the Tabler font draws for an icon name; undefined if Tabler has no such icon. */
export declare function iconGlyph(name: string): string | undefined;

/** A padding token as React Native padding props. */
export declare function padding(value: number | number[]): {
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
};

/** A border token as React Native border props. */
export declare function border(value: { width: number; style: string; color: string }): {
    borderWidth: number;
    borderStyle: string;
    borderColor: string;
};

/** The line height in px of a font size and a leading token. */
export declare function lineHeight(fontSize: number, leading: number): number;
