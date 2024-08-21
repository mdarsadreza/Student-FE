<template>
	<div class="container mx-auto">
		<section class="pt-10 sm:pt-14">
			<div class="flex items-center justify-between" style="margin-top: -4%">
				<button @click="goBack"
					class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150">
					Back
				</button>
				<div class="flex-1 text-center">
					<p
						class="font-general-semibold text-2xl sm:text-5xl font-semibold mb-2 text-ternary-dark dark:text-ternary-light">
						{{ studentsHeading }}
					</p>
				</div>
			</div>

			<div v-if="student"
				class="details-container mt-10 sm:mt-10 p-4 border rounded-lg bg-white dark:bg-ternary-dark">
				<div class="details-row">
					<div class="details-label"><strong>{{ labelFor('ID') }}</strong></div>
					<div class="details-value">{{ student.ID }}</div>
					<div class="details-label"><strong>{{ labelFor('School') }}</strong></div>
					<div class="details-value">{{ student.school }}</div>
				</div>
				<div class="details-row">
					<div class="details-label"><strong>{{ labelFor('Age') }}</strong></div>
					<div class="details-value">{{ student.age }}</div>
					<div class="details-label"><strong>{{ labelFor('Gender') }}</strong></div>
					<div class="details-value">{{ student.sex }}</div>
				</div>
				<div class="details-row">
					<div class="details-label"><strong>{{ labelFor('School Support') }}</strong></div>
					<div class="details-value">{{ student.schoolsup }}</div>
					<div class="details-label"><strong>{{ labelFor('Guardian') }}</strong></div>
					<div class="details-value">{{ student.guardian }}</div>
				</div>
				<div class="details-row">
					<div class="details-label"><strong>{{ labelFor('Nursery') }}</strong></div>
					<div class="details-value">{{ student.nursery }}</div>
					<div class="details-label"><strong>{{ labelFor('Reason') }}</strong></div>
					<div class="details-value">{{ student.reason }}</div>
				</div>
				<div class="details-row">
					<div class="details-label"><strong>{{ labelFor('Address') }}</strong></div>
					<div class="details-value">{{ student.address }}</div>
					<div class="details-label"><strong>{{ labelFor('Famsize') }}</strong></div>
					<div class="details-value">{{ student.famsize }}</div>
				</div>
				<div class="details-row">
					<div class="details-label"><strong>{{ labelFor('Pstatus') }}</strong></div>
					<div class="details-value">{{ student.Pstatus }}</div>
					<div class="details-label"><strong>{{ labelFor('Medu') }}</strong></div>
					<div class="details-value">{{ student.Medu }}</div>
				</div>
				<div class="details-row">
					<div class="details-label"><strong>{{ labelFor('Fedu') }}</strong></div>
					<div class="details-value">{{ student.Fedu }}</div>
					<div class="details-label"><strong>{{ labelFor('Mjob') }}</strong></div>
					<div class="details-value">{{ student.Mjob }}</div>
				</div>
				<div class="details-row">
					<div class="details-label"><strong>{{ labelFor('Fjob') }}</strong></div>
					<div class="details-value">{{ student.Fjob }}</div>
					<div class="details-label"><strong>{{ labelFor('Guardian') }}</strong></div>
					<div class="details-value">{{ student.guardian }}</div>
				</div>
				<div class="details-row">
					<div class="details-label"><strong>{{ labelFor('Traveltime') }}</strong></div>
					<div class="details-value">{{ student.traveltime }}</div>
					<div class="details-label"><strong>{{ labelFor('Studytime') }}</strong></div>
					<div class="details-value">{{ student.studytime }}</div>
				</div>
				<div class="details-row">
					<div class="details-label"><strong>{{ labelFor('Failures') }}</strong></div>
					<div class="details-value">{{ student.failures }}</div>
					<div class="details-label"><strong>{{ labelFor('Famsup') }}</strong></div>
					<div class="details-value">{{ student.famsup }}</div>
				</div>
				<div class="details-row">
					<div class="details-label"><strong>{{ labelFor('Paid') }}</strong></div>
					<div class="details-value">{{ student.paid }}</div>
					<div class="details-label"><strong>{{ labelFor('Activities') }}</strong></div>
					<div class="details-value">{{ student.activities }}</div>
				</div>
				<div class="details-row">
					<div class="details-label"><strong>{{ labelFor('Higher') }}</strong></div>
					<div class="details-value">{{ student.higher }}</div>
					<div class="details-label"><strong>{{ labelFor('Internet') }}</strong></div>
					<div class="details-value">{{ student.internet }}</div>
				</div>
				<div class="details-row">
					<div class="details-label"><strong>{{ labelFor('Romantic') }}</strong></div>
					<div class="details-value">{{ student.romantic }}</div>
					<div class="details-label"><strong>{{ labelFor('Absences') }}</strong></div>
					<div class="details-value">{{ student.absences }}</div>
				</div>
			</div>
			<div v-else>
				<p>No student details available.</p>
			</div>

			<div v-if="student"
				class="details-container mt-10 sm:mt-10 p-4 border rounded-lg bg-white dark:bg-ternary-dark">
				<div class="chart-container">
					<bar-chart :data="studentChartData" :options="chartOptions"></bar-chart>
				</div>
			</div>
			<div v-else>
				<p>No student data available for visualization.</p>
			</div>
		</section>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { studentsFindById } from '../data/api.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
	components: {
		BarChart: Bar,
	},
	data() {
		return {
			student: null,
			studentsHeading: 'Student Details',
			studentChartData: {
				labels: ['Age', 'Travel Time', 'Medu', 'Fedu', 'studytime', 'G1', 'G2', 'G3', 'health', 'famrel', 'freetime'],
				datasets: [
					{
						label: 'Student Details',
						backgroundColor: '#42A5F5',
						data: [],
					},
				],
			},
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						stacked: true,
						title: {
							display: true,
							text: 'Attributes',
						},
					},
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Values',
						},
					},
				},
			},
		};
	},
	async mounted() {
		const studentId = this.$route.params.id;
		if (studentId) {
			try {
				const studentDetails = await studentsFindById(studentId);
				this.student = studentDetails;
				this.updateStudentChartData();
			} catch (error) {
				console.error('Error fetching student details:', error);
			}
		}
	},
	methods: {
		goBack() {
			this.$router.push('/students');
		},
		labelFor(label) {
			return `${label}:`;
		},
		updateStudentChartData() {
			this.studentChartData.datasets[0].data = [
				this.student.age || 0,
				this.student.traveltime || 0,
				this.student.Medu || 0,
				this.student.Fedu || 0,
				this.student.studytime || 0,
				this.student.G1 || 0,
				this.student.G2 || 0,
				this.student.G3 || 0,
				this.student.health || 0,
				this.student.famrel || 0,
				this.student.freetime || 0,
			];
		},
	},
});
</script>

<style scoped>
.details-container {
	display: flex;
	flex-direction: column;
}

.details-row {
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 0;
	border-bottom: 1px solid #e2e2e2;
}

.details-label,
.details-value {
	width: 50%;
	text-align: left;
}

.chart-container {
	margin-top: 10px;
}
</style>
