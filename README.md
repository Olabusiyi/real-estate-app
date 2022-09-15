
# Hi, I'm Ola! 👋


## 🚀 About Me
A full stack developer based in Canada 🇨🇦


## 🛠 Skills
Javascript, HTML, CSS, NodeJS, Express, React, SQL, MongoDB and more!


# Real Estate Web App

A web based US Real Estate Application built with the purpose of helping first time home buyers and investors view properties within any location in the USA. Search by inputting the desired City Name and State Code. Results can be filtered to number of bedrooms, bathrooms and of course Price! Also has dynamic rendering of each property lisitng to give a detailed insight into the background and features of the listing.



## Tech Stack

**Client:** HTML, CSS, Bootstrap v5, Javascript, EJS

**Server:** Node, Express


## Installation

Install RealEstateApp with npm

```bash
  npm i body-parser
  npm i express
  npm i ejs
  npm i axios

  OR 
  npm i 
  To install all node_module dependancies (Recommnded)
  cd RealEstateApp
```
    
## Acknowledgements

 - [API Source](https://rapidapi.com/datascraper/api/us-real-estate)
 - [Free Image Source](https://unsplash.com/)


## API Reference

#### Get Real Estate Listings for Any City

```http
  GET /for-sale
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `limit` | `number` | **Required**. Default set to 42|
| `state_code` | `string` | **Required**. 2 letter state code |
| `city` | `string` | **Required**. City Name |
| `sort` | `string` | **Required**. Default to "newest"|
| `price_min` | `number` | Minimum price |
| `price_max` | `number` | Maximum price|
| `beds_min` | `number` | Minimum number of beds |
| `beds_max` | `number` | Maximum number of beds |
| `baths_min` | `number` | Minimum number of baths |
| `baths_max` | `number` | Maximum number of baths |





## Inquires

For any inquiries, email olabusiyi@gmail.com 


## Live Demo

This project is being hosted on Heroku, check it out here: https://pure-sierra-11266.herokuapp.com/


