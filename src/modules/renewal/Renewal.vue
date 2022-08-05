
<template>
  <div class="renewal-wrapper">
    <div class="renewal-contents">
      <h1>
         <img src="@/assets/images/logo.svg" alt="픽쿡" class="logo" />
      </h1>
      <div class="renewal-img">
        <img src="https://kr.object.ncloudstorage.com/common-nanuda/renwal.png" alt="">
      </div>
      <h2>홈페이지 <strong>리뉴얼</strong>중입니다</h2>
      <p>
        보다 좋은 서비스를 제공하기 위해 홈페이지 리뉴얼중에 있습니다 <br />
        빠른 시일 내에 찾아뵙겠습니다. 감사합니다
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import BaseComponent from "@/core/base.component";
import { Component } from "vue-property-decorator";

@Component({
  name: 'Renewal',
})
export default class Renewal extends BaseComponent {
	
	
}
</script>
<style lang="scss">
.renewal-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  border-top: 4px solid  #004d8a;

  .logo {
    width: 6em;
    margin-bottom:0.5em;
  }

  .renewal-contents {
    text-align: center;
    color: #323232;
    padding:1em;
     strong {
        color: #004d8a;
      }
    h2 {
      font-size: 2.5rem;
      margin-bottom: 0.5em;
    }
    p {
      font-size: 1.5rem;
     
    }
    .renewal-img {
      text-align: center;
      img {
        width: 20em;
      }
    }
  }
}
</style>