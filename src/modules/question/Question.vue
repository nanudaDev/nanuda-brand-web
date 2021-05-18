<template>
  <article
    class="main-article bg-primary"
    id="question-start"
    v-if="questionIndex < 0"
  >
    <template v-if="!isUtmSource">
      <header class="article-header">
        <span data-aos="fade-down" data-aos-duration="1500"
          ><router-link to="/"
            ><img
              src="@/assets/images/logo_w.svg"
              alt="픽쿡"
              class="logo-w"/></router-link
        ></span>
        <h2 data-aos="fade-down" data-aos-duration="1500">
          단 1분만에 빅데이터로<br />
          창업아이템을 추천할게요.
        </h2>
        <div
          class="btn-box text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <b-btn
            variant="light"
            pill
            size="xl"
            class="shadow"
            @click="startQuestion()"
          >
            시작하기
          </b-btn>
        </div>
      </header>
    </template>
    <template v-else>
      <header class="article-header">
        <span data-aos="fade-down" data-aos-duration="1500"
          ><router-link to="/"
            ><img
              src="@/assets/images/logo_w.svg"
              alt="픽쿡"
              class="logo-w"/></router-link
        ></span>
        <h2 data-aos="fade-down" data-aos-duration="1500">메뉴를 찾으세요</h2>
        <p data-aos="fade-down" data-aos-duration="1500">
          뭘로 창업하지? <br />
          매출은 어떻게 더 올리지?<br />
          그 메뉴를 픽쿡에서 찾으세요<br />
        </p>
        <div
          class="btn-box text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <b-btn
            variant="light"
            pill
            size="xl"
            class="shadow"
            @click="startQuestion()"
          >
            원하는 지역에서 내 메뉴 찾기
          </b-btn>
        </div>
      </header>
    </template>
  </article>
  <article
    class="main-article"
    :class="questionOrderArr[questionIndex].header ? ' bg-primary' : 'bg-light'"
    :id="`question-${questionOrderArr[questionIndex].name.toLowerCase()}`"
    v-else
  >
    <header
      class="article-header"
      v-if="questionOrderArr[questionIndex].header"
    >
      <h1>
        <router-link to="/">
          <img src="@/assets/images/logo_w.svg" alt="픽쿡" />
        </router-link>
      </h1>
      <div class="progress-bar-rail">
        <span
          class="progress-bar"
          :style="{
            width: (questionOrder / (questionTotalCount + 1)) * 100 + '%',
          }"
        ></span>
      </div>
    </header>
    <div class="article-content">
      <!-- questionOrderArr의 순서에 따라 컴포넌트가 변함 -->
      <keep-alive exclude="MultipleQuestion">
        <component
          :is="questionOrderArr[questionIndex].name"
          @next="onNext"
          @previous="questionIndex--"
          @progressUp="questionOrder++"
          @progressDown="questionOrder--"
          @loading="onLoading"
          :fnbOwnerStatus="resultRequestDto.fnbOwnerStatus"
          :ipAddress="ipAddress"
          :uniqueSessionId="uniqueSessionId"
          :resultRequestDto="resultRequestDto"
        />
      </keep-alive>
    </div>
    <template v-if="isLoading">
      <div class="loading-layer"></div>
    </template>
  </article>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Watch } from 'vue-property-decorator';
import { VueDaumPostcode } from 'vue-daum-postcode';

import axios from 'axios';
import {
  FirstQuestionDto,
  Given,
  NextQuestionDto,
  ResultRequestDto,
  ResultResponseDto,
} from '@/dto/question';
import { use } from 'node_modules/vue/types/umd';

import FnbOwnerStatus from './components/questions/FnbOwnerStatus.vue';
import HdongCode from './components/questions/HdongCode.vue';
import KBCategory from './components/questions/KBCategory.vue';
import MultipleQuestion from './components/questions/MultipleQuestion.vue';
import Solution from './Solution.vue';
import Complete from './Complete.vue';
@Component({
  name: 'Question',
  components: {
    VueDaumPostcode,
    FnbOwnerStatus,
    HdongCode,
    KBCategory,
    MultipleQuestion,
    Solution,
    Complete,
  },
})
export default class Question extends BaseComponent {
  private resultRequestDto = new ResultRequestDto();
  private questionTotalCount: any = 10;
  private questionOrder: any = 0;
  private resultResponseDto: ResultResponseDto = null;
  private isLoading = false;
  private isLoadingResult = false;
  private previousQuestionDtoArr: NextQuestionDto[] = [];
  private questionGivenArray: any[] = [];
  private isUtmSource = false;
  private questionIndex = -1;
  private questionOrderArr = [
    { name: 'FnbOwnerStatus', header: true },
    { name: 'HdongCode', header: true },
    { name: 'KBCategory', header: true },
    { name: 'MultipleQuestion', header: true },
    { name: 'Solution', header: false },
    { name: 'Complete', header: false },
  ];
  private ipAddress = '';
  private uniqueSessionId = '';
  startQuestion() {
    this.$gtag.event('start_question_button', { description: '질문 시작' });
    this.questionIndex = 0;
  }
  //다음 컴포넌트로 이동
  onNext(obj?: any) {
    if (obj) {
      const key = Object.keys(obj)[0];
      const value = Object.values(obj)[0];
      this.$set(this.resultRequestDto, key, value);
    }
    this.questionIndex++;
  }

  onLoading(event: boolean) {
    this.isLoading = event;
  }

  created() {
    const urlQuery = location.search;
    if (urlQuery.includes('utm_source=')) {
      this.isUtmSource = true;
    } else {
      this.isUtmSource = false;
    }
  }

  mounted() {
    // this.isLoading = true;
    //get ip address
    axios.get('https://api.ipify.org?format=json').then(res => {
      // this.isLoading = false;
      this.ipAddress = this.resultRequestDto.ipAddress = res.data.ip;
      this.uniqueSessionId = this.resultRequestDto.uniqueSessionId = `${res.data.ip}-${window.navigator.userAgent}`;
    });

    // 재시작
    this.$root.$on('restart', () => {
      this.questionIndex = -1;
      this.questionOrder = 0;
    });
  }

  updated() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
</script>
<style lang="scss">
.app-question {
  ~ [id*='post-code'] {
    .modal-body {
      background: url('../../assets/images/loading.gif') no-repeat center center;
      background-size: 5em 5em;
      min-height: 400px;
    }
  }
  .btn {
    &.btn-light {
      border: 1px solid #004d8a;
      background-color: #fff;
      color: #004d8a;
    }
  }
  .form-group {
    .icon-search {
      cursor: pointer;
      fill: #6c8fb7;
      ~ input[type='text'] {
        padding-right: 3em;
      }
    }
  }
  .progress-bar-rail {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.25em;
    background-color: #fff;
    .progress-bar {
      display: block;
      width: 0;
      height: 100%;
      transition-duration: 0.5s;
      background-color: #6c8fb7;
    }
  }
  .main-article {
    min-height: 100vh;
    &:not(#question-start, #question-result, #question-solution, #question-complete) {
      .btn-back {
        position: fixed;
        left: 0.75em;
        top: 0.75em;
        width: 4em;
        height: 4em;
        background-color: transparent;
        &.btn-light {
          border-color: transparent;
        }
        .icon {
          fill: #6c8fb7;
        }
        &:hover {
          background-color: #6c8fb7;
          .icon {
            fill: #fff;
          }
        }
      }
      .article-header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 5em;
        box-shadow: 0 0.5em 0.5em rgba(0, 0, 0, 0.05);
        h1 {
          width: 7.75em;
          font-size: 1em;
        }
        + .article-content {
          padding: 5em 0;
        }
      }
      .article-section {
        .section-title {
          span {
            display: block;
            margin-bottom: 0.5em;
            img {
              display: block;
              width: 2em;
              margin: 0 auto;
            }
          }
        }
      }
    }
    &#question-start {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      height: 100vh;
      .article-header {
        text-align: center;
        span {
          display: block;
          margin-bottom: 1em;
          img {
            display: block;
            width: 6.25em;
            margin: 0 auto;
          }
        }
        h2 {
          font-size: 2em;
        }
        p {
          font-size: 1em;
          margin-top: 1em;
        }
        .btn-box {
          margin-top: 3.125em;
        }
      }
    }
    &.bg-light {
      .article-section {
        .section-title {
          color: #004d8a;
        }
      }
    }
  }
  .article-section {
    .section-title {
      text-align: center;
      color: #fff;
      h3 {
        font-size: 1.5em;
        font-weight: bold;
        word-break: keep-all;
        + p {
          font-size: 1em;
          margin-top: 1.25em;
        }
      }
      .title-en {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5em;
      }
      + .section-content {
        margin-top: 2em;
      }
      .btn {
        word-break: keep-all;
        line-height: 1.4;
      }
    }
  }
}
</style>
