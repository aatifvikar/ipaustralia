/* eslint-disable prettier/prettier */
<template>
	<div>
		<Header></Header>
		<main>
			<div id="welcome-screen">
				<h2>Please select your role</h2>
				<div class="nav-routes">
					<div class="nav-item">
						<router-link to="/Harvest" tag="button" class="primary-button">
							Harvester
						</router-link>
					</div>
					<div class="nav-item">
						<router-link to="/Aggregator" tag="button" class="primary-button">
							Aggregator
						</router-link>
					</div>
					<div class="nav-item">
						<router-link to="/Manufacturer" tag="button" class="primary-button">
							Manufacturer
						</router-link>
					</div>
					<div class="nav-item">
						<router-link to="/Consumer" tag="button" class="primary-button">
							Consumer
						</router-link>
					</div>
					<div class="nav-item">
						<router-link to="/Auditor" tag="button" class="primary-button">
							Auditor
						</router-link>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
const Header = () => import('@/components/Global/Header.vue');

export default {
	name: 'WelcomeScreen',
	components: {
		Header,
	},
	data() {
		return {};
	},
	methods: {},

	created() {},
	mounted() {},
};
</script>

<style lang="scss" scoped>
#welcome-screen {
	padding: 2rem;
	.nav-routes {
		display: flex;
		flex-wrap: wrap;
		.nav-item {
			flex: 0 31%;
			margin: 10px;
			width: 33%;
			@media (max-width: 768px) {
				flex: 0 100%;
				margin: 0;
				width: 100%;
			}
		}
	}
	.primary-button {
		padding: 5rem;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		border: none;
		border-top: 5px solid #637e3e;
	}
}
</style>
