/* eslint-disable prettier/prettier */
<template>
	<div>
		<div id="product-details-form">
			<h1>Product No. {{ productNumber }}</h1>
			<div class="harvest-update-container">
				<div class="form-section item">
					<form @submit.prevent="onSubmit">
						<h2>About the product</h2>
						<div>
							<div class="form-field">
								<label class="title" for="productName">Product Name</label>
								<p class="hint">E.g Powder</p>
								<input
									type="text"
									id="productName"
									name="productName"
									v-model="productName"
								/>
							</div>
							<div class="form-field">
								<label class="title" for="productType">Product Type</label>
								<p class="hint">E.g Powder</p>
								<input
									type="text"
									id="productType"
									name="productType"
									v-model="productType"
								/>
							</div>
							<div class="form-field">
								<label class="title" for="mfgDate">Date of Manufacture</label>
								<p class="hint">E.g 22/07/2020</p>
								<input
									type="date"
									id="mfgDate"
									name="mfgDate"
									v-model="mfgDate"
									class="datepicker"
								/>
							</div>
							<div class="form-field">
								<label class="title" for="productDescription">
									Product Description
								</label>
								<p class="hint"></p>
								<textarea
									id="productDescription"
									name="productDescription"
									v-model="productDescription"
								/>
							</div>
							<div class="button-container">
								<button class="primary-button">Upload Product Image</button>
							</div>
							<div class="form-field">
								<label class="title" for="productLink">Product Link</label>
								<p class="hint"></p>
								<input
									type="text"
									id="productLink"
									name="productLink"
									v-model="productLink"
								/>
							</div>
							<div class="form-field">
								<label class="title" for="noOfUnits">
									Number of units Produced
								</label>
								<p class="hint"></p>
								<input
									type="text"
									id="noOfUnits"
									name="noOfUnits"
									v-model="noOfUnits"
								/>
							</div>
							<hr />
							<div v-for="item in selectedBatchNumbers" :key="item.identifier">
								<h3>Batch number {{ item.identifier }}</h3>
								<div class="form-field">
									<label class="title" for="amountUsed">
										Amount used in this production
									</label>
									<p class="hint">E.g 123kg</p>
									<input
										type="text"
										id="amountUsed"
										name="amountUsed"
										v-model="item.weightUsed"
									/>
								</div>
							</div>
							<div class="button-container">
								<button class="secondary-button">Save Product</button>
							</div>
						</div>
					</form>
				</div>
				<div class="item">
					<h2>About the Harvest used</h2>
					<dl class="data-list">
						<div v-for="item in selectedBatchNumbers" :key="item.identifier">
							<dt class="h4">{{ item.businessName }}</dt>
							<dd>
								<table class="data-table">
									<thead>
										<tr class="harvest-heading">
											<th class="harvest-item">Harvest ID</th>
											<th class="harvest-item">Harvested Date</th>
										</tr>
									</thead>
									<tbody class="harvest-table">
										<tr
											v-for="harvest in item.harvestIdentifiers"
											:key="harvest.identifier"
											class="harvest-table-row"
										>
											<td class="harvest-item">{{ harvest.identifier }}</td>
											<td class="harvest-item">10/07/2020</td>
											{{/*Replace this with actual once api is updated*/}}
										</tr>
									</tbody>
								</table>
							</dd>
						</div>
						<div></div>
						{{/* TBD Where is this data fetched from */}}
					</dl>
					<h2>Aggregation Process</h2>
					<dl class="data-list">
						<div>
							<dt class="h4">Lucas Meyer Cosmetics</dt>
							<dd>
								<table class="data-table">
									<thead>
										<tr class="harvest-heading">
											<th class="harvest-item">Batch Number</th>
											<th class="harvest-item">Elaboration Date</th>
										</tr>
									</thead>
									<tbody class="harvest-table">
										<tr class="harvest-table-row">
											<td class="harvest-item">10076787</td>
											<td class="harvest-item">10/07/2020</td>
										</tr>
									</tbody>
								</table>
							</dd>
						</div>
					</dl>
					<h2>Your Details</h2>
					<p>This information will be displayed to the public</p>
					<dl class="data-list">
						<div>
							<dt class="title">Business Name</dt>
							<dd>Mercedes Cove Aboriginal Corporation</dd>
						</div>
						<div>
							<dt class="title">Address</dt>
							<dd>
								Dampier Peninsula/Ardi Country PO Box 3518
								<br />
								Broome WA 6725
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
	name: 'ProductDetailsSection',
	components: {},
	props: {
		selectedBatchNumbers: Array,
	},
	data() {
		return {
			productName: '',
			productNumber: store.productNumber,
			productType: '',
			productLink: '',
			noOfUnits: '',
			mfgDate: '',
			batchWeight: 0.0,
			productDescription: '',
			showNonAboriginalSection: false,
			updateObject: [],
		};
	},
	methods: {
		createUpdateObject() {
			this.selectedBatchNumbers.forEach((elem) => {
				this.updateObject.push({
					identifier: elem.identifier,
					weightUsed: parseFloat(elem.weightUsed),
				});
			});
		},
		onSubmit() {
			this.createUpdateObject();
			store.productNumber = this.productNumber;
			store.noOfUnitsProduced = this.noOfUnits;
			axios(
				`${process.env.VUE_APP_ENDPOINT}/manufacturers/products/` +
					`${this.productNumber}`,
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
						productName: this.productName,
						productLink: this.productLink,
						productDescription: this.productDescription,
						productType: this.productType,
						additionalUnitsProduced: parseInt(this.noOfUnits),
						batches: this.updateObject,
					},
				}
			)
				.then((response) => {
					this.$parent.showConfirmation = true;
					this.$parent.showProductDetails = false;
				})
				.catch(() => {
					console.log('error');
				});
		},
		addNonAbgHarvest() {
			this.showNonAboriginalSection = true;
		},
	},

	created() {},
	mounted() {},
};
</script>

<style lang="scss" scoped>
#product-details-form {
	padding: 20px 50px;
	@media (max-width: 768px) {
		padding: 20px 20px;
	}
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
