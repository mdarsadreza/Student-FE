<script>
import ContactForm from '../components/contact/ContactForm.vue';

export default {
	components: {
		ContactForm,
	},
};
</script>

<template>
	<div class="container mx-auto flex flex-col-reverse md:flex-row py-5 md:py-10 md:mt-10">
		<ContactForm />
	</div>
</template>
