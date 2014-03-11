$taskGoogle.controller('main', ['$scope', '$http', 'connectGoogle', function($scope, $http, connectGoogle) {

	connectGoogle.connect().then(function() {

		$http.jsonp('https://www.googleapis.com/tasks/v1/users/@me/lists/?access_token=' + connectGoogle.getAccountToken() + '&callback=JSON_CALLBACK')
			.success(function(data) {

				console.log(data);

			});

	});

}]);