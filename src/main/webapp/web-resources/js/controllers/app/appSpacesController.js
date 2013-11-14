/**
 * AppSpacesController
 **/

define(function () {
	'use strict';	
	
	function AppSpacesController($scope, $state, Restangular) {
		$scope.loading = true;
		$scope.organizationId = $state.params.organizationId;
		
		Restangular.one('organizations', $scope.organizationId).all('spaces').getList().then(function(data) {
			if (data[0] != undefined) {
				$scope.space = {selected: data[0].name};
				data[0].selected = true;    		
			}
			$scope.spaces = data;
			$scope.loading = false;
		}, function(response) {
			$scope.forceLogin(status);
			$scope.error = 'Failed to load spaces. Reason: ' + data.code + ' - ' + data.description;
			$scope.loading = false;
		});

		$scope.startApplication = function (applicationId) {
			var applicationPromise = cloudfoundry.updateApplication(applicationId, {'state': 'STARTED'});
			applicationPromise.success(function (data, status, headers) {
				angular.forEach($scope.spaces, function (space, spaceIndex) {
					if (space.selected) {
						var index = -1;
						angular.forEach(space.applications, function (app, appIndex) {
							if (app.id == applicationId) {
								index = appIndex;
							}
						});
						if (index > -1) {
							space.applications[index] = data;
						}
					}
				});
			});
			applicationPromise.error(function (data, status, headers) {
				$scope.error = 'Failed to start application. Reason: ' + data.code + ' - ' + data.description;
			});
		};

		$scope.stopApplication = function (applicationId) {
			var applicationPromise = cloudfoundry.updateApplication(applicationId, {'state': 'STOPPED'});
			applicationPromise.success(function (data, status, headers) {
				angular.forEach($scope.spaces, function (space, spaceIndex) {
					if (space.selected) {
						var index = -1;
						angular.forEach(space.applications, function (app, appIndex) {
							if (app.id == applicationId) {
								index = appIndex;
							}
						});
						if (index > -1) {
							space.applications[index] = data;
						}
					}
				});
			});
			applicationPromise.error(function (data, status, headers) {
				$scope.error = 'Failed to start application. Reason: ' + data.code + ' - ' + data.description;
			});
		}

		$scope.selectSpace = function (spaceName) {
			$scope.space.selected = spaceName;
		}
	}

	AppSpacesController.$inject = ['$scope', '$state', 'Restangular'];

	return AppSpacesController;
});