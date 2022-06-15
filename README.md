# pVerse

## Usage

``` js

const setupDatabase = require('pVerse-db')

setupDatabase(config).then(db =>{
    const {Agent,Metric} = db
}).catch(err => console.error(err))

```