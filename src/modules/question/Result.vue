<template>
  <article class="main-article" id="question-result">
    <header class="article-header">
      <div class="container">
        <div class="title-box">
          <span>
            <img src="@/assets/images/logo_w.svg" alt="픽쿡" />
          </span>
          <h2>
            맞춤 진단 결과
          </h2>
        </div>
        <div class="txt-box">
          <p>예비사장님의 희망 업종은 <strong>한식</strong> 입니다.</p>
        </div>
      </div>
    </header>
    <div class="article-content">
      <section class="article-section">
        <div class="container">
          <header class="section-header">
            <h3>
              현재 상권에서 <br />
              <strong>한식의 매출이 높습니다</strong>
            </h3>
            <p>
              논현동에서는 한식, 분식, 중식, 일식, 치킨순으로 <br />매출이
              높습니다.
            </p>
          </header>
          <div class="section-content">
            <!-- 차트 영역 -->
            <div style="padding-bottom:56.25%" class="bg-light"></div>
            <div class="txt-box text-center mt-5">
              <p class="txt-lg text-primary">
                창업을 시작하기 앞서 <br />논현동의 상권 현황을 알려
                드리겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="article-section bg-light">
        <div class="container">
          <header class="section-header">
            <h3>
              우선 메뉴에 따라 다른 <br />
              <strong>시간대의 매출을 확인하세요</strong>
            </h3>
          </header>
          <div class="section-content">
            <p class="txt-box text-center">
              논현동 시간대별 매출 추이
            </p>
            <div class="complete-time-box mt-5">
              <div class="row no-gutters">
                <div
                  v-for="timeData in result.completeTimeData"
                  :key="timeData.hour"
                  :style="`width:${100 / result.completeTimeData.length}%`"
                >
                  <div class="time-label">
                    {{ timeData.hour }}
                  </div>
                  <div class="time-menu">
                    <template v-if="timeData.aggregateData[0]">
                      {{ timeData.aggregateData[0].medium_small_category_nm }}
                    </template>
                  </div>
                </div>
                <!-- {{ result }} -->
              </div>
            </div>
            <div class="txt-box text-center mt-4" v-if="result.responses[0]">
              <p class="txt-xl">
                {{ result.responses[0].koreanPrefSentence }}
                <strong class="text-primary">{{
                  result.responses[0].modifiedSufSentence
                }}</strong>
                의 <br />
                매출이 높습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="article-section">
        <div class="container">
          <header class="section-header">
            <h3>
              그리고 메뉴에 따라 다른<br />
              <strong>매장과 배달의 소비현황</strong>을 <br />확인하세요
            </h3>
          </header>
          <div class="section-content">
            <p class="text-center">
              메뉴별 매장/배달 소비 현황
            </p>
            <div class="complete-time-box mt-5">
              <div class="row no-gutters">
                <div style="width:50%">
                  <div class="time-label">
                    매장 식사 비중
                  </div>
                  <div class="time-menu">
                    <div class="percent-box"></div>
                  </div>
                </div>
                <div style="width:50%">
                  <div class="time-label">
                    배달 주문 비중
                  </div>
                  <div class="time-menu">
                    <div class="percent-box"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="txt-box text-center mt-5">
              <p v-if="result.operationSentenceResponse" class="txt-xl">
                {{ result.operationSentenceResponse }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <b-btn variant="primary" block size="lg" class=" rounded-0">
        내게 맞는 솔루션 보러가기
      </b-btn>
    </div>
  </article>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { AggregateResultResponse } from '@/dto/question/aggregate-result-response.dto';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'Result',
})
export default class Result extends BaseComponent {
  @Prop() readonly result: AggregateResultResponse;
}
</script>

<style lang="scss">
.app-question {
  #question-result {
    word-break: keep-all;
    .article-header {
      padding: 2em 0;
      color: #fff;
      h2 {
        font-size: 1em;
        font-weight: 600;
      }
      span {
        img {
          width: 5.625em;
        }
      }
      .txt-box {
        margin-top: 5em;
        text-align: right;
        p {
          font-size: 0.75em;
          strong {
            font-size: 2em;
            font-weight: 700;
          }
        }
      }
      background: rgb(11, 83, 141);
      background: -moz-linear-gradient(
        360deg,
        rgba(11, 83, 141, 1) 0%,
        rgba(108, 143, 183, 1) 100%
      );
      background: -webkit-linear-gradient(
        360deg,
        rgba(11, 83, 141, 1) 0%,
        rgba(108, 143, 183, 1) 100%
      );
      background: linear-gradient(
        360deg,
        rgba(11, 83, 141, 1) 0%,
        rgba(108, 143, 183, 1) 100%
      );
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0b538d",endColorstr="#6c8fb7",GradientType=1);
    }
    .article-section {
      padding: 6.25em 0;
      .section-header {
        text-align: center;
        color: #0b538d;
        h3 {
          font-weight: 200;
          strong {
            font-weight: 600;
          }
        }
        p {
          font-size: 0.875em;
          margin-top: 3em;
          color: #878787;
        }
      }
      .section-content {
        margin-top: 2.5em;
      }
    }
  }
  .complete-time-box {
    .row {
      > div {
        + div {
          border-left: 1px solid #0b538d;
        }
        .time-label {
          height: 2em;
          font-size: 0.875em;
          color: #020202;
          text-align: center;
          border-bottom: 1px solid #0b538d;
        }
        .time-menu {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 5.875em;
        }
      }
    }
  }
}
</style>
