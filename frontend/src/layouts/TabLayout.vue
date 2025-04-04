<template>
	<q-card class="tab-list">
		<q-tabs dense align="left">
			<q-route-tab :to="{ path: '/mystus/myqna' }" label="질문 및 답변" />
			<q-route-tab :to="{ path: '/mystus/mydataprps' }" label="데이터수요제안" />
			<q-route-tab v-if="auth.rolIdno === RolId.ROLE_PT_BIZUER" :to="{ path: '/mystus/myprsrvc' }" label="홍보서비스" />
		</q-tabs>
		<!-- <q-separator></q-separator> -->
		<q-page-container>
			<router-view />
		</q-page-container>
	</q-card>
</template>
<script setup lang="ts">
	import { useAuthStore } from 'quasar-app-extension-semasbp-cmmn/plugins';
	import { RolId } from 'quasar-app-extension-semasbp-cmmn/models';
	import { storeToRefs } from 'pinia';
	const { auth } = storeToRefs(useAuthStore());
</script>
