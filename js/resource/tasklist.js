/**
 * Cria o resource de tasklist para a manipulação com o Google Task API
 */
$taskGoogle.factory('tasklistRes', ['$resource', 'googleAPI', function($resource, googleAPI){

	/**
	 * Variáveis auxiliares
	 */
	var api 	= googleAPI.getGoogleTaskAPIRest(),
		urlBase = api.tasklist.urlRel;

	return $resource('', {}, {

		/**
		 * Lista tasklists
		 */
		'list': {
			method	: 'GET',
			url 	: urlBase + api.tasklist.LIST + '?access_token=:token',
			params 	: {
				token: '@token'
			}
		},
		/**
		 * Procura uma tasklist
		 */
		'query': {
			method	: 'GET',
			url 	: urlBase + api.tasklist.GET + '?access_token=:token',
			params 	: {
				token: '@token',
				tasklist: '@tasklist'
			}
		},
		/**
		 * Salva uma nova tasklist
		 */
		'save': {
			method	: 'POST',
			url 	: urlBase + api.tasklist.POST + '?access_token=:token',
			params 	: {
				token: '@token'
			}
		},
		/**
		 * Atualiza uma tasklist
		 */
		'update': {
			method	: 'PUT',
			url 	: urlBase + api.tasklist.PUT + '?access_token=:token',
			params 	: {
				token: '@token',
				tasklist: '@tasklist'
			}
		},
		/**
		 * Remove uma tasklist
		 */
		'remove': {
			method	: 'DELETE',
			url 	: urlBase + api.tasklist.DELETE + '?access_token=:token',
			params 	: {
				token: '@token',
				tasklist: '@tasklist'
			}
		},
		/**
		 * Remove todas as task daquela tasklist
		 */
		'clear': {
			method	: 'POST',
			url 	: urlBase + api.tasklist.CLEAR + '?access_token=:token',
			params 	: {
				token: '@token',
				tasklist: '@tasklist'
			}
		}

	});

}]);