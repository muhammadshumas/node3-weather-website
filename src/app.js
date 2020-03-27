const path=require('path')

const express=require('express') // instance of express

const hbs=require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

console.log(__dirname) //provides absolute path to the current directory
console.log(path.join(__dirname,'../')) //__dirname is same as above but the second argument is used to add to that path or remove from it.For example '../' as a second argument here will take us one folder up from the current path.

// console.log(__filename) //provides absolute path to the current file

const app=express() //storing

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views') // by default express expects views folder in the root directory to serve dynamic templates the name and path has to be exactly as mentiod above.To change this we have to define our desired path just like we have done now and stored it in viewPath
const partailsPath=path.join(__dirname,'../templates/partials')


//set up handlebars engine and views location
app.set('view engine','hbs') //telling express about which templating engine to use.In our case we are using hbs
app.set('views',viewsPath) //setting up our desired path and name for views folder
hbs.registerPartials(partailsPath)

//set up static directory
app.use(express.static(publicDirectoryPath)) //app.use() is used to customize our server.Here we are modifying our server to serve a folder called public in our directory.This means that  app.get('',(req,res)=>{
	// 	res.send('<h1>Hello Express!</h1>') is no longer needed as it will not run now because we are now serving index.html
// we have added two other files in public folder help.html and about.html.To serve those we have to type localhost:port/about.html & localhost:port/help.html


app.get('',(req,res)=>{
	res.render('index',{
		title:'weather app',
		name:'Shumas'
	}) // res.render is use to serve dynamic files which are present in our views folder with hbs extension
})

app.get('/about',(req,res)=>{
	res.render('about',{
		title:'About Page',
		name:'Shumas'
	})
})

app.get('/help',(req,res)=>{
	res.render('help',{
		message:'how we may help you?',
		title:'Help',
		name:'Shumas'
	})
})

app.get('/weather',(req,res)=>{
	
	 if(!req.query.address){
		return res.send({
			error:'please provide an address to search for'
		})
	}

	geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
		if(error){
			return res.send({
				error
			})
		}
		forecast(latitude,longitude,(error,forecastData)=>{
			if(error){
				return res.send({
					error
				})
			}
			res.send({
				forecast:forecastData,
				location,
				address:req.query.address
			})
		})
	})

}) 
// app.get() is used to configure what should server do when someone tries to get the resource at a specific url.For example,we can use this to configure server to send html or json back
//app.get takes two arguments first is the partial url;for example /help in the given example below and second is a callback that defines what to do when someone visits that particular url

//lets imagine we have a domain with following routes
//app.com
//app.com/help
//app.com/about

app.get('/products',(req,res)=>{
	if(!req.query.search){
		return res.send({
			error:'You must provide a search term'
		})
		
	}
	console.log(req.query.search)
	res.send({
		products:[]
	})
})


app.get('/help/*',(req,res)=>{
	res.render('404',{
		title:'404',
		message:'Help article not found',
		name:'shumas'
	})
})

app.get('*',(req,res)=>{
	res.render('404',{
		title:'404',
		message:'Page not found',
		name:'shumas'
	})
}) //this needs to come last because the express server look through the incoming request in order first it checks the public folder because we have set it first above.Then it checks all the app.get() instances and if it finds the url it renders the data;if not,it shows 404 page


app.listen(3000,()=>{
	console.log("server is up on port 3000")
})
//app.listen('port,callback) it takes 2 argument port and callback because starting a server is an asynchrounous process.

// to start the server we have to type node src/app.js
// we can also use nodemon src/app.js to listen to live changes
//to listen for changes in multiple file extensions we have to type nodemon src/app.js js,hbs
