angular.module("myApp.page1",['ngRoute','firebase'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when('/page1',{
			templateUrl:"page1/page1.html",
			controller:"page1Ctrl"
		});
}])
.controller('page1Ctrl', function($scope,$firebaseArray){
	$scope.msg1 = false;
	var ref = firebase.database().ref("students");
		$scope.data = $firebaseArray(ref);
	console.log('page1');
	$scope.deleteStudent = function(info){
		$scope.data
		.$remove(info)
		.then(
			function(ref){
				$scope.msg1 = "Student deleted successfully.";
				window.setTimeout(function(){
					$scope.$apply(function(){
						$scope.msg1 = false;
					})
				},2000)
				console.log(info);
			},
			function(error){
				console.log(error);
			}
		)
		

	}
});