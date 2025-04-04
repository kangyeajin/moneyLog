import { storeToRefs } from 'pinia';
import { api, notify, useAuthStore } from 'quasar-app-extension-semasbp-cmmn/plugins';
import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import IndexPage from 'pages/IndexPage.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: MainLayout,
		children: [
			{ path: '/', component: IndexPage, name: 'main' },
			{
				path: '',
				component: () => import('layouts/SubLayout.vue'),
				/* subLayout 필요시 children내부에 추가 */
				children: [
					{
						path: '/conts',
						children: [{ path: ':contsIdno', component: () => import('components/ContsComponent.vue') }],
					},
					{
						path: 'faq',
						children: [
							{ path: '', component: () => import('pages/pub/pst/faq/Faq.vue') },
							{ path: ':pstIdno', component: () => import('pages/pub/pst/faq/Faq.vue') },
						],
					},
					{
						path: 'mybplcinfo',
						children: [
							{ path: '', component: () => import('pages/priv/my-bplc-info/MyBplcInfoMng.vue') },
							{
								path: ':brno',
								component: () => import('pages/priv/my-bplc-info/MyBplcInfoDetail.vue'),
							},
							{
								path: 'form',
								children: [
									{ path: '', component: () => import('pages/priv/my-bplc-info/MyBplcInfoForm.vue') },
									{ path: ':brno', component: () => import('pages/priv/my-bplc-info/MyBplcInfoForm.vue') },
								],
							},
						],
						beforeEnter: async (to, from, next) => {
							try {
								const userAgreed = await checkUserAgreement(); // 사용자 가게정보 활용 동의 및 마이데이터 동의 여부 확인
								if (userAgreed) {
									next(); // 동의한 경우 이동 허용
								} else {
									// notify.alert('마이데이터 재동의', '회원님.<br> 마이데이터 철회로 인하여 재동의가 필요합니다.');
									next({ path: '/storeAndMydataTerms', query: { path: to.path } }); // 동의하지 않은 경우 동의 화면으로 리다이렉션
								}
							} catch (error) {
								notify.error('사용자 정보가 없습니다.');
								next('/');
							}
						},
					},
					{ path: 'sitemap', component: () => import('pages/Sitemap.vue') },

					{ path: 'mbrinfodetail', component: () => import('pages/priv/mbr-info/MbrInfoDetail.vue') },
					{
						path: 'storeAndMydataTerms',
						component: () => import('pages/priv/store-and-mydata/StoreAndMydataTerms.vue'),
						beforeEnter: async (to, from, next) => {
							try {
								const userAgreed = await checkUserAgreement(); // 사용자 가게정보 활용 동의 및 마이데이터 동의 여부 확인
								if (userAgreed) {
									next(from); // 동의한 경우 이동 허용
								} else {
									next(); // 동의하지 않은 경우 동의 화면
								}
							} catch (error) {
								notify.error('사용자 정보가 없습니다.');
								next('/');
							}
						},
					},
					{
						path: 'publicMydataTerms',
						component: () => import('pages/priv/public-mydata/PublicMydataTerms.vue'),
					},
					{ path: 'myInfoView', component: () => import('pages/priv/fixes-bizon/FixesBizonSetting.vue') },
					{ path: 'scrap', component: () => import('pages/priv/interest/scrap/ScrapList.vue') },
					{ path: 'bkmk', component: () => import('pages/priv/interest/bkmk/BkmkList.vue') },
					{ path: 'anls', component: () => import('pages/priv/interest/anls/AnlsList.vue') },
					{ path: 'intarea', component: () => import('src/pages/priv/interest/intarea/intarea.vue') },
					{ path: 'rnk', component: () => import('src/pages/priv/rnk/Rnk.vue') },
					{
						path: 'itrstInfo',
						children: [
							{ path: '', component: () => import('pages/priv/itrstInfo/ItrstInfo.vue') },
							{ path: 'subStore', component: () => import('pages/priv/itrstInfo/SubStore.vue') },
						],
					},
					{
						path: 'mypage',
						children: [
							{ path: '', component: () => import('pages/priv/mypage-m/MyPageMain.vue') },
							{ path: 'mypagectntset', component: () => import('pages/priv/mypage-m/MyPageMainCtntSet.vue') },
						],
					},
					{ path: 'prslhstry', component: () => import('pages/priv/interest/prsl-hstry/PrslHstry.vue') },
					{
						path: 'prsrvc',
						children: [
							{ path: '', component: () => import('pages/pub/ohnyrshop/OhnyrShop.vue') },
							//{ path: 'new', component: () => import('pages/pub/prsrvc/PrSrvcForm.vue') },
						],
					},
					{
						path: 'sprtBiz',
						children: [{ path: '', component: () => import('pages/pub/sprt-biz/SprtBiz.vue') }],
					},
					/* {
						path: 'mystus/myprsrvc',
						children: [
							{ path: '', component: () => import('pages/pub/prsrvc/.vue') },
							{ path: 'new', component: () => import('pages/pub/prsrvc/PrSrvcForm.vue') },
						],
					}, */

					// 데이터 서비스
					{
						path: 'apiMain',
						children: [
							// 빅데이터 검색
							{
								path: 'bigdata',
								component: () => import('pages/pub/bgdata/BigData.vue'),
							},
							// 데이터수요제안
							{
								path: 'dtdmndprps',
								children: [
									{ path: '', component: () => import('pages/pub/data-prps/DtDmndPrps.vue') },
									{ path: 'update/:propseIdno', component: () => import('pages/pub/data-prps/DtDmndPrpsForm.vue') },
									{ path: ':propseIdno', component: () => import('pages/pub/data-prps/DtDmndPrpsDetail.vue') },
								],
							},
							// 데이터 개방 서비스
							{
								path: 'dataApi',
								children: [
									{ path: '', component: () => import('pages/pub/apics/ServiceIntro.vue') },
									{ path: 'intro', component: () => import('pages/pub/apics/ServiceIntro.vue') },
									// { path: 'use', component: () => import('pages/pub/apics/serviceUse.vue') },
									// { path: 'note', component: () => import('pages/pub/apics/serviceNotice.vue') },
									{ path: 'openapiIntro', component: () => import('pages/pub/apics/OpenapiIntro.vue') },
									// { path: 'openapiUse', component: () => import('pages/pub/apics/openapiUse.vue') },
									{
										// OpenAPI 서비스 명세
										path: 'openapi',
										component: () => import('pages/pub/apics/OpenapiManualService.vue'),
										// { path: 'manualService', component: () => import('pages/pub/apics/openapiManualService.vue') },
										// { path: 'manualStorezone', component: () => import('pages/pub/apics/openapiManualStorezone.vue') },
										// { path: 'manualStore', component: () => import('pages/pub/apics/openapiManualStore.vue') },
										// { path: 'manualReqstoreModify', component: () => import('pages/pub/apics/openapiManualReqstoreModify.vue') },
										// { path: 'manualUpjong', component: () => import('pages/pub/apics/openapiManualUpjong.vue') },
										// { path: 'manualDongbndry', component: () => import('pages/pub/apics/openapiManualDongbndry.vue') },
									},
									{ path: 'openapiModify', component: () => import('pages/pub/apics/OpenapiModify.vue') },
								],
							},
							// 화면 API활용신청
							{ path: 'apics', component: () => import('pages/pub/apics/ApiCs.vue') },
							// 상권서비스 이용 안내
							// { path: 'commercialGuide', component: () => import('pages/pub/apics/CommercialGuide.vue') },
							{ path: 'commercialGuide/0', component: () => import('pages/pub/apics/CommercialGuide.vue') },
							{ path: 'commercialGuide/1', component: () => import('pages/pub/apics/CommercialGuide.vue') },
							{ path: 'commercialGuide/2', component: () => import('pages/pub/apics/CommercialGuide.vue') },
							{ path: 'commercialGuide/3', component: () => import('pages/pub/apics/CommercialGuide.vue') },
							// 상권서비스 이용 안내
							{ path: 'gnbDataList', component: () => import('pages/pub/apics/gnbDataList.vue') },
						],
					},

					{
						path: 'help',
						children: [{ path: '', component: () => import('pages/pub/help/Help.vue') }],
					},

					{
						path: 'notice',
						children: [
							{ path: '', component: () => import('pages/pub/pst/notice/Notice.vue') },
							{ path: ':pstIdno', component: () => import('pages/pub/pst/notice/NoitceDetail.vue') },
						],
					},

					{
						path: 'qna',
						children: [
							{ path: '', component: () => import('pages/pub/pst/qna/Qna.vue') },
							{ path: ':pstIdno', component: () => import('pages/pub/pst/qna/QnaDetail.vue') },
							{ path: 'update/:pstIdno', component: () => import('pages/pub/pst/qna/QnaForm.vue') },
						],
					},

					{
						path: 'mgzn',
						children: [
							{ path: '', component: () => import('pages/pub/mgzn/Mgzn.vue') },
							{ path: ':mgznIdno', component: () => import('pages/pub/mgzn/MgznDetail.vue') },
						],
					},

					{
						path: 'mystus' /*참여현황*/,
						children: [
							{ path: '', component: () => import('pages/pub/pst/qna/Qna.vue') },
							{
								path: 'myqna' /*[탭1]qna*/,
								children: [
									{ path: '', component: () => import('pages/pub/pst/qna/Qna.vue') },
									{ path: ':pstIdno', component: () => import('pages/pub/pst/qna/QnaDetail.vue') },
									{ path: 'update/:pstIdno', component: () => import('pages/pub/pst/qna/QnaForm.vue') },
								],
							},
							{
								path: 'mydataprps' /*[탭2]데이터수요제안*/,
								children: [
									{ path: '', component: () => import('pages/pub/data-prps/DtDmndPrps.vue') },
									{ path: 'update/:propseIdno', component: () => import('pages/pub/data-prps/DtDmndPrpsForm.vue') },
									{ path: ':propseIdno', component: () => import('pages/pub/data-prps/DtDmndPrpsDetail.vue') },
								],
							},
							{
								path: 'myprsrvc' /*[탭3]홍보서비스*/,
								children: [
									{ path: '', component: () => import('pages/pub/prsrvc/MyPrSrvc.vue') },
									{ path: ':id', component: () => import('pages/pub/prsrvc/PrSrvcForm.vue') },
								],
							},
						],
					},
					{
						path: 'mydata',
						children: [
							{ path: '', component: () => import('pages/priv/mydata/MyDataDetail.vue') },
							{
								path: 'form',
								children: [{ path: ':brno', component: () => import('pages/priv/mydata/MyDataForm.vue') }],
							},
						],
						beforeEnter: async (to, from, next) => {
							try {
								const userAgreed = await checkUserAgreement(); // 사용자 가게정보 활용 동의 및 마이데이터 동의 여부 확인
								if (userAgreed) {
									next(); // 동의한 경우 이동 허용
								} else {
									// notify.alert('마이데이터 재동의', '회원님.<br> 마이데이터 철회로 인하여 재동의가 필요합니다.');
									next({ path: '/storeAndMydataTerms', query: { path: to.path } }); // 동의하지 않은 경우 동의 화면으로 리다이렉션
								}
							} catch (error) {
								notify.error('사용자 정보가 없습니다.');
								next('/');
							}
						},
					},
					{
						path: '/vcm' /*방문고객 마케팅 */,
						children: [
							{ path: 'at', component: () => import('pages/cstmz/vcm/AgreeTerms.vue') } /*약관동의*/,
							{ path: 'asf', component: () => import('pages/cstmz/vcm/ApplyServiceFinished.vue') } /*신청성공메세지(메뉴대상아님)*/,
							{
								path: 'db',
								children: [
									{
										path: '',
										component: () => import('pages/cstmz/vcm/DashBoard.vue'),
										beforeEnter: async (to, from, next) => {
											const vcmCheck = await vcmAplyCheck();
											if (vcmCheck) next();
											else next('/vcm');
										},
									},
									{ path: '/vcm/as', component: () => import('pages/cstmz/vcm/ApplyService.vue') } /*서비스 신청하기 (대상아님)*/,
								],
							} /*	사업장선택*/,
							{
								path: 'sm',
								component: () => import('pages/cstmz/vcm/SendMessage.vue'),
								beforeEnter: async (to, from, next) => {
									const vcmCheck = await vcmAplyCheck();
									if (vcmCheck) next();
									else next('/vcm');
								},
							} /* 발송하기 */,
							{ path: 'smf', component: () => import('pages/cstmz/vcm/SendMessageFinished.vue') } /*대상아님*/,
							{
								path: 'sd',
								component: () => import('pages/cstmz/vcm/ShippingDetails.vue'),
								beforeEnter: async (to, from, next) => {
									const vcmCheck = await vcmAplyCheck();
									if (vcmCheck) next();
									else next('/vcm');
								},
							} /*발송내역*/,
							{
								path: 'cq',
								component: () => import('pages/cstmz/vcm/CreateQrcode.vue'),
								beforeEnter: async (to, from, next) => {
									const vcmCheck = await vcmAplyCheck();
									if (vcmCheck) next();
									else next('/vcm');
								},
							} /* QR코드 만들기 */,
						],
					},
					{
						path: '/sbiz',
						children: [
							{
								path: 'sttus' /* 상권현황 */,
								children: [
									{ path: 'storSttus', component: () => import('pages/sbiz/bizonSttus/StorSttus.vue') } /*업소현황*/,
									// { path: 'stateShop', component: () => import('pages/sbiz/district/StateShop.vue') } /*업소현황(임시)*/,
									{ path: 'stcarSttus', component: () => import('pages/sbiz/bizonSttus/StcarSttus.vue') } /*업력현황*/,
									{ path: 'slsIdex', component: () => import('pages/sbiz/bizonSttus/SlsIdex.vue') } /*매출추이*/,
									{ path: 'baeminIdex', component: () => import('pages/sbiz/bizonSttus/BaeminIdex.vue') } /*배달지수*/,
									{ path: 'rgnSttus', component: () => import('pages/sbiz/bizonSttus/RgnSttus.vue') } /*인구현황*/,
									{ path: 'dynpplSttus', component: () => import('pages/sbiz/bizonSttus/DynpplSttus.vue') } /*유동인구현황*/,
									{ path: 'rsdpplSttus', component: () => import('pages/sbiz/bizonSttus/RsdpplSttus.vue') } /*주거인구현황*/,
									{ path: 'wrcpplSttus', component: () => import('pages/sbiz/bizonSttus/WrcpplSttus.vue') } /*직장인구현황*/,
									// { path: 'rtfSttus', component: () => import('pages/sbiz/bizonSttus/RtfSttus.vue') } /*임대료현황*/,
									// { path: 'strtupClsbizSttus', component: () => import('pages/sbiz/bizonSttus/StrtupClsbizSttus.vue') } /*창폐업률 현황*/,
								],
							},
							{
								path: 'stsld' /* 창업자가진단 */,
								children: [
									{ path: '', component: () => import('components/sbiz/district/SurveyIntro.vue') },
									{ path: 'survey', component: () => import('pages/sbiz/stsld/Survey.vue') },
									{ path: 'surveyResult', name: 'surveyResult', component: () => import('pages/sbiz/stsld/SurveyResult.vue') },
									{ path: 'surveyStep/:option', name: 'surveyStep', component: () => import('pages/sbiz/stsld/SurveyStep.vue') },
								],
							},
							{
								path: 'weather' /* 창업기상도 */,
								component: () => import('pages/sbiz/swc/Weather.vue'),
							},
							{
								path: 'snsAnaly' /* SNS 분석 */,
								component: () => import('pages/sbiz/hotplace/SnsAnls.vue'),
							},
							/*
              { path: 'example', component: () => import('pages/sbiz/example/SBizExam.vue') },
              { path: 'map', component: () => import('pages/sbiz/example/KakaoMap.vue') },
              { path: 'sampleothers', component: () => import('src/pages/sbiz/example/SampleOthers.vue') },
              */
						],
					},
				] /* subLayout children 끝 */,
			},

			{
				path: 'stat/:path*',
				component: () => import('pages/stat/Stat.vue'),
			},
			/* subLayout 필요없을시 아래 추가 */
			{ path: 'srch', component: () => import('pages/pub/srch/SrchLayout.vue') },

			{
				path: '/kakao',
				component: () => import('components/priv/KakaoMap.vue'),
			},

			{
				/*트랜드 분석*/
				path: '/hotplace',
				component: () => import('pages/sbiz/hotplace/dashBoard/TheSns.vue'),
			},
			{
				/* 경영지원 대시보드 */
				path: '/vcm',
				component: () => import('pages/cstmz/vcm/SubMain.vue'),
			},
			{
				/*경영진단 대시보드*/
				path: '/mystor',
				beforeEnter: async (to, from, next) => {
					const res = await getMappingInfo();
					if (res) {
						next();
					} else {
						next(from.path);
					}
				},
				component: () => import('pages/cstmz/mystore/DashBoard.vue'),
			},
			{
				/* 간단분석 */
				path: '/hotplace/gis',
				component: () => import('pages/sbiz/hotplace/HotplaceGis.vue'),
			},
			{
				/* 상세분석 */
				path: '/hotplace/gisDetail',
				component: () => import('pages/sbiz/hotplace/HotplaceDetail.vue'),
			},
			{
				/* 배달현황 */
				path: '/hotplace/dlvySls',
				component: () => import('pages/sbiz/hotplace/HotplaceDetail.vue'),
			},
			{
				/* 경쟁현황 */
				path: '/hotplace/cmpetAnls',
				component: () => import('pages/sbiz/hotplace/HotplaceDetail.vue'),
			},
			{
				/* 창업시뮬레이션 */
				path: '/hotplace/ernAnls',
				component: () => import('pages/sbiz/hotplace/HotplaceDetail.vue'),
			},
			{
				/* 업종추천 */
				path: '/hotplace/lctTpbiz',
				component: () => import('pages/sbiz/hotplace/HotplaceDetail.vue'),
			},
			{
				/* 상권등급 */
				path: '/hotplace/bizonEvl',
				component: () => import('pages/sbiz/hotplace/HotplaceDetail.vue'),
			},
			{
				/* 핫플레이스 리포트 */
				path: '/hotplace/hpReport/:dongCd?',
				name: '/hotplace/hpReport',
				component: () => import('pages/sbiz/hotplace/HotplaceReport.vue'),
			},
			{
				/* 배달정보 */
				path: '/gis/delivery',
				component: () => import('pages/sbiz/hotplace/DeliveryMap.vue'),
			},
			{
				/* 관광, 축제정보 */
				path: '/gis/tour',
				component: () => import('pages/sbiz/hotplace/TourMap.vue'),
			},
			{ path: '/sbiz', component: () => import('pages/sbiz/district/DistrictMain.vue') },
			{
				path: '/sbiz/district',
				component: () => import('pages/sbiz/district/DistrictMain.vue') /*gis 메인(상권분석)*/,
			},
			{
				path: '/sbiz/strtupCha',
				component: () => import('pages/sbiz/strtupChaMap/StrtupCha.vue') /*창업후보지*/,
			},
			{
				path: '/sbiz/startupPublic',
				component: () => import('pages/sbiz/strtupChaMap/StrtupChaPublic.vue') /*입지지도 대민용*/,
			},
		],
	},
	{
		path: '/openApi',
		beforeEnter: async (to, from, next) => {
			const res = await api.post('/pub/api/apics/checkApiCertVl', { apiCertKeyVl: to.query.certKey });
			res.data === 0 ? next(new Error('등록된 인증키 없음')) : next();
		},
		children: [
			{ path: 'weather', component: () => import('pages/sbiz/swc/Weather.vue') } /* 창업기상도 */,
			{ path: 'slsIdex', component: () => import('pages/sbiz/bizonSttus/SlsIdex.vue') } /*매출지수*/,
			{ path: 'storSttus', component: () => import('pages/sbiz/bizonSttus/StorSttus.vue') } /*업소현황*/,
			{ path: 'stcarSttus', component: () => import('pages/sbiz/bizonSttus/StcarSttus.vue') } /*업력현황*/,
			{ path: 'rgnSttus', component: () => import('pages/sbiz/bizonSttus/RgnSttus.vue') } /*지역현황*/,
			{ path: 'strtupClsbizSttus', component: () => import('pages/sbiz/bizonSttus/StrtupClsbizSttus.vue') } /*창폐업률 현황*/,
			{ path: 'snsAnaly', component: () => import('pages/sbiz/hotplace/SnsAnls.vue') } /* SNS 분석 */,
		],
	},
	{
		path: '/mobile/sub/stor/:key',
		component: () => import('pages/mobile/SubMyStorReport.vue'),
	},
	{
		path: '/inAppBrowser',
		component: () => import('pages/mobile/InAppBrowser.vue'),
	},

	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue'),
	},
];

const checkUserAgreement = async () => {
	const { auth } = storeToRefs(useAuthStore());
	const res = await api.get('/priv/api/mbrInfo/' + auth.value.userIdno);
	return res.data.bplcInfoUtlznAgreYn === 'Y' && res.data.mydataTrmsAgreYn === 'Y' ? true : false;
};

const vcmAplyCheck = async () => {
	const { auth } = storeToRefs(useAuthStore());
	if (auth.value.userIdno != null) {
		/*const res = await api.get(`/cstmz/api/mktaply/agre?userId=${auth.value.userId}`);*/
		const res = await api.post('/cstmz/api/mktaply/agre', { userId: auth.value.userId });
		return res.data;
	}
	return false;
};

const getMappingInfo = async () => {
	const res = await api.get('/cstmz/api/cmn/myStorCheck');
	if (res != null) {
		const msg = res.data.msg;
		if (msg != 'normal') {
			notify.alert('알림', msg);
			return false;
		} else {
			return true;
		}
	}

	/* if (res == null) {
		notify.alert('알림', '경영진단 서비스를 이용할 수 있는 사업장이 없습니다.');
		return false;
	} else {
		return true;
	} */
};

export default routes;
