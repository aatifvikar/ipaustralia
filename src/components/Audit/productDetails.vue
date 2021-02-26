<template>
	<div>
		<div id="product-section">
			<h1>Product No {{ productId }}</h1>
			<div class="accreditation-section">
				<h2>Accreditation</h2>
				{{/*Placeholder for the accreditation image/script*/}}
				<h2>Accreditation Report</h2>
				<table class="data-table">
					<tbody class="harvest-table">
						<tr class="harvest-table-row">
							<td class="item">Link to ANSTO Testing Report</td>
							<td class="item">
								<a
									class="primary-button"
									:href="
										productDetails.anstoReportLink
											? productDetails.anstoReportLink
											: '#'
									"
								>
									ANTSO Report Link
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<tabs>
				<tab title="Manufacturer Details">
					<div>
						<div class="flex-row">
							<div class="flex-column">Business Name</div>
							<div class="flex-column">{{ productDetails.businessName }}</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Business Address</div>
							<div class="flex-column">
								{{ productDetails.businessAddress }}
							</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Product Name</div>
							<div class="flex-column">{{ productDetails.productName }}</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Product Type</div>
							<div class="flex-column">{{ productDetails.productType }}</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Product Number</div>
							<div class="flex-column">{{ productId }}</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Manufactured Date</div>
							<div class="flex-column">TBC</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Product Description</div>
							<div class="flex-column">
								{{ productDetails.productDescription }}
							</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Number of Units produced</div>
							<div class="flex-column">{{ productDetails.unitsProduced }}</div>
						</div>

						<div class="flex-row">
							<div class="flex-column">
								<button class="primary-button">Start a new search</button>
							</div>
						</div>
					</div>
				</tab>
				<tab title="Aggregator Details">
					<div v-for="item in batchDetails" :key="item.identifier">
						<h3>Batch Number {{ item.identifier }}</h3>
						<div class="flex-row">
							<div class="flex-column">Business Name</div>
							<div class="flex-column">{{ item.businessName }}</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Business Address</div>
							<div class="flex-column">
								{{ item.businessAddress }}
							</div>
						</div>
						<div class="flex-row">
							<div class="flex-column">Batch Description</div>
							<div class="flex-column">{{ item.batchDescription }}</div>
						</div>
					</div>
				</tab>
				<tab title="Harvest Details">
					<div v-for="item in allHarvests" :key="item.identifier">
						<h3>Harvest ID {{ item.identifier }}</h3>
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
							<div class="flex-column">{{ item.harvestDescription }}</div>
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
	name: 'ProductDetails',
	props: {
		productId: String,
	},
	components: {
		Tab,
		Tabs,
	},
	data() {
		return {
			productDetails: store.productDetails,
			batchDetails: store.productDetails.batches,
		};
	},
	computed: {
		allHarvests() {
			return this.batchDetails.map((b) => b.harvests).flat(3);
		},
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
#product-section {
	width: 70%;
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
	.primary-button {
		text-align: center;
		text-decoration: none;
	}
}
</style>
