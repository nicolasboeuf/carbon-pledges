<template>
  <div id="globalTemperatureChart" class="chartComponent">
    <h2 v-if="config['texts']" v-html="config['texts']['global-temperature']['title']"></h2>
    <h3 v-if="config['texts']" v-html="config['texts']['global-temperature']['subtitle']"></h3>
    <div class="componentSpace">
      <div class="chartSpace">
        <canvas id="globalTemperature_chart"></canvas>
        <div id="nodataModale" v-if="chart&&datasets.length===0">
          <span>No vizualisation available with this data selection</span>
        </div>
      </div>
      <div class="controlsSpace">
        <div class="controlsWrapper">

        <a download :href="customUrl"><div class="downloadBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 256V160H224v96H64zm0 64H224v96H64V320zm224 96V320H448v96H288zM448 256H288V160H448v96zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/></svg></div></a>
            
          <div class="controls_box">

            <span class="controls_title">Reference scenario</span>

            <div :class="['controls_tick_container', settings.scenarios['low']?'':'inactive']" @click="switchScenario('low')">
              <div class="tick">
                <div class="tick_inner"></div>
              </div>
              <span class="tick_label">Unconditional near-term targets and net-zero targets</span>
            </div>

            <div :class="['controls_tick_container', settings.scenarios['high']?'':'inactive']" @click="switchScenario('high')">
              <div class="tick">
                <div class="tick_inner"></div>
              </div>
              <span class="tick_label">Conditional near-term targets and net-zero targets</span>
            </div>

        </div>

        <div class="controls_filet"></div>

        <div class="controls_box">

            <div :class="['controls_tick_container controls_tick_container_yellow', settings['annotations']?'':'inactive']">
              <div class="tick">
                <div class="tick_inner"></div>
              </div>
              <span class="tick_label">Paris agreement targets</span>
            </div>

        </div>


        </div>
      </div>
    </div>
    <div class="chart_legend">
      <span class="chart_legend_txt" v-if="config['texts']" v-html="config['texts']['global-temperature']['legend-short']"></span>
      <div class="chart_legend_btn" @click="toggleDrawer()">
        <span v-if="openDrawer==false">Read more</span>
        <span v-if="openDrawer==true">Read less</span>
      </div>
    </div>
    <div :class="['chart_drawer',openDrawer?'open':'close']">
      <span class="chart_drawer_text" v-if="config['texts']" v-html="config['texts']['global-temperature']['legend-long']"></span>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { Chart } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation';
//import { getData } from '../import.js'

export default {
  name: 'globalTemperatureChart',
  data(){
    return {
      openDrawer:false,
      chart: undefined,
      labels:[],
      datasets:[],
      datasetsLabel:[],
      settings:{
        "scenarios":{"low":true,"high":true},
        "annotations":true
      },
      colors:["rgba(0,76,109,1)","rgba(0,223,237,1)"],
      bgColors:["rgba(0,76,109,0)","rgba(0,103,138,0)"],
    }
  },
  props: {
  },
  computed: {
    globalTempDataEndImport() {
      return store.state.globalTempDataEndImport
    },
    globalTempData(){
      return store.state.globalTempData
    },
    customUrl(){
      return "https://raw.githubusercontent.com/nicolasboeuf/decarbonization-observatory-data/master/global_temp/global_temp.json"
    },
    config(){
      return store.state.config
    }
  },

  methods: {

    updateData(){
      
      this.labels.length = 0
      this.datasets.length = 0
      this.datasetsLabel.length = 0

      var self = this

      const byCond = Object.groupBy(self.globalTempData, ({ Conditionality }) => Conditionality);

      Object.keys(byCond).forEach(function(Conditionality){
        var dataset =
          {
            data: [],
            type: 'line',
            backgroundColor: self.bgColors[self.datasets.length],
            borderColor: self.colors[self.datasets.length],
            pointRadius: 15,
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointHoverRadius: 15
          }
        byCond[Conditionality].forEach(function(d){
          //var temp_float = parseFloat(d["dT"].replace(",","."))
          var temp_float = parseFloat(d["dT"])
          if(!self.labels.includes(d["Year"])){ self.labels.push(d["Year"]) }
          dataset["data"].push(temp_float)
        })
        if(self.settings.scenarios[Conditionality.toLowerCase()]==true){
          self.datasets.push(dataset)  
          if(Conditionality == "Low"){
            self.datasetsLabel.push("Unconditionnal")
          }else{
            self.datasetsLabel.push("Conditionnal")
          }
        }
        
      })
      
    },

    createChart(){
      var self = this

      this.updateData()
      console.log(annotationPlugin)
      const ctx = document.getElementById("globalTemperature_chart").getContext('2d')
      this.chart = new Chart(ctx, {
        data: {
          labels: self.labels,
          datasets: self.datasets
        },
        options: {
          maintainAspectRatio: false,
          animation: {
            easing: 'easeInOutBack'
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: 'rgba(0, 0, 0, 0)'
              },
              scaleLabel:{
                display:true,
                labelString:"Year",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 100,
                maxRotation: 0,
                minRotation: 0,
                callback: function (value) {
                  return value % 10 === 0 ? value:''
                }
              }
            }],
            yAxes: [{
              gridLines: {
                color: 'rgba(0, 0, 0, 0.05)',
                borderDash: [0]
              },
              scaleLabel:{
                display:true,
                labelString:"Global-mean temperature change relative to 1850-1900 (°C)",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 15,
                beginAtZero: false,
                callback: function (value) {
                  return value+"°C"
                }
              },
            }]
          },
          legend: {
            display: false
          },
          annotation: {
            annotations: [
              {
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 2,
                borderColor: 'rgb(249, 174, 21)',
                borderWidth: 1,
                label: {
                  enabled: true,
                  content: '+ 2°C',
                  position:"right",
                  backgroundColor: 'rgba(999,999,999,1)',
                  fontColor:'rgb(249, 174, 21)'
                }
              },
              {
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 1.5,
                borderColor: 'rgb(249, 174, 21)',
                borderWidth: 1,
                label: {
                  enabled: true,
                  content: '+ 1.5°C',
                  position:"right",
                  backgroundColor: 'rgba(999,999,999,1)',
                  fontColor:'rgb(249, 174, 21)'
                }
              }
            ]
          },
          tooltips:{
            callbacks:{
              title: function (tooltipItem) {
                return(tooltipItem[0]["xLabel"])
              },
              label: function(tooltipItem){
                var value = "+"+parseFloat(tooltipItem["value"]).toLocaleString()+" °C"
                return(value)
              },
              labelColor: function(tooltipItem) {
                return {
                  borderColor: self.colors[tooltipItem["datasetIndex"]],
                  backgroundColor: self.colors[tooltipItem["datasetIndex"]],
                }
              },
              afterTitle:function(tooltipItem){
                return(self.datasetsLabel[tooltipItem[0]["datasetIndex"]])
              }
            }
          }
        }
      })
    },
    updateChart(){
      this.updateData()
      this.chart.update()
    },

    switchScenario(scenario){
      if(this.settings.scenarios[scenario] == true){
        this.settings.scenarios[scenario] = false
      }else{
        this.settings.scenarios[scenario] = true
      }
    },

    switchAnnotation(){
      if(this.settings["annotations"] == true){
        this.settings["annotations"] = false
      }else{
        this.settings["annotations"] = true
      }
    },

    toggleDrawer(){
      if(this.openDrawer == true){
        this.openDrawer = false
      }else{
        this.openDrawer = true
      }
    }
    
    
  },

  watch:{
    globalTempDataEndImport:function(){
      if(this.chart){
        this.updateChart()
      }else{
        this.createChart()
      }
    },
    settings: {
       handler(){
          this.updateChart()
       },
       deep: true
    }
  },

  created(){
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
  /* overload fonts path, to delete when parent has access */
  @import "../../css/overload-fonts.css";

  canvas{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  

  @media (max-width: 728px) {
    
  }


</style>
