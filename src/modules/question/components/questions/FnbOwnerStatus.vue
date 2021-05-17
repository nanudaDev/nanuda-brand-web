<template>
  <section class="article-section">
    <header class="section-title">
      <div class="container">
        <span>
          <router-link to="/">
            <img src="@/assets/images/logo_symbol_w.svg" alt="픽쿡" />
          </router-link>
        </span>
        <h3>{{ question }}</h3>
      </div>
    </header>
    <div class="section-content">
      <div class="container">
        <div class="row">
          <div class="col-12" v-for="given in givens" :key="given.id">
            <b-btn
              variant="light"
              class="mb-4 shadow"
              block
              pill
              size="lg"
              @click="saveUserType(given.userType)"
            >
              {{ given.given }}
            </b-btn>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { FNB_OWNER } from '@/common';
import BaseComponent from '@/core/base.component';
import { Component, Watch } from 'vue-property-decorator';
@Component({
  name: 'FnbOwnerStatus',
})
export default class FnbOwnerStatus extends BaseComponent {
  private question = '나는 현재';
  private givens = [
    {
      id: 1,
      userType: FNB_OWNER.CUR_FNB_OWNER,
      given: '음식점 사장님입니다',
    },
    {
      id: 2,
      userType: FNB_OWNER.NEW_FNB_OWNER,
      given: '창업을 생각하고 있습니다',
    },
  ];

  saveUserType(userType: FNB_OWNER) {
    if (userType === FNB_OWNER.CUR_FNB_OWNER) {
      this.$gtag.event(`user_type_${userType}`, {
        description: '기창업자로 질문 시작',
      });
    } else {
      this.$gtag.event(`user_type_${userType}`, {
        description: '신규창업자로 질문 시작',
      });
    }
    this.$emit('next', { fnbOwnerStatus: userType });
    this.$emit('progressUp');
  }
}
</script>

<style></style>
