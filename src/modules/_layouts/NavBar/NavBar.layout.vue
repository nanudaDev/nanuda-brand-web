<template>
  <nav
    id="nav"
    class="navbar fixed-top navbar-expand-lg"
    :class="isToggleNav ? 'navbar-open' : 'navbar-close'"
  >
    <div class="nav-logo">
      <h1>
        <span
          @click="homeToggleNav()"
          :data-toggle="isCollapsed"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          class="d-block d-lg-none"
        >
          <router-link to="/">
            <img src="@/assets/images/logo.svg" alt="픽쿡" class="logo" />
            <img src="@/assets/images/logo_w.svg" alt="픽쿡" class="logo-w" />
          </router-link>
        </span>
        <span class="d-none d-lg-block">
          <router-link to="/">
            <img src="@/assets/images/logo.svg" alt="픽쿡" class="logo" />
            <img src="@/assets/images/logo_w.svg" alt="픽쿡" class="logo-w" />
          </router-link>
        </span>
      </h1>
    </div>
    <button
      @click="onToggleNav()"
      class="navbar-toggler d-lg-none"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-hamburger">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav py-lg-0">
        <li class="nav-item active" v-for="item in items" :key="item.path">
          <span
            @click="isToggleNav = false"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            class="d-block d-lg-none"
          >
            <router-link class="nav-link" :to="item.path">{{
              item.meta.title
            }}</router-link>
          </span>
          <span class="d-none d-lg-block">
            <router-link class="nav-link" :to="item.path">{{
              item.meta.title
            }}</router-link>
          </span>
        </li>
      </ul>
      <ul class="navbar-nav py-lg-0 ml-5">
        <li class="nav-item  border-left pl-5" v-if="!isAuth">
          <span class="nav-link">
            <b-icon icon="box-arrow-in-right" class="mr-1"></b-icon>
            <router-link to="/login">로그인</router-link></span
          >
        </li>
        <li class="nav-item dropdown border-left pl-5" v-if="isAuth">
          <span
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            class="nav-link dropdown-toggle"
            v-if="user"
          >
            <b-icon icon="person-circle" class="mr-1"></b-icon>
            {{ user.name }} 님
          </span>
          <div
            class="dropdown-menu dropdown-menu-right mt-4"
            aria-labelledby="navbarDropdown"
          >
            <b-dropdown-item to="/mypage/account">
              <b-icon icon="gear" class="mr-1"></b-icon>
              계정설정
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="logout()">
              <b-icon icon="box-arrow-in-left" class="mr-1"></b-icon>
              로그아웃
            </b-dropdown-item>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import { componentRoutes } from '@/router/modules';
import { PickcookUserDto } from '@/dto';
import JwtStorageService from '@/services/shared/auth/jwt-storage.service';
import PickcookUserService from '@/services/pickcook-user.service';
import { BaseUser } from '@/services/shared/auth/dto';

@Component({
  name: 'NavBar',
})
export default class NavBar extends BaseComponent {
  private items = componentRoutes;
  private isToggleNav = false;
  private isCollapsed = '';
  private isAuth = JwtStorageService.getToken();
  private user = new PickcookUserDto(BaseUser);

  onToggleNav() {
    this.isToggleNav = !this.isToggleNav;
  }

  homeToggleNav() {
    if (this.isToggleNav) this.isCollapsed = 'collapse';
    else this.isCollapsed = '';
    this.isToggleNav = false;
  }

  findMe() {
    PickcookUserService.findMe().subscribe(res => {
      if (res) {
        this.user = res.data;
      }
    });
  }

  logout() {
    JwtStorageService.removeToken();
    this.$router.push('/logout');
    this.isAuth = null;
  }

  created() {
    if (this.isAuth) {
      this.findMe();
    }
    this.$root.$on('withdraw', () => {
      JwtStorageService.removeToken();
      this.isAuth = null;
    });
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
.navbar {
  padding: 0.3125em 1.25em;
  background: #fff;
  transition: background-color 0.2s ease;

  &.is-scrolled {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  }

  &.navbar-open {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
    .navbar-toggler {
      .navbar-hamburger {
        span {
          background: #000000;
          transition: top 0.2s linear, transform 0.2s linear 0.4s;
          &:first-child {
            top: 50%;
            transform: rotate(45deg) scale(0.8);
          }
          &:nth-child(2) {
            background: transparent;
          }
          &:nth-child(3) {
            top: 50%;
            transform: rotate(-45deg) scale(0.8);
          }
        }
      }
    }
  }
  .nav-logo {
    width: 148px;
    .logo-w {
      display: none;
    }
    .logo {
      display: block;
    }
  }
  .navbar-toggler {
    position: relative;
    display: block;
    width: 44px;
    height: 44px;
    border: 0;
    background: transparent;
    &:focus {
      outline: 0;
    }
    .navbar-hamburger {
      display: inline-block;
      cursor: pointer;
      position: relative;
      z-index: 101;
      width: 24px;
      height: 24px;
      vertical-align: middle;
      overflow: hidden;
      span {
        display: inline-block;
        width: 100%;
        height: 3px;
        background: #707070;
        position: absolute;
        left: 0;
        transition: top 0.2s linear 0.5s, transform 0.2s linear 0.2s,
          width 0.2s linear 0.5s;

        &:first-child {
          top: 0;
        }
        &:nth-child(2) {
          top: 10px;
        }
        &:nth-child(3) {
          top: 20px;
        }
      }
    }
  }
  .navbar-nav {
    padding-top: 1.5em;
    padding-bottom: 2.5em;
    align-items: center;
    .nav-item {
      margin: 0.5em 0;
      .nav-link {
        font-size: 1.125em;
        line-height: 1;
        color: #707070;
        padding: 0;
        &:hover {
          color: #2140a3;
        }
      }
    }
  }
}
.app-main {
  .navbar {
    &:not(.is-scrolled).navbar-close {
      background: transparent;
      box-shadow: none;
      .nav-logo {
        .logo-w {
          display: block;
        }
        .logo {
          display: none;
        }
      }
      .navbar-toggler {
        .navbar-hamburger {
          span {
            background: #fff;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 992px) {
  .navbar {
    height: 3.375em;
    .navbar-nav {
      margin-left: auto;
      margin-right: 1.5em;
      .nav-item {
        + .nav-item {
          margin-left: 2em;
        }
        .nav-link {
          font-size: 1em;
          font-weight: 600;
        }
      }
    }
  }
  .app-main {
    .navbar {
      &:not(.is-scrolled).navbar-close {
        .navbar-nav {
          .nav-item {
            .nav-link {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
