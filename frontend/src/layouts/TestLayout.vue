<template>
	<header
		class="hide sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white supports-backdrop-blur:bg-white/95 shadow">
		<nav class="container mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
			<div class="flex lg:flex-1">
				<a href="/" class="-m-1.5 p-1.5">
					<span class="sr-only">소상공인시장진흥공단</span>
					<img class="h-10 w-auto" src="../css/img/logo.png" alt="" />
				</a>
			</div>
			<div class="flex lg:hidden">
				<button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
					<span class="sr-only">Open main menu</span>
					<Bars3Icon class="h-6 w-6" aria-hidden="true" />
				</button>
			</div>
			<PopoverGroup class="lg:flex lg:gap-x-6">
				<Popover class="relative" v-for="item in navigation" :key="item.name">
					<PopoverButton class="flex items-center gap-x-1 text-base font-bold leading-6 text-gray-800 hover:text-orange-600">
						{{ item.name }}
						<ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
					</PopoverButton>

					<transition
						enter-active-class="transition ease-out duration-200"
						enter-from-class="opacity-0 translate-y-1"
						enter-to-class="opacity-100 translate-y-0"
						leave-active-class="transition ease-in duration-150"
						leave-from-class="opacity-100 translate-y-0"
						leave-to-class="opacity-0 translate-y-1">
						<PopoverPanel
							class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
							<div class="p-4">
								<a
									v-for="item1 in navigationSub"
									:key="item1.subname"
									:href="item1.subhref"
									class="text-sm font-semibold leading-6 text-gray-900"
									>{{ item1.subname }}</a
								>
							</div>
							<div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50"></div>
						</PopoverPanel>
					</transition>
				</Popover>
			</PopoverGroup>
			<div class="lg:flex lg:flex-1 lg:justify-end">
				<a v-for="item in callsToAction" :key="item.name" :href="item.href" class="text-sm font-semibold leading-6 text-gray-900"
					><component :is="item.icon" class="h-5 w-5 flex-none text-gray-400" aria-hidden="item.name"
				/></a>
			</div>
		</nav>

		<Dialog as="div" class="lg:hide" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
			<div class="fixed inset-0 z-10"></div>
			<DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
				<div class="flex items-center justify-between">
					<a href="#" class="-m-1.5 p-1.5">
						<span class="sr-only">소상공인시장진흥공단</span>
						<img class="h-8 w-auto" src="../assets/img/logo.png" alt="" />
					</a>
					<button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
						<span class="sr-only">Close menu</span>
						<XMarkIcon class="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div class="mt-6 flow-root">
					<div class="-my-6 divide-y divide-gray-500/10">
						<div class="space-y-2 py-6">
							<Disclosure as="div" class="-mx-3" v-slot="{ open }">
								<DisclosureButton
									class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
									Product
									<ChevronDownIcon :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']" aria-hidden="true" />
								</DisclosureButton>
								<DisclosurePanel class="mt-2 space-y-2">
									<DisclosureButton
										v-for="item in [...products, ...callsToAction]"
										:key="item.name"
										as="a"
										:href="item.href"
										class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
										>{{ item.name }}</DisclosureButton
									>
								</DisclosurePanel>
							</Disclosure>
							<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
							<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>Marketplace</a
							>
							<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
						</div>
						<div class="py-6">
							<a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
						</div>
					</div>
				</div>
			</DialogPanel>
		</Dialog>
	</header>

	<router-view />
</template>

<script setup>
	import { ref } from 'vue';
	import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue';
	import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
	import { ChevronDownIcon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';

	const navigation = [
		{ name: '내가게 맞춤형분석', href: '#' },
		{ name: '내가게 경영지원', href: '#' },
		{ name: '지능형 상권분석', href: '#' },
		{ name: '창업자가진단', href: '#' },
		{ name: '큐레이션 서비스', href: '#' },
	];
	const navigationSub = [
		{ subname: '서브메뉴 1', subhref: '#' },
		{ subname: '서브메뉴 2', subhref: '#' },
		{ subname: '서브메뉴 3', subhref: '#' },
		{ subname: '서브메뉴 4', subhref: '#' },
	];

	const callsToAction = [
		{ name: '통합검색', href: '#', icon: MagnifyingGlassIcon },
		{ name: '회원정보수정', href: '#', icon: UserCircleIcon },
	];

	const mobileMenuOpen = ref(false);
</script>
