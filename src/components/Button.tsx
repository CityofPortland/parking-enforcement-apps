import React from 'react';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  label,
  ...props
}) => {
  const classes: String[] = [];

  const sizeMap = new Map<string, string[]>([
    ['small', ['px-2', 'py-1']],
    ['medium', ['px-3', 'py-2']],
    ['large', ['px-4', 'py-3']],
  ]);

  if (sizeMap.has(size)) {
    classes.push(...sizeMap.get(size)!);
  }

  classes.push(
    ...(primary
      ? ['bg-blue-600', 'text-white']
      : ['bg-gray-100', 'text-gray-900'])
  );

  classes.push('rounded', 'shadow');

  return (
    <button type="button" className={classes.join(' ')} {...props}>
      {label}
    </button>
  );
};
