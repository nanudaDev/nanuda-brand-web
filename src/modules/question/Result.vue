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
          <template
            v-if="resultRequestDto.fnbOwnerStatus === FNB_OWNER.NEW_FNB_OWNER"
          >
            <p>예비사장님의 희망 업종은 <strong>한식</strong> 입니다.</p>
          </template>
          <template v-else>
            <p>사장님의 평균 매출은 <strong>1000~2000만원</strong> 입니다.</p>
          </template>
        </div>
      </div>
    </header>
    <div class="article-content">
      <section class="article-section">
        <div class="container">
          <header class="section-header">
            <h3>
              현재 {{ codeHdongSearchDto.hdongName }} 에서 <br />
              <strong>한식의 매출이 높습니다</strong>
            </h3>
            <p>
              {{ codeHdongSearchDto.hdongName }} 에서는
              <strong>{{ newFnbOwnerPieLabelArrayText }}</strong> 순으로
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
                창업을 시작하기 앞서 <br />{{ codeHdongSearchDto.hdongName }} 의
                상권 현황을 알려 드리겠습니다.
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
                <!-- {{ result }} -->
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

@Component({
  name: 'Result',
  components: { FoodCategoryRatioChart },
})
export default class Result extends BaseComponent {
  [x: string]: any;
  @Prop() readonly result: AggregateResultResponse;
  @Prop() readonly resultRequestDto: ResultRequestDto;
  @Prop() readonly codeHdongSearchDto: CodeHdongSearchDto;

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
    console.log(category);
    this.selectedFoodCategory = category;
    console.log('selectedFoodCategory', this.selectedFoodCategory);
  }

  get newFnbOwnerPieLabelArrayText() {
    return this.result.newFnbOwnerPieChartData.labels.join(', ');
  }

  created() {
    this.getLocationInfoDetail(this.resultRequestDto.hdongCode);
  }
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
}
</style>
