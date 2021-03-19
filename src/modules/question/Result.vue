<template>
  <article class="main-article" id="question-result" v-if="!isSolution">
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
          <template v-if="resultRequestDto.fnbOwnerStatus === 'NEW_FNB_OWNER'">
            <p>
              예비사장님의 희망 업종은
              <strong>{{
                resultRequestDto.kbFoodCategory | enumTransformer
              }}</strong>
              입니다
            </p>
          </template>
          <template v-else>
            <p>입력해주신 매출을 기준으로 산정하였습니다</p>
          </template>
        </div>
      </div>
    </header>
    <div class="article-content">
      <!-- 신규 창업자 차트 -->
      <template v-if="resultRequestDto.fnbOwnerStatus === 'NEW_FNB_OWNER'">
        <section class="article-section" v-if="result.newFnbOwnerPieChartData">
          <div class="container">
            <header class="section-header">
              <h3>
                현재 {{ codeHdongSearchDto.hdongName }} 에서 <br />
                <strong>{{ newFnbBestCategory }}의 매출이 높습니다</strong>
              </h3>
              <p>
                {{ codeHdongSearchDto.hdongName }} 에서는
                <strong>{{ newFnbOwnerCategoryList }}</strong> 순으로
                <br />매출이 높습니다.
              </p>
            </header>
            <div class="section-content">
              <!-- 차트 영역 -->
              <div>
                <FoodCategoryRatioChart
                  :chartData="result.newFnbOwnerPieChartData"
                  style="height:600px"
                />
              </div>
              <div class="txt-box text-center mt-5">
                <p class="txt-lg txt-primary">
                  창업을 시작하기 앞서 <br />{{ codeHdongSearchDto.hdongName }}
                  의 상권 현황을 알려 드리겠습니다.
                </p>
              </div>
              <button
                class="btn-scroll-down"
                v-scroll-to="{ el: '#detail-info', offset: 0 }"
              >
                <BaseArrow />
              </button>
            </div>
          </div>
        </section>
      </template>
      <!-- 기존 창업자 차트 -->
      <template v-else>
        <section class="article-section pb-0">
          <header class="section-header">
            <h3>
              상권 평균 매출보다 <br />
              <strong>{{ result.revenueGradeSentence }}</strong>
            </h3>
            <p>
              <strong>{{ result.hdong.hdongName }}</strong
              >은 월 매출 최대 <strong>{{ result.highestRevenue }}</strong
              >만원의 수익이 발생하고 있으며
              <br />
              평균 월 매출은
              <strong>{{
                Math.round((result.highestRevenue + result.lowestRevenue) / 2)
              }}</strong
              >만원입니다.
            </p>
          </header>
          <div class="section-content">
            <!-- 차트 영역 -->
            <div class="chart-container">
              <ResultRevenueChart
                :chartData="result.curFnbOwnerLineChartData"
              />
            </div>
            <div class="bg-gradient">
              <div class="txt-box text-center">
                <p class="txt-lg">
                  창업을 시작하기 앞서 <br />{{ codeHdongSearchDto.hdongName }}
                  의 상권 현황을 알려 드리겠습니다.
                </p>
              </div>
              <button
                class="btn-scroll-down"
                v-scroll-to="{ el: '#detail-info', offset: 0 }"
              >
                <BaseArrow />
              </button>
            </div>
          </div>
        </section>
      </template>
      <!-- 공통 정보 -->
      <section class="article-section bg-light" id="detail-info">
        <div class="container">
          <header class="section-header">
            <h3>
              우선 메뉴에 따라 다른 <br />
              <strong class="txt-underline">시간대의 매출을 확인하세요</strong>
            </h3>
          </header>
          <div class="section-content">
            <p class="txt-box text-center">
              <strong class="txt-bold"
                >{{ codeHdongSearchDto.hdongName }} 시간대별 매출 추이</strong
              >
            </p>
            <div class="complete-time-box mt-5">
              <div class="row no-gutters">
                <div
                  v-for="timeData in result.completeTimeData"
                  :key="timeData.hour"
                  :style="`width:${100 / result.completeTimeData.length}%`"
                >
                  <div class="label-box">
                    {{ timeData.hour | enumTransformer }}
                  </div>
                  <div class="cont-box">
                    <template v-if="timeData.aggregateData[0]">
                      {{ timeData.aggregateData[0].medium_small_category_nm }}
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="txt-box text-center mt-4" v-if="result.responses[0]">
              <p class="txt-xl">
                {{ result.responses[0].koreanPrefSentence }}
                <strong class="txt-primary">{{
                  result.responses[0].modifiedSufSentence
                }}</strong>
                의 <br />
                매출이 높습니다.
              </p>
            </div> -->
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
            <div class="mt-5">
              <div
                class="complete-time-box"
                v-for="(info, index) in locationDetailInfo"
                :key="index"
              >
                <template
                  v-if="info.mediumCategoryName == selectedFoodCategory"
                >
                  <div class="row no-gutters">
                    <div style="width:50%">
                      <div class="label-box">
                        매장 식사 비중
                      </div>
                      <div class="cont-box">
                        <div
                          class="percent-box offline-ratio"
                          :style="
                            `width: ${
                              !info.deliveryRatio ? 100 : info.offlineRatio
                            }%`
                          "
                        >
                          <!-- {{ info.offlineRatio }} -->
                        </div>
                      </div>
                    </div>
                    <div style="width:50%">
                      <div class="label-box">
                        배달 주문 비중
                      </div>
                      <div class="cont-box">
                        <div
                          class="percent-box delivery-ratio"
                          :style="
                            `width: ${
                              !info.deliveryRatio ? 0 : info.deliveryRatio
                            }%`
                          "
                        >
                          <!-- {{ info.deliveryRatio }} -->
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div class="best-food-category mt-4">
              <div class="row gutter-sm">
                <div
                  class="col-4 col-sm-3 mb-3"
                  v-for="info in locationDetailInfo"
                  :key="info.mediumCategoryName"
                >
                  <b-btn
                    :variant="
                      info.mediumCategoryName === selectedFoodCategory
                        ? 'primary'
                        : 'light'
                    "
                    pill
                    block
                    @click="getCategory(info.mediumCategoryName)"
                  >
                    {{ info.mediumCategoryName }}
                  </b-btn>
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
      <b-btn
        variant="primary"
        block
        size="lg"
        class=" rounded-0"
        @click="isSolution = true"
      >
        <span>내게 맞는 솔루션 보러가기</span>
        <span class="icon icon-arrow-right"><BaseArrow /></span>
      </b-btn>
    </div>
  </article>
  <article class="main-article" id="question-solution" v-else>
    <header class="article-header">
      <div class="container">
        <span>
          <img src="@/assets/images/logo_w.svg" alt="픽쿡" />
        </span>
        <h2>
          {{ resultRequestDto.fnbOwnerStatus | enumTransformer }}에게 딱 맞는
          전략을 <br />소개합니다
        </h2>
      </div>
    </header>
    <div class="article-content">
      <section class="bg-light">
        <div class="complete-time-box">
          <div class="row no-gutters">
            <div
              v-for="timeData in result.completeTimeData"
              :key="timeData.hour"
              :style="`width:${100 / result.completeTimeData.length}%`"
            >
              <div class="label-box">
                {{ timeData.hour | enumTransformer }}
              </div>
              <div class="cont-box">
                <template v-if="timeData.aggregateData[0]">
                  {{ timeData.aggregateData[0].medium_small_category_nm }}
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="article-section section01 bg-primary">
        <div class="container">
          <div class="row-box">
            <h4>
              메뉴 전략
            </h4>
            <p>
              점심에는 한식의 국/탕류 저녁에는 분식의 국물류 메뉴를 추가하면 더
              큰 수익을 기대할 수 있습니다.
            </p>
          </div>
          <div class="row-box">
            <h4>
              운영 전략
            </h4>
            <p>
              홀 고객이 적은 시간에 배달을 추가해 영업 시간을 활용하면 좋은
              지역입니다.
            </p>
          </div>
          <div class="btn-box text-center mt-5 pt-5">
            <p>
              예비사장님의 상권분석 및 진단이 <br />
              완료되었습니다.
            </p>
          </div>
          <button
            class="btn-scroll-down"
            v-scroll-to="{ el: '#detail-info', offset: 0 }"
          >
            <BaseArrow />
          </button>
        </div>
      </section>
      <section class="article-section section02" id="detail-info">
        <div class="container">
          <div class="card p-4 shadow-sm rounded-lg">
            <div class="row-box">
              <div class="img-box">
                <img src="@/assets/images/icon_solution_01.svg" alt="" />
              </div>
              <div class="dscr-box">
                <h4>
                  우리 매장에 맞는 메뉴 추천
                </h4>
                <p>
                  창업지역의 정밀한 상권분석 결과로 <br />
                  딱 맞는 메뉴를 추천드립니다.
                </p>
              </div>
            </div>
            <div class="row-box">
              <div class="img-box">
                <img src="@/assets/images/icon_solution_02.svg" alt="" />
              </div>
              <div class="dscr-box">
                <h4>
                  운영할 메뉴선택과 서비스 제공
                </h4>
                <p>
                  추가 인력 필요 없는 간편한 메뉴, 홍보물등 <br />
                  부가 서비스를 한 번에 제공합니다.
                </p>
              </div>
            </div>
            <div class="row-box">
              <div class="img-box">
                <img src="@/assets/images/icon_solution_03.svg" alt="" />
              </div>
              <div class="dscr-box">
                <h4>
                  매월 상권리포트 제공
                </h4>
                <p>
                  매월 상권 데이터를 통해, 트렌드에 맞춘 <br />메뉴 추천 및 운영
                  플랜을 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="article-section section03 bg-light">
        <div class="container">
          <div class="row-box">
            <div class="img-box">
              <img src="@/assets/images/icon_logo_symbol.png" />
            </div>
            <div class="txt-box">
              <h4>이용자 후기</h4>
              <p>
                메뉴 선정하고 7일만에 매장에서 판매하였는데, <br />점심에 방문
                고객이 훨씬 늘어났어요!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="article-section section04">
        <div class="section-content">
          <div class="container">
            <!-- 폼 영역 -->
            폼 영역
            <!-- // 폼 영역 -->
          </div>
        </div>
      </section>
      <b-btn
        variant="primary"
        block
        size="lg"
        class=" rounded-0"
        @click="
          $router.push({
            name: 'solution',
            params: { proformaId: result.proformaId },
          })
        "
      >
        <span>픽쿡 플래너 만나기</span>
        <span class="icon icon-arrow-right"><BaseArrow /></span>
      </b-btn>
    </div>
  </article>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { AggregateResultResponse } from '@/dto/question/aggregate-result-response.dto';
import { Component, Prop } from 'vue-property-decorator';
import LocationAnalysisService from '@/services/location-analysis.service';
import {
  BEST_FOOD_CATEGORY,
  CONST_BEST_FOOD_CATEGORY,
  CONST_OPERATION_TIME_CATEGORY,
  OPERATION_TIME_CATEGORY,
  FNB_OWNER,
} from '@/shared';
import { ResultRequestDto } from '@/dto/question';
import { CodeHdongSearchDto } from '@/dto/code-hdong';
import FoodCategoryRatioChart from '@/modules/_components/charts/FoodCategoryRatioChart.vue';
import ResultRevenueChart from '@/modules/_components/charts/ResultRevenueChart.vue';

@Component({
  name: 'Result',
  components: { FoodCategoryRatioChart, ResultRevenueChart },
})
export default class Result extends BaseComponent {
  [x: string]: any;
  @Prop() readonly result: AggregateResultResponse;
  @Prop() readonly resultRequestDto: ResultRequestDto;
  @Prop() readonly codeHdongSearchDto: CodeHdongSearchDto;

  private isSolution = false;
  private selectedFoodCategory = '';
  private bestFoodCategory: BEST_FOOD_CATEGORY[] = [
    ...CONST_BEST_FOOD_CATEGORY,
  ];
  private operationTimeCAtegory: OPERATION_TIME_CATEGORY[] = [
    ...CONST_OPERATION_TIME_CATEGORY,
  ];
  private locationDetailInfo: any = [];

  // 해당 상권 베스트5 업종 매출&홀 비율
  getLocationInfoDetail(hdongCode: string): void {
    LocationAnalysisService.getLocationInfoDetail(hdongCode).subscribe(res => {
      if (res) {
        let filterArray = [...Object.values(res.data)];
        filterArray = filterArray.filter((arr: any) => {
          for (const filter of this.bestFoodCategory) {
            if (arr.mediumCategoryName.includes(filter)) {
              return true;
            }
          }
        });
        // filterArray = filterArray.filter((arr: any) => {
        //   if (arr.deliveryRatio && arr.offlineRatio) {
        //     return true;
        //   }
        // });
        this.selectedFoodCategory = filterArray[0].mediumCategoryName;
        this.locationDetailInfo = filterArray.splice(0, 5);
        console.log(this.selectedFoodCategory, this.locationDetailInfo);
      }
    });
  }

  getCategory(category: string) {
    this.selectedFoodCategory = category;
  }

  get newFnbBestCategory() {
    return this.result.newFnbOwnerPieChartData.labels[0];
  }

  get newFnbOwnerCategoryList() {
    return this.result.newFnbOwnerPieChartData.labels.join(', ');
  }

  created() {
    this.getLocationInfoDetail(this.resultRequestDto.hdongCode);
  }
}
</script>

<style lang="scss">
.app-question {
  .bg-gradient {
    background: #0b538d;
    background: rgb(11, 83, 141);
    background: -moz-linear-gradient(
      360deg,
      rgba(11, 83, 141, 1) 0%,
      rgba(30, 104, 155, 1) 100%
    );
    background: -webkit-linear-gradient(
      360deg,
      rgba(11, 83, 141, 1) 0%,
      rgba(30, 104, 155, 1) 100%
    );
    background: linear-gradient(
      360deg,
      rgba(11, 83, 141, 1) 0%,
      rgba(30, 104, 155, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0b538d",endColorstr="#1e689b",GradientType=1);
    padding-top: 3.25em;
    padding-bottom: 6.25em;
    color: #fff;
  }
  #question-result {
    word-break: keep-all;
    .btn-scroll-down {
      position: absolute;
      left: 50%;
      margin-left: -0.75em;
      bottom: 3em;
      z-index: 2;
      animation: animated-mouse 1s ease-in-out infinite;
      svg {
        width: 1.5em;
        height: 1.5em;
        fill: #fff;
      }
    }
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
      position: relative;
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
        .label-box {
          padding: 1em 0;
          font-size: 0.875em;
          color: #020202;
          text-align: center;
          border-bottom: 1px solid #0b538d;
          background-color: #f9f9f9;
        }
        .cont-box {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 5.875em;
        }
        .percent-box {
          height: 100%;
          &.offline-ratio {
            background: rgb(167, 189, 211);
            background: linear-gradient(
              90deg,
              rgba(167, 189, 211, 1) 0%,
              rgba(28, 77, 134, 1) 35%
            );
            margin-left: auto;
          }
          &.delivery-ratio {
            background: rgb(221, 176, 40);
            background: linear-gradient(
              90deg,
              rgba(221, 176, 40, 1) 0%,
              rgba(232, 215, 145, 1) 35%
            );
            margin-right: auto;
          }
        }
      }
    }
  }

  .chart-container {
    position: relative;
    overflow: hidden;
    canvas {
      transform: scaleX(1.05);
    }
  }

  #question-solution {
    .btn-scroll-down {
      position: absolute;
      left: 50%;
      margin-left: -0.75em;
      bottom: 3em;
      z-index: 2;
      animation: animated-mouse 1s ease-in-out infinite;
      svg {
        width: 1.5em;
        height: 1.5em;
        fill: #fff;
      }
    }
    .article-header {
      background-color: #004d8a;
      text-align: center;
      padding: 3em 0;
      color: #fff;
      height: auto;
      span {
        display: block;
        margin-bottom: 0.5em;
        img {
          width: 6.5em;
        }
      }
      h2 {
        font-size: 1.375em;
      }
    }
    .article-section {
      position: relative;
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
      &.section01 {
        color: #fff;
        .row-box {
          + .row-box {
            margin-top: 10em;
          }
          h4 {
            font-size: 0.875em;
            margin-bottom: 1em;
          }
          p {
            font-size: 1.5em;
          }
        }
      }
      &.section02 {
        .row-box {
          display: flex;
          + .row-box {
            margin-top: 3em;
          }
          .img-box {
            width: 5em;
            text-align: center;
            img {
              height: 3.75em;
            }
          }
          .dscr-box {
            h4 {
              font-size: 0.875em;
              font-weight: 600;
              color: #004d8a;
              margin-bottom: 0.5em;
            }
            p {
              font-size: 0.75em;
              color: #000000;
              line-height: 1.6;
            }
          }
        }
      }
      &.section03 {
        .row-box {
          display: flex;
          align-items: center;
          justify-content: center;
          .img-box {
            width: 20em;
            text-align: center;
            img {
              border-radius: 50%;
              box-shadow: 0 0 1em rgba(0, 0, 0, 0.05);
              width: 50%;
            }
          }
          .txt-box {
            text-align: left;
            color: #004d8a;
            h4 {
              font-size: 0.875em;
              font-weight: 600;
              margin-bottom: 0.5em;
            }
            p {
              font-size: 0.75em;
            }
          }
        }
      }
    }
  }
}
</style>
