/* eslint-disable prettier/prettier */
<template>
	<div>
		<form id="create-harvest-section" @submit.prevent="onSubmit">
			<h2>Or create a new harvest</h2>
			<div class="form-field">
				<label class="title" for="startDate">Start Date</label>
				<p class="hint">E.g 04/10/2021</p>
				<input
					type="date"
					id="startDate"
					name="harvest-start-date"
					v-model="harvestDate"
					class="datepicker"
				/>
			</div>
			<div>
				<button class="secondary-button">Create Harvest</button>
			</div>
		</form>
	</div>
</template>

<script>
// @ is an alias to /src

//import store from '@/data/store';
import 'vue-select/dist/vue-select.css';

export default {
	name: 'CreateHarvestSection',
	components: {},
	data() {
		return {
			harvestDate: '',
		};
	},
	methods: {
		onSubmit() {
			this.$parent.selectedHarvest = {
				enterpriseName: this.$parent.selectedFarm.value,
				events: [],
			};
			this.$parent.showUpdateForm = true;
			this.$parent.showCreateSection = false;
			this.$parent.showUpdateSection = false;
			this.$parent.isNewHarvest = true;
		},
	},

	created() {},
	mounted() {},
};
</script>

<style lang="scss" scoped>
#create-harvest-section {
	width: 80%;
	margin: auto;

	.harvest-heading {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.harvest-table-row {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.item {
		width: 33%;
		padding: 5px;
	}

	.datepicker {
		width: 100%;
		border: 1px solid green;
		padding: 10px;
		margin-bottom: 20px;
	}
}
</style>
