
<template>
	<div class="container mx-auto">
		<section class="pt-10 sm:pt-14">
			<div class="text-center">
				<p class="font-general-semibold text-2xl sm:text-5xl font-semibold mb-2 text-ternary-dark dark:text-ternary-light"
					style="margin-top: -4%">
					{{ studentsHeading }}
				</p>
			</div>

			<div class="mt-10 sm:mt-10">
				<div class="flex justify-between border-b border-primary-light dark:border-secondary-dark pb-3 gap-2">
					<div class="flex justify-between gap-2">
						<input v-model="searchStudent"
							class="font-general-medium pl-3 pr-1 sm:px-4 py-2 border-1 border-gray-200 dark:border-secondary-dark rounded-lg text-sm sm:text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
							id="name" name="name" type="search" required placeholder="Search Students"
							aria-label="Name" />
					</div>
				</div>
			</div>

			<table class="min-w-full bg-white dark:bg-ternary-dark">
				<thead>
					<tr>
						<th class="py-2 px-4 border-b">ID</th>
						<th class="py-2 px-4 border-b">School</th>
						<th class="py-2 px-4 border-b">Age</th>
						<th class="py-2 px-4 border-b">Gender</th>
						<th class="py-2 px-4 border-b">Schoolsup</th>
						<th class="py-2 px-4 border-b">Guardian</th>
						<th class="py-2 px-4 border-b">Nursery</th>
						<th class="py-2 px-4 border-b">Reason</th>
						<th class="py-2 px-4 border-b">Action</th>
					</tr>
				</thead>
				<tbody style="text-align: center;">
					<tr v-for="std in filteredStudents" :key="`${std.ID}`">
						<td class="py-2 px-4 border-b">{{ std.ID }}</td>
						<td class="py-2 px-4 border-b">{{ std.school }}</td>
						<td class="py-2 px-4 border-b">{{ std.age }}</td>
						<td class="py-2 px-4 border-b">{{ std.sex }}</td>
						<td class="py-2 px-4 border-b">{{ std.schoolsup }}</td>
						<td class="py-2 px-4 border-b">{{ std.guardian }}</td>
						<td class="py-2 px-4 border-b">{{ std.nursery }}</td>
						<td class="py-2 px-4 border-b">{{ std.reason }}</td>
						<td class="py-2 px-4 border-b">
							<button @click="viewStudentDetails(std.ID)" class="text-blue-500 hover:underline">
								View Details
							</button>
						</td>
					</tr>
				</tbody>
			</table>

			<div class="pagination-controls mt-4" style="text-align: center;">
				<button @click="prevPage" :disabled="currentPage === 1"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l-lg rounded-t-lg rounded-r-none transition duration-150 ease-in-out">
					Previous
				</button>

				<span class="ml-2 mr-2">Page {{ currentPage }} of {{ totalPages }}</span>

				<button @click="nextPage" :disabled="currentPage === totalPages"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg rounded-t-lg rounded-l-none transition duration-150 ease-in-out">
					Next
				</button>
			</div>
		</section>
	</div>
</template>

<script>
import { studentsFindAll } from '../data/api.js';

export default {
	name: 'Students',
	data() {
		return {
			students: [],
			studentsHeading: 'Student Dashboard',
			searchStudent: '',
			currentPage: 1,
			itemsPerPage: 10,
			totalPages: 0,
		};
	},
	computed: {
		filteredStudents() {
			let searchQuery = this.searchStudent.toLowerCase();
			let startIndex = (this.currentPage - 1) * this.itemsPerPage;
			let endIndex = startIndex + this.itemsPerPage;

			return this.students
				.filter(student => {
					return (
						(student.school && student.school.toLowerCase().includes(searchQuery)) ||
						(student.age && student.age.toString().toLowerCase().includes(searchQuery)) ||
						(student.sex && student.sex.toLowerCase().includes(searchQuery)) ||
						(student.schoolsup && student.schoolsup.toLowerCase().includes(searchQuery)) ||
						(student.guardian && student.guardian.toLowerCase().includes(searchQuery)) ||
						(student.nursery && student.nursery.toLowerCase().includes(searchQuery)) ||
						(student.reason && student.reason.toLowerCase().includes(searchQuery))
					);
				})
				.slice(startIndex, endIndex);
		},
	},
	async created() {
		try {
			const fetchedStudents = await studentsFindAll();
			this.students = fetchedStudents;
			this.totalPages = Math.ceil(fetchedStudents.length / this.itemsPerPage);
		} catch (error) {
			console.error('Error fetching Students:', error);
		}
	},
	methods: {
		nextPage() {
			if (this.currentPage < this.totalPages) {
				this.currentPage++;
			}
		},
		prevPage() {
			if (this.currentPage > 1) {
				this.currentPage--;
			}
		},
		viewStudentDetails(studentId) {
			this.$router.push({ name: 'Single Student', params: { id: studentId } });
		},
	},
};
</script>

<style scoped>
</style>