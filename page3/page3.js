angular.module("myApp.page3",['ngRoute','firebase'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when('/page3/:id',{
			templateUrl:"page3/page3.html",
			controller:"page3Ctrl"
		});
}])
.controller('page3Ctrl', function($scope,$firebaseArray,$firebaseObject,$routeParams){
	$scope.msg3="";
	var id = $routeParams.id;
	var ref = firebase.database().ref("students/"+id);
	$scope.student = $firebaseObject(ref);

	$scope.editStudent = function(id){
		console.log(id);

		var ref = firebase.database().ref("students/"+id);
		ref.update({
			name:$scope.student.name,
			department:$scope.student.department,
			level:$scope.student.level,
		})
		.then(
			function(ref){
				$scope.student.name= "";
				$scope.student.department="";
				$scope.student.level = "";
				$scope.msg3= "Student updated successfully.";
				window.setTimeout(function(){
					$scope.$apply(function(){
						
					})
				},100);
				window.setTimeout(function(){
					$scope.$apply(function(){
						$scope.msg3 = false;
					})
				},2000)			}
			,function(error){
				console.log(error);
			}
		);
	}

	
});