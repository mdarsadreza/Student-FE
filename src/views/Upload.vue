<template>
	<div class="container mx-auto py-5 md:py-10">
		<div class="flex">
			<!-- Left Column -->
			<div class="w-full md:w-1/2 px-4">
				<div
					class="leading-loose max-w-xl mx-auto p-7 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left">
					<h1 class="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-6">
						University Information
					</h1>
					<div class="space-y-4">
						<div class="flex">
							<p class="text-lg font-medium w-1/3">Address:</p>
							<p class="w-2/3">73F2+GV4, Masjid Al Aqsa Street, Mubarak Al-Abdullah, Kuwait</p>
						</div>

						<div class="flex">
							<p class="text-lg font-medium w-1/3">Phone:</p>
							<p class="w-2/3">+965 2530 7000</p>
						</div>

						<div class="flex">
							<p class="text-lg font-medium w-1/3">President:</p>
							<p class="w-2/3">Shuaib A. Shuaib</p>
						</div>

						<div class="flex">
							<p class="text-lg font-medium w-1/3">Founded:</p>
							<p class="w-2/3">2002</p>
						</div>

						<div class="flex">
							<p class="text-lg font-medium w-1/3">Motto:</p>
							<p class="w-2/3">Universitas in omne tempus. (A University for Life.)</p>
						</div>

						<div class="flex">
							<p class="text-lg font-medium w-1/3">Campus:</p>
							<p class="w-2/3">Urban</p>
						</div>

						<div class="flex">
							<p class="text-lg font-medium w-1/3">Colors:</p>
							<p class="w-2/3">Green, Blue</p>
						</div>
					</div>
				</div>
			</div>

			<div class="w-full md:w-1/2 px-4 flex flex-col items-center justify-center">
				<div>
					<input type="file" accept=".csv" @change="handleFileChange"
						class="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
					<button @click="uploadFile"
						class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" style="margin-left: 4px;">
						Upload
					</button>
					<label class="text-lg font-bold mb-2 block text-center">Please upload only CSV file.</label>
				</div>
				<div class="text-center mb-6">
					<p class="mb-4">
						In ORM frameworks like Sequelize, a model maps to a database table with columns such as ID,
						school, sex, age, address, famsize, Pstatus, Medu, Fedu, Mjob, Fjob, reason, guardian,
						traveltime, studytime, failures, schoolsup, famsup, paid, activities, nursery, higher, internet,
						romantic, famrel, freetime, goout, Dalc, Walc, health, absences, G1, G2, and G3. This setup
						provides a structured way to interact with the database.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { uploadCSVFile } from '../data/api.js';

export default {
	data() {
		return {
			selectedFile: null,
		};
	},
	methods: {
		handleFileChange(event) {
			this.selectedFile = event.target.files[0];
		},
		async uploadFile() {
			if (!this.selectedFile) {
				alert('Please select a CSV file to upload.');
				return;
			}
			const formData = new FormData();
			formData.append('csvFile', this.selectedFile);
			// Debugging FormData
			for (let [key, value] of formData.entries()) {
				console.log(`${key}: ${value}`);
			}
			try {
				await uploadCSVFile(formData).then(() => {
					console.log('File uploaded successfully:');
				})
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>