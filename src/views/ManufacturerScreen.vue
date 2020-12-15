/* eslint-disable prettier/prettier */
<template>
	<div>
		<Header></Header>
		<main id="manufacturer-screen">
			<div v-if="!showProductDetails && !showConfirmation">
				<div class="form-container">
					<h1>Create a New Product</h1>
					<p>
						Enter your business details and the batch numbers used for the
						creation of the product.
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
							<label class="title" for="batchNumber">Batch Number</label>
							<v-select
								v-model="selectedBatchNumber"
								name="batchNumber"
								:value="selectedBatchNumber"
								:options="batchData"
								label="identifier"
								:multiple="true"
							></v-select>
						</div>
						<div class="button-container">
							<button class="secondary-button">Create new product</button>
						</div>
					</form>
				</div>
			</div>
			<div v-if="showProductDetails">
				<div>
					<ProductDetailsSection :selectedBatchNumbers="selectedBatchNumber" />
				</div>
			</div>
			<div v-if="showConfirmation">
				<ConfirmationSection
					heading="Your product has been successfully created"
					subHeading="Product details"
					isProductConfirmation="true"
					btnLabel="Back to product creation"
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
import 'vue-select/dist/vue-select.css';
import store from '@/data/store';
import axios from 'axios';

const Header = () => import('@/components/Global/Header.vue');
const ProductDetailsSection = () =>
	import('@/components/Manufacturer/productDetailsForm.vue');
const ConfirmationSection = () =>
	import('@/components/Global/Confirmation.vue');

export default {
	name: 'ManufacturerScreen',
	components: {
		vSelect,
		ProductDetailsSection,
		Header,
		ConfirmationSection,
	},
	data() {
		return {
			selectedBatchNumber: [],
			businessName: '',
			businessAddress: '',
			showProductDetails: '',
			batchData: [],
			batchNumbers: [],
			showConfirmation: false,
		};
	},
	methods: {
		createProductObject() {
			this.selectedBatchNumber.forEach((elem) => {
				this.batchNumbers.push(elem.identifier);
			});
		},
		onSubmit() {
			this.createProductObject();
			axios(`${process.env.VUE_APP_ENDPOINT}/manufacturers/products`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				auth: {
					username: store.username,
					password: store.password,
				},
				data: {
					batchIdentifiers: this.batchNumbers,
					businessName: this.businessName,
					businessAddress: this.businessAddress,
				},
			})
				.then((response) => {
					console.log(response.data.identifier);
					store.productNumber = response.data.identifier;
					this.showProductDetails = true;
				})
				.catch(() => {
					console.log('error');
				});
		},
	},

	created() {},
	mounted() {
		axios(`${process.env.VUE_APP_ENDPOINT}/aggregators/batches`, {
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
				this.batchData = response.data;
			})
			.catch(() => {
				console.log('error');
			});
	},
};
</script>

<style lang="scss">
#manufacturer-screen {
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
		margin: 25px 0px;

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
