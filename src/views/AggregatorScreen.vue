/* eslint-disable prettier/prettier */
<template>
	<div>
		<Header></Header>
		<main id="aggregator-screen">
			<div v-if="showBatchCreationSection">
				<div class="form-container">
					<h1>Create New Batch</h1>
					<p>
						Enter your business details and all of the harvests used for this
						production batch. Each harvest is linked to a Harvest ID
					</p>
					<form @submit.prevent="onSubmit">
						<div class="form-field">
							<label class="title" for="businessName">Business Name</label>
							<p class="hint"></p>
							<input
								type="text"
								id="businessName"
								name="businessName"
								v-model="businessName"
							/>
						</div>
						<div class="form-field">
							<label class="title" for="businessAddress">
								Business Address
							</label>
							<p class="hint">E.g 200 George Street</p>
							<input
								type="text"
								id="businessAddress"
								name="businessAddress"
								v-model="businessAddress"
							/>
						</div>
						<div>
							<label class="title" for="harvestId">Harvest Id</label>
							<v-select
								name="harvestId"
								v-model="selectedHarvestId"
								:options="harvestIds"
								label="identifier"
    							track-by="name"
								:multiple="true"
							></v-select>
						</div>
						<div class="button-container">
							<button class="secondary-button">
								Create new batch
							</button>
						</div>
					</form>
				</div>
			</div>
			<div v-else-if="showBatchForm">
				<div>
					<BatchDetailsSection
						:businessName="businessName"
						:businessAddress="businessAddress"
						:selectedHarvestIds="selectedHarvestId"
					/>
				</div>
			</div>
			<div v-else>
				<ConfirmationSection
					heading="Your batch has been successfully created"
					subHeading="Batch details"
					isBatchConfirmation="true"
					btnLabel="Back to batch creation"
				/>
			</div>
		</main>
	</div>
</template>

<script>
// @ is an alias to /src

//import store from '@/data/store';
//import {harvest as content} from '@/data/harvest';
import vSelect from 'vue-select';
import axios from 'axios';
import store from '@/data/store';
import 'vue-select/dist/vue-select.css';

const Header = () => import('@/components/Global/Header.vue');
const BatchDetailsSection = () =>
	import('@/components/Aggregator/batchDetailsForm.vue');
const ConfirmationSection = () =>
	import('@/components/Global/Confirmation.vue');

export default {
	name: 'AggregatorScreen',
	components: {
		vSelect,
		BatchDetailsSection,
		Header,
		ConfirmationSection,
	},
	data() {
		return {
			selectedHarvestId: [],
			businessName: '',
			businessAddress: '',
			showBatchCreationSection: true,
			harvestIds: [],
			showBatchForm: false,
			createBatchHarvestIds:[],
		};
	},
	methods: {
		selectValue(value) {
			this.selectedHarvestId = value;
			// add logic for multiselect
			//trigger API call to retrieve the results
		},
		createBatchObject() {
			this.selectedHarvestId.forEach(elem => {
				this.createBatchHarvestIds.push(elem.identifier);
			});
		},
		onSubmit() {
			this.createBatchObject();
			axios(`${process.env.VUE_APP_ENDPOINT}/aggregators/batches`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				auth: {
					username: store.username,
					password: store.password,
				},
				data: {
					harvestIdentifiers: this.createBatchHarvestIds,
					aggregateType: 'NEW_AGG_TYPE',
					businessName: this.businessName,
					businessAddress: this.businessAddress,
					batchDetailsSection: 'Dummy Description',
				},
			})
				.then((response) => {
					console.log(response.data.identifier)
					store.batchNumber = response.data.identifier;
					this.showBatchCreationSection =false;
					this.showBatchForm = true;
				})
				.catch(() => {
					console.log('error');
				});
		},
	},

	created() {
		axios(`${process.env.VUE_APP_ENDPOINT}/farmers/harvests`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
			auth: {
				username: store.username,
				password: store.password,
			},
		})
			.then((response) => {
				store.harvestData = response.data;
				this.harvestIds = response.data;
			})
			.catch(() => {
				console.log('error');
			});
	},
	mounted() {},
};
</script>

<style lang="scss">
#aggregator-screen {
	.form-container {
		padding: 30px 24px;
		width: 50%;
		margin: auto;

		@media (max-width: 768px) {
			width: 100%;
		}
	}

	.button-container {
		margin-top: 30px;
	}

	.title {
		font-size: 18px;
		font-weight: 500;
	}

	.form-field {
		margin: 25px 0;

		input {
			width: 100%;
			padding: 10px;
			border: none;
			box-shadow: 0 1px 0 0 #76934e;
			background-color: #f4f6f2;
			border-radius: 4px;
		}
	}
}
</style>
