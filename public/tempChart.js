angular.module("app", ["chart.js"])
// Optional configuration
.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
        chartColors: ['#FF5252', '#FF8A80'],
        responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
        showLines: true
    });
}])
.controller("LineCtrl", ['$scope', '$interval', '$http', function ($scope, $interval, $http) {
    $scope.labels = ["15/10", "16/10", "17/10", "18/10", "19/10", "20/10", "21/10"];
    $scope.series = ['Temperature', 'Humidity'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    refresh=$interval(()=>{
        $http.get('http://raspberrypi.local:3009/data').success((data, status, headers, config)=>{
            let labels=new Array();
            let temperature=new Array();
            let humidity=new Array();
            angular.forEach(data.average.reverse(),function(value, key){
                labels.push(value.date);
                temperature.push(value.temperature.toFixed(2));
                humidity.push(value.humidity.toFixed(2));
            });
            $scope.labels=labels;
            $scope.data=[temperature,humidity];
        });
    },1000);
}])
.controller('NameController', ['$scope', function ($scope) {
    $scope.yourName = 'No Name';
}])
.filter('sayHello', function () {
    return function (name) {
        return 'Hello, ' + name;
    }
});