export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  label: string;
  primary: boolean;
  size: ButtonSize;
}
