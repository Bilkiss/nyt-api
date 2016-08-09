myApp.controller('listsController', ['$scope','$http', function($scope,$http) {

    var url = "https://api.nytimes.com/svc/books/v3/lists.json";
    url += '?api-key=362f4508e923486dbd28ee49cf4693b9&list=e-book-fiction&weeks-on-list=1';

    $http({
        method: 'GET',
        url: url
    }).then(function successCallback(response) {
        console.log("success");
        console.log(response);
        $scope.lists = response;
        $scope.books = [];

        $scope.lists.data.results.map(function(data){
            $scope.books.push({
                title : data.book_details[0]['title'],
                rank : data.rank,
                rank_last_week : data.rank_last_week,
                author : data.book_details[0]['author'],
                description : data.book_details[0]['description'],
            })
        })
        //console.log($scope.lists.data.results[0]);
        console.log($scope.books);

        $scope.published_date = $scope.lists.data.results[0]['published_date'];
    }, function errorCallback(response) {
        console.log("error");
        console.log(response);
    });

    $scope.value = 'rank';
    $scope.sorting = 'rank';
    $scope.reverse = true;

    $scope.dynamicOrder = function(value) {
        //console.log($scope.order);
        //return $scope.order;
        $scope.reverse = ($scope.value === value) ? !$scope.reverse : false;
        $scope.sorting = value;
        console.log(value);

    }
}]);