<template>
  <!-- 头部组件 -->
  <div class="topheader">
    <div class="left">
      <!-- icon图标 -->
      <el-button plain icon="el-icon-menu" size="mini" @click="collapse">
      </el-button>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="currentMenu.path" v-if="currentMenu">
          {{ currentMenu.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="right">
      <!-- trigger触发方式 -->
      <el-dropdown @command="handleCommand" trigger="click" szie="mini">
        <span>
          <img :src="user.sex == '男' ? boyImg : girlImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="setup">设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boyImg: require("../imgs/boy.png"),
      girlImg: require("../imgs/girl.png"),
      user: {},
    };
  },

  methods: {
    collapse() {
      //修改左侧菜单折叠状态
      this.$store.commit("setCollapse");
    },
    handleCommand(command) {
      console.log(command);
      //设置
      if (command == "setup") {
        let setup = {
          path: "/setup",
          name: "setup",
          label: "设置",
          icon: "el-icon-setting",
        };
        this.$store.commit("selectMenu", setup);
        this.$router.push("/setup");
      } else {
        //退出登录
        this.$msgBox("是否退出登录?", () => {
          this.$localSave.removeItem("user");
          this.$router.push({ path: "/" });
          /*
                1.this.$router.push()
                描述：跳转到不同的url，但这个方法会向history栈添加一个记录，点击后退会返回到上一个页面。
                2.this.$router.replace()
                描述：同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。 
                */
        });
      }
    },
  },

  mounted() {
    let user = this.$localSave.getItem("user");
    if (user) {
      this.user = user;
    }
  },

  computed: {
    currentMenu() {
      return this.$store.state.currentMenu;
    },
  },
};
</script>

<style lang="less">
.topheader {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 10px;
    }
  }

  .right {
    img {
      width: 30px;
      height: 30px;
      border-radius: 20px;
    }
  }
}
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: white;
  }

  &:last-child {
    .el-breadcrumb__inner {
      color: white;
    }
  }
}
</style>