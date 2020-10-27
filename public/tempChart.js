angular.module("app", ["chart.js","datatables"])
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
    /*$scope.labels = ["15/10", "16/10", "17/10", "18/10", "19/10", "20/10", "21/10"];
    $scope.series = ['Temperature', 'Humidity'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];*/
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    var refresh=()=>{
        $http.get('http://raspberrypi.local:3009/data').then((response)=>{
            let labels=new Array();
            let temperature=new Array();
            let humidity=new Array();
            angular.forEach(response.data.average,function(value, key){
                labels.push(value.date);
                temperature.push(value.temperature.toFixed(2));
                humidity.push(value.humidity.toFixed(2));
            });
            $scope.labels=labels;
            $scope.series=['Temperature','Humidity'];
            $scope.data=[temperature,humidity];
        });
    };
    refresh();
    $interval(refresh,300000)
}])
.controller('DatatablesCtrl', ['$scope','$interval','$http', function ($scope, $interval, $http) {
    $http.get('http://raspberrypi.local:3009/data').then((response)=>{
        $scope.details=response.data.detail;
    });
    // var refresh=()=>{
    // };
    // refresh();
    // $interval(refresh,300000);
}])
.filter('formatAsDate',function(){
    return function(dateTime){
        return moment(dateTime).format('MMMM Do YYYY, h:m a');
    }
});
