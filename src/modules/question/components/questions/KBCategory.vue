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
      @click="onPreviousBtn"
    >
      <span class="icon icon-arrow-left"><BaseArrow /></span>
      <span class="is-blind">뒤로가기</span>
    </b-btn>
    <div class="row">
      <div class="col-12" v-for="given in givens" :key="given.id">
        <b-btn
          variant="light"
          class="mb-4 shadow"
          block
          pill
          size="lg"
          @click="onBtnClick(given)"
        >
          {{ given.given }}
        </b-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { FNB_OWNER } from '@/common';
import BaseComponent from '@/core/base.component';
import { FirstQuestionDto, Given } from '@/dto';
import questionService from '@/services/question.service';
import { Component, Prop } from 'vue-property-decorator';
@Component({
  name: 'KBCategory',
})
export default class KBCategory extends BaseComponent {
  @Prop() readonly fnbOwnerStatus: FNB_OWNER;
  private givens: Given[] = [];
  private question = '';
  private firstQuestionDto = new FirstQuestionDto();

  onBtnClick(given: Given) {
    this.$emit('progressUp');
    this.$emit('next', {
      selectedKbMediumCategory: given.givenDetails.value,
    });
  }
  onPreviousBtn() {
    this.$emit('previous');
    this.$emit('progressDown');
  }

  mounted() {
    this.$emit('loading', true);
    this.firstQuestionDto.userType = this.fnbOwnerStatus;
    questionService
      .getKBCategoryQuestion(this.firstQuestionDto)
      .subscribe(res => {
        if (res) {
          this.$emit('loading', false);
          this.givens = res.data.givens;
          this.question = res.data.question;
        }
      });
  }
}
</script>

<style></style>
