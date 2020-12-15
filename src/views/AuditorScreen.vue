/* eslint-disable prettier/prettier */
<template>
	<div>
		<Header></Header>
		<main>
			<div id="auditor-screen">
				<div v-if="showSearchOptions">
					<h1>Find a product</h1>
					<h2>Search by</h2>
				</div>
				<div v-if="showSearchOptions" class="tab-container">
					<tabs>
						<tab title="Product Number">
							<div class="form-field">
								<label class="title" for="productNumber">Product Id</label>
								<p class="hint"></p>
								<input
									type="text"
									id="productNumber"
									name="productNumber"
									v-model="productNumber"
								/>
							</div>
							<div>
								<button
									class="secondary-button"
									v-on:click="getProductDetails()"
								>
									Search
								</button>
							</div>
						</tab>
						<tab title="Batch Number">
							<div class="form-field">
								<label class="title" for="batchNumber">Batch Number</label>
								<p class="hint"></p>
								<input
									type="text"
									id="batchNumber"
									name="batchNumber"
									v-model="batchNumber"
								/>
							</div>
							<div>
								<button class="secondary-button" v-on:click="getBatchDetails()">
									Search
								</button>
							</div>
						</tab>
						<tab title="Harvest Id">
							<div class="form-field">
								<label class="title" for="harvestId">Harvest ID</label>
								<p class="hint"></p>
								<input
									type="text"
									id="harvestId"
									name="harvestId"
									v-model="harvestId"
								/>
							</div>
							<div>
								<button
									class="secondary-button"
									v-on:click="getHarvestDetails()"
								>
									Search
								</button>
							</div>
						</tab>
					</tabs>
				</div>
				<div v-if="showProductDetails">
					<ProductDetails :productId="this.productNumber"></ProductDetails>
				</div>
				<div v-if="showHarvestDetails">
					<HarvestDetails :harvestId="this.harvestId"></HarvestDetails>
				</div>
				<div v-if="showBatchDetails">
					<BatchDetails :batchNumber="this.batchNumber"></BatchDetails>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import axios from 'axios';
import store from '@/data/store';

const Header = () => import('@/components/Global/Header.vue');
const Tab = () => import('@/components/Global/Tabs/Tab.vue');
const Tabs = () => import('@/components/Global/Tabs/Tabs.vue');
const ProductDetails = () => import('@/components/Audit/productDetails.vue');
const HarvestDetails = () => import('@/components/Audit/harvestDetails.vue');
const BatchDetails = () => import('@/components/Audit/batchDetails.vue');

export default {
	name: 'AuditorScreen',
	components: {
		Header,
		Tab,
		Tabs,
		ProductDetails,
		HarvestDetails,
		BatchDetails,
	},
	data() {
		return {
			showSearchOptions: true,
			showProductDetails: false,
			showHarvestDetails: false,
			showBatchDetails: false,
			productNumber: '',
			batchNumber: '',
			harvestId: '',
		};
	},
	methods: {
		getProductDetails() {
			axios(
				`${process.env.VUE_APP_ENDPOINT}/manufacturers/products/` +
					`${this.productNumber}`,
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
					store.productDetails = response.data;
					this.showSearchOptions = false;
					this.showProductDetails = true;
				})
				.catch(() => {
					console.log('error');
				});
		},
		getHarvestDetails() {
			axios(
				`${process.env.VUE_APP_ENDPOINT}/farmers/harvests/` +
					`${this.harvestId}`,
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
					store.harvestDetails = response.data;
					this.showSearchOptions = false;
					this.showHarvestDetails = true;
				})
				.catch(() => {
					console.log('error');
				});
		},
		getBatchDetails() {
			axios(
				`${process.env.VUE_APP_ENDPOINT}/aggregators/batches/` +
					`${this.batchNumber}`,
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
					store.batchDetails = response.data;
					this.showSearchOptions = false;
					this.showBatchDetails = true;
				})
				.catch(() => {
					console.log('error');
				});
		},
	},

	created() {},
	mounted() {},
};
</script>

<style lang="scss" scoped>
#auditor-screen {
	padding: 2rem 4rem;

	.tab-container {
		@media (min-width: 768px) {
			max-width: 50%;
		}
	}
	.form-field {
		margin-bottom: 2rem;
	}
}
</style>
