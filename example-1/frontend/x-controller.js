'use strict';

angular.module('fw').controller('ACtrl', function($scope) {

    $scope.CANVAS_HEIGHT = 300;
    $scope.TEMPERATURE_STEP = 10; // it is how many degree increases/decreates per 1 second
    $scope.lines = [];

    function init() {
        $scope.lines.push( {start: 0, temperature: 100, time: 60, stop: 70});
        $scope.lines.push( {temperature: 50, time: 60, start: 70, stop: 135});
        $scope.lines.push( {temperature: 150, time: 60, start: 135, stop: 205});
        //$scope.lines.push( {temperature: 0, time: 0});
        drawLine($scope.lines);
    }
    init();

    function drawLine(data) {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(0,300);
        var x = 0;
        var previous_temperature = 0;
        _.forEach(data, function(item){
            // draw the change temperature line
            var dx = Math.abs(item.temperature - previous_temperature) / $scope.TEMPERATURE_STEP;
            ctx.lineTo(dx + x, $scope.CANVAS_HEIGHT - item.temperature);
            previous_temperature = item.temperature;
            // text label
            ctx.fillText(item.time + 'sec', x + dx + 10 , $scope.CANVAS_HEIGHT - item.temperature - 5);
            // draw the linear line how long keep the temperature
            x += item.time + dx;
            ctx.lineTo(x, $scope.CANVAS_HEIGHT - item.temperature);

        });
        data[data.length -1].stop = x;
        ctx.stroke();
    }

    $scope.add = function() {
        drawLine($scope.lines);
        $scope.lines.push({start: 1});
    };


    $scope.$on('$stateChangeSuccess', init);


});
