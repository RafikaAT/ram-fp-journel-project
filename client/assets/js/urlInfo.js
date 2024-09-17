const urlInfo =
	window.location.hostname === 'localhost'
		? {
				frontEnd: 'http://localhost:3000/',
				backEnd: 'http://localhost:5000/',
		  }
		: {
				frontEnd: 'https://journell.netlify.app/',
				backEnd: 'https://journell.herokuapp.com/',
		  };

module.exports = urlInfo;
