<template>
  <div>
    <!-- 할인 쿠폰 -->
    <div>
      <input type="checkbox" id="coupon-box" />
      <label for="coupon-box"> 5,000원 쿠폰 적용 </label>
    </div>

    <!-- 결제 UI -->
    <div id="payment-method"></div>

    <!-- 이용약관 UI -->
    <div id="agreement"></div>

    <!-- 결제하기 버튼 -->
    <button class="button" id="payment-button" style="margin-top: 30px">결제하기</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { loadTossPayments } from '@tosspayments/tosspayments-sdk'

onMounted(async () => {
  const button = document.getElementById("payment-button")
  const coupon = document.getElementById("coupon-box")

  const tossPayments = await loadTossPayments("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm")

  const customerKey = "c0crjIQGs9A9OV-2xDo3G"
  const widgets = tossPayments.widgets({ customerKey })

  let amount = 50000
  await widgets.setAmount({
    currency: "KRW",
    value: amount,
  })

  await Promise.all([
    widgets.renderPaymentMethods({
      selector: "#payment-method",
      variantKey: "DEFAULT",
    }),
    widgets.renderAgreement({
      selector: "#agreement",
      variantKey: "AGREEMENT",
    }),
  ])

  // 쿠폰 적용 시 금액 변경
  coupon.addEventListener("change", async function () {
    amount = coupon.checked ? 50000 - 5000 : 50000
    await widgets.setAmount({
      currency: "KRW",
      value: amount,
    })
  })

  // 결제 버튼 이벤트
  button.addEventListener("click", async function () {
    console.log("결제 버튼 클릭됨")
    await widgets.requestPayment({
      orderId: "qSfqI5JJQ_ZYa49f3dX1D",
      orderName: "토스 티셔츠 외 2건",
      successUrl: window.location.origin + "/success.html",
      failUrl: window.location.origin + "/fail.html",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      customerMobilePhone: "01012341234",
    })
  })
})

</script>
