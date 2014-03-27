/**
 * Cria o resource de task para a manipulação com o Google Task API
 */
$taskGoogle.factory('taskRes', ['$resource', 'googleAPI', function($resource, googleAPI){

	/**
	 * Variáveis auxiliares
	 */
	var api 	= googleAPI.getGoogleTaskAPIRest(),
		urlBase = api.task.urlRel;

	return $resource('', {}, {

		/**
		 * Lista a task
		 */
		'list': {
			method	: 'GET',
			url 	: urlBase + api.task.LIST + '?access_token=:token',
			params 	: {
				token: '@token',
				tasklist: '@tasklist'
			}
		},
		/**
		 * Procura uma task
		 */
		'query': {
			method	: 'GET',
			url 	: urlBase + api.task.GET + '?access_token=:token',
			params 	: {
				token: '@token',
				tasklist: '@tasklist',
				task: '@task'
			}
		},
		/**
		 * Salva uma nova task
		 */
		'save': {
			method	: 'POST',
			url 	: urlBase + api.task.POST + '?access_token=:token',
			params 	: {
				token: '@token',
				tasklist: '@tasklist'
			}
		},
		/**
		 * Atualiza uma task
		 */
		'update': {
			method	: 'PUT',
			url 	: urlBase + api.task.PUT + '?access_token=:token',
			params 	: {
				token: '@token',
				tasklist: '@tasklist',
				task: '@task'
			}
		},
		/**
		 * Remove uma task
		 */
		'remove': {
			method	: 'DELETE',
			url 	: urlBase + api.task.DELETE + '?access_token=:token',
			params 	: {
				token: '@token',
				tasklist: '@tasklist',
				task: '@task'
			}
		}

	});

}]);