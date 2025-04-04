<template>
	<q-layout class="mx-auto layout-wrap">
		<!-- 해더 영역 -->
		<header class="header-area" :class="{ 'active': isMobileMenuOpen, '': !isMobileMenuOpen }">
			<div id="skipNav">
				<a href="javascript:void(0);" tabindex="1" @click="toHeaderMenu">주메뉴 바로가기</a>
				<a href="javascript:void(0);" tabindex="1" @click="toMainBody">본문으로 바로가기</a>
			</div>
			<div class="container px-4 mx-auto sm:px-6 lg:px-8">
				<nav class="navigation" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
					<a href="/"><img class="logo" src="~/assets/img/logo.svg" alt="소상공인365" /></a>
					<div class="menu-area">
						<ul class="marginauto">
							<li
								v-for="(root, index) in treeItems"
								:key="root.menuIdno"
								class="has-sub"
								:class="{ 'active': index === selectedMenuIndex }"
								@keyup.tab.exact="root.childMenus.length > 0 ? (selectedMenuIndex = index) : (selectedMenuIndex = -1)"
								@blur.capture="blurUpmstMenu($event)">
								<!-- @mouseover과 @focus 이벤트 추가 -->
								<a
									href="javascript:void(0);"
									class="depth1"
									@mouseover="toggleUpmstMenu(root, index)"
									@click.prevent="toggleUpmstMenu(root, index, 'click')">
									{{ root.menuNm }}
								</a>
								<!-- 메뉴를 선택했거나 마우스가 navigation 안에 있을 때만 보여줌 -->
								<div class="sub" v-show="index === selectedMenuIndex && (isMenuOpen || isMenuClicked)">
									<div class="container px-4 mx-auto sm:px-6 lg:px-8">
										<div class="grid grid-cols-12">
											<div class="col-span-12 2xl:block hide 2xl:col-span-3 summury">
												<p v-for="expln in root?.menuExpln?.split('<br />')" :key="expln">
													{{ expln }}
												</p>
											</div>
											<div class="col-span-12 2xl:col-span-9 frame">
												<div class="grid grid-cols-12 gap-x-5">
													<div v-for="depth1 in root.childMenus" :key="depth1.menuIdno" class="col-span-3">
														<a
															href="javascript:void(0);"
															class="depth2"
															:class="{ 'blank': depth1.menuTpcd.value === 'LNK' && depth1.npagYn === 'Y' }"
															@click.prevent="loopNavigator(depth1)">
															<span>{{ depth1.menuNm }}</span>
														</a>
														<ul v-if="depth1.childMenus.length > 0">
															<li v-for="depth2 in depth1.childMenus" :key="depth2.menuIdno">
																<a href="javascript:void(0);" class="depth3" @click.prevent="loopNavigator(depth2)">
																	<span>{{ depth2.menuNm }}</span>
																</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<!-- etc -->
					<div class="top-etc">
						<div class="flex items-center ml-4 md:ml-6">
							<!-- <router-link :to="news" class="mr-2 font-semibold hide xl:block">도움말</router-link> -->

							<router-link to="/mypage" class="button hide xl:block" v-if="auth.rolIdno && auth.rolIdno !== RolId.ROLE_ANONYMOUS"
								><font-awesome-icon :icon="UserGear" /><span
									><span class="font-bold" v-if="auth.userNm">({{ auth.userNm }}님)</span> 마이페이지</span
								></router-link
							>
							<a href="javascript:void(0);" @click="joinSSO" class="button hide xl:block" v-else
								><font-awesome-icon :icon="UserPen" /><span>회원가입</span></a
							>

							<router-link
								to=""
								class="button hide xl:block"
								@click.prevent="logoutHandler"
								v-if="auth.rolIdno && auth.rolIdno !== RolId.ROLE_ANONYMOUS">
								<font-awesome-icon :icon="DoorOpen" class="log" /> <span>로그아웃</span>
							</router-link>

							<a href="javascript:void(0);" @click="loginSSO" class="button hide xl:block" v-else>
								<font-awesome-icon :icon="DoorClosed" class="log" /><span>로그인</span></a
							>

							<!-- <router-link to="/srch" class="button"> <MagnifyingGlassIcon /><span class="sr-only">통합검색</span></router-link> -->
							<router-link to="/sitemap" class="button hide xl:inline-block"><Bars3Icon /><span class="sr-only">사이트맵</span></router-link>
							<button type="button" class="mobilebtn" aria-expanded="false" @click.prevent="mtoggleUpmstMenu">
								<span class="sr-only">모바일 메뉴 열기</span>
								<Bars3Icon :class="{ 'hide': isMobileMenuOpen }" />
								<XCircleIcon :class="{ 'hide': !isMobileMenuOpen }" />
							</button>
						</div>
					</div>
					<!-- //etc -->
				</nav>
			</div>

			<div class="mobile-navi">
				<div class="mobile-body">
					<div class="mobile-header">
						<router-link to="" @click.prevent="logoutHandler" v-if="auth.rolIdno && auth.rolIdno !== RolId.ROLE_ANONYMOUS"> 로그아웃 </router-link>
						<a href="javascript:void(0);" @click="loginSSO" v-else>로그인</a>

						<router-link to="/mypage" class="button" v-if="auth.rolIdno && auth.rolIdno !== RolId.ROLE_ANONYMOUS">마이페이지</router-link>
						<a href="javascript:void(0);" @click="joinSSO" v-else>회원가입</a>

						<a href="javascript:void(0);" class="mtoggle" aria-expanded="false" @click.prevent="mtoggleUpmstMenu">
							<span class="sr-only">모바일 메뉴 열기</span>
							<Bars3Icon :class="{ 'hide': isMobileMenuOpen }" />
							<XCircleIcon :class="{ 'hide': !isMobileMenuOpen }" />
						</a>
					</div>

					<q-tree
						ref="sideMenu"
						:nodes="mobileMenu"
						node-key="menuIdno"
						children-key="childMenus"
						selected-color="primary"
						no-connectors
						v-model:expanded="expandedMenu"
						class="sub-navi"
						role="group"
						icon="none">
						<template #default-header="props">
							<q-item
								v-if="props.node.menuTpcd.value === 'LNK'"
								v-ripple
								clickable
								@click="MobileLinkMenu(props.node)"
								:active="currentMenu.menuIdno === props.node.menuIdno || props.expanded"
								active-class="active">
								{{ props.node.menuNm }}<ArrowTopRightOnSquareIcon />
							</q-item>

							<q-item
								v-else
								v-ripple
								clickable
								@click.prevent="MobileNavigateToSub(props.node)"
								:active="currentMenu.menuIdno === props.node.menuIdno || props.expanded"
								active-class="active">
								{{ props.node.menuNm }}<ChevronRightIcon />
							</q-item>
						</template>
					</q-tree>
				</div>
			</div>
		</header>

		<!-- //해더 영역 -->

		<!-- 콘텐츠 영역 -->
		<q-page-container>
			<router-view> </router-view>
		</q-page-container>
		<!-- //콘텐츠 영역 -->

		<!-- 푸터 영역 -->
		<footer>
			<div class="container pb-1 lg:pb-2">
				<div class="pt-3 pb-0.5 frame lg:pt-4 lg:pb-1">
					<div class="grow">
						<ul class="info-link">
							<li><router-link to="/conts/145928287725764608">개인정보처리방침</router-link></li>
							<li><router-link to="/conts/148053488668196864">저작권정책</router-link></li>
							<li><router-link to="/conts/148087511491522560">이메일무단수집거부</router-link></li>
							<li><router-link to="/conts/148054385695604736">책임의한계와 법적고지</router-link></li>
						</ul>
					</div>
					<div class="grow-0">
						<!-- 관련사이트 -->
						<div class="familySite-wrap">
							<div class="wrap">
								<button type="button" class="menu-button" @click="toggleMenu">관련사이트</button>
								<div class="menu-list" style="display: none">
									<a v-for="(site, index) in sites" :key="index" :href="site.url" title="새창열림" target="_blank" class="menu-item">{{
										site.name
									}}</a>
								</div>
							</div>
						</div>
						<!-- //관련사이트 -->
					</div>
				</div>
				<div class="frame text-text-6">
					<div class="grow">
						<p>(우편번호: 34077) 대전 유성구 지족로 364번길 92, <br class="lg:hide" />2층 소상공인시장진흥공단</p>
						<p>사업자등록번호: 305-82-21570, 대표전화: 국번없이 1357, <br class="sm:hide" />시스템 오류문의: 1644-5302</p>
					</div>
					<div class="pt-0.5 mt-3 grow-0">
						<p>Copyright 2023 SEMAS, All Right Reserved.</p>
					</div>
				</div>
			</div>
		</footer>
		<!-- //푸터 영역 -->

		<!-- <div class="member-testbar" v-if="isDev"> -->
		<div v-if="envProf != 'prod'" class="member-testbar">
			<!-- TODO: 네트워크 작업 종료 후 isDev로 가리도록 변경하기 -->
			<strong>임시 로그인</strong>
			<s-select :options="options" v-model="selected" @update:model-value="selectAuth" :key="selected" :clearable="false" />
		</div>
	</q-layout>
</template>

<script setup lang="ts">
	import { onMounted, ref, computed } from 'vue';
	import { useRouter, useRoute } from 'vue-router';
	import _ from 'lodash';
	import { RolId } from 'quasar-app-extension-semasbp-cmmn/models';

	import { Bars3Icon, XCircleIcon, ChevronRightIcon, ArrowTopRightOnSquareIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
	import { useAuthStore, notify } from 'quasar-app-extension-semasbp-cmmn/plugins';
	import { storeToRefs } from 'pinia';

	import { useMenus } from 'src/composables/menu';
	import { useMenuStore } from 'src/stores/menu';
	import { Menu } from 'src/components/models';

	/* FontAwesomeIcon */
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { faDoorClosed, faUserPen, faUserGear, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

	const DoorClosed = ref(faDoorClosed);
	const UserPen = ref(faUserPen);
	const UserGear = ref(faUserGear);
	const DoorOpen = ref(faDoorOpen);
	/* FontAwesomeIcon */

	const envProf = process.env.PROFILE;

	const { menuTree, currentMenu, rootMenu } = useMenus();
	const currentRootMenu = ref<Menu>();
	const sideMenu = ref();
	const expandedMenu = ref<Array<string>>([]);

	const joinUrl = process.env.JOIN_URL as string;
	const loginUrl = process.env.LOGIN_PAGE as string;

	//로그인SSO
	const loginSSO = () => {
		window.location.href = loginUrl + '?fromUrl=' + router.currentRoute.value.fullPath;
	};

	//회원가입SSO
	const joinSSO = () => {
		window.location.href = joinUrl;
	};

	// 상단 메뉴 --------------------------------
	const isMenuClicked = ref(false);
	const treeItems = ref<Array<Menu>>([]);
	const mobileMenu = computed(() => {
		let mobileMenus = _.cloneDeep(treeItems.value);
		/* mobileMenus.push(menuTree.value.find((menu) => menu.menuIdno === '130269075885060096') as Menu); */
		if (!auth.value.userNm) return mobileMenus;

		const myPage = menuTree.value.find((menu) => menu.menuPath === '/mypage');
		if (myPage) {
			mobileMenus.push(myPage);
		}
		return mobileMenus;
	});

	const menuStore = useMenuStore();
	const selectedMenuIndex = ref();
	/* const news = computed(() => {
		return _.sortBy(
			menuItems.value.filter((menu) => {
				return menu.upMenuIdno === '130269075885060096';
			}),
			['indctOrd'],
		)[0].menuPath;
	}); */

	onMounted(() => {
		treeItems.value = menuStore.menuTree.filter((menu) => {
			return menu.upmstMenuYn === 'Y';
		});
	});

	// 탭으로 이동하다가 메뉴 밖으로 빠져나올 때 펼쳐진 메뉴를 닫는 함수
	const blurUpmstMenu = (event: FocusEvent) => {
		// .layout-wrap 요소를 참조
		const layoutWrap = document.querySelector('.layout-wrap');

		// event.relatedTarget가 다음으로 포커스된 요소를 가리킴
		if (event.relatedTarget instanceof Element) {
			// 다음으로 포커스된 요소가 'depth' 클래스를 포함하지 않는 경우
			if (!event.relatedTarget.classList.value.includes('depth')) {
				// 선택된 메뉴를 닫음
				selectedMenuIndex.value = -1;

				// .layout-wrap에서 .open 클래스를 제거
				layoutWrap?.classList.remove('open');

				// 메뉴가 닫히므로 isMenuOpen을 false로 설정
				isMenuOpen.value = false;
			}
		}
	};

	// 상단메뉴 토글 함수
	const toggleUpmstMenu = (root: Menu, index: number, event = 'over') => {
		if (isMenuClicked.value && event == 'over') return;

		const layoutWrap = document.querySelector('.layout-wrap');
		if (root.childMenus.length > 0) {
			const isClickEvent = event === 'click';

			if (selectedMenuIndex.value === index && isClickEvent) {
				if (isMenuClicked.value) {
					index = -1;
					layoutWrap?.classList.remove('open');
					isMenuOpen.value = false;
				}
				isMenuClicked.value = !isMenuClicked.value;
			} else {
				if (isClickEvent) isMenuClicked.value = true;
				layoutWrap?.classList.add('open');
				isMenuOpen.value = true;
			}
			selectedMenuIndex.value = index;

			return;
		}
		if (root.menuTpcd.value === 'LNK') {
			linkMenu(root);
		} else {
			navigateToSub(root);
		}
	};

	// 마우스가 navigation 영역에 들어왔을 때
	const handleMouseEnter = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		const navigation = document.querySelector('.marginauto') as HTMLElement;

		if (navigation && (navigation.contains(target) || target === navigation)) {
			isMenuOpen.value = true;
		}
	};

	// 마우스가 navigation 영역을 벗어났을 때
	const handleMouseLeave = () => {
		if (isMenuClicked.value) {
			return;
		}
		isMenuOpen.value = false;
		const layoutWrap = document.querySelector('.layout-wrap');
		layoutWrap?.classList.remove('open');
		selectedMenuIndex.value = -1; // 메뉴를 닫음
	};

	const endNavigator = ref(false);
	const loopNavigator = (root: Menu) => {
		endNavigator.value = false;

		if (root.menuTpcd.value === 'LNK') {
			endNavigator.value = true;
			linkMenu(root);
		} else if (root.menuPath) {
			endNavigator.value = true;
			navigateToSub(root);
		} else {
			root.childMenus.forEach((menu) => {
				if (endNavigator.value) return;
				loopNavigator(menu);
			});
		}
	};

	// 사이트 내 메뉴 이동(router push)
	const navigateToSub = (node: Menu) => {
		if (_.isEmpty(node.menuPath) || node.menuPath === '') return;
		if (node.npagYn === 'Y') {
			window.open('/#' + node.menuPath, '_blank');
		} else {
			if (currentMenu.value.menuPath === node.menuPath) {
				toggleUpmstMenu(node.parentMenu as Menu, selectedMenuIndex.value);
			}
			router.push(node.menuPath);
		}
	};

	const route = useRoute();
	// 외부로 이동(링크)
	const linkMenu = async (menu: Menu) => {
		let path = menu.linkMenuPath;
		const isUsable = await menuStore.isUsable(path);

		if (!isUsable.usable) {
			notify.confirm(isUsable.title, isUsable.message, () => {
				if (isUsable.target === 'login') window.location.href = process.env.LOGIN_PAGE + '?fromUrl=' + route.fullPath;
				else router.push('/mybplcinfo');
			});
			return;
		}

		if (menu.linkMenuPath.indexOf('https://') < 0) {
			path = 'https://' + path;
		}
		if (menu.npagYn === 'Y') {
			window.open(path, '_blank');
		} else {
			location.href = path;
		}
	};
	// 상단메뉴 끝 --------------------------------

	const { login, logout } = useAuthStore();
	const { auth } = storeToRefs(useAuthStore());
	const router = useRouter();
	const selected = ref();

	// 로그인 --------------------------------
	const options = [
		{ label: '비회원', value: '' },
		{ label: '일반회원', value: 'test' },
		{ label: '소상공인1', value: 'testId' },
		{ label: '소상공인2', value: 'mrmedi' },
		{ label: '임시', value: 'sggTestId' },
		{ label: '피타', value: 'sggTestId2' },
		{ label: 'semas1', value: 'semas1' },
		{ label: '폐업자', value: 'greeeen11' },
		{ label: '방문', value: 'semas03' },
	];

	onMounted(async () => {
		if (localStorage.getItem(process.env.TOKEN_NAME)) {
			selected.value = auth.value.userId ?? '';
		} else {
			selected.value = '';
		}
	});

	const selectAuth = async () => {
		const userId = selected.value;
		if (localStorage.getItem(process.env.TOKEN_NAME)) {
			// 기존 로그인이 있는 경우
			await logout();
			// 개발서버인 경우 => 로그아웃만 시키면 됨.
			if (process.env.PROD) return;
		}
		// 선택한 값이 비로그인인 경우 => 로그인 수행 안함.
		/* userId && (await login({ userId: userId, password: userId == 'mrmedi' ? '1' : userId == 'greeeen11' ? 'semas2024!' : '123' })); */
		userId && (await login({ userId: userId, password: userId == 'mrmedi' ? '1' : 'semas2024!' }));
		location.reload();
	};
	// 로그인 끝 --------------------------------

	// 로그아웃
	const logoutHandler = () => {
		logout();
		router.push({ name: 'main' });
	};

	// 관련사이트
	const isMenuOpen = ref(false);

	//관련사이트 수정, 추가
	const toggleMenu = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		const menuButton = document.querySelector('.menu-button') as HTMLElement;
		const menuList = document.querySelector('.menu-list') as HTMLElement;

		if (menuButton?.contains(target)) {
			if (menuList) {
				menuList.style.display = menuList.style.display === 'block' ? 'none' : 'block';
			}
			event.stopPropagation();
		} else {
			if (menuList && menuList.style.display === 'block') {
				menuList.style.display = 'none';
			}
		}
	};
	//관련사이트 수정, 추가 끝

	const sites = [
		{ name: '소상공인24', url: 'https://www.sbiz24.kr/' },
		{ name: '소상공인시장진흥공단', url: 'https://www.semas.or.kr/' },
		{ name: '소상공인정책자금', url: 'https://ols.semas.or.kr/ols/man/SMAN010M/page.do' },
		{ name: '중소벤처기업부', url: 'https://www.mss.go.kr/' },
	];

	// 모바일 메뉴
	const isMobileMenuOpen = ref(false);

	function mtoggleUpmstMenu() {
		isMobileMenuOpen.value = !isMobileMenuOpen.value;
	}

	// const initSideBar = () => {
	// 	expandedMenu.value = [currentMenu.value.upMenuIdno];
	// 	currentRootMenu.value = menuTree.value.find((menu) => menu.menuIdno === rootMenu().menuIdno);
	// };

	// onMounted(() => {
	// 	initSideBar();
	// });

	const MobileNavigateToSub = (node: Menu) => {
		currentRootMenu.value = menuTree.value.find((menu) => menu.menuIdno === rootMenu().menuIdno);
		if (node.npagYn === 'Y') {
			window.open('/#' + node.menuPath, '_blank');
		} else if (node.menuPath) {
			currentMenu.value = node;
			router.push(node.menuPath);
		}
	};

	const MobileLinkMenu = (menu: Menu) => {
		let path = menu.linkMenuPath;
		if (menu.linkMenuPath.indexOf('https://') < 0) {
			path = 'https://' + path;
		}
		if (menu.npagYn === 'Y') {
			window.open(path, '_blank');
		} else {
			location.href = path;
		}
	};

	// 웹접근성 --------------------------------
	const toHeaderMenu = () => {
		(document.querySelector('.depth1') as HTMLElement)?.focus();
		selectedMenuIndex.value = 0;
	};

	// const { setVerticalScrollPosition } = scroll;
	const toMainBody = () => {
		// main에 focus
		const mainFrame = document.querySelector('.q-page-container');
		mainFrame?.setAttribute('tabIndex', '-1');
		(mainFrame as HTMLElement)?.focus({ preventScroll: true });

		// scroll 올리기
		// const body = document.getElementById('mainBody');
		// if (body) setVerticalScrollPosition(body, 0);

		// tabIndex 삭제해서 다시 focus잡히는거 방지
		mainFrame?.removeAttribute('tabIndex');
	};
</script>
