import React from 'react';

import { nativeTokens } from '../../tokens/native.js';

const DEFAULTS = { theme: 'campo', density: 'touch' };

const TokensContext = React.createContext(nativeTokens(DEFAULTS));

/**
 * What data-theme and data-density are on the web: the tokens every component below reads.
 * Without it they take the "campo" theme in the "touch" density.
 */
export function DesignSystemProvider({ theme = DEFAULTS.theme, density = DEFAULTS.density, children }) {
    const tokens = React.useMemo(() => nativeTokens({ theme, density }), [theme, density]);

    return <TokensContext.Provider value={tokens}>{children}</TokensContext.Provider>;
}

export function useTokens() {
    return React.useContext(TokensContext);
}
