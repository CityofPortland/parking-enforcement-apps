<template>
  <button type="button" :class="classes" @click="onClick">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

interface ButtonProps {
  label: string;
  primary: boolean;
  size: string;
}

export default defineComponent({
  name: "pbot-button",
  props: {
    label: {
      type: String,
      required: true
    },
    primary: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "medium",
      validator: function(value: string) {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      }
    }
  },
  emits: ["onClick"],
  setup(props: ButtonProps, context) {
    const classes = computed(() => {
      const classes = [];

      switch (props.size) {
        case "medium":
          classes.push("px-3", "py-2");
          break;
        case "large":
          classes.push("px-4", "py-3");
          break;
        default:
          classes.push("px-2", "py-1");
          break;
      }

      classes.push(
        ...(props.primary
          ? ["bg-blue-500", "text-white"]
          : ["bg-gray-100", "text-gray-900"])
      );

      classes.push("rounded", "shadow");

      return classes;
    });

    const onClick = () => {
      context.emit("onClick");
    };

    return {
      classes,
      onClick
    };
  }
});
</script>
