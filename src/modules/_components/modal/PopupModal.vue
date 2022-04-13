<template>
  <b-modal
    id="popup"
    :visible="showPopup && popupList.length > 0"
    centered
    hide-header
    hide-footer
    no-close-on-backdrop
    body-class="p-0"
    cancel-title="닫기"
  >
    <swiper :options="popupOption" ref="popupSwiper">
      <swiper-slide v-for="popup in popupList" :key="popup.id">
        <a
          :href="popup.link"
          :target="popup.linkType == 'EXTERNAL' ? '_target' : ''"
        >
          <img
            :src="popup.images[0].endpoint"
            :alt="popup.title"
            style="width:100%; max-width:100%;"
            v-if="popup.images && popup.images[0]"
          />
          <div v-if="popup.link" class="p-4 bg-light">
            <b-btn variant="primary" size="lg" block>
              온라인 신청하기
            </b-btn>
          </div>
        </a>
      </swiper-slide>
    </swiper>
    <!-- 페이징 -->
    <div class="swiper-pagination"></div>
    <!-- 네비게이션 버튼  -->
    <template v-if="popupList.length > 1">
      <b-button
        size="sm"
        variant="light"
        class="btn-swiper-prev btn-swiper-nav"
        @click="$refs.popupSwiper.$swiper.slidePrev()"
      >
        <b-icon icon="arrow-left"></b-icon>
        <span class="is-blind">이전으로</span></b-button
      >
      <b-button
        size="sm"
        variant="light"
        class="btn-swiper-next btn-swiper-nav"
        @click="$refs.popupSwiper.$swiper.slideNext()"
      >
        <b-icon icon="arrow-right"></b-icon>
        <span class="is-blind">다음으로</span></b-button
      >
    </template>
    <div class="txt-right p-2">
      <b-btn size="sm" variant="secondary" @click="closePopup()">닫기</b-btn>
      <b-btn size="sm" variant="black" @click="hideToday()"
        >오늘 하루 안보기</b-btn
      >
    </div>
  </b-modal>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { PopupDto } from '@/dto/popup';
import PopupService from '@/services/popup.service';
import CookieService from '@/services/shared/cookie/cookie.service';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'PopupModal',
})
export default class PopupModal extends BaseComponent {
  $refs!: {
    popupSwiper: HTMLFormElement;
  };
  private showPopup = true;
  private popupList: PopupDto[] = [];
  private popupOption: any = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    grabCursor: false,
    followFinger: false,
    autoHeight: true,
    observer: true,
    observeParents: true,
    enabled: true,
    navigation: {
      prevEl: '.btn-swiper-prev',
      nextEl: '.btn-swiper-next',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  get swiper() {
    return this.$refs.popupSwiper.$swiper;
  }

  getPopupList() {
    PopupService.findAll().subscribe(res => {
      if (res) {
        const popupData = res.data;
        this.popupList = popupData.filter(
          popup => popup.images && popup.images[0],
        );
      }
    });
  }

  closePopup() {
    this.$bvModal.hide('popup');
  }

  hideToday() {
    CookieService.setCookie('oneday', 'one', '1d');
    this.closePopup();
  }

  created() {
    // 하루동안(자정기준) 안보기 쿠키 가져오기
    const cookiedata = CookieService.getCookie('oneday');
    if (cookiedata === 'one') {
      this.showPopup = false;
    } else {
      this.showPopup = true;
    }
    this.getPopupList();
  }
}
</script>
<style lang="scss">
.swiper-container {
  position: relative;
}
.swiper-pagination {
  position: absolute;
  left: 0;
  right: 0;
  top: 0.25em;
  z-index: 50;
  opacity: 0.8;
  .swiper-pagination-bullet {
    margin: 0 0.25em;
  }
}
.btn-swiper-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  opacity: 0.8;
}
.btn-swiper-prev {
  left: 1em;
}
.btn-swiper-next {
  right: 1em;
}
</style>
