(function(){ 
  "use strict";
  angular.module("EduPlanner").service('chart', function(){ 
  
     var chartConfig = {
        options: {
            chart: {
                renderTo: 'chart',
                type: 'area',
                backgroundColor: '#F4F2EA',
                width:900
                                
              
            },
            xAxis :{
             min: 0,
            startOnTick: true,
            endOnTick: true,
            minPadding: 0,
            maxPadding: 0
            },
            yAxis: {
            labels: {
                enabled:true
            }
        },

            title:'',

            legend: {
              enabled: false
            },
            tooltip: {
              useHTML: true,
              backgroundColor: null,
              borderWidth: 0,
              shadow: false,  
              formatter: function(){
                var text = '';
                //console.log(this.series)
                if(this.series.name == 'lumpsum') {
                    //console.log(this.series)
                    text = '<div class="tooltip-highcharts '+ this.series.name + ' pos' + this.point.x +'"><div class="highcharts-tooltip-arrow"></div><div class="fund-title">Total Funds Required at '+ this.series.points[this.point.x].category.match(/\d+/)[0] +'</span> yrs</div> <div class="funds"> SGD ' +
                           this.point.y.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + 
                           '</div></div>'
                } else if(this.series.name == 'available'){
                    text = '<div class="tooltip-highcharts '+ this.series.name + ' pos' + this.point.x +'"><div class="highcharts-tooltip-arrow"></div><div class="fund-title">Total Funds Avaiable at '+ this.series.points[this.point.x].category.match(/\d+/)[0] +' yrs</div> <div class="funds"> SGD ' +
                           this.point.y.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + 
                           '</div></div>'
                } else if(this.series.name == 'additionalMonthly'){
                    text = '<div class="tooltip-highcharts '+ this.series.name + ' pos' + this.point.x +'"><div class="highcharts-tooltip-arrow"></div><div class="fund-title">Additional Monthly Funds</div> <div class="funds"> SGD ' +
                            (parseFloat(this.point.y) - parseFloat($('.available .funds').text().match(/\d+/)[0])).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + 
                           '/mth</div></div>'
                }
                else {
                    text = '<div class="tooltip-highcharts '+ this.series.name + ' pos' + this.point.x +'"><div class="highcharts-tooltip-arrow"></div><div class="fund-title">Additional Monthly Funds</div> <div class="funds"> SGD ' +
                            this.point.y.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + 
                           '</div></div>'
                }
              return text;
              }/*,
              positioner: function(boxWidth, boxHeight, point) {         
                  return {x:point.plotX,y:point.plotY};         
              }*/
            },
            
            plotOptions: {
               series: {
                  marker: {
                      fillColor: '#000000',
                      lineWidth: 0,
                      lineColor: null, // inherit from series,
                      radius:5,
                      symbol: 'circle',
                    allowPointSelect: true
                  },
                  
                  states: {
                      hover: {
                          enabled: false
                      }
                  }
              }

               
            }
        }


       
    }
    return chartConfig;

});

}());



