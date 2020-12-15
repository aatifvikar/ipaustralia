# ip-aus-kk-plum

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## TODO
Form validations (framework has already been added)

Error states, maybe a generic error page 

Adding icons and images as per the designs (not everything is present in invision)

API's for Audit workflow 
Three possible search options - by harvest id, product number and batch number

product number workflow-
Accreditation section --> Where should the information be read from, the API response is very convoluted and should be modified to suit the information to be displayed on the screen

Three sections need to be displayed
Product Details --> this is fine as most of the fields are being returned from the API

Harvest Details --> this information is not very clear. suggested approach --> have harvest details returned as a part of the response (separate key in the response object so that its simple enough to traverse and will save heavy computational logic on the front end) 

Batch Details --> This is largely fine as most of the batch information is being returned by the API


API's for Manufacturer workflow
