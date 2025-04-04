<template>
	<!-- 사이드 메뉴 영역 -->
	<aside class="sidebar">
		<div>
			<nav>
				<h2>{{ currentRootMenu?.menuNm }}</h2>

				<q-tree
					ref="sideMenu"
					:nodes="currentRootMenu?.childMenus ? currentRootMenu.childMenus : []"
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
							clickable
							:tabindex="props.node.childMenus.length === 0 ? 0 : props.expanded ? 0 : -1"
							@click="linkMenu(props.node)"
							:active="currentMenu.menuIdno === props.node.menuIdno || props.expanded"
							active-class="active">
							{{ props.node.menuNm }}<ArrowTopRightOnSquareIcon />
						</q-item>

						<q-item
							v-else
							clickable
							:tabindex="props.node.childMenus.length === 0 ? 0 : -1"
							@click.prevent="navigateToSub(props.node)"
							:active="currentMenu.menuIdno === props.node.menuIdno || props.expanded"
							active-class="active">
							{{ props.node.menuNm }}<ChevronRightIcon />
						</q-item>
					</template>
				</q-tree>
			</nav>
		</div>
	</aside>
	<!--// 사이드 메뉴 영역 -->
</template>

<script setup lang="ts">
	import { Menu } from 'src/components/models';
	import { useRouter } from 'vue-router';
	import { ref, onMounted } from 'vue';
	import { ChevronRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';
	import { useMenus } from 'src/composables/menu';

	const { menuTree, currentMenu, breadcrumbs, rootMenu } = useMenus();
	const router = useRouter();
	const currentRootMenu = ref<Menu>();
	const sideMenu = ref();
	const expandedMenu = ref<Array<string>>([]);

	const initSideBar = () => {
		currentRootMenu.value = menuTree.value.find((menu) => menu.menuIdno === rootMenu().menuIdno);
		expandedMenu.value = breadcrumbs.value.map((obj) => {
			return obj.menuIdno;
		});
	};

	onMounted(() => {
		initSideBar();
	});

	const navigateToSub = (node: Menu) => {
		currentRootMenu.value = menuTree.value.find((menu) => menu.menuIdno === rootMenu().menuIdno);
		if (node.npagYn === 'Y') {
			window.open('/#' + node.menuPath, '_blank');
		} else if (node.menuPath) {
			currentMenu.value = node;
			router.push(node.menuPath);
		}
	};

	const linkMenu = (menu: Menu) => {
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
</script>
