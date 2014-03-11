$taskGoogle.service('connectGoogle', ['$http', function($http){

	var OAUTH_URL 		= 'https://accounts.google.com/o/oauth2/auth?',
		VALID_URL		= 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=',
		CLIENT_ID 		= '974700719462.apps.googleusercontent.com',
		SCOPE 	 		= 'https://www.googleapis.com/auth/tasks',
		REQUEST_TYPE 	= 'token',
		REDIRECT_URI	= 'http://localhost:8080/AngularJS/Exemplo1/oauth/',
		URL 			= OAUTH_URL + 'scope=' + SCOPE + '&client_id=' + CLIENT_ID + '&response_type=' + REQUEST_TYPE + '&redirect_uri=' + REDIRECT_URI,
		accountToken	= '',
		isConnect		= false;

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
	 * @param  {Function} callback -> função a ser executada ao termino da validação do token
	 */
	this.connect = function(callback) {

		var login = window.open(URL, 'Google Service API', 'width=500, height=400'),
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

						if (callback)
							callback();

					});
			}

		}, 500);

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

}]);