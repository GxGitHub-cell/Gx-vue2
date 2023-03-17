<template>
  <div class="login">
    <div class="card">
      <img src="../imgs/icon.png" />
      <h3>vue2后台管理系统</h3>
      <el-form :model="user" :rules="userRules" ref="user" label-width="60px">
        <el-form-item label="账号:" prop="name">
          <el-input
            v-model="user.name"
            placeholder="请输入账号"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="密码:" prop="psw">
          <el-input
            type="password"
            v-model="user.psw"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login">登录</el-button>
      <div class="bottomMenu">
        <!-- 阻止事件的默认行为 -->
        <a href="" @click.prevent="goregister">去注册</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        psw: "",
      },
      // 用户验证规则
      userRules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur", //触发时机:失去焦点时
          },
          {
            min: 4,
            max: 10,
            message: "用户名长度在4到10个字符之间",
            trigger: "blur",
          },
        ],

        psw: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur", //触发时机:失去焦点时
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.user.validate((val) => {
        if (val) {
          this.loginReq();
        }
      });
    },
    loginReq() {
      this.$axios
        .get("http://127.0.0.1:3000/login", {
          params: {
            name: this.user.name,
            psw: this.user.psw,
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.$message(res.data.msg);

            this.$localSave.setItem("user", res.data.data);
            this.$router.push({ path: "/home" });
          } else {
            this.$message(res.data.msg);
          }
        });
    },

    goregister() {
      this.$router.push({ path: "/register" });
    },
  },
  mounted() {
    let obj = this.$localSave.getItem("user");
    if (obj) {
      this.$router.push({ path: "/home" });
    }
  },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  .card {
    border: 0.5px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
    padding: 20px;
    img {
      width: 100px;
    }
    .el-button {
      width: 15%;
    }
    .bottomMenu {
      width: 60%;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>