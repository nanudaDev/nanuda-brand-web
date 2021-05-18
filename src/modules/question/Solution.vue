<template>
  <article class="main-article" id="question-solution" v-if="result">
    <header class="article-header">
      <div class="container">
        <h2>
          <router-link to="/">
            <img src="@/assets/images/logo.svg" alt="픽쿡" class="logo w-15" />
          </router-link>
        </h2>
        <p v-if="result.hdong" class="txt-primary">
          <b-icon icon="geo-alt-fill" class="txt-lightblue" />
          {{ result.hdong.hdongName }}
        </p>
      </div>
    </header>
    <div class="article-content bg-light">
      <div class="container">
        <template v-if="result.fnbOwnerStatus !== 'NEW_FNB_OWNER'">
          <section class="article-section ">
            <div class="card card-revenue bg-primary">
              <div class="card-header">
                <h4>
                  <span class="txt-white">
                    추천 아이템으로 <br />
                    <strong>추가 매출</strong>을 올려보세요!
                  </span>
                </h4>
              </div>
              <div class="section-content">
                <p class="txt-white">
                  월 최소 추가 매출액
                </p>
                <div class="odometer-container my-1">
                  <div class="odometer-box ">
                    <span class="odometer-count">
                      <vue-odometer :value="revenueCount"> </vue-odometer>
                    </span>
                    <span class="odometer-unit">원</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="txt-box txt-right">
              <p class="txt-small txt-lightblue">
                ※ 상기 금액은 추천아이템에 따라 다를 수 있습니다.
              </p>
            </div>
          </section>
          <section class="article-section" ref="tooltipWrapper">
            <b-row>
              <b-col cols="12" lg="6" v-if="selectedMenu">
                <div
                  class="card card-selected-menu p-0 mb-4"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div class="p-6">
                    <div class="card-header">
                      <h4>
                        사장님 가게에 딱 맞는 <br />
                        <strong>추천아이템</strong>이에요!
                      </h4>
                      <div class="mt-2 txt-right">
                        <div class="tooltip-container">
                          <span
                            class="tooltip-label tooltip-right d-inline-flex align-items-center"
                            @click="isTooltipVislble = !isTooltipVislble"
                          >
                            <span
                              class="d-inline-block txt-tiny txt-gray-400 mr-2"
                              >추천지수</span
                            >
                            <b-icon icon="question-circle"></b-icon>
                          </span>
                          <div class="tooltip-content" v-if="isTooltipVislble">
                            <p class="txt-small">
                              빅데이터 상권지수와 입력하신 조리경험, 운영경험,
                              창업자금을 종합하여 반영한 수치입니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        class="card-img mt-4 mb-6"
                        v-if="selectedMenu.sSmallCategoryCode"
                      >
                        <div
                          data-aos="fade-right"
                          data-aos-duration="1000"
                          data-aos-delay="300"
                          class="img-mask"
                        >
                          <b-img-lazy
                            :src="
                              `https://kr.object.ncloudstorage.com/common-storage-pickcook/menu/${selectedMenu.sSmallCategoryCode}.jpg`
                            "
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="card-badge">
                          <b-badge pill variant="primary">최고적합률</b-badge>
                          <b-badge pill variant="secondary">{{
                            selectedMenu.pickcookSmallCategoryInfo
                              .pkMediumCategoryName
                          }}</b-badge>
                          <b-badge pill variant="outline-secondary">{{
                            selectedMenu.pickcookSmallCategoryInfo
                              .pkSmallCategoryName
                          }}</b-badge>
                        </div>
                        <h4 class="card-title">
                          {{
                            selectedMenu.pickcookSmallCategoryInfo.pkMenuName
                          }}
                        </h4>
                        <p class="card-text">
                          <b-icon icon="graph-up"></b-icon>
                          <span class="mx-1"
                            >추천지수
                            <strong class="txt-primary"
                              >{{
                                Math.round(selectedMenu.appliedFitnessScore)
                              }}%</strong
                            ></span
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="btn-more-menu"
                    @click="isOhterMenuVislble = true"
                    v-if="!isOhterMenuVislble && !isOverlayVisible"
                  >
                    <div
                      class="d-flex align-itmes-center justify-content-between"
                    >
                      <p class="txt-black">
                        선택하신 업종과
                        <strong class="txt-bold">다른 추천 아이템</strong>
                      </p>
                      <span>더보기 +</span>
                    </div>
                  </div>
                  <div
                    class="btn-more-detail"
                    @click.stop="
                      onToggleOverlay('current-selected-menu', $event)
                    "
                  >
                    <span class="txt-tiny is-blind">자세히 보기</span>
                    <span class="icon-toggle-plus">
                      <b-icon icon="plus"></b-icon>
                    </span>
                    <!-- tooltip -->
                    <transition name="fadeIn">
                      <div
                        class="tooltip-container"
                        v-if="isDetailInfoTooltipVisible"
                      >
                        <div class="tooltip-content">
                          <p class="txt-small">
                            + 버튼을 클릭하면 <br />자세한 정보를 알 수 있습니다
                            <b-icon
                              icon="x-circle-fill"
                              class="ml-2 txt-large"
                              @click.stop="isDetailInfoTooltipVisible = false"
                            ></b-icon>
                          </p>
                        </div>
                      </div>
                    </transition>
                  </div>
                  <transition name="fadeIn">
                    <div class="card-overlay" id="current-selected-menu">
                      <div class="inner-box">
                        <h4>추천지수</h4>
                        <p>
                          빅데이터 상권지수({{
                            selectedMenu.bigDataLocationScore
                          }}%)와 조리경험 ({{
                            selectedMenu.cookingExperienceScore
                          }}%), 운영경험({{
                            selectedMenu.operationExperienceScore
                          }}%), 창업자금({{ selectedMenu.initialCostScore }}%)을
                          종합하였을때
                          <strong class="txt-lightblue txt-bold">
                            가장 추천하는 아이템</strong
                          >
                          입니다.
                        </p>
                      </div>
                    </div>
                  </transition>
                </div>
              </b-col>
              <b-col cols="12" lg="6">
                <!-- <div class="d-none d-lg-block">
                  <h4 class="txt-black txt-bold mb-4 txt-large">
                    <b-icon icon="bookmark-fill" class="txt-primary"></b-icon>
                    선택하신 업종과 다른 추천 아이템입니다
                  </h4>
                </div> -->
                <template v-if="isOhterMenuVislble && otherMenu.length > 0">
                  <div
                    class="card flex-row"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    :data-aos-delay="300 * index"
                    v-for="(item, index) in otherMenu"
                    :key="index"
                  >
                    <div class="card-img-left" v-if="item.sSmallCategoryCode">
                      <b-img-lazy
                        :src="
                          `https://kr.object.ncloudstorage.com/common-storage-pickcook/menu/${item.sSmallCategoryCode}.jpg`
                        "
                        alt=""
                      />
                    </div>
                    <div class="card-body">
                      <div class="card-badge">
                        <b-badge pill variant="blue" v-if="index === 0"
                          >적합률높음</b-badge
                        >
                        <b-badge pill variant="lightblue" v-if="index === 1"
                          >적합률보통</b-badge
                        >
                        <b-badge pill variant="secondary">{{
                          item.pickcookSmallCategoryInfo.pkMediumCategoryName
                        }}</b-badge>
                        <b-badge pill variant="outline-secondary">{{
                          item.pickcookSmallCategoryInfo.pkSmallCategoryName
                        }}</b-badge>
                      </div>
                      <h4 class="card-title">
                        {{ item.pickcookSmallCategoryInfo.pkMenuName }}
                      </h4>
                      <p class="card-text">
                        <b-icon icon="graph-up"></b-icon>
                        <span class="mx-1"
                          >추천지수
                          <strong class="txt-primary"
                            >{{ Math.round(item.appliedFitnessScore) }}%</strong
                          ></span
                        >
                      </p>
                    </div>
                    <!-- <div
                      class="btn-more-detail"
                      @click="onToggleOverlay(`other-menu-${index}`, $event)"
                    >
                      <span class="txt-tiny is-blind">자세히 보기</span>
                      <span class="icon-toggle-plus">
                        <b-icon icon="plus"></b-icon>
                      </span>
                    </div> -->
                    <div class="card-overlay" :id="`other-menu-${index}`">
                      <div class="inner-box">
                        <p class="txt-medium">
                          빅데이터 상권지수({{ item.bigDataLocationScore }}%)와
                          조리경험 ({{ item.cookingExperienceScore }}%),
                          운영경험({{ item.operationExperienceScore }}%),
                          창업자금({{ item.initialCostScore }}%)을 종합하였을때
                          <strong class="txt-lightblue txt-bold">
                            추천하는 아이템</strong
                          >
                          입니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </template>
              </b-col>
            </b-row>
            <div class="row-box mt-4">
              <div class="card" data-aos="fade-up" data-aos-duration="1000">
                <div class="card-header txt-sm-center">
                  <h4>
                    <template
                      v-if="
                        result.deliveryOrRestaurantType === onlyDeliveryType
                      "
                    >
                      <template v-if="result.deliveryRatio > 30">
                        <strong> 배달 주문량</strong>이 많은 지역입니다<br />
                        창업 아이템을 <strong>배달로 추가</strong>하세요
                      </template>
                      <template v-else-if="result.deliveryRatio < 30">
                        <strong>배달 주문량</strong>이 낮은 지역입니다<br />
                        창업 아이템을
                        <strong>배달로 추가 또는 변경</strong>하세요
                      </template>
                      <template v-else>
                        <strong>배달과 매장 주문량</strong>이 비슷합니다<br />
                        창업 아이템을
                        <strong>배달로 추가 또는 변경</strong>하세요
                      </template>
                    </template>
                    <template v-else>
                      <template v-if="result.deliveryRatio > 30">
                        <strong> 배달 주문량</strong>이 많은 지역입니다<br />
                        창업 아이템을 <strong>배달로 추가</strong>하세요
                      </template>
                      <template v-else-if="result.deliveryRatio < 30">
                        <strong>매장 주문량</strong>이 많은 지역입니다<br />
                        창업 아이템을 <strong>매장에 추가</strong>하세요
                      </template>
                      <template v-else>
                        <strong>배달과 매장 주문량</strong>이 비슷합니다<br />
                        창업 아이템을
                        <strong>매장이나 배달로 추가</strong>하세요
                      </template>
                    </template>
                  </h4>
                </div>
                <div class="card-body">
                  <div
                    class="d-flex align-items-center justify-content-between max-w-40 my-15 mx-auto"
                  >
                    <template v-if="result.deliveryRatio > 30">
                      <b-img-lazy
                        src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/icon_delivery.svg"
                        class="w-20"
                      ></b-img-lazy>
                      <div class="txt-center">
                        <span class="txt-black">배달주문량</span>
                        <p class="txt-giant txt-primary txt-bolder">
                          높음
                        </p>
                      </div>
                    </template>
                    <template v-else-if="result.deliveryRatio < 30">
                      <template
                        v-if="
                          result.deliveryOrRestaurantType === onlyDeliveryType
                        "
                      >
                        <b-img-lazy
                          src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/icon_delivery.svg"
                          class="w-20"
                        ></b-img-lazy>
                        <div class="txt-center">
                          <span class="txt-black">배달주문량</span>
                          <p class="txt-giant txt-primary txt-bolder">
                            낮음
                          </p>
                        </div>
                      </template>
                      <template v-else>
                        <b-img-lazy
                          src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/icon_restaurant.svg"
                          class="w-20"
                        ></b-img-lazy>
                        <div class="txt-center">
                          <span class="txt-black">매장주문량</span>
                          <p class="txt-giant txt-primary txt-bolder">
                            높음
                          </p>
                        </div>
                      </template>
                    </template>
                    <template v-else>
                      <b-img-lazy
                        src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/icon_delivery.svg"
                        class="w-20"
                      ></b-img-lazy>
                      <div class="txt-center">
                        <span class="txt-black">배달주문량</span>
                        <p class="txt-giant txt-primary txt-bolder">
                          보통
                        </p>
                      </div>
                    </template>
                  </div>
                </div>
                <div
                  class="btn-more-detail"
                  @click="onToggleOverlay('delivery-ratio', $event)"
                >
                  <span class="txt-tiny is-blind">자세히 보기</span>
                  <span class="icon-toggle-plus">
                    <b-icon icon="plus"></b-icon>
                  </span>
                </div>
                <transition name="fadeIn">
                  <div class="card-overlay" id="delivery-ratio">
                    <div class="inner-box">
                      <h4>추천 영업방법</h4>
                      <p>
                        강남, 관악 등 배달 주요 상권을 기준으로 매장과 배달
                        주문량을 비교하여 영업 방법을 추천하였습니다.
                      </p>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
            <!-- <div class="card p-5 shadow-sm">
              <div data-aos="fade-in" data-aos-duration="1000">
                <div class="chart-container chart-horizontal-stacked">
                  <div class="chart-bars">
                    <div
                      class="chart-bar chart-bar-restaurant"
                      :style="{
                        width: result.deliveryRatioData.restaurantRatio + '%',
                      }"
                    >
                      <span class="bar-label">매장</span>
                      <div class="bar-stack">
                        <span class="bar-percent"
                          >{{ result.deliveryRatioData.restaurantRatio }}%</span
                        >
                      </div>
                    </div>
                    <div
                      class="chart-bar chart-bar-delivery"
                      :style="{
                        width: result.deliveryRatioData.deliveryRatio + '%',
                      }"
                    >
                      <span class="bar-label">배달</span>
                      <div class="bar-stack">
                        <span class="bar-percent"
                          >{{ result.deliveryRatioData.deliveryRatio }}%</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="txt-box mt-3">
                  <p class="info-tip txt-tiny">
                    <span class="icon-tip">TIP</span>
                    <span>
                      <template
                        v-if="result.fnbOwnerStatus === 'NEW_FNB_OWNER'"
                      >
                        창업 아이템으로
                        <strong>
                          <template
                            v-if="result.deliveryRatioData.deliveryRatio > 30"
                          >
                            위험이 낮은 공유주방
                          </template>
                          <template
                            v-else-if="
                              result.deliveryRatioData.deliveryRatio < 30
                            "
                          >
                            매장이 있는 공유주방
                          </template>
                          <template v-else>
                            유동인구가 많은 상가에서
                          </template>
                        </strong>
                        창업을 추천드립니다.
                      </template>
                      <template v-else>
                        창업 아이템을
                        <strong>
                          <template
                            v-if="result.deliveryRatioData.deliveryRatio > 30"
                          >
                            배달 판매하여
                          </template>
                          <template
                            v-else-if="
                              result.deliveryRatioData.deliveryRatio < 30
                            "
                          >
                            매장에 추가하여
                          </template>
                          <template v-else>
                            배달 또는 메뉴 추가로
                          </template>
                        </strong>
                        매출을 올릴 수 있습니다.
                      </template>
                    </span>
                  </p>
                </div>
              </div>
            </div> -->
          </section>
        </template>
        <template v-else>
          <section
            class="article-section"
            v-if="result.rankDataWCScore"
            ref="tooltipWrapper"
          >
            <b-row>
              <b-col cols="12" lg="6" v-if="result.rankDataWCScore[0]">
                <!-- <div class="mb-2 txt-right">
                  <div class="tooltip-container">
                    <span
                      class="tooltip-label tooltip-right d-inline-flex align-items-center txt-medium"
                      @click="isTooltipVislble = !isTooltipVislble"
                    >
                      <span class="d-inline-block txt-gray-400 mr-2"
                        >추천지수</span
                      >
                      <b-icon icon="question-circle"></b-icon>
                    </span>
                    <div class="tooltip-content" v-if="isTooltipVislble">
                      <p class="txt-small">
                        빅데이터 상권지수와 입력하신 조리경험, 운영경험,
                        창업자금을 종합하여 반영한 수치입니다.
                      </p>
                    </div>
                  </div>
                </div> -->
                <div
                  class="card card-selected-menu p-0 mb-4"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div class="p-6">
                    <div class="card-header relative">
                      <h4>
                        <strong>상권에 딱 맞는</strong> <br />
                        <strong>창업아이템</strong>을 추천할게요!
                      </h4>
                    </div>
                    <div>
                      <div
                        class="card-img mt-4 mb-6"
                        v-if="result.rankDataWCScore[0].sSmallCategoryCode"
                      >
                        <div
                          data-aos="fade-right"
                          data-aos-duration="1000"
                          data-aos-delay="300"
                          class="img-mask"
                        >
                          <b-img-lazy
                            :src="
                              `https://kr.object.ncloudstorage.com/common-storage-pickcook/menu/${result.rankDataWCScore[0].sSmallCategoryCode}.jpg`
                            "
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="card-badge">
                          <b-badge pill variant="primary">최고적합률</b-badge>
                          <b-badge pill variant="secondary">{{
                            result.rankDataWCScore[0].pickcookSmallCategoryInfo
                              .pkMediumCategoryName
                          }}</b-badge>
                          <b-badge pill variant="outline-secondary">{{
                            result.rankDataWCScore[0].pickcookSmallCategoryInfo
                              .pkSmallCategoryName
                          }}</b-badge>
                        </div>
                        <h4 class="card-title">
                          {{
                            result.rankDataWCScore[0].pickcookSmallCategoryInfo
                              .pkMenuName
                          }}
                        </h4>
                        <p class="card-text">
                          <b-icon icon="graph-up"></b-icon>
                          <span class="mx-1"
                            >추천지수
                            <strong class="txt-primary"
                              >{{
                                Math.round(
                                  result.rankDataWCScore[0].appliedFitnessScore,
                                )
                              }}%</strong
                            ></span
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="btn-more-detail"
                    @click="onToggleOverlay('new-selected-menu', $event)"
                  >
                    <span class="txt-tiny is-blind">자세히 보기</span>
                    <span class="icon-toggle-plus">
                      <b-icon icon="plus"></b-icon>
                    </span>
                    <!-- tooltip -->
                    <transition name="fadeIn">
                      <div
                        class="tooltip-container"
                        v-if="isDetailInfoTooltipVisible"
                      >
                        <div class="tooltip-content">
                          <p class="txt-small">
                            + 버튼을 클릭하면 <br />자세한 정보를 알 수 있습니다
                            <b-icon
                              icon="x-circle-fill"
                              class="ml-2 txt-large"
                              @click.stop="isDetailInfoTooltipVisible = false"
                            ></b-icon>
                          </p>
                        </div>
                      </div>
                    </transition>
                  </div>
                  <transition name="fadeIn">
                    <div class="card-overlay" id="new-selected-menu">
                      <div class="inner-box">
                        <h4>추천지수</h4>
                        <p>
                          빅데이터 상권지수({{
                            result.rankDataWCScore[0].bigDataLocationScore
                          }}%)와 조리경험 ({{
                            result.rankDataWCScore[0].cookingExperienceScore
                          }}%), 운영경험({{
                            result.rankDataWCScore[0].operationExperienceScore
                          }}%), 창업자금({{
                            result.rankDataWCScore[0].initialCostScore
                          }}%)을 종합하였을때
                          <strong class="txt-lightblue txt-bold">
                            가장 추천하는 아이템</strong
                          >
                          입니다.
                        </p>
                      </div>
                    </div>
                  </transition>
                </div>
              </b-col>
              <b-col cols="12" lg="6">
                <div
                  class="card flex-row"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  :data-aos-delay="300 * index"
                  v-for="(item, index) in newOtherMenu"
                  :key="index"
                >
                  <div class="card-img-left" v-if="item.sSmallCategoryCode">
                    <b-img-lazy
                      :src="
                        `https://kr.object.ncloudstorage.com/common-storage-pickcook/menu/${item.sSmallCategoryCode}.jpg`
                      "
                      alt=""
                    />
                  </div>
                  <div class="card-body">
                    <div class="card-badge">
                      <b-badge pill variant="primary" v-if="index === 0"
                        >최고적합률</b-badge
                      >
                      <b-badge pill variant="blue" v-if="index === 1"
                        >적합률높음</b-badge
                      >
                      <b-badge pill variant="lightblue" v-if="index === 2"
                        >적합률보통</b-badge
                      >
                      <b-badge pill variant="secondary">{{
                        item.pickcookSmallCategoryInfo.pkMediumCategoryName
                      }}</b-badge>
                      <b-badge pill variant="outline-secondary">{{
                        item.pickcookSmallCategoryInfo.pkSmallCategoryName
                      }}</b-badge>
                    </div>
                    <h4 class="card-title">
                      {{ item.pickcookSmallCategoryInfo.pkMenuName }}
                    </h4>
                    <p class="card-text">
                      <b-icon icon="graph-up"></b-icon>
                      <span class="mx-1"
                        >추천지수
                        <strong class="txt-primary"
                          >{{ Math.round(item.appliedFitnessScore) }}%</strong
                        ></span
                      >
                    </p>
                  </div>
                  <div
                    class="btn-more-detail"
                    @click="onToggleOverlay(`new-other-menu-${index}`, $event)"
                  >
                    <span class="txt-tiny is-blind">자세히 보기</span>
                    <span class="icon-toggle-plus">
                      <b-icon icon="plus"></b-icon>
                    </span>
                  </div>
                  <div class="card-overlay" :id="`new-other-menu-${index}`">
                    <div class="inner-box">
                      <p class="txt-medium">
                        빅데이터 상권지수({{ item.bigDataLocationScore }}%)와
                        조리경험 ({{ item.cookingExperienceScore }}%),
                        운영경험({{ item.operationExperienceScore }}%),
                        창업자금({{ item.initialCostScore }}%)을 종합하였을때
                        <strong class="txt-lightblue txt-bold">
                          추천하는 아이템</strong
                        >
                        입니다.
                      </p>
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
            <div class="row-box">
              <div class="card" data-aos="fade-up" data-aos-duration="1000">
                <div class="card-header txt-sm-center">
                  <h4>
                    추천 아이템들은 <br />
                    전 분기보다 <br class="d-block d-lg-none" />
                    <strong>매출이 올라가고</strong> 있어요!
                  </h4>
                </div>
                <div class="card-body">
                  <div class="chart-container chart-vertical-arrow">
                    <div class="chart-bars">
                      <div
                        class="chart-bar "
                        :class="{
                          'bar-rank-max':
                            maxRevenue ===
                            Math.abs(item.estimatedIncreasedRevenuePercentage),
                          'bar-rank-min':
                            minRevenue ===
                            Math.abs(item.estimatedIncreasedRevenuePercentage),
                        }"
                        v-for="(item, index) in result.rankDataWCScore"
                        :key="index"
                        :style="{
                          height:
                            (Math.abs(
                              item.estimatedIncreasedRevenuePercentage,
                            ) /
                              maxRevenue) *
                              100 +
                            '%',
                        }"
                      >
                        <div class="bar-stack">
                          <span class="bar-percent"
                            >+{{
                              Math.abs(
                                item.estimatedIncreasedRevenuePercentage,
                              ).toFixed(0)
                            }}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="chart-labels">
                      <span
                        class="chart-label"
                        v-for="(item, index) in result.rankDataWCScore"
                        :key="index"
                      >
                        {{ item.pickcookSmallCategoryInfo.pkMenuName }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="article-section">
            <header class="section-header txt-sm-center">
              <h3>
                배달창업
                <br />
                <strong>필요한 서비스만 골라</strong
                ><br class="d-block d-lg-none" />
                한번에 준비하세요
              </h3>
            </header>
            <div class="section-content">
              <b-row>
                <b-col cols="12" lg="6">
                  <div
                    class="card my-2 card-recipe"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <div class="card-img">
                      <swiper :options="swiperRecipe">
                        <swiper-slide v-for="n in 5" :key="n">
                          <img
                            :src="
                              `
                          https://kr.object.ncloudstorage.com/common-storage-pickcook/main/recipe_menu_0${n}.png
                        `
                            "
                          />
                        </swiper-slide>
                      </swiper>
                    </div>
                    <div
                      class="card-header mt-2"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <h4>
                        간편한 <strong>레시피</strong>와 <br />빠른
                        <strong>조리 교육</strong>
                      </h4>
                    </div>

                    <div
                      class="btn-more-detail"
                      @click="onToggleOverlay('recipe-guide', $event)"
                    >
                      <span class="txt-tiny is-blind">자세히 보기</span>
                      <span class="icon-toggle-plus">
                        <b-icon icon="plus"></b-icon>
                      </span>
                    </div>
                    <transition name="fadeIn">
                      <div class="card-overlay" id="recipe-guide">
                        <div class="inner-box">
                          <h4>
                            레시피와 조리 교육
                          </h4>
                          <p>
                            간편한 공정의 레시피로 수익성과 맛을 모두 고려하여
                            제작되었습니다. 1:1 교육, 현장 실습, 방문 교육 등
                            원하시는 교육 방법을 선택할 수 있습니다.
                          </p>
                        </div>
                      </div>
                    </transition>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  lg="6"
                  class="d-none d-lg-block"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div class="card my-2 card-app-guide">
                    <div class="card-header">
                      <h4>
                        복잡한 배달 앱<br />
                        <strong>등록부터 관리</strong>까지<br />
                        <strong>운영교육</strong>을 한번에!
                      </h4>
                    </div>
                    <div class="card-body">
                      <ul class="u-list type-check">
                        <li>배달앱 등록</li>
                        <li>배달앱 광고</li>
                        <li>매출 컨설팅</li>
                        <li>홍보물 제공</li>
                      </ul>
                    </div>
                    <div
                      class="btn-more-detail"
                      @click="onToggleOverlay('app-guide', $event)"
                    >
                      <span class="txt-tiny is-blind">자세히 보기</span>
                      <span class="icon-toggle-plus">
                        <b-icon icon="plus"></b-icon>
                      </span>
                    </div>
                    <transition name="fadeIn">
                      <div class="card-overlay" id="app-guide">
                        <div class="inner-box">
                          <h4>
                            운영교육
                          </h4>
                          <p>
                            배민, 쿠팡이츠, 요기요 등 복잡한 배달 앱을 모두
                            등록해 드립니다. 어려운 배달 앱 광고, 매출 컨설팅,
                            홍보물까지 픽쿡에서 한번에 관리하세요.
                          </p>
                        </div>
                      </div>
                    </transition>
                  </div>
                </b-col>
                <b-col cols="12">
                  <div
                    class="card my-2 card-delivery-kitchen px-0 bg-primary"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <div class="card-img">
                      <swiper :options="swiperKitchen">
                        <swiper-slide v-for="n in 3" :key="n">
                          <div class="img-mask">
                            <img
                              :src="
                                `
                          https://kr.object.ncloudstorage.com/common-storage-pickcook/main/delivery_kitchen_0${n}.jpg`
                              "
                            />
                          </div>
                        </swiper-slide>
                      </swiper>
                    </div>
                    <div class="card-header px-6 mt-4">
                      <h4>
                        <span class="txt-white">
                          <strong
                            >전국 1500개<br />
                            공유주방 추천과</strong
                          ><br class="d-block d-lg-none" />
                          할인&amp;무료 혜택 제공
                        </span>
                      </h4>
                    </div>

                    <div
                      class="btn-more-detail"
                      @click="onToggleOverlay('delivery-kitchen', $event)"
                    >
                      <span class="txt-tiny is-blind">자세히 보기</span>
                      <span class="icon-toggle-plus">
                        <b-icon icon="plus"></b-icon>
                      </span>
                    </div>
                    <transition name="fadeIn">
                      <div class="card-overlay" id="delivery-kitchen">
                        <div class="inner-box">
                          <h4>
                            공유주방 추천
                          </h4>
                          <p>
                            전국 1500개 공유주방을 원하시는 위치와 금액 등
                            조건에 맞추어 추천하며, 보증금 0원, 임대료 무료 등
                            다양한 혜택을 동시에 제공해 드립니다.
                          </p>
                        </div>
                      </div>
                    </transition>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  lg="6"
                  class="d-block d-lg-none"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div class="card my-2 card-app-guide">
                    <div class="card-header txt-sm-center">
                      <h4>
                        복잡한 배달 앱<br />
                        <strong>등록부터 관리</strong>까지<br />
                        <strong>운영교육</strong>을 한번에!
                      </h4>
                    </div>
                    <div class="card-body">
                      <ul class="u-list type-check">
                        <li>배달앱 등록</li>
                        <li>배달앱 광고</li>
                        <li>매출 컨설팅</li>
                        <li>홍보물 제공</li>
                      </ul>
                    </div>
                    <div
                      class="btn-more-detail"
                      @click="onToggleOverlay('app-guide-2', $event)"
                    >
                      <span class="txt-tiny is-blind">자세히 보기</span>
                      <span class="icon-toggle-plus">
                        <b-icon icon="plus"></b-icon>
                      </span>
                    </div>
                    <transition name="fadeIn">
                      <div class="card-overlay" id="app-guide-2">
                        <div class="inner-box">
                          <h4>
                            운영교육
                          </h4>
                          <p>
                            배민, 쿠팡이츠, 요기요 등 복잡한 배달 앱을 모두
                            등록해 드립니다. 어려운 배달 앱 광고, 매출 컨설팅,
                            홍보물까지 픽쿡에서 한번에 관리하세요.
                          </p>
                        </div>
                      </div>
                    </transition>
                  </div>
                </b-col>
              </b-row>
            </div>
          </section>
        </template>
        <section class="article-section section04">
          <header class="section-header txt-sm-center">
            <h3>
              <template v-if="result.fnbOwnerStatus !== 'NEW_FNB_OWNER'">
                알바생도 쉽게! <br />
                간편한 레시피로 <br class="d-block d-lg-none" />
                <strong>3일만에 판매</strong>하세요!
              </template>
              <template v-else>
                픽쿡의 <strong>검증된 브랜드</strong>로<br />
                <strong>배달 창업</strong>하세요!
              </template>
            </h3>
          </header>
          <div class="card" data-aos="fade-up" data-aos-duration="1000">
            <div class="card-header txt-sm-center">
              <p
                class="txt-black d-flex- align-items-end justify-content-center"
              >
                <b-img-lazy
                  src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/logo_1980.svg"
                  alt="1980부대찌개 로고"
                  class="w-10"
                ></b-img-lazy>
                <span class="mx-2">X</span>
                <span>돈암점</span>
              </p>
              <div class="my-8">
                <h4>
                  메뉴변경 <strong>2주</strong>만에 <br />
                  <strong>일매출 150만원 돌파</strong>
                </h4>
              </div>
            </div>
            <div class="card-body">
              <div class="txt-center">
                <b-img-lazy
                  src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/revenue_graph.png"
                  alt="1980부대찌개 돈암점 매출 예시 그래프"
                  style="width:100%"
                  class="max-w-60 mx-auto"
                />
              </div>
            </div>
          </div>
        </section>
        <section
          class="article-section mb-0 pb-12"
          ref="bottomForm"
          id="bottom-form"
        >
          <!-- 폼 영역 -->
          <header class="section-header txt-sm-center">
            <h3>
              <template v-if="result.fnbOwnerStatus !== 'NEW_FNB_OWNER'">
                <strong>월 30만원</strong> 부터 시작하는 <br />
                <strong>매출솔루션 픽쿡플래너</strong>와
                <br class="d-block d-lg-none" />
                만나보세요!
              </template>
              <template v-else>
                <strong>픽쿡플래너</strong> 와 함께<br />
                <strong>확실한 아이템</strong>으로
                <br class="d-block d-lg-none" />
                <strong>효율적인 창업</strong>하세요!
              </template>
            </h3>
          </header>
          <div class="section-content mt-8">
            <div class="form-container">
              <b-form-row>
                <!-- <b-col cols="2">
                  <label class="txt-sm">이름</label>
                </b-col> -->
                <b-col cols="12">
                  <b-form-input
                    v-model="consultRequestDto.name"
                    placeholder="이름"
                    size="md"
                    required
                  ></b-form-input>
                </b-col>
              </b-form-row>
              <b-form-row class="mt-3">
                <!-- <b-col cols="2">
                  <label class="txt-sm">휴대전화</label>
                </b-col> -->
                <b-col cols="8">
                  <b-form-input
                    v-model="consultRequestDto.phone"
                    placeholder="휴대폰번호"
                    required
                    :disabled="isVerified"
                    size="md"
                  ></b-form-input>
                </b-col>
                <b-col cols="4">
                  <b-btn
                    variant="outline-primary"
                    size="md"
                    pill
                    @click="getSMSCode"
                    :disabled="isGetCodeBtnDisabled"
                    v-if="!isVerified"
                  >
                    {{ isGetCodeBtnDisabled ? time : '인증번호' }}</b-btn
                  >
                </b-col>
              </b-form-row>
              <b-form-row v-if="isSMSCodeSent" class="mt-3">
                <!-- <b-col cols="2">
                  <label class="txt-sm">인증번호</label>
                </b-col> -->
                <b-col cols="8">
                  <b-form-input
                    v-model="consultRequestDto.smsAuthCode"
                    placeholder="인증번호"
                    required
                    size="md"
                    :disabled="isVerified"
                  ></b-form-input>
                </b-col>
                <b-col cols="4">
                  <b-btn
                    variant="outline-primary"
                    pill
                    size="md"
                    @click="checkSMSCode"
                    :disabled="isVerified"
                    >{{ isVerified ? '인증완료' : '인증하기' }}</b-btn
                  >
                </b-col>
              </b-form-row>
              <div class="txt-box" v-if="errorText">
                <p>{{ errorText }}</p>
              </div>
              <div class="mt-6">
                <b-btn
                  variant="primary"
                  block
                  size="xl"
                  :disabled="isConsultBtnDisabled"
                  @click="onConsultBtnClicked"
                >
                  <span>픽쿡플래너 만나기</span>
                </b-btn>
              </div>
            </div>
          </div>
          <!-- // 폼 영역 -->
        </section>
      </div>
    </div>
    <!-- sticky 폼 -->
    <transition name="slideInUp">
      <div
        id="sticky-form"
        v-if="!isFormVisible"
        :class="{ 'is-open': isToggleForm }"
      >
        <div class="btn-more-form" @click="isToggleForm = !isToggleForm">
          <span class="btn-txt">픽쿡플래너 만나기</span>
          <span class="icon"><BaseArrow /></span>
        </div>
        <div class="form-container" v-if="isToggleForm">
          <div class="container">
            <b-form-row>
              <!-- <b-col cols="2">
                <label class="txt-sm">이름</label>
              </b-col> -->
              <b-col cols="12">
                <b-form-input
                  v-model="consultRequestDto.name"
                  placeholder="이름"
                  size="md"
                  required
                ></b-form-input>
              </b-col>
            </b-form-row>
            <b-form-row class="mt-3">
              <!-- <b-col cols="2">
                <label class="txt-sm">휴대전화</label>
              </b-col> -->
              <b-col cols="8">
                <b-form-input
                  v-model="consultRequestDto.phone"
                  placeholder="휴대폰번호"
                  required
                  :disabled="isVerified"
                  size="md"
                ></b-form-input>
              </b-col>
              <b-col cols="4">
                <b-btn
                  variant="outline-white"
                  pill
                  size="md"
                  @click="getSMSCode"
                  :disabled="isGetCodeBtnDisabled"
                  v-if="!isVerified"
                >
                  {{ isGetCodeBtnDisabled ? time : '인증번호' }}</b-btn
                >
              </b-col>
            </b-form-row>
            <b-form-row v-if="isSMSCodeSent" class="mt-3">
              <!-- <b-col cols="2">
                <label class="txt-sm">인증번호</label>
              </b-col> -->
              <b-col cols="8">
                <b-form-input
                  v-model="consultRequestDto.smsAuthCode"
                  placeholder="인증번호"
                  required
                  size="md"
                  :disabled="isVerified"
                ></b-form-input>
              </b-col>
              <b-col cols="4">
                <b-btn
                  variant="outline-white"
                  size="md"
                  pill
                  @click="checkSMSCode"
                  :disabled="isVerified"
                  >{{ isVerified ? '인증완료' : '인증하기' }}</b-btn
                >
              </b-col>
            </b-form-row>
            <div class="txt-box" v-if="errorText">
              <p>{{ errorText }}</p>
            </div>
            <div class="btn-box mt-6">
              <b-btn
                variant="white"
                block
                pill
                size="lg"
                :disabled="isConsultBtnDisabled"
                @click="onConsultBtnClicked"
              >
                <span>픽쿡플래너 만나기</span>
              </b-btn>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </article>
  <!-- 로딩-->
  <article class="main-article" v-else>
    <Loading />
  </article>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Prop } from 'vue-property-decorator';
import ResultRevenueChart from '@/modules/_components/charts/ResultRevenueChart.vue';
import FoodCategoryRatioChart from '@/modules/_components/charts/FoodCategoryRatioChart.vue';
import {
  ConsultRequestDto,
  ResultRequestDto,
  ResultResponseDto,
} from '@/dto/question';
import authService from '@/services/auth.service';
// import toast from '../../../resources/assets/js/services/toast.js';
import QuestionService from '@/services/question.service';
import { AggregateResultResponse } from '@/dto/question/aggregate-result-response.dto';
import { SmsAuthNotificationDto } from '@/dto';
import { ProformaResponseDto } from '@/dto/question/proforma-response.dto';
import debounce from 'lodash/debounce';
import Loading from './Loading.vue';
import { DELIVERY_GRADE_TYPE } from '@/common';

@Component({
  name: 'Solution',
  components: { ResultRevenueChart, FoodCategoryRatioChart, Loading },
})
export default class Solution extends BaseComponent {
  [x: string]: any;
  $refs!: {
    tagRef: HTMLFormElement;
    revenueWrapper: HTMLFormElement;
    tooltipWrapper: HTMLFormElement;
    bottomForm: HTMLFormElement;
  };
  @Prop() readonly resultRequestDto: ResultRequestDto;
  // private result: ProformaResponseDto = null;
  // private resultRequestDto: any = null;
  private result: any = null;
  private consultRequestDto = new ConsultRequestDto();
  private isVerified = false;
  private errorText = '';
  private isSMSCodeSent = false;
  private isGetCodeBtnDisabled = false;
  private time = 30;
  private smsAuthNotificationDto = new SmsAuthNotificationDto();

  private revenueCount = 0;
  private isToggleForm = false;
  private isFormVisible = false;
  private isTooltipVislble = false;

  private isOverlayVisible = false;
  private overlayId: string;
  private onlyDeliveryType: DELIVERY_GRADE_TYPE =
    DELIVERY_GRADE_TYPE.DELIVERY_ONLY;

  // 신규창업자
  private newOtherMenu: any = {};
  private swiperRecipe: any = {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    // virtualTranslate: true,
    slidesPerView: 1,
    loop: true,
    grabCursor: false,
    allowTouchMove: false,
    speed: 700,
    autoplay: {
      delay: 3000,
      // disableOnInteraction: true,
    },
  };
  private swiperKitchen: any = {
    slidesPerView: 1,
    loop: true,
    grabCursor: false,
    allowTouchMove: false,
    speed: 1000,
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
  };

  // 기창업자 메뉴
  private selectedMenu: any = {};
  private otherMenu: any = {};
  private isOhterMenuVislble = false;
  private isDetailInfoTooltipVisible = true;

  toggleId(index: number) {
    return 'item0' + index;
  }

  get isConsultBtnDisabled() {
    if (
      this.consultRequestDto.name &&
      this.consultRequestDto.phone &&
      this.isVerified
    ) {
      return false;
    } else {
      return true;
    }
  }

  private __countDownTimer() {
    if (this.time > 0) {
      setTimeout(() => {
        this.time -= 1;
        this.__countDownTimer();
      }, 1000);
    }
  }

  get maxRevenueValue() {
    const arr = this.result.rankDataWCScore.map(
      (e: { estimatedHighestRevenue: number }) => {
        return Math.abs(e.estimatedHighestRevenue);
      },
    );
    return Math.max(...arr);
  }

  // get max revenue
  get maxRevenue() {
    const arr = this.result.rankDataWCScore.map(
      (e: { estimatedIncreasedRevenuePercentage: number }) => {
        return Math.abs(e.estimatedIncreasedRevenuePercentage);
      },
    );
    return Math.max(...arr);
  }

  // get min revenue
  get minRevenue() {
    const arr = this.result.rankDataWCScore.map(
      (e: { estimatedIncreasedRevenuePercentage: number }) => {
        return Math.abs(e.estimatedIncreasedRevenuePercentage);
      },
    );
    return Math.min(...arr);
  }

  // toggle overlay
  onToggleOverlay(overlayId: string, event: { target: HTMLElement }) {
    const overlay = document.getElementById(overlayId);
    const toggleBtn = event.target;
    this.isOverlayVisible = !this.isOverlayVisible;
    toggleBtn.classList.toggle('is-active');
    if (overlay.style.display !== 'block') {
      overlay.style.display = 'block';
    } else {
      overlay.style.display = 'none';
    }
  }

  // get auth code
  getSMSCode() {
    this.smsAuthNotificationDto.phone = this.consultRequestDto.phone;
    authService.getSMSCode(this.smsAuthNotificationDto).subscribe(res => {
      if (res) {
        this.$gtag.event('get_sms_code', {
          description: '문자 인증번호 요청',
        });
        this.time = 30;
        this.isSMSCodeSent = true;
        this.isGetCodeBtnDisabled = true;
        setTimeout(() => {
          this.isGetCodeBtnDisabled = false;
        }, this.time * 1000);
        this.__countDownTimer();
        this.isSMSCodeSent = true;
      } else {
        this.$bvToast.toast('휴대폰번호를 제대로 입력해주세요', {
          variant: 'danger',
          title: 'Error',
        });
      }
    });
  }

  checkSMSCode() {
    this.smsAuthNotificationDto.phone = this.consultRequestDto.phone;
    this.smsAuthNotificationDto.smsAuthCode = parseInt(
      this.consultRequestDto.smsAuthCode,
    );
    authService.checkSMSCode(this.smsAuthNotificationDto).subscribe(res => {
      if (res) {
        this.isVerified = true;
        this.$gtag.event('complete_sms_auth', {
          description: '인증번호 확인 완료',
        });
      } else {
        this.$bvToast.toast(
          '인증번호가 올바르지 않거나 유효기간이 초과했습니다',
          {
            variant: 'danger',
            title: 'Error',
          },
        );
      }
    });
  }

  onConsultBtnClicked() {
    this.consultRequestDto.proformaConsultResultId = this.result.id;
    QuestionService.postConsult(this.consultRequestDto).subscribe(res => {
      if (res) {
        // send pixel event
        this.$analytics.fbq.event('SubmitApplication');
        this.$gtag.event('complete_application', {
          description: '신청 완료',
        });
        this.$emit('next');
      }
    });
  }

  // hide detail info tooltip
  hideDetailInfoTooltip() {
    const target = this.$refs.tooltipWrapper;
    if (target) {
      const rect = target.getBoundingClientRect().top;
      const winHeight = window.outerHeight;
      if (rect < winHeight / 2) {
        setTimeout(() => {
          this.isDetailInfoTooltipVisible = false;
        }, 3000);
      }
    }
  }

  stickyFormVisible() {
    const target = this.$refs.bottomForm;
    if (target) {
      const rect = target.getBoundingClientRect().top;
      const winHeight = window.outerHeight;
      if (rect < winHeight - target.offsetHeight) {
        this.isFormVisible = true;
      } else {
        this.isFormVisible = false;
      }
    }
  }

  // scroll event
  handleScroll() {
    this.hideDetailInfoTooltip();
    this.stickyFormVisible();
  }

  findResult() {
    QuestionService.getResult(this.resultRequestDto).subscribe(res => {
      if (res) {
        this.$gtag.event(`proforma_result_seen_${res.data.id}`);
        this.result = res.data;

        // selected Menu info
        if (this.result.selectedMenuRecommendation) {
          this.selectedMenu = this.result.selectedMenuRecommendation;
        }
        // ohter Menu info
        if (this.result.otherMenuRecommendations) {
          this.otherMenu = this.result.otherMenuRecommendations.slice(0, 2);
        }

        // new owner other menu
        if (this.result.rankDataWCScore) {
          this.newOtherMenu = this.result.rankDataWCScore.slice(1, 3);
        }

        // start countup animation of estimate revenue
        setTimeout(() => {
          this.revenueCount = this.result.estimatedRevenue;
        }, 10);
      }
    });
  }

  handleDebouncedResizing() {
    const screenWith = window.innerWidth;
    if (screenWith >= 992) {
      this.isOhterMenuVislble = true;
    } else {
      this.isOhterMenuVislble = false;
    }
  }

  created() {
    this.findResult();
    this.handleDebouncedScroll = debounce(this.handleScroll, 100);
    window.addEventListener('scroll', this.handleDebouncedScroll);
    window.addEventListener('resize', this.handleDebouncedResizing);
  }

  mounted() {
    this.handleDebouncedResizing();
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll);
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

#sticky-form {
  background-color: rgba(0, 77, 138, 0.95);
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  border-top-left-radius: $border-radius-lg;
  border-top-right-radius: $border-radius-lg;
  overflow: hidden;
  &.is-open {
    background-color: $primary;
    .btn-more-form {
      .icon {
        transform: rotate(0);
      }
    }
  }
  .btn-more-form {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5em;
    .btn-txt {
      font-size: 2.4rem;
      font-weight: $txt-bolder;
      color: $white;
      margin-right: 0.5em;
    }
    .icon {
      transform: rotate(180deg);
      svg {
        fill: $white;
      }
    }
  }
  .form-container {
    padding: 0 0 1.25em;
    label {
      color: $white;
    }
    .form-control {
      background: transparent;
      color: #fff;
      border-bottom-color: #fff;
    }
    input::placeholder {
      color: #fff;
    }
  }
}

#question-solution {
  padding-bottom: 0 !important;
  .article-header {
    padding: 1em 0;
    background-color: $light;
    box-shadow: 0 0.25em 0.25em rgba(0, 0, 0, 0.25);
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    h2 {
      font-size: $txt-medium;
      font-weight: $txt-bold;
    }
    p {
      font-size: $h5;
      text-align: right;
      font-weight: $txt-bold;
    }
  }
  .article-section {
    margin: 2em 0;
    .section-header {
      margin: 4em 0;
      text-align: left;
      h3 {
        font-size: 3.2rem;
        color: $black;
        font-weight: 300;
        line-height: 1.4;
        strong {
          font-weight: 700;
        }
      }
      + .section-content {
        margin-top: 1.125em;
      }
    }

    .card {
      position: relative;
      border-radius: $border-radius-lg;
      padding: 1.5em 1.5em;
      z-index: 1;
      overflow: hidden;
      .card-header {
        background: none;
        border: 0;
        padding: 0;
        h4 {
          font-size: 2.8rem;
          color: $black;
          line-height: 1.4;
          font-weight: 300;
          strong {
            font-weight: 700;
          }
        }
        + .card-body {
          margin-top: 1em;
        }
      }
      .card-img-left {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5.625em;
        height: 5.625em;
        background-color: $light;
        border-radius: $border-radius;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        + .card-body {
          width: calc(100% - 4.75em);
          margin-left: 1.25em;
        }
      }
      .card-body {
        position: relative;
        padding: 0;
        .card-badge {
          margin-bottom: 1em;
          font-size: $txt-mini;
          .badge {
            margin-bottom: 0.4em;
            + .badge {
              margin-left: 0.4em;
            }
          }
        }
        .card-title {
          font-size: 2.8rem;
          font-weight: $txt-bolder;
          line-height: 1;
          color: $black;
          margin-bottom: 0.625em;
        }
        .card-text {
          font-size: $txt-medium;
          font-weight: $txt-normal;
          line-height: 1;
          color: $black;
          strong {
            font-weight: $txt-bold;
            font-family: 'YoonGothic', sans-serif;
          }
        }
      }
      .card-overlay {
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        padding: 1.5em 1.5em;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.92);
        color: $white;
        font-size: 2rem;
        .inner-box {
          overflow-y: auto;
          height: 100%;
          h4 {
            font-size: 3.2rem;
            margin-bottom: 0.5em;
            font-weight: 700;
          }
        }
      }
      .btn-more-detail {
        position: absolute;
        width: 2em;
        height: 2em;
        bottom: 1em;
        right: 1em;
        line-height: 1;
        z-index: 1;
        .icon-toggle-plus {
          transform: rotate(0deg);
          transition: transform 0.4s ease;
          pointer-events: none;
        }

        &.is-active {
          bottom: 1em !important;
          z-index: 3;
          .icon-toggle-plus {
            transform: rotate(225deg);
          }
        }
      }
    }
    .card-collapse {
      position: relative;
      top: -1.25em;
      .card-desc {
        position: relative;
        background-color: $white;
        border-bottom-left-radius: $border-radius-lg;
        border-bottom-right-radius: $border-radius-lg;
        overflow: hidden;
        box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.075);
        padding: 2.5em 1.5em 1.25em;
        min-height: 7em;
      }
    }

    .card-revenue {
      background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/main/bg_graph.png');
      background-position: left bottom;
      background-repeat: no-repeat;
      background-size: contain;
      .section-content {
        margin-top: 11.25em;
        text-align: right;

        // odometer
        .odometer-container {
          text-align: right;

          .odometer-box {
            display: inline-flex;
            align-items: baseline;
            .odometer-count {
              font-size: 4.4rem;
              font-weight: $txt-bolder;
              line-height: 1;
              color: $white;
              * {
                font-family: 'Gotham', sans-serif !important;
                min-width: 0.68em;
              }
            }
            .odometer-unit {
              font-size: 2.8rem;
              color: $white;
              margin-left: 0.5em;
            }
          }
        }
      }
    }

    .card-selected-menu {
      display: block;
      .card-img {
        margin-left: -1.5em;
        width: auto;
        .img-mask {
          position: relative;
          padding-bottom: 70.25%;
          border-top-right-radius: 15em;
          border-bottom-right-radius: 15em;
          overflow: hidden;
        }
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .card-body {
        margin: 1em 0 0;
        width: auto;
      }
      .btn-more-menu {
        position: relative;
        background-color: #eaeaea;
        padding: 1em 1.5em;
        overflow: hidden;
        cursor: pointer;
        &:before {
          position: absolute;
          top: -40%;
          left: 0;
          display: block;
          content: '';
          width: 100%;
          height: 50%;
          background: rgba(0, 0, 0, 0.25);
          background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.25) 100%
          );
        }
        + .btn-more-detail {
          bottom: 5em;
        }
      }
      .tooltip-container {
        position: absolute;
        right: -0.25em;
        bottom: 100%;
        margin-bottom: 0.5em;
        white-space: nowrap;
      }
    }

    .card-recipe {
      .card-img {
        margin-top: -1.5em;
        img {
          position: relative;
          top: -5em;
          transition: top 0.4s ease;
          max-width: 24.25em;
          margin: 0 auto;
        }
        .swiper-slide-active {
          img {
            top: 0;
          }
        }
      }
    }

    .card-delivery-kitchen {
      .swiper-container {
        padding-left: 3em;
        padding-right: 3em;
      }
      .img-mask {
        overflow: hidden;
        border-radius: $border-radius;
        height: 20em;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .card-app-guide {
      background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/main/app_guide.png');
      background-repeat: no-repeat;
      background-position: bottom left calc(50% - 1.5em);
      background-size: 18em auto;
      .card-body {
        padding-top: 2em !important;
        padding-bottom: 10em !important;
        .u-list {
          margin-left: 60%;
          li {
            color: $black;
          }
        }
      }
    }
  }
}

#question-complete {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  height: 100vh;
  .article-header {
    display: block;
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
    .txt-underline {
      border-color: #fff;
    }
  }
}

// chart
.chart-container {
  position: relative;

  &.chart-horizontal-stacked {
    .chart-bars {
      display: flex;
      // flex-wrap: wrap;
      width: 100%;
    }
    .chart-bar {
      position: relative;
      width: 50%;
      min-width: 10%;
      &.chart-bar-restaurant {
        .bar-label {
          text-align: left;
        }
        .bar-stack {
          border-top-left-radius: $border-radius;
          border-bottom-left-radius: $border-radius;
          text-align: left;
          padding-right: 0.5em;
          &:before {
            left: 0;
            background-color: $primary;
          }
        }
      }
      &.chart-bar-delivery {
        .bar-label {
          text-align: right;
        }
        .bar-stack {
          border-top-right-radius: $border-radius;
          border-bottom-right-radius: $border-radius;
          text-align: right;
          padding-left: 0.5em;
          &:before {
            background-color: $lightblue;
            right: 0;
          }
        }
      }
      .bar-label {
        display: block;
        font-weight: $txt-bold;
        color: $secondary;
        margin-bottom: 0.5em;
        white-space: nowrap;
      }
      .bar-stack {
        position: relative;
        height: 3em;
        line-height: 3em;
        padding: 0em 1em;
        overflow: hidden;
        &:before {
          display: block;
          position: absolute;
          top: 0;
          content: '';
          width: 0%;
          height: 100%;
          transition: width 1s ease 1s;
        }
      }
      .bar-percent {
        position: relative;
        z-index: 2;
        color: #fff;
        font-size: 1.5rem;
        font-weight: $txt-bold;
        white-space: nowrap;
      }
    }
  }

  &.chart-vertical-arrow {
    max-width: 30em;
    margin: 0 auto;
    .chart-bars {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      border-bottom: 1px solid $gray;
      height: 7em;
    }
    .chart-bar {
      position: relative;
      width: 1em;
      margin: 0 auto;

      &.bar-rank-max {
        .bar-stack {
          background-color: $primary;
          border-color: $primary;
          .bar-percent {
            color: $primary;
          }
        }
      }
      &.bar-rank-min {
        .bar-stack {
          background-color: $lightblue;
          border-color: $lightblue;
          .bar-percent {
            color: $lightblue;
          }
        }
      }

      .bar-stack {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin-top: 3em;
        width: 100%;
        height: 0%;
        background-color: $blue;
        border-color: $blue;
        transition: height 1s ease 1s;
        &:before {
          position: absolute;
          left: 50%;
          top: -2em;
          display: block;
          content: '';
          width: 0px;
          height: 0px;
          border-width: 1em;
          border-style: solid;
          border-top-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom-color: inherit;
          margin-left: -1em;
        }
        .bar-percent {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 100%;
          margin-bottom: 1.25em;
          font-size: 2rem;
          font-weight: $txt-bold;
          line-height: 1;
          color: inherit;
          color: $blue;
        }
      }
    }
    .chart-labels {
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      margin-top: 0.5em;
      .chart-label {
        flex: 1;
        text-align: center;
        font-size: 1.2rem;
      }
    }
  }
}

// chart animated
.aos-animate {
  .chart-horizontal-stacked .bar-stack {
    &:before {
      width: 100% !important;
    }
  }

  .chart-vertical-arrow {
    .bar-stack {
      height: calc(100% - 3em) !important;
    }
  }
}

.tooltip-container {
  position: relative;

  .tooltip-content {
    position: absolute;
    right: 0;
    bottom: 100%;
    margin-bottom: 0.5em;
    background: rgb(213 213 213 / 100%);
    color: #707070;
    padding: 0.5em 1em;
    border-radius: 0.5rem;
    text-align: left;
    z-index: 2;
    &:before {
      display: block;
      content: '';
      position: absolute;
      right: 1em;
      top: 100%;
      width: 0;
      height: 0;
      border-width: 0.5em;
      border-style: solid;
      border-top-color: rgb(213 213 213 / 95%);
      border-left-color: transparent;
      border-right-color: transparent;
      border-bottom-color: transparent;
    }
  }
}

.info-tip {
  .icon-tip {
    float: left;
    display: inline-flex;
    width: 3em;
    height: 3em;
    align-items: center;
    justify-content: center;
    background-color: $primary;
    border-radius: 50%;
    color: $white;
    font-size: 0.625em;
    margin-right: 1em;
    + * {
      display: block;
      margin-top: 1em;
      padding-top: 0.125em;
      overflow: hidden;
    }
  }
}

.icon-toggle-plus {
  display: inline-flex;
  width: 2em;
  height: 2em;
  align-items: center;
  justify-content: center;
  background-color: $gray-400;
  border-radius: 50%;
  color: $white;
  font-weight: bold;
  box-shadow: 0 0 0.5em rgb(0 0 0 / 25%);
  svg {
    width: 2em;
    height: 2em;
  }
}

.report-container {
  display: flex;
  align-items: center;
  max-width: 24em;
  margin: 0 auto;

  .report {
    position: relative;

    img {
      display: block;
      box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
    }

    &.report01 {
      z-index: 3;
      margin-right: -4em;
    }

    &.report02 {
      margin-top: 2.5em;
      z-index: 2;
    }

    &.report03 {
      margin-top: 0.5em;
      margin-left: -4em;
      z-index: 1;
    }
  }
}

@media screen and (min-width: 992px) {
  #question-solution {
    .article-section {
      .card {
        display: block;
        .card-img-left {
          width: auto;
          height: 6.95em;
          + .card-body {
            width: auto;
            margin-left: 0;
            margin-top: 1em;
          }
        }
      }
    }
  }
}
</style>
