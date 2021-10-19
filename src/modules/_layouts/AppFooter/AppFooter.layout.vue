<template>
  <footer id="footer">
    <div class="container">
      <div class="row-box">
        <h4>고객센터</h4>
        <p>
          전화 문의 1800 - 5972
        </p>
        <p>
          <span>운영시간 : 평일 10:00 - 19:00</span>
          <span class="mx-2">|</span>
          <span>주말공휴일 제외</span>
        </p>
        <p>
          점심시간 : 평일 12:30 - 13:30
        </p>
      </div>
      <div class="row-box">
        <h4>주식회사 위대한 상사</h4>
        <p>
          서울특별시 서초구 강남대로 311 드림플러스 강남, 916-917호
        </p>
        <p>
          <span>사업자등록번호 : 779-87-00655</span><span class="mx-2">|</span>
          <span>대표 : 김유구</span>
        </p>
      </div>
      <div class="row-box">
        <ul>
          <li>
            <router-link to="/agreement">이용약관</router-link>
          </li>
          <li>
            <router-link to="/privacy">개인정보취급방침</router-link>
          </li>
          <li>
            <a
              href="https://ftc.go.kr/www/bizCommView.do?key=232&apv_perm_no=2017322016230204945&pageUnit=10&searchCnd=wrkr_no&searchKrwd=7798700655&pageIndex=1"
              target="_blank"
              >사업자정보확인</a
            >
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'Footer',
})
export default class Footer extends BaseComponent {}
</script>
<style lang="scss" scoped>
#footer {
  background-color: #f5f5f5;
  color: #707070;
  padding: 1.5em 1.25em;

  .row-box {
    h4 {
      font-size: 0.85em;
      font-weight: 800;
      margin-bottom: 0.88em;
      line-height: 1;
    }
    p {
      font-size: 0.75em;
      line-height: 1.6;
    }
    + .row-box {
      margin-top: 2.5em;
    }
    ul {
      overflow: hidden;
      li {
        float: left;
        font-size: 0.875em;
        line-height: 1.2;
        a {
          color: #707070;
        }
        + li {
          margin-left: 2.2857em;
        }
      }
    }
  }
}
</style>
