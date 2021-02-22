/* eslint-disable prettier/prettier */
<template>
	<div>
		<Header></Header>
		<main id="harvest-screen">
			<div>
				<div
					v-if="!showUpdateForm && !showConfirmation"
					class="select-container"
				>
					<h1>{{ pageTitle }}</h1>
					<div>
						<label for="selectFarm" class="title">
							Select Aboriginal Enterprise
						</label>
						<v-select
							name="selectFarm"
							:value="selectedFarm"
							:options="farmList"
							@input="selectValue"
						></v-select>
					</div>
				</div>
				<div class="update-container" v-if="showUpdateSection">
					<UpdateSection :harvests="harvests" />
				</div>
				<div class="create-container" v-if="showCreateSection">
					<CreateSection />
				</div>
				<div class="update-form-container" v-if="showUpdateForm">
					<UpdateForm
						:farmName="selectedFarm.label"
						:farmAddress="selectedFarm.address"
						:farmRegion="selectedFarm.region"
						:harvest="selectedHarvest"
						:events="selectedHarvest ? selectedHarvest.events : []"
					/>
				</div>
				<div v-if="showConfirmation">
					<ConfirmationSection
						heading="Your harvest has been successfully created"
						subHeading="Harvest details"
						isHarvestConfirmation="true"
						btnLabel="Back to harvest creation"
					/>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
// @ is an alias to /src

//import store from '@/data/store';
import { farmList as content } from '@/data/farmList';
import vSelect from 'vue-select';
import axios from 'axios';
import store from '@/data/store';
import 'vue-select/dist/vue-select.css';

const Header = () => import('@/components/Global/Header.vue');
const UpdateSection = () =>
	import('@/components/Harvest/updateHarvestSection.vue');
const CreateSection = () =>
	import('@/components/Harvest/createHarvestSection.vue');
const UpdateForm = () => import('@/components/Harvest/updateHarvestForm.vue');
const ConfirmationSection = () =>
	import('@/components/Global/Confirmation.vue');

export default {
	name: 'HarvestScreen',
	components: {
		vSelect,
		Header,
		UpdateSection,
		CreateSection,
		UpdateForm,
		ConfirmationSection,
	},
	data() {
		return {
			isBlocked: false,
			loading: false,
			pageTitle: content.title,
			selectTitle: content.selectTitle,
			farmList: content.farmList,
			selectedFarm: { label: 'Select a farm', value: '' },
			showUpdateSection: false,
			showCreateSection: false,
			showUpdateForm: false,
			isNewHarvest: false,
			showConfirmation: false,
			harvests: [],
			selectedHarvest: null,
		};
	},
	methods: {
		selectValue(value) {
			this.selectedFarm = value;
			console.log(JSON.stringify(this.selectedFarm));
			//trigger API call to retrieve the results, if there are harvest id's
			//on success show the page
			axios(
				`${process.env.VUE_APP_ENDPOINT}/farmers/harvests?enterpriseName=${this.selectedFarm.value}`,
				{
					method: 'GET',
					headers: {
						'content-type': 'application/json',
					},
					auth: {
						username: store.username,
						password: store.password,
					},
				}
			)
				.then((response) => {
					store.harvestData = response.data;
					this.harvests.length = 0;
					for (const d of response.data) {
						this.harvests.push(d);
					}
					if (store.harvestData.length >= 1) {
						this.showUpdateSection = true;
					}
					this.showCreateSection = true;
				})
				.catch(() => {
					this.harvests.length = 0;
					console.log('error');
				});

			//if no existing previous harvest idd
			//this.showUpdateForm = true;
		},
	},

	created() {},
	mounted() {},
};
</script>

<style lang="scss">
#harvest-screen {
	.select-container {
		padding: 1.5rem 1rem;
		width: 60%;
		margin: auto;

		@media (max-width: 768px) {
			width: 100%;
		}
	}

	@media (min-width: 768px) {
		width: 80%;
		margin: 20px auto;
		//border-top: 4px solid #809e57;
		.create-container {
			width: 65%;
			margin: auto;
		}

		.update-container {
			width: 60%;
			margin: auto;
		}

		.update-form-container {
			width: 90%;
			margin: auto;
		}
	}
}
</style>
