<template>
	<div>
		<div id="harvest-section">
			<h1>Batch Number {{ batchNumber }}</h1>
			<div class="accreditation-section">
				<h2>Accreditation Report</h2>
				<table class="data-table">
					<tbody class="harvest-table">
						<tr class="harvest-table-row">
							<td class="item">
								{{ batchDetails.enterpriseName }}
							</td>
							<td class="item">
								placeholder
								{{ /*TBC where this info is from */}}
							</td>
							<td class="item">
								<button class="primary-button">ANTSO Report</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<tabs>
				<tab title="Batch Details">
					<div>
						<div class="flex-row">
							<div class="flex-column">Business Name</div>
							<div class="flex-column">{{ batchDetails.enterpriseName }}</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Business Address</div>
							<div class="flex-column">
								{{ /*API currently does not return this info*/ }}
							</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Batch Number</div>
							<div class="flex-column">
								{{ batchNumber }}
							</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Batch Description</div>
							<div class="flex-column">
								{{ batchDetails.batchDescription }}
							</div>
						</div>

						<div class="flex-row">
							<div class="flex-column">
								<button class="primary-button">Back to search</button>
							</div>
							<div class="flex-column"></div>
						</div>
					</div>
				</tab>
				<tab title="Harvest Details">
					<div v-for="item in batchDetails.harvests" :key="item.identifier">
						<h3>Harvest {{ item.identifier }}</h3>
						<div class="flex-row">
							<div class="flex-column">Business Name</div>
							<div class="flex-column">{{ item.enterpriseName }}</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Business Address</div>
							<div class="flex-column">
								{{ /*API currently does not return this info*/ }}
							</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Harvest Date</div>
							<div class="flex-column">
								{{ item.harvestDate }}
							</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Harvest Description</div>
							<div class="flex-column">
								{{ batchDetails.harvestDescription }}
							</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Harvest Weight</div>
							<div class="flex-column">
								{{ batchDetails.totalHarvestWeight }}
							</div>
						</div>
					</div>
					<div class="flex-row">
						<div class="flex-column">
							<button class="primary-button">Back to search</button>
						</div>
						<div class="flex-column"></div>
					</div>
				</tab>
			</tabs>
		</div>
	</div>
</template>

<script>
import store from '@/data/store';
import axios from 'axios';

const Tab = () => import('@/components/Global/Tabs/Tab.vue');
const Tabs = () => import('@/components/Global/Tabs/Tabs.vue');

export default {
	name: 'BatchDetails',
	props: {
		productId: String,
		harvestId: String,
		batchNumber: String,
	},
	components: {
		Tab,
		Tabs,
	},
	data() {
		return {
			productDetails: store.productDetails,
			harvestDetails: store.harvestDetails,
			batchDetails: store.batchDetails,
		};
	},
	methods: {},

	created() {},
	mounted() {},
};
</script>

<style lang="scss" scoped>
#harvest-section {
	width: 70%;
	@media (max-width: 768px) {
		width: 100%;
	}
	.accreditation-section {
		padding: 2rem;
		box-shadow: 8px 8px 8px 8px #888888;

		@media (max-width: 768px) {
			box-shadow: none;
		}
	}
	.flex-row {
		display: flex;
		justify-content: flex-start;
	}
	.flex-column {
		flex: 50%;
		padding: 1rem;

		:first-of-type {
			font-weight: bold;
		}
	}
}
</style>
