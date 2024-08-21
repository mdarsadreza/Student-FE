<script>
import StudentsGrid from '../components/students/StudentsGrid.vue';

export default {
	name: 'Home',
	components: {
		StudentsGrid,
	},
};
</script>

<template>
	<div class="container mx-auto">
		<StudentsGrid />
	</div>
</template>

<style scoped></style>
