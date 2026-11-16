import * as React from 'react';
import type { TextInputProps } from './TextInput';

/**
 * A TextInput for passwords: an eye on the right edge shows what was typed and hides it again
 * ("Mostrar contraseña" / "Ocultar contraseña"). Same props as TextInput but `type`.
 */
export interface PasswordInputProps extends Omit<TextInputProps, 'type'> {}

export declare function PasswordInput(props: PasswordInputProps): React.JSX.Element;
