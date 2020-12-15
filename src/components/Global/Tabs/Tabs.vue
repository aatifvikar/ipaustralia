<template>
	<div>
		<ul class="tabs__header">
			<li
				v-for="(tab, index) in tabs"
				:key="tab.title"
				@click="selectTab(index)"
				:class="{ tab__selected: index == selectedIndex }"
			>
				{{ tab.title }}
			</li>
		</ul>
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {},
	data() {
		return {
			selectedIndex: 0, // the index of the selected tab,
			tabs: [], // all of the tabs
		};
	},
	created() {
		this.tabs = this.$children;
	},
	mounted() {
		this.selectTab(0);
	},
	methods: {
		selectTab(i) {
			this.selectedIndex = i;

			// loop over all the tabs
			this.tabs.forEach((tab, index) => {
				tab.isActive = index === i;
			});
		},
	},
};
</script>

<style lang="scss" scoped>
$primary-green: #637e3e;

.tabs__header {
	display: block;
	list-style: none;
	padding: 0;
	.tab {
		display: inline-block;
		color: black;
		padding: 2rem 0;
		background-color: white;
		@media (max-width: 768px) {
			width: 100%;
		}
	}
	> li {
		padding: 15px;
		margin: 0;
		display: inline-block;
		margin-right: 5px;
		cursor: pointer;

		&.tab__selected,
		&:hover {
			font-weight: bold;
			background-color: $primary-green;
			color: white;
		}
	}
}
</style>
