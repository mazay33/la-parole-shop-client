<template>
  <div>
    <Link rel="stylesheet" :href="themeStore.link" />
    <div class="layout-wrapper" :class="containerClass">
        <slot />
      <div class="layout-mask" />
    </div>
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeStore();

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const containerClass = computed(() => {
  return {
    dark: themeStore.isDarkMode,
    "layout-overlay": layoutConfig.menuMode.value === "overlay",
    "layout-static": layoutConfig.menuMode.value === "static",
    "layout-static-inactive":
      layoutState.staticMenuDesktopInactive.value &&
      layoutConfig.menuMode.value === "static",
    "layout-overlay-active": layoutState.overlayMenuActive.value,
    "layout-mobile-active": layoutState.staticMenuMobileActive.value,
    "p-input-filled": layoutConfig.inputStyle.value === "filled",
    "p-ripple-disabled": !layoutConfig.ripple.value,
  };
});
</script>

<style lang="scss" scoped>
.layout-auth-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  justify-content: space-between;

}
</style>
