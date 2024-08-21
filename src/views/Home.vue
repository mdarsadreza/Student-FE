
<template>
	<section class="pt-10 sm:pt-14">
		<div class="flex items-center justify-between">
			<div class="flex-1 text-center">
				<p
					class="font-general-semibold text-2xl sm:text-5xl font-semibold mb-2 text-ternary-dark dark:text-ternary-light" style="margin-top: -4%">
					{{ studentsHeading }}
				</p>
			</div>
		</div>

		<div v-if="students && students.length > 0"
			class="details-container w-full mt-10 sm:mt-10 p-4 border rounded-lg bg-white dark:bg-ternary-dark"
			style="width: 100%;">
			<div class="chart-container">
				<bar-chart :data="schoolChartData" :options="chartOptions"></bar-chart>
			</div>

			<div class="chart-container mt-10">
				<bar-chart :data="ageChartData" :options="chartOptions"></bar-chart>
			</div>

			<div class="charts-row mt-10">
				<div class="chart-container half-width">
					<doughnut-chart :data="sexChartData" :options="chartOptionsDoughnut"></doughnut-chart>
				</div>

				<div class="chart-container half-width">
					<doughnut-chart :data="guardianChartData" :options="chartOptionsDoughnut"></doughnut-chart>
				</div>
			</div>

			<div class="chart-container mt-10">
				<bar-chart :data="attributesChartData" :options="chartOptions"></bar-chart>
			</div>

			<div class="chart-container mt-10">
				<bar-chart :data="newChartData" :options="chartOptions"></bar-chart>
			</div>
		</div>

		<div v-else>
			<p>No student data available for visualization.</p>
		</div>
	</section>
</template>

<script>
import { defineComponent } from 'vue';
import { Bar, Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { studentsFindAll } from '../data/api.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

export default defineComponent({
	components: {
		BarChart: Bar,
		DoughnutChart: Doughnut,
	},
	data() {
		return {
			studentsHeading: 'Student Visualization',
			students: [],
			schoolChartData: {
				labels: [],
				datasets: [
					{
						label: 'Number of Students',
						backgroundColor: '#42A5F5',
						data: [],
					},
				],
			},
			ageChartData: {
				labels: ['0-4', '5-8', '9-12', '13-16', '17-20', '21+'],
				datasets: [
					{
						label: 'Number of Students by Age Group',
						backgroundColor: '#66BB6A',
						data: [0, 0, 0, 0, 0, 0],
					},
				],
			},
			sexChartData: {
				labels: ['Male', 'Female'],
				datasets: [
					{
						label: 'Sex Ratio',
						backgroundColor: ['#FF6384', '#36A2EB'],
						data: [0, 0],
					},
				],
			},
			guardianChartData: {
				labels: ['Father', 'Mother'],
				datasets: [
					{
						label: 'Guardian Ratio',
						backgroundColor: ['#FFCE56', '#FF9F40'],
						data: [0, 0],
					},
				],
			},
			attributesChartData: {
				labels: ['Famrel', 'Freetime', 'Goout', 'Dalc', 'Walc', 'Health', 'Absences', 'G1', 'G2', 'G3'],
				datasets: [
					{
						label: 'Student Attributes',
						backgroundColor: '#FF9F40',
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					},
				],
			},
			newChartData: {
				labels: ['Traveltime', 'Studytime', 'Failures'],
				datasets: [
					{
						label: 'Student Data',
						backgroundColor: '#AB47BC',
						data: [0, 0, 0],
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
			chartOptionsDoughnut: {
				responsive: true,
				maintainAspectRatio: false,
			},
		};
	},
	async mounted() {
		try {
			const allStudents = await studentsFindAll();
			this.students = allStudents;
			this.updateChartData();
		} catch (error) {
			console.error('Error fetching students data:', error);
		}
	},
	methods: {
		updateChartData() {
			const schoolCounts = this.students.reduce((acc, student) => {
				acc[student.school] = (acc[student.school] || 0) + 1;
				return acc;
			}, {});
			this.schoolChartData.labels = Object.keys(schoolCounts);
			this.schoolChartData.datasets[0].data = Object.values(schoolCounts);

			const ageGroups = {
				'0-4': 0,
				'5-8': 0,
				'9-12': 0,
				'13-16': 0,
				'17-20': 0,
				'21+': 0,
			};
			this.students.forEach(student => {
				if (student.age <= 4) ageGroups['0-4']++;
				else if (student.age <= 8) ageGroups['5-8']++;
				else if (student.age <= 12) ageGroups['9-12']++;
				else if (student.age <= 16) ageGroups['13-16']++;
				else if (student.age <= 20) ageGroups['17-20']++;
				else ageGroups['21+']++;
			});
			this.ageChartData.datasets[0].data = Object.values(ageGroups);

			const sexCounts = this.students.reduce((acc, student) => {
				if (student.sex === 'M') acc['Male'] = (acc['Male'] || 0) + 1;
				else if (student.sex === 'F') acc['Female'] = (acc['Female'] || 0) + 1;
				return acc;
			}, {});
			this.sexChartData.datasets[0].data = [sexCounts['Male'] || 0, sexCounts['Female'] || 0];

			const guardianCounts = this.students.reduce((acc, student) => {
				if (student.guardian === 'father') acc['Father'] = (acc['Father'] || 0) + 1;
				else if (student.guardian === 'mother') acc['Mother'] = (acc['Mother'] || 0) + 1;
				return acc;
			}, {});
			this.guardianChartData.datasets[0].data = [guardianCounts['Father'] || 0, guardianCounts['Mother'] || 0];

			const attributeSums = {
				famrel: 0,
				freetime: 0,
				goout: 0,
				Dalc: 0,
				Walc: 0,
				health: 0,
				absences: 0,
				G1: 0,
				G2: 0,
				G3: 0,
			};
			this.students.forEach(student => {
				attributeSums.famrel += student.famrel || 0;
				attributeSums.freetime += student.freetime || 0;
				attributeSums.goout += student.goout || 0;
				attributeSums.Dalc += student.Dalc || 0;
				attributeSums.Walc += student.Walc || 0;
				attributeSums.health += student.health || 0;
				attributeSums.absences += student.absences || 0;
				attributeSums.G1 += student.G1 || 0;
				attributeSums.G2 += student.G2 || 0;
				attributeSums.G3 += student.G3 || 0;
			});
			this.attributesChartData.datasets[0].data = Object.values(attributeSums);

			const travelStudyFailSums = {
				traveltime: 0,
				studytime: 0,
				failures: 0,
			};
			this.students.forEach(student => {
				travelStudyFailSums.traveltime += student.traveltime || 0;
				travelStudyFailSums.studytime += student.studytime || 0;
				travelStudyFailSums.failures += student.failures || 0;
			});
			this.newChartData.datasets[0].data = Object.values(travelStudyFailSums);
		},
	},
});
</script>

<style scoped>
.details-container {
	max-width: 1300px;
	margin: 0 auto;
}

.chart-container {
	height: 300px;
}

.charts-row {
	display: flex;
	justify-content: space-between;
}

.half-width {
	width: 48%;
}
</style>
