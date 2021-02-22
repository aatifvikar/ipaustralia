<template>
	<div>
		<div id="harvest-section">
			<h1>Harvest Id {{ harvestId }}</h1>
			<div class="accreditation-section">
				<h2>Accreditation Report</h2>
				<table class="data-table">
					<tbody class="harvest-table">
						<tr class="harvest-table-row">
							<td class="item">
								{{ harvestDetails.enterpriseName }}
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
				<tab title="Harvest Details">
					<div>
						<div class="flex-row">
							<div class="flex-column">Enterprise Name</div>
							<div class="flex-column">{{ harvestDetails.enterpriseName }}</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Enterprise Address</div>
							<div class="flex-column">
								{{ getFarmAddress(harvestDetails.enterpriseName) }}
							</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Harvest Weight</div>
							<div class="flex-column">
								{{ harvestDetails.totalHarvestWeight }}
							</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Harvest Date</div>
							<div class="flex-column">{{ harvestDetails.harvestDate }}</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Harvest Description</div>
							<div class="flex-column">
								{{ harvestDetails.harvestDescription }}
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
	name: 'HarvestDetails',
	props: {
		productId: String,
		harvestId: String,
	},
	components: {
		Tab,
		Tabs,
	},
	data() {
		return {
			productDetails: store.productDetails,
			harvestDetails: store.harvestDetails,
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
