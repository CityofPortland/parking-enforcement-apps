<template>
  <input
    :id="id"
    :name="name"
    :type="type"
    :required="required"
    :class="classes"
    :value="modelValue"
    @input="handleInput"
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
    modelValue: String
  },
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    };

    const { required, modelValue } = toRefs(props);

    const { classes } = useInput(required, modelValue);

    return {
      classes,
      handleInput
    };
  }
});
</script>
