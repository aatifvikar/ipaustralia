/* eslint-disable prettier/prettier */
<template>
	<div id="consumer-screen">
		<Header></Header>
		<main>
			<div v-if="!productId">
				<div class="form-container">
					<a href="#product"></a>
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
						<div class="image-container">
							<img
								:src="
									productDetails.productImageLink
										? productDetails.productImageLink
										: 'https://austsuperfoods.com.au/wp-content/uploads/2020/08/kakadu-plum-30g.png'
								"
								alt="Product"
								class="wide-img wide-img-product"
							/>
						</div>
					</div>
					<div class="item description-container">
						<dl>
							<div class="description-item" v-if="productDetails.productName">
								<h3>
									{{ productDetails.productName }}
								</h3>
								<dt class="title productType">
									{{
										productDetails.productType
											? productDetails.productType
											: '-'
									}}
								</dt>
								<dd>
									{{
										productDetails.productDescription
											? productDetails.productDescription
											: '-'
									}}
								</dd>
								<dd>
									<a
										:href="
											productDetails.productLink
												? productDetails.productLink
												: '#'
										"
										target="_blank"
									>
										View more details...
									</a>
								</dd>
							</div>
							<div class="description-item">
								<dt class="title productType">Verified by</dt>
								<dd>
									<img
										:src="require('@/assets/ip-aus-logo.png')"
										alt="IP Australia"
										class="productImage"
									/>
								</dd>
							</div>
						</dl>
					</div>
				</div>
				<div
					v-if="
						productDetails.indigenousSourced ||
						productDetails.anstoIndicator ||
						productDetails.accessBenefitSharing
					"
					class="certification-section"
				>
					<div v-if="productDetails.indigenousSourced" class="item">
						<img
							class="cert-img"
							:src="require('@/assets/kakadu_1.png')"
							alt="Plum Lotion"
						/>
						<dt class="title">100% Harvest by</dt>
						<dd class="desc">
							The Northern Australia Aboriginal Kakadu Plum Alliance
						</dd>
					</div>
					<div v-if="productDetails.anstoIndicator" class="item">
						<img
							class="cert-img"
							:src="require('@/assets/kakadu_2.png')"
							alt="Plum Lotion"
						/>
						<dt class="title">Tested by ANSTO</dt>
						<dd class="desc">
							The test determines the origin of the plums across the supply
							chain
						</dd>
					</div>
					<div v-if="productDetails.accessBenefitSharing" class="item">
						<img
							class="cert-img"
							:src="require('@/assets/kakadu_3.png')"
							alt="Plum Lotion"
						/>
						<dt class="title">Access benefit sharing</dt>
						<dd class="desc">This is a sample text</dd>
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
					<h4 class="sub-heading">
						<img src="@/assets/harvest_by_aboriginal.svg" class="icon" />
						Harvested by Aboriginal owned enterprises
					</h4>
					<div
						v-for="(item, key) in allHarvests"
						:key="`${key}_${item.identifier}`"
						class="info-item"
					>
						<div class="item info-item-image">
							<h4>{{ item.enterpriseName }}</h4>
							<img
								class="wide-img"
								:src="require(`@/assets/${getImage(item.enterpriseName)}`)"
								:alt="item.enterpriseName"
							/>
						</div>
						<dl class="item text-section">
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/calendar.svg')" class="icon" />
									Harvest start date
								</dt>
								<dd>{{ item.harvestDate }}</dd>
							</div>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/location.svg')" class="icon" />
									Location
								</dt>
								<dd>{{ getLocation(item.enterpriseName) }}</dd>
							</div>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/checked.svg')" class="icon" />
									Certification compliance
								</dt>
								<dd>
									<a
										v-if="item.anstoIndicator"
										:href="item.anstoReportLink"
										target="_blank"
									>
										Tested by ANTSO
									</a>
									<span v-else>Tested by ANTSO</span>
								</dd>
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
					<h3 class="no-margin-bottom manifacture">
						<img src="@/assets/producing_lotion.svg" class="icon" />
						Manufacture Process
					</h3>
					<div class="info-item">
						<dl class="text-section item">
							<h4 class="noMarginTopBottom">Creating Kakadu plum extract</h4>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/calendar.svg')" class="icon" />
									Date of Aggreation
								</dt>
								<dd>{{ getDateOfAggresstion }}</dd>
							</div>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/user.svg')" class="icon" />
									Manufacture by
								</dt>
								<dd>{{ getBusinessName('CREATE_KAKADU') }}</dd>
							</div>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/checked.svg')" class="icon" />
									Certification compliance
								</dt>
								<dd>
									<span v-if="productDetails.anstoReport">
										{{ productDetails.anstoReport }}
									</span>
									<span v-else>Validated by ANTSO</span>
								</dd>
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
							<h4 class="noMarginTopBottom">Manufacturing the final product</h4>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/calendar.svg')" class="icon" />
									Elaborated on
								</dt>
								<dd>{{ getProductUpdateDate }}</dd>
							</div>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/user.svg')" class="icon" />
									Manufacture by
								</dt>
								<dd>{{ getBusinessName('FINAL_PRODUCT') }}</dd>
							</div>
							<div class="element">
								<dt class="title">
									<img :src="require('@/assets/product.svg')" class="icon" />
									Product Details
								</dt>
								<dd>
									<a v-on:click="scrollToTop" class="scroll">
										Click to view details
									</a>
								</dd>
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
						<a href="https://naakpa.com.au/" target="_blank">Naapka.com.au</a>
					</p>
					<a
						class="secondary-button"
						href="https://naakpa.com.au/"
						target="_blank"
					>
						Naakpa.com.au
					</a>
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
		//Returns all the harvests in the batches array
		allHarvests() {
			return this.productDetails.batches.map((b) => b.harvests).flat();
		},

		getDateOfAggresstion() {
			const events = this.productDetails.batches
				.map((event) => event.events)
				.flat();
			let batchUpdateEvent = [];
			if (events.length > 0) {
				batchUpdateEvent = events.filter((type) => {
					if (type.eventType === 'BATCH_UPDATE_EVENT') {
						return type;
					}
				});
				return batchUpdateEvent.length > 0
					? batchUpdateEvent[0].eventPayload.batchUpdateDate
					: '-';
			}
			return null;
		},
		getProductUpdateDate() {
			const events = this.productDetails.events.filter(
				(ev) => ev.eventType === 'PRODUCT_UPDATE_EVENT'
			);
			if (events.length > 0) {
				return events[0].eventPayload.productUpdateDate;
			}

			return '-';
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
			if (this.productId) {
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
			}
		},
		getImage(img) {
			if (!img) return;
			switch (img.toLowerCase()) {
				case 'bawinanga aboriginal corporation':
					return 'bawinanga.png';
				case 'gundjeihmi aboriginal corporation':
					return 'gundjeihmi.jpg';
				case 'thamarrurr plums':
					return 'thamarrurr_plums.jpg';
				case 'lombadina aboriginal corporation':
					return 'kakadu-plum.jpg';
				case 'mercedes cove aboriginal corporation':
					return 'mercedes-cove-beach.jpg';
				case 'mayi harvests (milari aboriginal corporation)':
					return 'mayi-harvests.jpg';
				case 'mamabulanjin aboriginal corporation':
					return 'mamabulanjin.jpg';
				default:
					return 'mayi-harvests.jpg';
			}
		},
		getLocation(loc) {
			if (!loc) return;
			switch (loc.toLowerCase()) {
				case 'bawinanga aboriginal corporation':
					return 'Maningrida';
				case 'gundjeihmi aboriginal corporation':
					return 'Jabiru';
				case 'thamarrurr plums':
					return 'Wadeye';
				case 'lombadina aboriginal corporation':
					return 'Dampier Peninsula';
				case 'mercedes cove aboriginal corporation':
					return 'Dampier Peninsula';
				case 'mayi harvests (milari aboriginal corporation)':
					return 'Broome';
				case 'mamabulanjin aboriginal corporation':
					return 'Broome';
				default:
					return loc;
			}
		},

		getBusinessName(type) {
			const bn = this.productDetails.batches
				.map((bn) => bn.businessName)
				.flat();
			if (bn.length > 0 && type === 'CREATE_KAKADU') {
				return bn[0];
			}
			if (bn.length > 1 && type === 'FINAL_PRODUCT') {
				return bn[1];
			}
			return '-';
		},

		scrollToTop() {
			window.scrollTo(0, 0);
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
				left: -38px;
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
	.wide-img-product {
		height: 28rem;
		@media (max-width: 768px) {
			height: 22rem;
		}
	}
	.main-section,
	.banner-section,
	.info-section,
	.certification-section {
		padding: 4rem 8rem;
		.logo-img {
			width: 90%;
			height: 5rem;
		}
		a {
			text-decoration: none;
			color: inherit;
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
			padding-left: 18rem;
			padding-right: 18rem;
			font-size: 24px;
			font-weight: 400;
			@media screen and (max-width: 1024px) {
				padding-left: 4rem;
				padding-right: 4rem;
			}
			@media screen and (max-width: 768px) {
				padding-left: 1rem;
				padding-right: 1rem;
			}
		}
		.secondary-button {
			background-color: black;
			color: rgb(208, 217, 71);
			text-decoration: none;
			margin-top: 2rem;
			padding-left: 4rem;
			padding-right: 4rem;
			font-size: 20px;
			font-weight: 400;
		}
	}
	.productType {
		color: rgb(208, 217, 71);
	}
	.description-item {
		dd {
			margin: 0;
			a {
				float: right;
			}
			.productImage {
				width: 100%;
				height: 6rem;
			}
		}
	}
	.sub-heading,
	.manifacture {
		position: relative;
		padding-left: 50px;
		.icon {
			position: absolute;
			width: 40px;
			left: 0;
		}
	}
	.no-records {
		color: rgb(24, 24, 24);
		text-align: center;
		font-weight: bold;
		padding: 4rem;
		background: white;
	}
	.no-margin-bottom {
		margin-bottom: 0;
	}
	.noMarginTopBottom {
		margin-top: 16px;
		margin-bottom: 32px;
	}
	.scroll {
		cursor: pointer;
	}
	.certification-section {
		background-color: #000;
		display: flex;
		justify-content: space-around;
		text-align: center;
		.item {
			min-width: 33%;
		}
		.title {
			color: rgb(208, 217, 71);
			margin-top: 0;
		}
		.desc {
			margin: 0;
		}
		.cert-img {
			width: 200px;
		}
		@media screen and (max-width: 768px) {
			flex-direction: column;
			.cert-img {
				width: 50%;
			}
			.item {
				min-width: 100%;
			}
		}
	}
}
</style>
