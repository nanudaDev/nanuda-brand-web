<template>
  <div>
    <header class="section-title">
      <div class="container">
        <span>
          <router-link to="/">
            <img src="@/assets/images/logo_symbol.svg" alt="픽쿡" />
          </router-link>
        </span>
        <h3>{{ question }}</h3>
      </div>
    </header>
    <b-btn
      size="sm"
      class="btn-back"
      variant="primary"
      pill
      @click="goToPreviousAddr"
    >
      <span class="icon icon-arrow-left"><BaseArrow /></span>
      <span class="is-blind">뒤로가기</span>
    </b-btn>
    <!-- 행정동 버튼 그룹 -->
    <div>
      <div class="row gutter-sm">
        <div class="col-6 col-sm-4" v-for="given in givens" :key="given.id">
          <b-btn
            size="lg"
            variant="light"
            block
            class="mb-4 shadow"
            pill
            @click="getGuOrDong(given)"
            >{{ given[showingLevel] }}</b-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ADDRESS_LEVEL, FNB_OWNER } from '@/common';
import BaseComponent from '@/core/base.component';
import { CodeHdongDto, CodeHdongSearchDto } from '@/dto';
import codeHdongService from '@/services/code-hdong.service';
import { Component, Prop, Watch } from 'vue-property-decorator';
@Component({
  name: 'HdongCode',
})
export default class HdongCode extends BaseComponent {
  @Prop() readonly fnbOwnerStatus: FNB_OWNER;
  private showingLevel = ADDRESS_LEVEL.sidoName;
  private givens: any[] = [];
  private question = '';
  private codeHdongSearchDto = new CodeHdongSearchDto();
  getGuOrDong(given?: CodeHdongDto) {
    if (given) {
      this.codeHdongSearchDto.sidoName = given.sidoName;
      this.codeHdongSearchDto.hdongCode = given.hdongCode;
      this.codeHdongSearchDto.hdongName = given.hdongName;
      this.codeHdongSearchDto.guName = given.guName;
    }
    if (this.showingLevel === ADDRESS_LEVEL.sidoName) {
      codeHdongService.getGuName(this.codeHdongSearchDto).subscribe(res => {
        // this.isLoading = false;
        this.givens = res.data;
        this.showingLevel = ADDRESS_LEVEL.guName;
      });
    } else if (this.showingLevel === ADDRESS_LEVEL.guName) {
      codeHdongService.getHdongName(this.codeHdongSearchDto).subscribe(res => {
        // this.isLoading = false;
        this.givens = res.data;
        this.showingLevel = ADDRESS_LEVEL.hdongName;
      });
    } else {
      this.$emit('next', { hdongCode: given.hdongCode });
    }
  }
  // 주소 선택화면일때 뒤로가기
  goToPreviousAddr() {
    if (this.showingLevel === ADDRESS_LEVEL.hdongName) {
      codeHdongService.getGuName(this.codeHdongSearchDto).subscribe(res => {
        this.givens = res.data;
        this.showingLevel = ADDRESS_LEVEL.guName;
      });
    } else if (this.showingLevel === ADDRESS_LEVEL.guName) {
      codeHdongService.getSido().subscribe(res => {
        this.givens = res.data;
        this.showingLevel = ADDRESS_LEVEL.sidoName;
      });
    } else {
      // 전 단계로
      this.$emit('previous');
    }

    // this.isLastQuestion = false;
  }

  // onPostCodeComplete(event: any) {
  //   this.selectedRoadAddress = event.roadAddress;
  //   const geocoder = new window.kakao.maps.services.Geocoder();
  //   // 상권분석 가능한 지역 안내
  //   const availableLocationCodeArray = ['11', '41', '28', '26', '50'];
  //   const callback = (results: any, status: any) => {
  //     if (status === window.kakao.maps.services.Status.OK) {
  //       this.resultRequestDto.hdongCode = results[0].address.h_code;
  //       const hdongCodeSido = this.resultRequestDto.hdongCode.substring(0, 2);
  //       availableLocationCodeArray.includes(hdongCodeSido);
  //       if (!availableLocationCodeArray.includes(hdongCodeSido)) {
  //         this.isAvailableLocation = true;
  //       } else {
  //         this.isAvailableLocation = false;
  //       }
  //       // console.log(hdongCodeSido);
  //       this.$bvModal.hide('post-code');
  //     }
  //   };
  //   if (callback) {
  //     this.$gtag.event('kakao_address_complete', {
  //       description: '카카오 주소 입력 완료',
  //     });
  //   }
  //   geocoder.addressSearch(this.selectedRoadAddress, callback);
  // }

  mounted() {
    codeHdongService.getSido().subscribe(res => {
      this.givens = res.data;
    });
    if (this.fnbOwnerStatus === FNB_OWNER.NEW_FNB_OWNER) {
      this.question = '어떤 곳에서 창업을 희망하나요?';
      this.$gtag.event(`user_type_${this.fnbOwnerStatus}`, {
        description: '신규창업자로 질문 시작',
      });
    } else {
      this.question = '음식점 주소를 알려주세요!';
      this.$gtag.event(`user_type_${this.fnbOwnerStatus}`, {
        description: '기창업자로 질문 시작',
      });
    }
  }
}
</script>

<style></style>
