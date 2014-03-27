$taskGoogle.controller('main', [
	'$scope', '$http', '$q', 'googleAPI', 'tasklistRes', 'taskRes',
	function($scope, $http, $q, googleAPI, tasklistRes, taskRes) {

	var tokenAuthorized;

	function constructStrutureTaskList() {

		var promises = [],
			listTaskGoogle = [],
			deferObj = $q.defer();

		(new tasklistRes()).$list({token: tokenAuthorized}).then(function(data) {

			if (data.items) {
				data.items.forEach(function(elem, index) {

					var deferTaskList = $q.defer();

					promises.push(deferTaskList.promise);

					(new taskRes()).$list({token: tokenAuthorized, tasklist: elem.id}).then(function(data) {
						listTaskGoogle.push({
							id: elem.id,
							name: elem.title,
							tasks: []
						});

						if (data.items) {
							(function(taskScope, deferScope) {
								data.items.forEach(function(el, i) {
									taskScope.push({
										id: el.id,
										name: el.title,
										status: el.status
									});

									if (i == (data.items.length-1)) {
										taskScope.sort(function(a, b) {
											return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
										});

										deferScope.resolve();
									}

								});
							}(listTaskGoogle[listTaskGoogle.length-1].tasks, deferTaskList));
						} else
							deferTaskList.resolve();

					});

					if (index == (data.items.length-1)) {
						$q.all(promises).then(function() {
							listTaskGoogle.sort(function(a, b) {
								return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
							});

							deferObj.resolve(listTaskGoogle);
						});
					}

				});
			} else
				deferObj.resolve(listTaskGoogle);

		});

		return deferObj.promise;

	}

	googleAPI.connect().then(function() {

		tokenAuthorized = googleAPI.getAccountToken();

		constructStrutureTaskList().then(function(data) {
			$scope.loadStructure = true;
			$scope.listTaskGoogle = data;
		});
		
	});

	$scope.listTaskGoogle = [];
	$scope.selectTasklistIndex = 0;
	$scope.loadStructure = false;

	$scope.taskListItemClicked = function (index) {

		$scope.selectTasklistIndex = index;

	};
}]);