import * as echarts from 'echarts'
let bar = function(el,title,xdata,ydata){
  // 基于准备好的dom，初始化echarts实例
let barChart = echarts.init(el);
 
// 指定图表的配置项和数据
let option = {
    title: {
        text: ''
    },
    tooltip: {},
    legend: {
        data:[title]
    },
    xAxis: {
        data: xdata
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: ydata
    }]
};

// 使用刚指定的配置项和数据显示图表。
barChart.setOption(option);
return barChart;
}

let pie = function(el,arydata){
    var myChart = echarts.init(el);
 
        myChart.setOption({
            series : [
                {
                    name: '',
                    type: 'pie',    // 设置图表类型为饼图
                    radius: '50%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                    data:arydata
                }
            ]
        })
        return myChart;
}

let line = function(el,xdata,ydata){
    let myChart = echarts.init(el);
   let option = {
        xAxis: {
          data: xdata
        },
        yAxis: {},
        series: [
          {
            data: ydata,
            type: 'line',
            lineStyle: {
              normal: {
                color: 'green',
                width: 4,
                
              }
            }
          }
        ]
      };
      myChart.setOption(option);
      return line;
}

export {bar,pie,line}