<template>
  <nav
    id="nav"
    class="navbar fixed-top navbar-expand-lg"
    :class="isToggleNav ? 'navbar-open' : 'navbar-close'"
  >
    <div class="nav-logo">
      <h1>
        <router-link to="/">
          <img src="@/assets/images/logo.png" alt="픽쿡" class="logo" />
          <img src="@/assets/images/logo_w.png" alt="픽쿡" class="logo-w" />
        </router-link>
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
          <router-link class="nav-link" :to="item.path">{{
            item.meta.title
          }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { componentRoutes } from '@/router/modules';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'NavBar',
})
export default class NavBar extends BaseComponent {
  private items = componentRoutes;
  private isToggleNav = false;

  onToggleNav() {
    this.isToggleNav = !this.isToggleNav;
  }
}
</script>
<style lang="scss">
.navbar {
  padding: 0.3125em 1.25em;
  background: #fff;
  transition: background-color 0.2s ease;

  &.is-scrolled {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  }

  &.navbar-open {
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
    padding-top: 40px;
    padding-bottom: 34px;
    .nav-item {
      margin: 12px 0;
      .nav-link {
        font-size: 17px;
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
@media screen and (min-width: 1024px) {
  .navbar {
    .navbar-nav {
      margin-left: auto;
      margin-right: 1.5em;
      .nav-item {
        + .nav-item {
          margin-left: 2em;
        }
        .nav-link {
          font-size: 18px;
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
