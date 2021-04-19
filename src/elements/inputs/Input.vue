<template>
  <input
    :id="id"
    :name="name"
    :type="type"
    :required="required"
    :pattern="pattern"
    :class="classes"
    :value="modelValue"
    @keypress="handleKeypress"
    @input.prevent="handleInput($event)"
  />
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { TextInputType, useInput } from './inputs';

export default defineComponent({
  name: 'Input',
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String as () => TextInputType,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    pattern: {
      type: String
    },
    size: {
      type: Number
    },
    modelValue: String,
    modelModifiers: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const { required, modelValue } = toRefs(props);

    const { classes } = useInput(required, modelValue);

    const handleInput = (event: Event) => {
      let value: string | undefined = (event.target as HTMLInputElement).value;

      const modifierMap = new Map<string, (value: string) => string>([
        ['uppercase', value => value.toLocaleUpperCase()],
        ['lowercase', value => value.toLocaleLowerCase()],
        ['capitalize', value => value.charAt(0) + value.slice(1)]
      ]);

      if (value) {
        for (const entry of modifierMap.entries()) {
          const [modifier, func] = entry;

          if (Object.keys(props.modelModifiers).find(k => modifier == k)) {
            value = func(value);
          }
        }
      }

      emit('update:modelValue', value);
    };

    const handleKeypress = (event: KeyboardEvent) => {
      const value = event.key;

      if (value) {
        if (props.pattern) {
          const regex = new RegExp(props.pattern);
          const matches = regex.exec(value);

          if (!matches) {
            return event.preventDefault();
          }
        }

        if (props.size) {
          if (modelValue?.value && modelValue.value.length >= props.size) {
            return event.preventDefault();
          }
        }
      }

      return true;
    };

    return {
      classes,
      handleInput,
      handleKeypress
    };
  }
});
</script>
