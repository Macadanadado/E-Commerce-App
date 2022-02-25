const app = require('./server/api');
require('dotenv').config();

const PORT = process.env.PORT;

const cors = require('cors');
app.use(cors());

app.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}`)
});