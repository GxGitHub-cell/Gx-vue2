<template>
  <div>
    <el-container>
      <el-aside style="width: auto">
        <leftaside></leftaside>
      </el-aside>
      <el-container>
        <el-header>
          <topheader></topheader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import leftaside from "../components/leftaside.vue";
import topheader from "../components/topheader.vue";
export default {
  components: {
    leftaside,
    topheader,
  },

  mounted() {},
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background: #333;
}
.el-main {
  padding: 0;
}
</style>