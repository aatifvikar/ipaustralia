<template lang="html">
	<div class="tab" v-if="isActive">
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: 'Tab',
		},
	},
	data() {
		return {
			isActive: false,
		};
	},
};
</script>

<style lang="scss" scoped>

</style>
