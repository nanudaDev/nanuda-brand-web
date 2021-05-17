import { Component, Vue } from 'vue-property-decorator';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component
export default class BaseComponent extends Vue {
  public isMobile = false;
  constructor() {
    super();
  }

  getDeviceCheck() {
    // 디바이스 종류 설정
    const pcDevice = 'win16|win32|win64|mac|macintel';

    // 접속한 디바이스 환경
    if (navigator.platform) {
      if (pcDevice.indexOf(navigator.platform.toLowerCase()) < 0) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }
  }

  created() {
    AOS.init({
      once: true,
    });
  }
  mounted() {
    this.getDeviceCheck();
  }
}
