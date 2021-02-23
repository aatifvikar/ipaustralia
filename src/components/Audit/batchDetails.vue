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
							<div class="flex-column">{{ batchDetails.businessName }}</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Business Address</div>
							<div class="flex-column">{{ batchDetails.businessAddress }}</div>
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
								<button class="primary-button" @click="$emit('back-to-search')">
									Back to search
								</button>
							</div>
							<div class="flex-column"></div>
						</div>
					</div>
				</tab>
				<tab title="Harvest Details">
					<div v-for="item in batchDetails.harvests" :key="item.identifier">
						<h3>Harvest {{ item.identifier }}</h3>
						<div class="flex-row">
							<div class="flex-column">Enterprise Name</div>
							<div class="flex-column">{{ item.enterpriseName }}</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Enterprise Address</div>
							<div class="flex-column">
								{{ getFarmAddress(item.enterpriseName) }}
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
								{{ item.harvestDescription }}
							</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Harvest Weight</div>
							<div class="flex-column">{{ item.totalHarvestWeight }}kg</div>
						</div>
					</div>
					<div class="flex-row">
						<div class="flex-column">
							<button class="primary-button" @click="$emit('back-to-search')">
								Back to search
							</button>
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
import farmList from '@/data/farmList';

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
	methods: {
		getFarmAddress(farmName) {
			return farmList.farmList.find((l) => l.value === farmName)?.address;
		},
	},

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
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

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
