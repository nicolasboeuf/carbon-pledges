<template>
  <div id="app">
    <h1>Decarbonization Observatory: target-based global and national scenarios</h1>
    <div id="intro">
      <span v-if='config["texts"]' v-html='config["texts"]["intro"]["main"]'></span>
    </div>
    <CombinedImpactChart></CombinedImpactChart>
    <ImpactScenariosChart></ImpactScenariosChart>
    <CurrentEmissionsChart></CurrentEmissionsChart>
    <GlobalTemperatureChart></GlobalTemperatureChart>
  </div>
</template>

<script>

import CurrentEmissionsChart from './components/CurrentEmissionsChart.vue'
import GlobalTemperatureChart from './components/GlobalTemperatureChart.vue'
import ImpactScenariosChart from './components/ImpactScenariosChart.vue'
import CombinedImpactChart from './components/CombinedImpactChart.vue'
import store from '@/store'
import { getConfig } from './import.js'
import { getCurrentEmissionsData } from './import.js'
import { getGlobalTempData } from './import.js'
import { getImpactScenariosData } from './import.js'
import { getCombinedImpactData } from './import.js'

export default {
  name: 'App',
  components: {
    CurrentEmissionsChart,
    GlobalTemperatureChart,
    ImpactScenariosChart,
    CombinedImpactChart
  },

  computed: {
    combinedImpactDataEndImport() {
      return store.state.configEndImport
    },
    config(){
      return store.state.config
    }
  },

  watch:{

    combinedImpactDataEndImport:function(){

      getCurrentEmissionsData(store,"World")
      getGlobalTempData(store)
      getImpactScenariosData(store,"World")
      getCombinedImpactData(store,"World")

    }

  },
  
  created(){
    getConfig(store)
  }

}
</script>

<style lang="scss">

@import "../css/variables.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  h1{
    font-family: "barlow-bold";
    font-size:21px;
    background:$semiGradientDark;
    width: 80%;
    max-width: 800px;
    padding: 5px 25px 5px 25px;
    box-sizing: border-box;
    color:white;
    border-radius: 15px;
    position: relative;
    margin:20px auto 0;
    text-align: center;
  }
  #intro{
    width: 80%;
    max-width: 1080px;
    margin: 25px auto 45px;
    background-color: $lightBlue;
    color:$deepBlue;
    font-family: "DMSans-Regular";
    font-size: 18px;
    line-height: 26px;
    padding: 15px;
    border-radius: 5px;
  }
  h2{
    color:$mediumBlue;
    font-family: "barlow-bold";
    font-size:20px;
    margin-bottom: 0;
  }
  h3{
    margin-top:5px;
    font-family: "DMSans-Regular";
    font-size:15px;
  }
  .chartComponent{
    width: 100%;
    max-width: 1750px;
    margin:0 auto 75px;
    position: relative;
    .componentSpace{
      position: relative;
      margin-top: 25px;
      .chartSpace{
        position: relative;
        width: 70%;
        display: inline-block;
        height: 600px;
        #nodataModale{
          position: absolute;
          width: 30%;
          height: 30%;
          top:50%;
          left:50%;
          -moz-transform:translate(-50%,-50%);
          -o-transform:translate(-50%,-50%);
          -ms-transform:translate(-50%,-50%);
          -webkit-transform:translate(-50%,-50%);
          transform:translate(-50%,-50%);
          border:2px solid $deepBlue;
          background-color: white;
          border-radius: 5px;
          text-align: center;
          span{
            font-size: 24px;
            position: relative;
            top:75px;
          }
        }
      }
      .controlsSpace{
        position: relative;
        width: 30%;
        display: inline-block;
        box-sizing: border-box;
        height: 600px;
        .controlsWrapper{
          position: absolute;
          width: 90%;
          left:50%;
          -moz-transform:translate(-50%,0);
          -o-transform:translate(-50%,0);
          -ms-transform:translate(-50%,0);
          -webkit-transform:translate(-50%,0);
          transform:translate(-50%,0);
          .downloadBtn{
            width: 30px;
            height: 30px;
            background-color: $deepBlue;
            position: absolute;
            top:0;
            right: 0;
            border-radius: 50%;
            cursor: pointer;
            &:hover{
              background-color: $lightBlue;
              svg{
                fill:$deepBlue;
                stroke:$deepBlue;
              }
            }
            svg{
              fill:#fff;
              stroke:#fff;
              position: absolute;
              width: 15px;
              top:50%;
              left:50%;
              -moz-transform:translate(-50%,-50%);
              -o-transform:translate(-50%,-50%);
              -ms-transform:translate(-50%,-50%);
              -webkit-transform:translate(-50%,-50%);
              transform:translate(-50%,-50%);
            }
          }
          .controls_box{
            width: 100%;
            display: block;
            margin-bottom: 15px;
            .controls_title{
              font-family: "barlow-semibold";
              font-size:17px;
              margin-bottom: 10px;
              display: block;
            }
            .controls_subtitle{
              font-family: "barlow-regular";
              font-size:13px;
              margin-top: -10px;
              margin-bottom: 10px;
              display: block;
            }
            .controls_dropdown {
              position: relative;
              cursor: pointer;
              height: 28px;
              &:after{
                content:"";
                position: absolute;
                left:65%;
                top: 50%;
                -moz-transform:translate(0,-5px);
                -o-transform:translate(0,-5px);
                -ms-transform:translate(0,-5px);
                -webkit-transform:translate(0,-5px);
                transform:translate(0,-5px);
                width: 0;
                height: 0;
                border-left: 7px solid transparent;
                border-right: 7px solid transparent;
                border-top: 10px solid black;
                clear: both;
              }
              &:hover{
                &:after{
                  opacity: 0.8;
                }
              }
              .dropdown-input {
                width: 65%;
                height: 28px;
                border-radius: 20px;
                font-family: "DMSans-Regular";
                font-size: 14px;
                background:$semiGradientLight;
                border:none;
                position: absolute;
                border-radius: 20px;
                padding-left: 20px;
                cursor: pointer;
                &:focus{
                  outline: none!important;
                }
              }
              .dropdown-menu {
                position: absolute;
                background-color: $extraLightBlue;
                width: 65%;
                z-index: 1;
                max-height: 250px;
                overflow: scroll;
                top:32px;
                padding-left:20px;
                border-radius: 20px;
                padding-bottom: 4px;
                padding-top: 4px;
              }
              .dropdown-menu-item {
                padding-top: 8px;
                cursor: pointer;
              }
              .dropdown-menu-item:hover {
                background-color: $lightBlue;
              }
            }
            .switch_controls_box{
              display: flex;
              .switch_container{
                width: 60px;
                height: 20px;
                border-radius: 20px;
                background-color: $lightBlue;
                margin-right: 10px;
                margin-bottom: 5px;
                display: flex;
                justify-content: center;
                align-items:center;
              }
              .switch{
                width: 25px;
                height: 16px;
                border-radius: 20px;
                background-color: $deepBlue;
                position: relative;
                cursor: pointer;
                svg{
                  fill:white;
                  width: 11px;
                  position: absolute;
                  left:50%;
                  top:50%;
                  -moz-transform:translate(-50%,-50%);
                  -o-transform:translate(-50%,-50%);
                  -ms-transform:translate(-50%,-50%);
                  -webkit-transform:translate(-50%,-50%);
                  transform:translate(-50%,-50%);
                }
                &.inactive{
                  background-color: transparent;
                  svg{
                    fill:$deepBlue;
                  }
                }
              }
              .switch_label{
                font-family: "DMSans-Regular";
                font-size: 14px;
              }
            }
            .toggle_controls_wrapper{
              display: flex;
              .toggle_controls_label{
                font-family: "DMSans-Regular";
                font-size: 14px;
                cursor: pointer;
                &.active{
                  color:$deepBlue;
                  pointer-events: none;
                }
                &:hover{
                  color:$deepBlue;
                }
              }
              .toggle_controls_box{
                width: 50px;
                height: 20px;
                background-color: $lightBlue;
                border-radius: 20px;
                margin-left:5px;
                margin-right:5px;
                position: relative;
                cursor: pointer;
                &:hover{
                  .toggle_controls_inner{
                    background-color: $mediumBlue;
                  }
                }
                .toggle_controls_inner{
                  width: 25px;
                  height: 15px;
                  background-color: $deepBlue;
                  border-radius: 15px;
                  position: absolute;
                  top:50%;
                  -moz-transform:translate(0,-50%);
                  -o-transform:translate(0,-50%);
                  -ms-transform:translate(0,-50%);
                  -webkit-transform:translate(0,-50%);
                  transform:translate(0,-50%);
                  left:2px;
                  right:auto;
                  transition:all 0.3s ease-in-out;
                }
                &.toggled{
                  .toggle_controls_inner{
                    left:auto;
                    right: 2px;
                  }
                }
              }
            }
            .controls_multiple_tick_container{
              display: flex;
              flex-wrap: wrap;
              flex-direction: column;
              max-height: 170px;
              .controls_tick_container{
                flex: 1 0 26%;
                margin: 0px;
                &:last-child{
                  flex: 1 0 59%;
                }
              }
              &.sequential{
                .controls_tick_container{
                  &:nth-last-child(-n+1){
                    .tick{
                      &:after{
                        display: none;
                      }
                    }
                  }
                  .tick{
                    position: relative;

                    &:after{
                      content: "";
                      width: 2px;
                      height: 10px;
                      background-color: $deepBlue;
                      position: absolute;
                      bottom:-11px;
                      left:50%;
                      -moz-transform:translate(-50%,0);
                      -o-transform:translate(-50%,0);
                      -ms-transform:translate(-50%,0);
                      -webkit-transform:translate(-50%,0);
                      transform:translate(-50%,0);
                    }

                  }
                }
              }
            }
            .controls_select_all_container{
              display: flex;
              margin-bottom: 15px;
              .select_all_btn{
                font-family: "DMSans-Medium";
                font-size: 14px;
                margin-right: 10px;
                color:black;
                cursor: pointer;
                
                text-decoration: underline;
                text-decoration-style: dotted;
                &:hover{
                  text-decoration-style: solid;
                  color:$deepBlue;
                }
              }
            }
            &.boxed{
              .controls_box_header{
                width: 100%;
                height: 36px;
                background: $semiGradientDark;
                border-radius: 36px;
                margin:0 auto;
                text-align: center;
                position: relative;
                svg{
                  position: absolute;
                  fill: white;
                  width: 20px;
                  left: 15px;
                  top:50%;
                  -moz-transform:translate(0,-50%);
                  -o-transform:translate(0,-50%);
                  -ms-transform:translate(0,-50%);
                  -webkit-transform:translate(0,-50%);
                  transform:translate(0,-50%);
                }
                .controls_box_header_title{
                  position: relative;
                  color:white;
                  font-family: "barlow-semibold";
                  font-size: 17px;
                  top:4px;
                  span{
                    font-size: 12px;
                  }
                }
              }
              &.boxed.disable{
                pointer-events: none;
                opacity: 0.4;
              }

              .controls_box_body{
                width: 90%;
                background-color: $extraLightBlue;
                margin:0 auto;
                padding-top:15px;
                padding-left: 15px;
                padding-bottom: 15px;
                display:grid;
                grid-template-columns: auto auto;
                grid-column-gap: 0px;
                grid-row-gap: 0px;
                &.sectors_box{
                  display: block;
                  .controls_tick_container{
                    margin-bottom: 15px;
                    &:last-child{
                      margin-bottom: 0px;
                    }
                    .tick_label{
                      text-wrap: wrap;
                      position: absolute;
                      width: 80%;
                      margin-left:30px;
                    }
                  }
                }
                .controls_tick_container{
                  width: 100%;
                  .tick_label{
                    text-wrap: nowrap;
                  }
                }
              }
            }
          }
          .controls_filet{
            width:80%;
            height: 1px;
            background-color: $extraLightBlue;
            margin-bottom: 20px;
          }
          .controls_radio_container{
            display: flex;
            cursor: default;
            .radio{
              width: 20px;
              height: 20px;
              border-radius: 100%;
              background-color: $lightBlue;
              margin-right: 10px;
              margin-bottom: 5px;
              border:1px solid $deepBlue;
              box-sizing: border-box;
              position: relative;
              cursor: normal;
              .radio_inner{
                width: 11px;
                height: 11px;
                border-radius: 100%;
                background-color: $deepBlue;
                position: absolute;
                left:50%;
                top:50%;
                -moz-transform:translate(-50%,-50%);
                -o-transform:translate(-50%,-50%);
                -ms-transform:translate(-50%,-50%);
                -webkit-transform:translate(-50%,-50%);
                transform:translate(-50%,-50%);
              }
            }
            .radio_label{
              font-family: "DMSans-SemiBold";
              font-size: 14px;
              color:$deepBlue;
            }
            &.inactive{
              cursor: pointer;
              &:hover{
                .radio_label{
                  color:$deepBlue;
                }
                .radio{
                  .radio_inner{
                    display: block;
                    opacity: 0.3;
                  }
                }
              }
              .radio{
                .radio_inner{
                  display: none;
                }
              }
              .radio_label{
                font-family: "DMSans-Regular";
                color:black;
              }
            }
          }
          .controls_tick_container{
            display: flex;
            cursor: pointer;
            position: relative;
            &.disable{
              pointer-events: none;
              opacity: 0.4;
            }
            &.non-selectable{
              //pointer-events: none;
              .tick{
                background-color: #fff;
                border:1px dashed $deepBlue;
                .tick_inner{
                  &:before{
                    background-color: $deepBlue;
                  }
                  &:after{
                    background-color: $deepBlue;
                  }
                }
              }
            }
            .info_btn{
              display: block;
              width: 15px;
              height: 15px;
              background-color: $lightBlue;
              position: relative;
              right: 0;
              display: inline-block;
              border-radius: 50%;
              svg{
                width: 8px;
                fill:#fff;
                position: absolute;
                left:50%;
                top:50%;
                -moz-transform:translate(-50%,-50%);
                -o-transform:translate(-50%,-50%);
                -ms-transform:translate(-50%,-50%);
                -webkit-transform:translate(-50%,-50%);
                transform:translate(-50%,-50%);
              }
              &:hover{
                .info_modale{
                  display: block;
                }
              }
              .info_modale{
                display: none;
                position: absolute;
                left:50%;
                top:20px;
                -moz-transform:translate(-50%0);
                -o-transform:translate(-50%,0);
                -ms-transform:translate(-50%,0);
                -webkit-transform:translate(-50%,0);
                transform:translate(-50%,0);
                width: 150px;
                height: auto;
                background-color: $lightBlue;
                z-index: 999;
                padding: 10px;
                border-radius: 5px;
                font-family: "DMSans-Regular";
                color:black;
                pointer-events: none;
              }
            }

            &.controls_tick_container_yellow{
              .tick{
                background-color: $yellow;
                border:1px solid $yellow;
              }
              &.inactive{
                &:hover{
                  .tick{
                    background-color: rgba(249,174,21,0.3);
                  }
                  .tick_label{
                    color:$yellow;
                  }
                }
              }
            }
            .tick{
              width: 20px;
              height: 20px;
              border-radius: 5px;
              background-color: $deepBlue;
              margin-right: 10px;
              margin-bottom: 10px;
              border:1px solid $deepBlue;
              box-sizing: border-box;
              position: relative;
              .tick_inner{
                width: 100%;
                height: 100%;
                position: absolute;
                &:before{
                  content: "";
                  width: 2px;
                  height: 12px;
                  background-color: white;
                  position: absolute;
                  left:50%;
                  top:50%;
                  -moz-transform:translate(-50%,-50%) rotate(45deg);
                  -o-transform:translate(-50%,-50%) rotate(45deg);
                  -ms-transform:translate(-50%,-50%) rotate(45deg);
                  -webkit-transform:translate(-50%,-50%) rotate(45deg);
                  transform:translate(-50%,-50%) rotate(45deg);
                }
                &:after{
                  content: "";
                  width: 2px;
                  height: 12px;
                  background-color: white;
                  position: absolute;
                  left:50%;
                  top:50%;
                   -moz-transform:translate(-50%,-50%) rotate(-45deg);
                  -o-transform:translate(-50%,-50%) rotate(-45deg);
                  -ms-transform:translate(-50%,-50%) rotate(-45deg);
                  -webkit-transform:translate(-50%,-50%) rotate(-45deg);
                  transform:translate(-50%,-50%) rotate(-45deg);
                }
              }
            }
            .tick_label{
              font-family: "DMSans-Regular";
              font-size: 14px;
              color:black;
            }
            &.inactive{
              cursor: pointer;
              &:hover{
                .tick{
                  background-color: $lightBlue;
                }
                .tick_label{
                  color:$deepBlue;
                }
              }
              .tick{
                background-color: white;
                .tick_inner{
                  display: none;
                }
              }
            }
          }
        }
      }
    }
    .chart_legend{
      .chart_legend_txt{
        font-family: "DMSans-Regular";
        font-size:15px;
        display: block;
      }
      .chart_legend_btn{
        display: inline-block;
        width: auto;
        background-color: $deepBlue;
        padding:2px 7px 2px 7px;
        border-radius: 3px;
        color:white;
        font-family: "DMSans-Regular";
        font-size:12px;
        cursor: pointer;
        margin-top: 5px;
      }
    }
    .chart_drawer{
      width: 100%;
      overflow: hidden;
      margin-top: 5px;
      &.close{
        height:0;
      }
      &.open{
        height: auto;
      }
      .chart_drawer_text{
        font-family: "DMSans-Regular";
        font-size:15px;
      }
    }
  }

  @media (max-width: 1280px) {

    .chartComponent{
      &#currentEmissionsChart{
        .chartSpace{
          height: 600px;
        }
        .controlsSpace{
          min-height: 600px;
        }
      }
      .componentSpace{
        .chartSpace{
          width: 60%;
          height: 500px;

        }
        .controlsSpace{
          width: 40%;
          height: 500px;
        }
      }
    }

  }

  @media (max-width: 1024px) {

    .chartComponent{
      height: auto;
      margin-bottom: 50px;
      &#currentEmissionsChart{
        .chartSpace{
          height: 450px;

        }
        .controlsSpace{
          min-height: 600px;
        }
      }
      &#globalTemperatureChart{
        .controlsSpace{
          height: 200px;
        }
      }
      &#impactScenariosChart{
        .controlsSpace{
          min-height: 400px;
        }
      }
      &#combinedImpactChart{
        .controlsSpace{
          min-height: 400px;
        }
      }
      .componentSpace{
        .chartSpace{
          width: 100%;
          display: block;
          height: 450px;
        }
        .controlsSpace{
          width: 100%;
          display: block;
          margin-top:20px;
        }
      }
    }
    
  }
}
</style>
