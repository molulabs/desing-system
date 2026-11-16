import React from 'react';
import { HIDE_PASSWORD, SHOW_PASSWORD } from './passwordLabels.js';
import { TextInput } from './TextInput.jsx';

// Room on the right of the text for the button
const BUTTON_WIDTH = 40;

/** A TextInput for passwords, with an eye on its right edge that shows what was typed and hides it again. */
export function PasswordInput({ disabled, style, ...rest }) {
  const [shown, setShown] = React.useState(false);
  const label = shown ? HIDE_PASSWORD : SHOW_PASSWORD;

  return (
    <span style={{ position: 'relative', display: 'block' }}>
      <TextInput {...rest} disabled={disabled} type={shown ? 'text' : 'password'}
        autoCapitalize="none" autoCorrect="off" spellCheck={false}
        style={{ paddingRight: BUTTON_WIDTH + 'px', ...style }} />
      <button type="button" aria-label={label} title={label} aria-pressed={shown}
        aria-controls={rest.id} disabled={disabled} onClick={() => setShown(s => !s)}
        style={{
          position: 'absolute', top: 0, right: 0, height: '100%', width: BUTTON_WIDTH + 'px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          background: 'none', border: 'none', color: 'var(--ink-3)',
          cursor: disabled ? 'default' : 'pointer', opacity: disabled ? .45 : 1
        }}>
        <i aria-hidden="true" className={'ti ' + (shown ? 'ti-eye-off' : 'ti-eye')} style={{ fontSize: '18px' }} />
      </button>
    </span>
  );
}
