import React from 'react';

import { nativeTokens } from '../../tokens/native.js';

const DEFAULTS = { theme: 'campo', density: 'touch' };
const NO_INSETS = { top: 0, right: 0, bottom: 0, left: 0 };

const TokensContext = React.createContext(nativeTokens(DEFAULTS));
const InsetsContext = React.createContext(NO_INSETS);
const HostContext = React.createContext(null);

/**
 * What data-theme and data-density are on the web: the tokens every component below reads.
 * Without it they take the "campo" theme in the "touch" density.
 *
 * `insets` are the screen's safe area (react-native-safe-area-context's useSafeAreaInsets()):
 * the sheets keep their content clear of the gesture bar with them.
 *
 * It also hosts what must not sit inside the screen's ScrollView, see Hosted.
 */
export function DesignSystemProvider({ theme = DEFAULTS.theme, density = DEFAULTS.density, insets, children }) {
    const tokens = React.useMemo(() => nativeTokens({ theme, density }), [theme, density]);
    const { top = 0, right = 0, bottom = 0, left = 0 } = insets || {};
    const edges = React.useMemo(() => ({ top, right, bottom, left }), [top, right, bottom, left]);
    const [hosted, setHosted] = React.useState({});
    const host = React.useMemo(() => ({
        show: (id, element) => setHosted((prev) => (prev[id] === element ? prev : { ...prev, [id]: element })),
        hide: (id) => setHosted(({ [id]: _, ...rest }) => rest),
    }), []);

    return (
        <TokensContext.Provider value={tokens}>
            <InsetsContext.Provider value={edges}>
                <HostContext.Provider value={host}>
                    {children}
                    {Object.entries(hosted).map(([id, element]) => <React.Fragment key={id}>{element}</React.Fragment>)}
                </HostContext.Provider>
            </InsetsContext.Provider>
        </TokensContext.Provider>
    );
}

export function useTokens() {
    return React.useContext(TokensContext);
}

/** The safe area the closest DesignSystemProvider was given; zero without one. */
export function useInsets() {
    return React.useContext(InsetsContext);
}

/**
 * Renders its children at the DesignSystemProvider instead of where it sits. A native Modal opens
 * its own window but stays in the React tree of the screen, and a ScrollView up that tree takes
 * the first tap while the keyboard is up (keyboardShouldPersistTaps "never"): a search sheet
 * would lose the tap on its result. Hosted there, no ScrollView is above it. Only for content the
 * system draws itself: the contexts between the provider and here do not reach it.
 * Without a provider, it renders in place.
 */
export function Hosted({ children }) {
    const host = React.useContext(HostContext);
    const id = React.useId();

    React.useLayoutEffect(() => {
        if (host) host.show(id, children);
    });
    React.useLayoutEffect(() => () => host && host.hide(id), [host, id]);

    return host ? null : children;
}
