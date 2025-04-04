<template>
	<div class="visualArea"></div>

	<div class="container sub-layout">
		<div class="frame">
			<SidebarMenu v-if="isMyPage" />

			<!-- 콘텐츠 영역 -->
			<main class="sub-contents main">
				<div class="sub-title" v-if="isSubMenu">
					<div class="flex items-center grow justify-between md:justify-normal">
						<h3>
							{{ pageTitleData }}
						</h3>
						<div class="info_items">
							<div class="help_info">
								<q-btn icon="help">
									<em class="sr-only">도움말</em>
								</q-btn>
								<q-tooltip max-width="16rem" class="text-sm">{{ pageExplnData }}</q-tooltip>
							</div>
							<q-btn v-show="loading" @click="toggleBkmk()" :class="bkmk ? 'active' : ''" :icon="bkmk ? 'bookmark_added' : 'bookmark'">
								<q-tooltip max-width="16rem" class="text-sm">{{ bkmk ? '즐겨찾기 삭제' : '즐겨찾기 추가' }}</q-tooltip>
							</q-btn>
						</div>
					</div>
					<Breadcrumb />
				</div>

				<q-card v-if="useTabLayout" class="tab-list">
					<q-tabs dense align="left">
						<q-route-tab v-for="menu in siblingMenus" :to="{ path: menu.menuPath }" :label="menu.menuNm" :key="menu.menuIdno" />
					</q-tabs>
					<q-page-container>
						<router-view />
					</q-page-container>
				</q-card>

				<div v-else class="main-content">
					<router-view></router-view>
				</div>
			</main>
			<!--// 콘텐츠 영역 -->
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Base } from 'quasar-app-extension-semasbp-cmmn/models';
	import { api, useAuthStore } from 'quasar-app-extension-semasbp-cmmn/plugins';
	import { useMenus } from 'src/composables/menu';
	import { ref, onMounted, onBeforeMount } from 'vue';
	import SidebarMenu from 'layouts/SidebarMenu.vue';
	import Breadcrumb from 'layouts/Breadcrumb.vue';
	import { storeToRefs } from 'pinia';
	import _ from 'lodash';

	interface Breadcrumbs {
		menuIdno: string;
		text: string;
		link: string;
	}
	interface bkmk extends Base {
		bkmkMenuIdno?: string;
		userIdno?: string;
		menuIdno?: string;
		bkmkUrlAddr?: string;
		crtDt?: string;
	}

	const formData = ref<bkmk>({});
	const bkmk = ref<bkmk | null>(null);
	const { auth } = storeToRefs(useAuthStore());
	const { currentMenu, rootMenu, breadcrumbs, menuTree } = useMenus();
	const idno = auth.value.userIdno;
	const loading = ref(false);
	const useTabLayout = ref(false);

	/* 스크랩 */
	const toggleBkmk = () => {
		/* 로그인 확인 */
		if (idno) {
			if (bkmk.value) {
				api.get('/priv/api/bkmk/deleteBkmk/' + bkmk.value).then(() => {
					bkmk.value = null;
				});
			} else {
				if (currentMenu.value.menuIdno != null) {
					formData.value = {
						userIdno: idno,
						menuIdno: currentMenu.value.menuIdno,
						bkmkUrlAddr: currentMenu.value.menuPath,
					};
					api.post('/priv/api/bkmk', formData.value).then((res) => {
						bkmk.value = res.data;
					});
				}
			}
		}
	};
	const pageTitleData = ref();
	const pageExplnData = ref();
	const isSubMenu = ref(_.isEmpty(currentMenu.value) ? false : true);
	const isMyPage = ref(false);
	const siblingMenus = ref();

	const initSubLayout = () => {
		/* 즐겨찾기 했는지 목록조회*/
		/* return 즐겨찾는메뉴식별번호 || null */
		if (idno && currentMenu.value.menuPath) {
			api.get('/priv/api/bkmk/getBkmk', { userIdno: idno, bkmkUrlAddr: currentMenu.value.menuPath }).then((res) => {
				bkmk.value = res?.data;
				loading.value = true;
			});
		}
	};

	const findSiblingNodes = (breadcrumbs: Breadcrumbs[]) => {
		let parentMenu = menuTree.value.find((menu) => menu.menuIdno == breadcrumbs[0].menuIdno);
		parentMenu = parentMenu?.childMenus.find((menu) => menu.menuIdno == breadcrumbs[1].menuIdno);
		parentMenu = parentMenu?.childMenus.find((menu) => menu.menuIdno == breadcrumbs[2].menuIdno);
		siblingMenus.value = parentMenu?.childMenus;
	};

	onBeforeMount(() => {
		rootMenu();
		if (breadcrumbs.value[0]?.link === '/mypage') {
			isMyPage.value = true;
			return;
		}
		if (breadcrumbs.value.length == 4) {
			breadcrumbs.value.pop();
			currentMenu.value.menuNm = breadcrumbs.value[2].text;
			findSiblingNodes(breadcrumbs.value);
			useTabLayout.value = true;
		}
	});

	onMounted(() => {
		if (isSubMenu.value) {
			pageTitleData.value = currentMenu.value.menuNm;
			pageExplnData.value = currentMenu.value.menuExpln;
			initSubLayout();
		}
	});
</script>

<style scoped>
	/* 필요시 추가할 수 있는 스타일 */
</style>
