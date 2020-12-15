/* eslint-disable prettier/prettier */
<template>
	<div>
		<div id="update-harvest-section">
			<h2 class="title-large">Continue updating your harvest</h2>
			<div>
				<table class="data-table">
					<caption class="vh">Harvest records</caption>
					<thead class="harvest-heading">
						<tr>
							<th class="item" scope="col">Harvest ID</th>
							<th class="item" scope="col" colspan="2">Created on</th>
						</tr>
					</thead>
					<tbody class="harvest-table">
						<tr
							class="harvest-table-row"
							v-for="item in tableData"
							:key="item.message"
						>
							<td class="item">
								{{ item.identifier }}
							</td>
							<td class="item">
								{{ item.harvestDate }}
							</td>
							<td class="item">
								<button
									class="primary-button"
									v-on:click="showUpdateForm(item)"
								>
									Add New Record
								</button>
							</td>
						</tr>
					</tbody>
				</table>
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
	name: 'UpdateHarvestSection',
	components: {},
	data() {
		return {
			tableData: store.harvestData,
		};
	},
	methods: {
		showUpdateForm(harvestObj) {
			axios(
				`${process.env.VUE_APP_ENDPOINT}/farmers/harvests/` +
					`${harvestObj.identifier}`,
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
					if (store.harvestDetails) {
						this.$parent.showUpdateForm = true;
						this.$parent.showCreateSection = false;
						this.$parent.showUpdateSection = false;
						this.$parent.isNewHarvest = false;
					}
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
#update-harvest-section {
	padding: 0 40px;

	@media (max-width: 768px) {
		padding: 0 20px;
	}

	.data-table {
		thead th {
			&:first-child {
				~ td {
					width: 67%;
				}
			}
		}

		tbody td {
			&:first-child {
				~ td {
					width: 33.33%;
				}
			}
		}

		.item {
			width: 33%;
			padding: 5px;
		}

		.title-large {
			font-size: 32px;
		}
	}
}
</style>
