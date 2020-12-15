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
		justify-content: space-around;

		.nav-item {
			margin: 0.5rem;
			width: 33%;
			@media (max-width: 768px) {
				width: 100%;
			}
		}
		@media (max-width: 768px) {
			flex-direction: column;
			align-items: center;
		}
	}
	.primary-button {
		padding: 1rem;
	}
}
</style>
