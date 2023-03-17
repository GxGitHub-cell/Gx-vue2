<template>
  <div class="home">
    <el-row class="row" :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="user">
            <img class="icon" :src="user.sex == '男' ? boyImg : girlImg" />
            <div class="userInfo">
              <p class="admin">用户名</p>
              <p class="gtitle">{{ user.name }}</p>
            </div>
          </div>
          <div class="time">
            <p class="gtitle">
              上次登录时间: <span>{{ user.lastlogintime }}</span>
            </p>
            <p class="gtitle">
              上次登录地点: <span>{{ user.lastplace }}</span>
            </p>
          </div>
        </el-card>
        <el-card style="margin-top: 30px" shadow="hover">
          <el-table :data="tableData">
            <el-table-column
              show-overflow-tooltip
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="num">
          <div class="numcard" v-for="(item, index) in countData" :key="index">
            <i :class="item.icon" :style="{ background: item.color }"></i>
            <div class="des">
              <div>{{ item.value }}</div>
              <div>{{ item.name }}</div>
            </div>
          </div>
        </div>

        <el-card shadow="hover" style="height: 300px; width: 100%" id="bar">
        </el-card>
        <div class="charts">
          <el-card
            class="sonchart"
            shadow="hover"
            style="height: 250px"
            id="pie"
          ></el-card>
          <el-card
            class="sonchart"
            shadow="hover"
            style="height: 250px"
            id="line"
          ></el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { bar, pie, line } from "../tools/echarts.js";
export default {
  data() {
    return {
      user: {},
      boyImg: require("../imgs/boy.png"),
      girlImg: require("../imgs/girl.png"),

      countData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日销量",
        monthBuy: "本月销量",
        totalBuy: "总销量",
      },
      tableData: [],
    };
  },

  methods: {
    charts(type, callback) {
      this.$axios
        .get("http://127.0.0.1:3000/charts", {
          params: {
            type: type,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    },
    buyorder() {
      this.$axios.get("http://127.0.0.1:3000/buyorder").then((res) => {
        if (res.data.code == 1) {
          this.countData = res.data.data;
        }
      });
    },
    buycourseReq() {
      this.$axios.get("http://127.0.0.1:3000/buycourse").then((res) => {
        if (res.data.code == 1) {
          this.tableData = res.data.data;
        }
      });
    },
  },
  mounted() {
    let obj = this.$localSave.getItem("user");

    this.user = obj;

    this.buycourseReq(),
      this.buyorder(),
      this.charts("bar", (res) => {
        bar(
          document.getElementById("bar"),
          res.data.title,
          res.data.xdata,
          res.data.ydata
        );
      });
    this.charts("pie", (res) => {
      pie(document.getElementById("pie"), res.data);
    });
    this.charts("line", (res) => {
      line(document.getElementById("line"), res.data.xdata, res.data.ydata);
    });
  },
};
</script>
<style lang="less" scoped>
.home {
  .row {
    padding: 20px;
  }
  .user {
    display: flex;
    justify-content: center;
    text-align: center;
    .userInfo {
      margin-left: 20px;
      .admin {
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
  }
  .numcard {
    width: 30%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-wrap: wrap;
    border: 1px solid #eee;
    margin-left: 5px;

    i {
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      // margin-top: 10px;
      // margin-bottom: 20px;
    }
    .des {
      display: flex;
      flex-direction: column;
      height: 60px;
      justify-content: space-between;
      margin-left: 20px;
      font-size: 14px;
      color: #333;
    }
  }

  .charts {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .sonchart {
      width: 50%;
    }
  }
  .time {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon {
    height: 60px;
    width: 60px;
    margin-top: 22px;
  }
  .gtitle {
    font-size: 14px;
    color: #666;
  }
}
</style>