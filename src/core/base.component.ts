import { Component, Vue } from 'vue-property-decorator';
import AOS from 'aos';
import 'aos/dist/aos.css';
import debounce from 'lodash/debounce';
import { EnvironmentType } from '../../environments';

@Component
export default class BaseComponent extends Vue {
  constructor() {
    super();
  }
  public isMobile = false;
  public isScrolled = false;
  private handleDebouncedScroll: {
    (this: Window, ev: Event): any;
    (this: Window, ev: Event): any;
  } = null;

  public handleScroll() {
    const scrollTop = window.scrollY || window.pageYOffset;
    if (process.env.NODE_ENV === EnvironmentType.development) {
      // console.log(scrollTop);
    }

    if (scrollTop > 0) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
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
    // scroll event
    this.handleDebouncedScroll = debounce(this.handleScroll, 100);
    window.addEventListener('scroll', this.handleDebouncedScroll);
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll);
  }
  mounted() {
    this.getDeviceCheck();
  }
}
