const app = require('./server/api');
const PORT = 3001;

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}`)
});