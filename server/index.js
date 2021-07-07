const path = require('path');
require('dotenv').config({ path: path.join(__dirname + '/api.env') });
const app = require('./app');

const PORT = process.env.PORT || 5000;

// start server listening on PORT

app.listen(PORT, () => {
	console.log(`Server is listening on port: ${PORT}`);
});
