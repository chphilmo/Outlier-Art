const express = require('express')
const app = express()
const history = require('connect-history-api-fallback')

const port = 8081

nonSPArouter = express.Router()

app.use(history())

app.set('view engine', 'jade') 

//app.get('/', (req, res) => res.send('Hello World!'))
//app.use(express.static('dist'));

app.use(express.static(__dirname + '/dist'))

app.use(function(req,res,next) {
	const ua = req.headers['user-agent']
	if (/^(facebookexternalhit|twitterbot)/gi.test(ua)) {
		nonSPArouter(req,res,next)
	} else {
		next()
	}
})

nonSPArouter.get('/', function(req,res) {
                   
    res.render('bot', { 
    	url: 'https://meta-matter.app', 
    	title: 'meta matter - Polygon NFT',
        imageUrl : 'https://meta-matter.app/logoneon.png' 
    })                   
    
})

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/dist/index.html")
})

app.listen(port, () => console.log(`meta matter listening on port ${port}!`))