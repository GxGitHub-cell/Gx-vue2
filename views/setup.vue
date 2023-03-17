<template>
  <div class="setup">
    <el-card class="box-card">
      <h3>修改密码</h3>
      <el-form :model="user" ref="user" label-width="auto">
        账号:<el-input placeholder="" v-model="user.name" :disabled="true">
        </el-input>
        <br />
        原密码:
        <el-input v-model="user.oldpsw" placeholder="请输入原密码"></el-input>
        <br />
        新密码:
        <el-input v-model="user.newpsw" placeholder="请输入新密码"></el-input>
        <br />
        <el-button @click="modipsw" type="change">修改密码</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        oldpsw: "",
        newpsw: "",
      },
    };
  },
  methods: {
    modipsw() {
      this.$axios
        .get("http://127.0.0.1:3000/modifypsw", {
          params: {
            name: this.user.name,
            oldpsw: this.user.oldpsw,
            newpsw: this.user.newpsw,
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.$message(res.data.msg);
            this.$localSave.removeItem("user");
            this.$router.push({ path: "/" });
          } else {
            this.$message(res.data.msg);
          }
        });
    },
  },
  mounted() {
    let obj = this.$localSave.getItem("user");
    this.user.name = obj.name;
  },
};
</script>
<style scoped>
.el-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-button {
  margin-top: 20px;
}
</style>