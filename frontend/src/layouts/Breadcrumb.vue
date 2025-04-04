<template>
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<ol>
			<li>
				<a href="#" title="Home"><HomeIcon aria-label="Home" /></a>
			</li>
			<li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
				<div>
					<ChevronRightIcon />
					<a v-if="breadcrumb.link.length > 0" :href="'/#' + breadcrumb.link">{{ breadcrumb.text }}</a>
					<span v-else>{{ breadcrumb.text }}</span>
				</div>
			</li>
		</ol>
	</nav>
</template>

<script setup lang="ts">
	import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
	import { useMenuStore } from 'src/stores/menu';
	import { storeToRefs } from 'pinia';

	const { breadcrumbs } = storeToRefs(useMenuStore());
</script>

<style scoped>
	/* 필요시 추가할 수 있는 스타일 */
</style>
