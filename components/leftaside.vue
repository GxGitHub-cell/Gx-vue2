<template>
  <!-- 左侧菜单组件 -->
  <!-- <NavMenu 导航菜单 -->
  <div class="leftside">
    <el-menu
      default-active="首页"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#000"
      text-color="#fff"
      active-text-color="gold"
      style="height: 100vh"
    >
      <h3 class="title" v-show="!isCollapse">vue2后台管理系统</h3>
      <h3 class="title" v-show="isCollapse">vue2后台管理系统</h3>
      <el-menu-item
        :index="item.label"
        v-for="(item, index) in nochildren"
        :key="index"
        @click="clickItem(item)"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu
        @click="clickItem(item)"
        index="item.label"
        v-for="item in haschildren"
        :key="item.label"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="item1.label"
            v-for="item1 in item.children"
            :key="item1.label"
            @click="clickItem(item1)"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">{{ item1.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      menu: [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "el-icon-s-home",
        },
        {
          path: "/order",
          name: "order",
          label: "订单管理",
          icon: "el-icon-video-play",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "el-icon-user",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/setup",
              name: "setup",
              label: "设置",
              icon: "el-icon-setting",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickItem(item) {
      //跳转到对应的菜单路由
      this.$router.push({ path: item.path });
      //将点击的菜单名修改
      this.$store.commit("selectMenu", item);
    },
  },

  computed: {
    nochildren() {
      return this.menu.filter((item) => {
        return !item.children;
      });
    },

    haschildren() {
      return this.menu.filter((item) => {
        return item.children;
      });
    },

    //左侧菜单是否打开
    isCollapse() {
      return this.$store.state.isCollapse;
    },
  },
};
</script>

<style lang="less">
.leftside {
  .title {
    display: flex;
    justify-content: center;

    color: white;
  }
}
</style>
