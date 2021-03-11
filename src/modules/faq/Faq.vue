<template>
  <div>
    <h1>자주묻는 질문</h1>
    <template v-if="faqList.length > 0">
      <div v-for="faq in faqList" :key="faq.id">
        <b-card class="m-2">
          <div class="m-3">Q: {{ faq.faq }}</div>
          <div class="m-3" v-for="answer in faq.answers" :key="answer.id">
            A: {{ answer.answer }}
          </div>
        </b-card>
      </div>
    </template>
    <div v-else>
      <b-spinner label="Loading..."></b-spinner>
    </div>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import faqService from '@/services/faq.service';
import { FaqRequestDto, FaqResponseDto } from '@/dto/faq';
@Component({
  name: 'Faq',
})
export default class Faq extends BaseComponent {
  private faqList: FaqResponseDto[] = [];
  private faqRequestDto = new FaqRequestDto();
  paginationChanged() {
    this.getList();
  }

  getList() {
    faqService.findAll(this.faqRequestDto).subscribe(res => {
      this.faqList = res.data;
      this.faqList.forEach(e => {
        faqService.findAll({ faqParentId: e.id }).subscribe(res => {
          this.$set(e, 'answers', res.data);
        });
      });
    });
  }
  mounted() {
    this.getList();
  }
}
</script>
