import { Component, Vue } from 'vue-property-decorator';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component
export default class BaseComponent extends Vue {
  created() {
    AOS.init();
  }
}
