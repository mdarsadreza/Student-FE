<script>
export default {
	data: () => {
		return {
			copyrightDate: new Date().getFullYear(),
			studentName: 'Vue.js & Tailwind CSS',
			author: 'Arsad',
		};
	},
};
</script>

<template>
	<div class="container mx-auto">
		<div class="pt-20 sm:pt-30 pb-8 mt-20 border-t-2 border-primary-light dark:border-secondary-dark">
			<div class="flex justify-center items-center text-center">
				<div class="font-general-regular text-lg text-ternary-dark dark:text-ternary-light">
					&copy; {{ copyrightDate }}.
					Arsad
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
