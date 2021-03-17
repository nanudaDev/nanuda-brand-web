<template>
  <h3>Result {{ result }}</h3>
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

<style></style>
