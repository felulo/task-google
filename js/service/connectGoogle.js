$taskGoogle.service('connectGoogle', ['$http', function($http){

	var OAUTH_URL,
		VALID_URL,
		CLIENT_ID,
		SCOPE,
		REQUEST_TYPE,
		REDIRECT_URI,
		URL,
		API,
		accountToken	= '',
		isConnect		= false;

	/**
	 * Variáveis de Configuração para o Google API
	 */
	OAUTH_URL 		= 'https://accounts.google.com/o/oauth2/auth?';
	VALID_URL		= 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
	CLIENT_ID 		= '974700719462.apps.googleusercontent.com';
	SCOPE 	 		= 'https://www.googleapis.com/auth/tasks';
	REQUEST_TYPE 	= 'token';
	REDIRECT_URI	= 'http://localhost:8080/AngularJS/Exemplo1/oauth/';

	/**
	 * URL de requisição de acesso ao Google API
	 */
	URL 			= OAUTH_URL + 'scope=' + SCOPE + '&client_id=' + CLIENT_ID + '&response_type=' + REQUEST_TYPE + '&redirect_uri=' + REDIRECT_URI;

	/**
	 * URLs para o acesso a Google API Task
	 */
	RestAPI = {
		tasklist: {
			LIST 	: '/users/@me/lists',
			GET 	: '/users/@me/lists/:tasklist',
			POST 	: '/users/@me/lists',
			DELETE 	: '/users/@me/lists/:tasklist',
			PUT		: '/users/@me/lists/:tasklist',
			CLEAR 	: '/lists/:tasklist/clear',

			urlRel	: 'https://www.googleapis.com/tasks/v1'
		},
		task: {
			LIST 	: '/lists/:tasklist/tasks',
			GET 	: '/lists/:tasklist/tasks/:task',
			POST 	: '/lists/:tasklist/tasks',
			DELETE 	: '/lists/:tasklist/tasks/:task',
			PUT		: '/lists/:tasklist/tasks/:task',

			urlRel	: 'https://www.googleapis.com/tasks/v1'	
		}
	};

	// Função externa que pega o valor de um parâmetro em uma QueryString
	// Retirada do site: http://www.netlobo.com/url_query_string_javascript.html
	function queryStringSearch(url, name) {

		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

		var regexS = "[\\#&]"+name+"=([^&#]*)",
			regex = new RegExp( regexS ),
			results = regex.exec( url );

		if( results == null )
			return "";
		else
			return results[1];

	};

	/**
	 * Conecta com Google API e retorna o authrorizen token para 
	 * a possível navegação à API
	 * 
	 * @return {[object]} -> Retornará uma promise com o valor de sucesso ou falha
	 */
	this.connect = function(callback) {

		var login = window.open(URL, 'Google Service API', 'width=500, height=400'),
			deferObj = $q.defer(),
			closeInterval;

		closeInterval = window.setInterval(function() {

			if (login.document.URL.indexOf(REDIRECT_URI) != -1) {
				window.clearInterval(closeInterval);

				var urlGoogle = login.document.URL;

				accountToken = queryStringSearch(urlGoogle, 'access_token');
				login.close();

				$http.jsonp(VALID_URL + accountToken + '&callback=JSON_CALLBACK')
					.success(function(data, status) {

						isConnect = true;

						deferObj.resolve();

					})
					.error(function(data, status) {

						deferObj.reject();

					});
			}

		}, 500);

		return deferObj.promise;

	};

	/**
	 * Verifica se esta conectado com Google API
	 * 
	 * @return {[boolean]}
	 */
	this.getIsConnect = function() {
		return isConnect;
	};

	/**
	 * Retorna o Authorized Token produzido pelo Google API
	 * 
	 * @return {[string]}
	 */
	this.getAccountToken = function() {
		return accountToken;
	};

	this.getGoogleAPITaskRest = function() {
		return RestAPI;
	};

}]);