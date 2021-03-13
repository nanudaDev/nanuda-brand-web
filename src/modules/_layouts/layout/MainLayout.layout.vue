<template>
  <div id="app">
    <nav-bar :class="{ 'is-scrolled': isScrolled }"></nav-bar>
    <div id="app-main" :class="`app-${$route.name}`">
      <router-view></router-view>
      <footer id="footer">
        <div class="container">
          <div class="row-box">
            <h4>고객센터</h4>
            <p>
              전화 문의 1800 - 5972
            </p>
            <p>
              운영시간 : 평일 10:00 - 19:00 | 주말공휴일 제외
            </p>
            <p>
              점심시간 : 평일 12:30 - 13:30
            </p>
          </div>
          <div class="row-box">
            <h4>주식회사 위대한 상사</h4>
            <p>
              서울특별시 강남구 선릉로93길 40(역삼동 704-45), 나라키움 역삼A빌딩
              406호
            </p>
            <p>사업자등록번호 : 779-87-00655</p>
            <p>대표 : 김유구</p>
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
    </div>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import NavBar from '../NavBar/NavBar.layout.vue';
import debounce from 'lodash/debounce';

@Component({
  name: 'MainLayout',
  components: {
    NavBar,
  },
})
export default class MainLayout extends BaseComponent {
  private isScrolled = false;
  private handleDebouncedScroll: {
    (this: Window, ev: Event): any;
    (this: Window, ev: Event): any;
  } = null;

  handleScroll() {
    if (window.scrollY > 0) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  created() {
    this.handleDebouncedScroll = debounce(this.handleScroll, 100);
    window.addEventListener('scroll', this.handleDebouncedScroll);
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll);
  }
}
</script>
<style lang="scss" scoped>
#app-main {
  padding: 3em 0;
  margin-bottom: 3em;

  &.app-main {
    padding: 0;
  }

  #footer {
    background-color: #f5f5f5;
    color: #707070;
    padding: 1.5em 1.25em;

    .container {
      padding: 0;
    }
    .row-box {
      h4 {
        font-size: 0.875em;
        font-weight: 800;
        margin-bottom: 1em;
      }
      p {
        font-size: 0.875em;
      }
      + .row-box {
        margin-top: 40px;
      }
      ul {
        overflow: hidden;
        li {
          float: left;
          font-size: 0.875em;
          + li {
            margin-left: 1em;
          }
        }
      }
    }
  }
}
</style>
