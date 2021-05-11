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
    <div class="row">
      <div class="col-12" v-for="given in givens" :key="given.id">
        <b-btn
          variant="light"
          class="mb-4 shadow"
          block
          pill
          size="lg"
          @click="
            $emit('next', {
              selectedKbMediumCategory: given.givenDetails.value,
            })
          "
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

  mounted() {
    this.firstQuestionDto.userType = this.fnbOwnerStatus;
    questionService
      .getKBCategoryQuestion(this.firstQuestionDto)
      .subscribe(res => {
        if (res) {
          this.givens = res.data.givens;
          this.question = res.data.question;
        }
      });
  }
}
</script>

<style></style>
