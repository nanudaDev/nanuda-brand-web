<template>
  <div>
    <h1>자주묻는 질문</h1>
    <template v-if="faqList.length > 0">
      <div v-for="faq in faqList" :key="faq.id">
        <b-card class="m-2">
          <div class="m-3">Q: {{ faq.faq }}</div>
          <div class="m-3">A: {{ faq.answer }}</div>
        </b-card>
      </div>
    </template>
    <div v-else>
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <b-pagination
      v-model="pagination.page"
      :total-rows="listCount"
      :per-page="pagination.limit"
    ></b-pagination>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Watch } from 'vue-property-decorator';
import { Pagination } from '@/common';
import faqService from '@/services/faq.service';
@Component({
  name: 'Faq',
})
export default class Faq extends BaseComponent {
  private faqList: Faq[] = [];
  private pagination = new Pagination(5);
  private listCount: number = null;

  @Watch('pagination', {
    deep: true,
  })
  paginationChanged() {
    this.getList();
  }

  getList() {
    faqService.findAll(this.pagination).subscribe(res => {
      this.faqList = res.data.items;
      this.listCount = res.data.totalCount;
    });
  }
  mounted() {
    this.getList();
  }
}
</script>
