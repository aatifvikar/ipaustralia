/* eslint-disable prettier/prettier */
<template>
	<div>
		<div id="update-harvest-form">
			<h1>{{ harvestDetails.enterpriseName }}</h1>
			<p class="h2">{{ harvestDetails.identifier }}</p>
			<div class="harvest-update-container">
				<div class="form-section item">
					<form @submit.prevent="onSubmit">
						<h2>New Record</h2>
						<div>
							<div class="form-field">
								<label class="title" for="batchWeight">Batch Weight</label>
								<p class="hint">E.g 100.0kg</p>
								<input
									type="text"
									id="batchWeight"
									name="batchWeight"
									v-model="batchWeight"
								/>
							</div>
							<div class="form-field">
								<label class="title" for="harvestedDate">Harvested Date</label>
								<p class="hint">E.g 10/04/2021</p>
								<input
									type="date"
									id="harvestedDate"
									name="harvestedDate"
									v-model="harvestedDate"
									class="datepicker"
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
							<div class="button-container">
								<button
									v-if="isNewHarvest"
									type="submit"
									class="secondary-button"
									value="create"
								>
									Create Harvest
								</button>
								<button
									v-else
									type="submit"
									class="secondary-button"
									value="update"
								>
									Update Harvest
								</button>
							</div>
						</div>
					</form>
				</div>
				<div class="item">
					<h2>About this Harvest</h2>

					<dl class="data-list">
						<div>
							<dt class="title">Harvest start date</dt>
							<dd>{{ harvestDetails.harvestDate }}</dd>
						</div>
						<div>
							<dt class="title">Yield Total</dt>
							<dd>{{ harvestDetails.totalHarvestWeight }}</dd>
						</div>
						<div v-if="!isNewHarvest">
							<dt class="title">Record History</dt>
							<dd>
								<table class="data-table">
									<caption class="vh">Record History</caption>
									<thead class="vh">
										<tr>
											<th scope="col">Harvest date</th>
											<th scope="col">Harvest yield</th>
										</tr>
									</thead>
									<tbody class="harvest-table">
										<tr
											v-for="event in harvestHistory"
											:key="event.eventPayload.harvestId"
											class="harvest-table-row"
										>
											<td class="harvest-item">
												{{ event.eventPayload.harvestDate }}
											</td>
											<td class="harvest-item">
												{{ event.eventPayload.totalHarvestWeight }}kg
											</td>
										</tr>
									</tbody>
								</table>
							</dd>
						</div>
					</dl>

					<h2>About your farm</h2>
					<p>This information will be displayed to the public</p>

					<dl class="data-list">
						<div>
							<dt class="title">Business Name</dt>
							<dd>{{ farmName }}</dd>
						</div>
						<div>
							<dt class="title">Address</dt>
							<dd>
								<p>
									{{ farmAddress }}
									<br />
									{{ farmRegion }}
								</p>
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

import store from '@/data/store';
import 'vue-select/dist/vue-select.css';
import axios from 'axios';

export default {
	name: 'UpdateHarvestForm',
	components: {},
	props: {
		farmName: String,
		farmAddress: String,
		farmRegion: String,
	},
	data() {
		return {
			harvestedDate: '',
			batchWeight: 0.0,
			batchDescription: '',
			isNewHarvest: this.$parent.isNewHarvest,
			harvestDetails: store.harvestDetails,
			harvestHistory: store.harvestDetails.events,
		};
	},
	methods: {
		onSubmit() {
			if (this.isNewHarvest) {
				axios(`${process.env.VUE_APP_ENDPOINT}/farmers/harvests`, {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					auth: {
						username: store.username,
						password: store.password,
					},
					data: {
						totalHarvestWeight: parseInt(this.batchWeight),
						enterpriseName: this.farmName,
						harvestDate: this.harvestedDate,
						anstoReport: false,
						harvestDescription: this.batchDescription,
					},
				})
					.then((response) => {
						store.harvestId = response.data.identifier;
						this.$parent.showUpdateForm = false;
						this.$parent.showCreateSection = false;
						this.$parent.showUpdateSection = false;
					})
					.catch(() => {
						console.log('error');
					});
			} else {
				store.harvestId = this.harvestDetails.identifier;
				axios(
					`${process.env.VUE_APP_ENDPOINT}/farmers/harvests/` +
						`${this.harvestDetails.identifier}`,
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
							additionalHarvestWeight: parseInt(this.batchWeight),
							additionalHarvestWeightDescription: this.batchDescription,
							harvestUpdateDate: this.harvestedDate,
							anstoReport: false,
							harvestDescription: this.batchDescription,
						},
					}
				)
					.then((response) => {
						this.$parent.showUpdateForm = false;
						this.$parent.showCreateSection = false;
					})
					.catch(() => {
						console.log('error');
					});
			}
			this.$parent.showConfirmation = true;
		},
	},

	created() {},
	mounted() {},
};
</script>

<style lang="scss" scoped>
#update-harvest-form {
	padding: 20px;

	.harvest-update-container {
		display: flex;

		@media (max-width: 768px) {
			flex-direction: column;
		}

		.form-section {
			box-shadow: 8px 8px 8px 8px #888888;

			@media (max-width: 768px) {
				box-shadow: none;
			}
		}
	}

	.item {
		width: 50%;
		padding: 20px 50px;
		height: fit-content;
		@media (max-width: 768px) {
			width: 100%;
			padding: 20px;
		}
	}

	.harvest-table-row {
		&:nth-child(even) {
			background: #f4f6f2;
		}

		.harvest-item {
			width: 50%;
			padding: 0.75rem;
		}
	}
}
</style>
