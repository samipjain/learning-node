var app = angular.module('learningnode', []);

app.controller("maincontroller", function($scope, $http) {
    $scope.header = "Hello World";
    $scope.user = {username: '', password: ''};

    $scope.init = function(){
        $http.get('/learningnode/getalluserlist')
            .success(function(data){
                $scope.user_list = data;
            })
            .error(function(data){
                console.log('Error: '+ data);
            });
    };

    $scope.submit = function(){
        console.log($scope.user);
        $http.post('/learningnode/createuser', $scope.user)
            .success(function(data){
                $scope.init();
            })
            .error(function(data){
                console.log('Error: '+ data);
            });            
    };

    $scope.init();
});