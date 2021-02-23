/* eslint-disable prettier/prettier */
<template>
	<div id="consumer-screen">
		<Header></Header>
		<main>
			<div v-if="!productId">
				<div class="form-container">
					<div class="form-field">
						<label class="label" for="productNumber">Product Id</label>
						<p class="hint"></p>
						<input
							type="text"
							id="productNumber"
							name="productNumber"
							v-model="productQuery"
						/>
					</div>
				</div>
			</div>
			<div v-else-if="productDetails">
				<div class="main-section">
					<div class="item">
						<h1 v-if="productDetails.productName">
							{{ productDetails.productName }}
						</h1>
						<div class="image-container">
							<img
								:src="require('@/assets/kk-body-lotion.png')"
								alt="Plum Lotion"
								class="wide-img"
							/>
						</div>
					</div>
					<div class="item description-container">
						<dl>
							<div class="description-item">
								<dt class="title">100% harvested by</dt>
								<dd>Nothern Australia Aboriginal Kakadu Plum Alliance</dd>
							</div>
							<div class="description-item">
								<dt class="title">Tested by Antso</dt>
								<dd>
									The test determines the origin of plums across the supply
									chain
								</dd>
							</div>
							<div class="description-item">
								<dt class="title">Access benefit sharing</dt>
								<dd>This is a sample text</dd>
							</div>
							<div class="description-item">
								<dt class="title">Verified by</dt>
								<dd>
									<img
										:src="require('@/assets/ip-aus-logo.png')"
										alt="Plum Lotion"
										class="logo-img"
									/>
								</dd>
							</div>
						</dl>
					</div>
				</div>
				<div class="image-section">
					<img
						class="wide-img"
						:src="require('@/assets/kp_hands.png')"
						alt="Plum Lotion"
					/>
				</div>
				<div class="banner-section">
					<div class="banner-item">
						<div class="item">
							<h3>Supporting the ethical supply chain of Kakadu plum</h3>

							<div class="text-section">
								<p>
									The Nothern Australia Aboroginal Kakadu Plum Alliance allows
									Aboriginal enterprises to provide confidence and stability to
									ethical supply of Kakadu Plum
								</p>
								<p>
									By purchasing Kakadu plum through our alliance you are
									supporting us to build economic opportunities on our country.
									To learn more about NAAKPA
									<a href="https://naakpa.com.au/" target="_blank">
										click here
									</a>
								</p>
							</div>
						</div>
						<div class="item">
							<div>
								<iframe
									width="100%"
									src="https://www.youtube.com/embed/l_vNb6Ho8V8"
								></iframe>
							</div>
						</div>
					</div>
				</div>
				<div class="info-section">
					<h2>Bringing this product to you</h2>
					<h3>Harvested by Aboriginal owned enterprises</h3>
					<div
						v-for="item in allHarvests"
						:key="item.identifier"
						class="info-item"
					>
						<div class="item info-item-image">
							<img
								class="wide-img"
								:src="require('@/assets/kp_hands.png')"
								alt="Plum Lotion"
							/>
						</div>
						<dl class="item text-section">
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/date.svg')" class="icon" />
									Harvest start date
								</dt>
								<dd>{{ item.harvestDate }}</dd>
							</div>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/location.svg')" class="icon" />
									Location
								</dt>
								<dd>{{ item.enterpriseName }}</dd>
							</div>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/checked.svg')" class="icon" />
									Certification compliance
								</dt>
								<dd>Tested by ANTSO</dd>
							</div>
							<div class="element">
								<dt class="title">More details about ANTSO testing</dt>
								<dd>
									The farm has engaged the Australian Centre for Neutron
									scattering laboratories to action a preliminary test that
									enable to determine the origin of plums across the supply
									chain
								</dd>
							</div>
						</dl>
					</div>
					<h3>Manufacture Process</h3>
					<div class="info-item">
						<dl class="text-section item">
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/date.svg')" class="icon" />
									Date of Manufacture
								</dt>
								<dd>11 February 2020</dd>
							</div>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/user.svg')" class="icon" />
									Manufacture by
								</dt>
								<dd>Broome Western Australia</dd>
							</div>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/checked.svg')" class="icon" />
									Certification compliance
								</dt>
								<dd>Validated by ANTSO</dd>
							</div>
							<div class="element">
								<dt class="title">More details about ANTSO testing</dt>
								<dd>
									The farm has engaged the Australian Centre for Neutron
									scattering laboratories to action a preliminary test that
									enable to determine the origin of plums across the supply
									chain
								</dd>
							</div>
						</dl>
						<dl class="text-section item">
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/date.svg')" class="icon" />
									Elaborated on
								</dt>
								<dd>11 February 2020</dd>
							</div>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/user.svg')" class="icon" />
									Manufacture by
								</dt>
								<dd>Broome Western Australia</dd>
							</div>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/checked.svg')" class="icon" />
									Certification compliance
								</dt>
								<dd>Validated by ANTSO</dd>
							</div>
							<div class="element">
								<dt class="title">More details about ANTSO testing</dt>
								<dd>
									The farm has engaged the Australian Centre for Neutron
									scattering laboratories to action a preliminary test that
									enable to determine the origin of plums across the supply
									chain
								</dd>
							</div>
						</dl>
					</div>
				</div>
				<div class="support-section">
					<p class="support-description">
						To learn more about how to support aboriginal farmers in the ethical
						production of kakadu plum visit
						<a href="https.naapka.com.au">Naapka.com.au</a>
					</p>
					<a class="secondary-button">Naakpa.com.au</a>
				</div>
			</div>
			<div v-else>
				<div class="form-container">
					<div class="form-field">
						<label class="label" for="productNumber">Product Id</label>
						<p class="hint"></p>
						<input
							type="text"
							id="productNumber"
							name="productNumber"
							v-model="productQuery"
						/>
					</div>
				</div>
				<div v-if="message" class="no-records">{{ message }}</div>
			</div>
		</main>
	</div>
</template>

<script>
import axios from 'axios';
import store from '@/data/store';

const Header = () => import('@/components/Global/Header.vue');

export default {
	name: 'ConsumerScreen',
	components: {
		Header,
	},
	data() {
		return {
			productDetails: null,
			productQuery: null,
			message: null,
		};
	},
	computed: {
		productId() {
			return this.productQuery || this.$route.query.product;
		},
		allHarvests() {
			return this.productDetails.batches.map((b) => b.harvests).flat(3);
		},
	},

	watch: {
		productId: {
			immediate: true,
			handler: function () {
				(this.message = null), this.getProductDetails();
			},
		},
	},

	methods: {
		async getProductDetails() {
			this.message = 'Searching records......';
			await axios(
				`${process.env.VUE_APP_ENDPOINT}/manufacturers/products/` +
					`${this.productId}`,
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
					this.productDetails = response.data;
				})
				.catch(() => {
					console.log('error');
					this.message = 'No records found try again';
				});
		},
	},

	created() {},
	mounted() {},
};
</script>

<style lang="scss" scoped>
@mixin flexDisplay {
	display: flex;
	align-items: center;
	justify-content: space-between;
	.item {
		max-width: 50%;
	}
}
#consumer-screen {
	main {
		color: #ffff;
	}
	h1,
	h2,
	h3 {
		color: rgb(208, 217, 71);
	}
	h1 {
		margin-top: 0;
	}
	.title {
		color: white;
	}

	.form-container {
		padding: 30px 24px;
		width: 50%;
		margin: auto;

		@media (max-width: 768px) {
			width: 100%;
		}
	}
	.form-field {
		margin: 25px 0;
		.label {
			color: #000;
		}
		input {
			width: 100%;
			padding: 10px;
			border: none;
			box-shadow: 0 1px 0 0 #76934e;
			background-color: #f4f6f2;
			border-radius: 4px;
		}
	}
	.info-item {
		.element {
			position: relative;
			margin-left: 40px;
		}
		.title {
			color: rgb(208, 217, 71);
			.icon {
				position: absolute;
				width: 25px;
				left: -45px;
				top: 5px;
			}
		}

		dd {
			margin: 0;
			max-width: 30rem;
		}
	}

	.wide-img {
		height: 20rem;
		width: 100%;
		object-fit: cover;
	}
	.main-section,
	.banner-section,
	.info-section {
		padding: 4rem 8rem;
		.logo-img {
			width: 90%;
			height: 5rem;
		}
		@media (max-width: 768px) {
			padding: 2rem;
		}
	}
	.main-section {
		background: rgb(24, 24, 24);
		@media (min-width: 768px) {
			@include flexDisplay();
		}
	}
	.image-section {
		background: rgb(24, 24, 24);
	}
	.info-section {
		background: #000;
	}
	.info-item {
		@media (min-width: 768px) {
			@include flexDisplay();
		}
	}
	.banner-section {
		background: rgb(24, 24, 24);
		.banner-item {
			@media (min-width: 768px) {
				@include flexDisplay();
				iframe {
					width: 30rem;
					height: 15rem;
				}
			}
		}
	}
	.support-section {
		text-align: center;
		background-color: rgb(208, 217, 71);
		color: black;
		padding: 3rem;
		.support-description {
			margin-bottom: 2rem;
		}
		.secondary-button {
			background-color: black;
			color: white;
			margin-top: 2rem;
		}
	}
	.description-item {
		dd {
			margin: 0;
			max-width: 30rem;
		}
	}
	.no-records {
		color: rgb(24, 24, 24);
		text-align: center;
		font-weight: bold;
		padding: 4rem;
		background: white;
	}
}
</style>
