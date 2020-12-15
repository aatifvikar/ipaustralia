<template>
	<main>
		<div id="confirmation-screen">
			<div class="confirmation-container">
				<h1>{{ heading }}</h1>
				<h2>{{ subHeading }}</h2>
				<div v-if="isProductConfirmation" class="details-table">
					<div class="details-table-row">
						<div class="title">Product Number</div>
						<div>{{ productNumber }}</div>
					</div>
					<div class="details-table-row">
						<div class="title">Date of Maufacture</div>
						<div>03/05/2020{{/*Where is this value fetched from*/}}</div>
					</div>
					<div class="details-table-row">
						<div class="title">Number of units produced</div>
						<div>{{ noOfUnitsProduced }}</div>
					</div>
				</div>
				<div v-if="isHarvestConfirmation" class="details-table">
					<div class="details-table-row">
						<div class="title">Harvest ID</div>
						<div>{{ harvestIdentifier }}</div>
					</div>
				</div>
				<div v-if="isBatchConfirmation" class="details-table">
					<div class="details-table-row">
						<div class="title">Batch Number</div>
						<div>{{ batchIdentifier }}</div>
					</div>
				</div>
				<h2>Accreditation details</h2>
				<div class="btn-container">
					<div v-if="isProductConfirmation">
						<button class="primary-button">Preview Product Website</button>
					</div>
					<div>
						<button class="secondary-button" v-on:click="backToScreen">
							{{ btnLabel }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import store from '@/data/store';

export default {
	name: 'Header',
	props: {
		heading: String,
		subHeading: String,
		isProductConfirmation: String, //Maufacturer
		isHarvestConfirmation: String, //Harvester
		isBatchConfirmation: String, //Aggregator
		btnLabel: String,
	},
	components: {},
	data() {
		return {
			harvestIdentifier: store.harvestId,
			batchIdentifier: store.batchNumber,
			productNumber: store.productNumber,
			noOfUnitsProduced: store.noOfUnitsProduced,
		};
	},
	methods: {
		backToScreen() {
			if (this.isBatchConfirmation) {
				this.$parent.isBatchConfirmation = false;
				this.$parent.showBatchCreationSection = true;
				this.$parent.showBatchForm = false;
			} else if (this.isHarvestConfirmation) {
				this.$parent.showUpdateForm = false;
				this.$parent.showConfirmation = false;
			} else if (this.isProductConfirmation) {
				this.$parent.showProductDetails = false;
				this.$parent.showConfirmation = false;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
#confirmation-screen {
	text-align: center;
	.confirmation-container {
		@media (min-width: 768px) {
			padding: 4rem;
			width: 60%;
			margin: 4rem auto;
			box-shadow: 8px 8px 8px 8px #888888;
		}
		.details-table,
		.btn-container {
			width: 60%;
			margin: auto;
			.details-table-row {
				display: flex;
				border-bottom: 1px solid #dad2d2;
				justify-content: space-around;
				align-items: baseline;
				padding-bottom: 1rem;
			}
		}
	}
}
</style>
