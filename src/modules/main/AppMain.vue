<template>
  <div class="main-visual">
    <div class="container">
      <h2>
        메인
      </h2>
    </div>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
@Component({
  name: 'AppMain',
})
export default class AppMain extends BaseComponent {}
</script>
<style lang="scss">
.main-visual {
  height: 40em;
  padding: 5em 0;
  background-color: #f5f5f5;
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    h2 {
      font-size: 5em;
    }
  }
}
</style>
