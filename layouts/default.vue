<template>
  <div>
    <Link rel="stylesheet" :href="themeStore.link" />
    <div class="layout-wrapper" :class="containerClass">
      <AppHeader />
      <div class="layout-default-container">
        <div class="layout-main">
        <slot />
        </div>
        <AppFooter />
      </div>
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
.layout-default-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
    padding: 7rem 5rem 2rem 5rem;
    transition: margin-left 0.2s;
}
.layout-main{
  max-width: 1180px;
  width: 100%;
  padding: 7px;
  margin: auto;
}

</style>
