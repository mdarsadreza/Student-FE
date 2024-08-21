<script>
import AppHeader from './components/shared/AppHeader';
import AppFooter from './components/shared/AppFooter';

export default {
	components: {
		AppHeader,
		AppFooter,
	},
};
</script>
<template>
	<div :class="appTheme" class="pt-0.5">
		<AppHeader style="background-color: rgb(255 178 0)" />
		<transition name="fade" mode="out-in">
			<router-view :theme="appTheme" />
		</transition>
		<AppFooter />
	</div>
</template>

<style>
</style>
