myApp.controller('listsController', ['$scope','$http', function($scope,$http) {


    $scope.fetchBooksInCat = function(category){
        var url = "https://api.nytimes.com/svc/books/v3/lists.json";
        url += '?api-key=362f4508e923486dbd28ee49cf4693b9&list='+category;

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            console.log("success");
            //console.log(response);
            $scope.lists = response;
            $scope.books = [];
            //$scope.bestsellers_name = [];

            $scope.lists.data.results.map(function(data){
                $scope.books.push({
                    title : data.book_details[0]['title'],
                    rank : data.rank,
                    rank_last_week : data.rank_last_week,
                    author : data.book_details[0]['author'],
                    description : data.book_details[0]['description']
                })
            });

            $scope.published_date = $scope.lists.data.results[0]['published_date'];
        }, function errorCallback(response) {
            console.log("error");
            console.log(response);
        });
    };

    $scope.DropDownChanged = function () {
        //console.log("badaboom8888");
        $scope.DropDownStatus = $scope.dropValue;
        $scope.fetchBooksInCat($scope.DropDownStatus);
    };

    var bestsellersUrl = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json";
    bestsellersUrl += '?api-key=362f4508e923486dbd28ee49cf4693b9';


    $http({
        method: 'GET',
        url: bestsellersUrl
    }).then(function successCallback(response) {
        console.log("success on bestsellersUrl");
        //console.log(response);
        $scope.list_bestsellers = response;
        $scope.bestsellers = [];

        $scope.list_bestsellers.data.results.map(function(data)
        {
            if(data.ranks_history.length != 0 && data.title != undefined){
                $scope.bestsellers.push({
                    display_name : data.ranks_history[0]['display_name'],
                    list_name : data.ranks_history[0]['list_name'],
                    bestseller_title : data.title
                })
            }
        });

    }, function errorCallback(response) {
        console.log("error on bestsellersUrl");
        console.log(response);
    });


    $scope.fetchBooksInCat('e-book-fiction');
    //var url = "https://api.nytimes.com/svc/books/v3/lists.json";
    //url += '?api-key=362f4508e923486dbd28ee49cf4693b9&list=e-book-fiction';
    //
    //$http({
    //    method: 'GET',
    //    url: url
    //}).then(function successCallback(response) {
    //    console.log("success");
    //    //console.log(response);
    //    $scope.lists = response;
    //    $scope.books = [];
    //    //$scope.bestsellers_name = [];
    //
    //    $scope.lists.data.results.map(function(data){
    //        $scope.books.push({
    //            title : data.book_details[0]['title'],
    //            rank : data.rank,
    //            rank_last_week : data.rank_last_week,
    //            author : data.book_details[0]['author'],
    //            description : data.book_details[0]['description']
    //        })
    //    });
    //    //console.log($scope.lists.data.results[0]);
    //    //console.log($scope.books);
    //    //console.log($scope.lists);
    //
    //    $scope.published_date = $scope.lists.data.results[0]['published_date'];
    //}, function errorCallback(response) {
    //    console.log("error");
    //    console.log(response);
    //});




    $scope.slugify = function(value) {
        $scope.value = value.replace(/\s/g, "-");
        return $scope.value;
    };

    $scope.value = 'rank';
    $scope.sorting = 'rank';
    $scope.reverse = true;

    $scope.dynamicOrder = function(value) {
        //console.log($scope.order);
        $scope.reverse = ($scope.value === value) ? !$scope.reverse : false;
        $scope.sorting = value;
    };
}]);