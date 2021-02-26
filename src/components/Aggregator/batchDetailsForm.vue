/* eslint-disable prettier/prettier */
<template>
	<div>
		<div id="batch-details-form">
			<h1>Batch Number {{ batchIdentifier }}</h1>
			<div class="harvest-update-container">
				<div class="form-section item">
					<form @submit.prevent="onSubmit">
						<h2>Aggregation details</h2>
						<div>
							<div class="form-field">
								<label class="title" for="productType">Aggregate Type</label>
								<p class="hint">E.g Powder</p>
								<input
									type="text"
									id="productType"
									name="productType"
									v-model="productType"
								/>
							</div>
							<div class="form-field">
								<label class="title" for="batchDescription">
									Batch Description
								</label>
								<textarea
									id="batchDescription"
									name="batchDescription"
									v-model="batchDescription"
								/>
							</div>
							<div class="form-field">
								<label class="title" for="anstoReportLink">
									ANSTO Testing Document URL
								</label>
								<input
									type="text"
									id="anstoReportLink"
									name="anstoReportLink"
									v-model="anstoReportLink"
								/>
							</div>

							<hr />
							<div v-for="item in selectedHarvestIds" :key="item.harvestId">
								<h3>Harvest {{ item.identifier }}</h3>
								<div class="field-table">
									<div class="form-field">
										<label class="title" for="receivedWeight">
											Received Weight
										</label>
										<p class="hint">E.g 105kg</p>
										<input
											type="text"
											id="receivedWeight"
											name="receivedWeight"
											v-model="item.totalHarvestWeight"
										/>
									</div>
									<div class="form-field">
										<label class="title" for="receivedDate">
											Received Date
										</label>
										<p class="hint">E.g 105kg</p>
										<input
											type="date"
											id="receivedDate"
											name="receivedDate"
											v-model="item.harvestDate"
											class="datepicker"
										/>
									</div>
								</div>
							</div>
							{{/* Non Aboriginal Section*/}}
							<div v-for="(item, i) in nonAbgSection" :key="i">
								<h4>Non NAAKPA harvest</h4>
								<div class="form-field">
									<label class="title" for="farmBusinessName">
										Farm Business Name
									</label>
									<input
										type="text"
										id="farmBusinessName"
										name="farmBusinessName"
										v-model="item.farmBusinessName"
									/>
								</div>
								<div class="form-field">
									<label class="title" for="batchWeight">Batch Weight</label>
									<p class="hint">E.g 105kg</p>
									<input
										type="number"
										min="1"
										id="batchWeight"
										name="batchWeight"
										v-model="item.batchWeight"
									/>
								</div>
								<div class="form-field">
									<label class="title" for="batchDate">Batch Date</label>
									<p class="hint">E.g 105kg</p>
									<input
										type="date"
										id="batchDate"
										name="batchDate"
										v-model="item.batchDate"
										class="datepicker"
									/>
								</div>
								<div>
									<input
										type="checkbox"
										id="indigenousSourced"
										name="indigenousSourced"
										v-model="item.indigenousSourced"
									/>
									<label class="title" for="indigenousSourced">
										Indigenous sourced?
									</label>
								</div>
							</div>
							<div class="button-container">
								<button
									type="button"
									class="primary-button"
									v-on:click="addNonAbgHarvest"
								>
									Add non NAAKPA harvest
								</button>
							</div>
							<div class="button-container">
								<button type="submit" class="secondary-button">
									Save batch
								</button>
							</div>
						</div>
					</form>
				</div>
				<div class="item">
					<h2>About the Harvest used</h2>
					<dl class="data-list">
						<div v-for="item in selectedHarvestIds" :key="item.harvestId">
							<dt class="h4">
								{{ item.enterpriseName }}
							</dt>
							<dd>
								<table class="data-table">
									<thead>
										<tr class="harvest-heading">
											<th class="harvest-item">Harvest ID</th>
											<th class="harvest-item">Harvested Date</th>
										</tr>
									</thead>
									<tbody class="harvest-table">
										<tr class="harvest-table-row">
											<td class="harvest-item">{{ item.identifier }}</td>
											<td class="harvest-item">{{ item.harvestDate }}</td>
										</tr>
									</tbody>
								</table>
							</dd>
						</div>
						{{/* TBD Accordion sections */}}
					</dl>
					<h2>Your Details</h2>
					<p>This information will be displayed to the public</p>
					<dl class="data-list">
						<div>
							<dt class="title">Business Name</dt>
							<dd>{{ businessName }}</dd>
						</div>
						<div>
							<dt class="title">Address</dt>
							<dd>
								{{ businessAddress }}
								<br />
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

//import store from '@/data/store';
import 'vue-select/dist/vue-select.css';
import store from '@/data/store';
import axios from 'axios';

export default {
	name: 'BatchDetailsForm',
	components: {},
	props: {
		businessName: String,
		businessAddress: String,
		selectedHarvestIds: Array,
	},
	data() {
		return {
			productType: '',
			anstoReportLink: '',
			batchDescription: '',
			receivedDate: '',
			receivedWeight: '',
			showNonAboriginalSection: false,
			nonAbgSection: [],
			batchIdentifier: store.batchNumber,
			batchObj: [],
		};
	},
	methods: {
		createUpdateData() {
			this.selectedHarvestIds.forEach((elem) => {
				this.batchObj.push({
					identifier: elem.identifier,
					receivedWeight: parseFloat(elem.totalHarvestWeight),
					receivedDate: elem.harvestDate,
				});
			});
			console.log(JSON.stringify(this.batchObj));
		},
		onSubmit() {
			this.createUpdateData();
			axios(
				`${process.env.VUE_APP_ENDPOINT}/aggregators/batches/` +
					`${this.batchIdentifier}`,
				{
					method: 'PATCH',
					headers: {
						'content-type': 'application/json',
					},
					auth: {
						username: store.username,
						password: store.password,
					},
					data: {
						batchDescription: this.batchDescription,
						aggregateType: 'NEW_AGG',
						harvests: this.batchObj,
						anstoReportLink: this.anstoReportLink,
					},
				}
			)
				.then(() => {
					this.$parent.showBatchForm = false;
				})
				.catch(() => {
					console.log('error');
				});
		},
		addNonAbgHarvest() {
			this.nonAbgSection.push({
				farmBusinessName: '',
				batchWeight: '',
				batchDate: '',
				indigenousSourced: false,
			});
			this.showNonAboriginalSection = true;
		},
	},

	created() {},
	mounted() {},
};
</script>

<style lang="scss" scoped>
#batch-details-form {
	padding: 20px;

	.harvest-update-container {
		display: flex;

		@media (max-width: 768px) {
			flex-direction: column;
		}

		.form-section {
			box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

			@media (max-width: 768px) {
				box-shadow: none;
			}
		}

		.item {
			width: 50%;
			padding: 20px 80px;

			@media (max-width: 768px) {
				width: 100%;
				padding: 20px;
			}
		}
	}

	.field-table {
		display: flex;
		justify-content: space-between;
		@media (max-width: 768px) {
			flex-direction: column;
		}
		.form-field {
			width: 48%;
			@media (max-width: 768px) {
				width: 100%;
				margin: 0;
			}
		}
	}
	.harvest-heading {
		display: flex;
		justify-content: space-between;
	}
	.harvest-table {
		&:nth-child(even) {
			background: #f4f6f2;
		}
		.harvest-table-row {
			display: flex;
			justify-content: space-between;
		}
	}
	.harvest-item {
		padding: 0.75rem;
	}
	.primary-button {
		padding: 0.75rem;
	}
}
</style>
