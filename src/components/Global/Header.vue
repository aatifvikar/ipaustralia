<template>
	<header>
		<div id="header-row">
			<a href="https://naakpa.com.au/">
				<span class="vh">
					Northern Australia Aboriginal Kakadu Plum Alliance
				</span>
				<div id="header-logo">
					<img :src="require('@/assets/header-logo.png')" alt="NAAKPA logo" />
				</div>
			</a>
		</div>
	</header>
</template>

<script>
export default {
	name: 'Header',
	components: {},
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
$primary: #005e91;

header {
	background: black;
}

#header-logo {
	padding: 1rem;
	text-align: center;

	img {
		width: 10rem;
		height: 3rem;
	}
}
</style>
