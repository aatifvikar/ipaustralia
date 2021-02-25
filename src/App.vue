<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App',
};
</script>

<style lang="scss">
$text: #333333;
$primary-green: #637e3e;

html {
	font-size: 100%;
	font-weight: 300;
	scroll-behavior: smooth;
}

body {
	margin: 0;
	padding: 0;
}

* {
	box-sizing: border-box;
}

#app {
	font-family: 'Open Sans', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin: 0;
	padding: 0;
	color: $text;
}

.vh {
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
	white-space: nowrap;
	opacity: 0;
}

button:hover {
	cursor: pointer;
}

h1 {
	font-size: 3.75rem;
}

h2,
.h2 {
	font-size: 2.65rem;
}

h3,
.h3 {
	font-size: 2rem;
}
h4,
.h4 {
	font-size: 1.5rem;
}

h1,
h2,
h3,
h4,
h5,
h6,
.h2,
.h3,
.h4,
.h5,
.h6 {
	font-weight: 500;
}

.primary-button {
	background: white;
	border: 1px solid $primary-green;
	padding: 0.5rem 0.5rem;
	color: $primary-green;
	border-radius: 4px;
	width: 100%;
	margin-bottom: 1rem;
	text-transform: uppercase;
	display: inline-block;

	@media (max-width: 768px) {
		padding: 0;
	}
	&:hover {
		background: #637e3e;
		color: white;
	}
}

.secondary-button {
	background: $primary-green;
	border: 1px solid $primary-green;
	padding: 0.75rem 0.5rem;
	color: white;
	border-radius: 4px;
	width: 100%;
	margin-bottom: 1rem;
	text-transform: uppercase;
}

.button-container {
	margin-top: 2rem;
}

.title {
	font-size: 18px;
	font-weight: 500;
	color: #040c13;
	margin-top: 2rem;
}

.form-field {
	input,
	textarea,
	.datepicker {
		width: 100%;
		padding: 0.5rem;
		border: none;
		box-shadow: 0 1px 0 0 #76934e;
		background-color: #f4f6f2;
		border-radius: 4px;
	}

	label {
		display: block;
	}
	textarea {
		min-height: 10rem;
	}
}

.data-list {
	dd {
		margin: 1rem 0;
	}
}

.data-table {
	width: 100%;
	border-collapse: collapse;

	thead th {
		text-align: left;
	}
}
</style>
