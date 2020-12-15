import Vue from 'vue';
import VueRouter from 'vue-router';
import WelcomeScreen from '@/views/WelcomeScreen.vue';
import HarvestScreen from '@/views/HarvestScreen.vue';
import AggregatorScreen from '@/views/AggregatorScreen.vue';
import ManufacturerScreen from '@/views/ManufacturerScreen.vue';
import ConsumerScreen from '@/views/ConsumerScreen.vue';
import AuditorScreen from '@/views/AuditorScreen.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'WelcomeScreen',
		component: WelcomeScreen,
		meta: {
			type: 'web',
			title: 'NAAKPA',
		},
	},
	{
		path: '/Harvest',
		name: 'HarvestScreen',
		component: HarvestScreen,
		meta: {
			type: 'web',
			title: 'NAAKPA',
		},
	},

	{
		path: '/Aggregator',
		name: 'AggregatorScreen',
		component: AggregatorScreen,
		meta: {
			type: 'web',
			title: 'NAAKPA',
		},
	},
	{
		path: '/Manufacturer',
		name: 'ManufacturerScreen',
		component: ManufacturerScreen,
		meta: {
			type: 'web',
			title: 'NAAKPA',
		},
	},
	{
		path: '/Consumer',
		name: 'ConsumerScreen',
		component: ConsumerScreen,
		meta: {
			type: 'web',
			title: 'NAAKPA',
		},
	},
	{
		path: '/Auditor',
		name: 'AuditorScreen',
		component: AuditorScreen,
		meta: {
			type: 'web',
			title: 'NAAKPA',
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
	scrollBehavior(to, from, savedPosition) {
		// return desired position
		if (savedPosition) {
			return savedPosition;
		} else if (to.hash) {
			return {
				selector: to.hash,
			};
		} else {
			return { x: 0, y: 0 };
		}
	},
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	next();
});
export default router;
