import { computed, Ref } from 'vue';

export type TextInputType = 'email' | 'text';

export interface TextInputProps {
  id: string;
  name: string;
  pattern?: string;
  patternModifiers?: Record<string, boolean>;
  size?: number;
  modelValue?: string;
  modelProperties?: Record<string, boolean>;
}

export function useInput(
  required: Ref<boolean>,
  modelValue: Ref<string | undefined> | undefined
) {
  return {
    classes: computed(() => [
      'border',
      required.value && !modelValue?.value
        ? 'border-red-500'
        : 'border-gray-500',
      'rounded-md',
      'shadow-md',
      required.value && !modelValue?.value ? 'bg-red-100' : 'bg-gray-100',
      required.value && !modelValue?.value
        ? 'placeholder-red-500'
        : 'placeholder-gray-500',
      'truncate',
      'focus:outline-none',
      'focus:ring',
      'focus:ring-blue-500'
    ])
  };
}
