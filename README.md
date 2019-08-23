# Simplistic Weather App

This is a simple weather app using NodeJS and Express. This application uses two 3rd party APIs to fetch the necessary weather data for a location. To run the program, respective API keys need to be generated from below API providers:

https://docs.mapbox.com/api/search/#geocoding

https://darksky.net/dev

Once registered and the API Keys are generated, substitute those keys in the weather.js file in 'utils' folder. The places where value need to be replaced, are being marked as **<em>api token here</em>**

Also the localhost location need to be changed appropriately in the app.js file(under public). Need to be changed based on where the app is running.

**Technical Details**  

**Frameworks Used:** NodeJS, Express, Handlebars(js)  
**3rd Party APIs:** Mapbox <em>(to get location)</em>, DarkSky <em>(to get weather)</em>  
**Usage:**  
<strong>1.</strong> Run ```npm install```  
<strong>2.</strong> To run for dev ```npm run dev```  
<strong>3.</strong> To start ```npm start```  
<strong>4.</strong> By default the app runs on port 3000

## How to Use

<strong>1.</strong> Enter the location name in the search text box  
<strong>2.</strong> Click on Search button  
<strong>3.</strong> The weather details are displayed below  
<strong>4.</strong> Use the dropdown to select between Celsius and Fahrenheit   
<strong>5.</strong> To search another location, enter a new location name and repeat above steps

## Extensibility
There are a lot of data points provided by the Dark Sky API about the weather. This app is built to use only few of them. This app can be extended to use more data points and display lot more weather related data.


