<script>
import SingleStudentGrid from '../components/students/SingleStudentGrid.vue';

export default {
	name: 'Students',
	components: {
		SingleStudentGrid,
	},
};
</script>

<template>
	<div class="container mx-auto">
		<SingleStudentGrid />
	</div>
</template>

<style scoped></style>
