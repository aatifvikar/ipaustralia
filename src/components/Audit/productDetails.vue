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
							<td class="item">
								{{ /*TBC where this info is from */}}
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
							<div class="flex-column">Mfg Date</div>
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
					<div>{{/** API currently does not return this information */}}</div>
					<h3>
						This section needs to be built once the API is updated to return the
						appropriate results
					</h3>
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
	methods: {},

	created() {},
	mounted() {},
};
</script>

<style lang="scss" scoped>
#product-section {
	width: 70%;
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
