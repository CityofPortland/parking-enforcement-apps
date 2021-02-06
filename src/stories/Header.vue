<template>
  <header class="h-16">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <Logo class="w-16 mr-3" />
        <h1 class="font-bold text-2xl">Acme</h1>
      </div>
      <div class="flex items-center">
        <my-button
          size="small"
          @onClick="onLogout"
          label="Log out"
          v-if="user"
        />
        <my-button
          size="small"
          @onClick="onLogin"
          label="Log in"
          v-if="!user"
        />
        <my-button
          primary
          size="small"
          @onClick="onCreateAccount"
          label="Sign up"
          v-if="!user"
        />
      </div>
    </div>
  </header>
</template>

<script>
import MyButton from "@/components/Button.vue";
import Logo from "@/assets/Logo.vue";

export default {
  name: "my-header",

  components: { MyButton, Logo },

  props: {
    user: {
      type: Object
    }
  },

  methods: {
    onLogin() {
      this.$emit("onLogin");
    },
    onLogout() {
      this.$emit("onLogout");
    },
    onCreateAccount() {
      this.$emit("onCreateAccount");
    }
  }
};
</script>
