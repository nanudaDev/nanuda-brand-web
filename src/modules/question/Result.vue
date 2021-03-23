<template>
  <article class="main-article" id="question-result">
    <header class="article-header">
      <div class="container">
        <div class="title-box">
          <span>
            <router-link to="/">
              <img src="@/assets/images/logo_w.svg" alt="픽쿡" />
            </router-link>
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
                현재
                <strong class="txt-underline">{{
                  codeHdongSearchDto.hdongName
                }}</strong
                >에서 <br />
                <strong>{{ newFnbBestCategory }}의 매출이 높습니다</strong>
              </h3>
              <p>
                {{ codeHdongSearchDto.hdongName }}에서는
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
                  예비사장님께서 선택한<br />
                  {{ codeHdongSearchDto.hdongName }} 의 상권 현황입니다
                </p>
              </div>
              <button
                class="btn-scroll-down btn-icon"
                v-scroll-to="{ el: '#detail-info', offset: 0 }"
              >
                <span class="icon icon-primary"><BaseArrow /></span>
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
              >은 월 매출 최대
              <strong>{{ result.highestRevenue }}</strong> 만원의 수익이
              발생하고 있으며
              <br />
              평균 월 매출은
              <strong>{{
                Math.round((result.highestRevenue + result.lowestRevenue) / 2)
              }}</strong>
              만원입니다.
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
                  사장님께서 위치한 <br />
                  {{ result.hdong.hdongName }} 의 상권 현황입니다
                </p>
              </div>
              <button
                class="btn-scroll-down"
                v-scroll-to="{ el: '#detail-info', offset: 0 }"
              >
                <span class="icon icon-white"><BaseArrow /></span>
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
              <template
                v-if="resultRequestDto.fnbOwnerStatus === 'NEW_FNB_OWNER'"
              >
                현재
                <strong class="txt-underline">{{
                  codeHdongSearchDto.hdongName
                }}</strong
                >에서의
              </template>
              <template v-else> 내 가게 주변의 </template><br />
              <strong class="txt-underline">시간대별 매출</strong>을
              <br class="d-lg-none" />
              업태 별로 확인하세요
            </h3>
          </header>
          <div class="section-content">
            <p class="txt-box text-center">
              <strong class="txt-bold">
                <strong class="txt-underline">{{
                  codeHdongSearchDto.hdongName
                }}</strong>
                시간대별 매출 추이</strong
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
                      <p>
                        {{
                          timeData.aggregateData[0].medium_category_nm.replace(
                            '커피/음료',
                            '카페',
                          )
                        }}
                        <br />
                        {{ timeData.aggregateData[0].medium_small_category_nm }}
                      </p>
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
              <template
                v-if="resultRequestDto.fnbOwnerStatus === 'NEW_FNB_OWNER'"
              >
                현재
                <strong class="txt-underline">{{
                  codeHdongSearchDto.hdongName
                }}</strong
                >에서의
              </template>
              <template v-else>
                내 가게 주변의
              </template>
              <br />
              <strong class="txt-underline">배달과 매장식사 비중 </strong>을
              <br class="d-lg-none" />업태별로 확인하세요
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
                        ></div>
                        <div class="txt-box">
                          <span
                            >{{
                              !info.deliveryRatio ? 100 : info.offlineRatio
                            }}%</span
                          >
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
                        ></div>
                        <div class="txt-box">
                          <span
                            >{{
                              !info.deliveryRatio ? 0 : info.deliveryRatio
                            }}%</span
                          >
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
                    size="sm"
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
            <!-- <div class="txt-box text-center mt-5">
              <p v-if="result.operationSentenceResponse" class="txt-xl">
                {{ result.operationSentenceResponse }}
              </p>
            </div> -->
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
            params: {
              proformaId: result.proformaId,
            },
          })
        "
      >
        <span>내게 맞는 시간대별 메뉴 보러가기</span>
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
        // console.log(this.selectedFoodCategory, this.locationDetailInfo);
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
          font-size: 1.875em;
          line-height: 1.6;
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
  .chart-container {
    position: relative;
    overflow: hidden;
    canvas {
      transform: scaleX(1.05);
    }
  }
}
</style>
