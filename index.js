const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate')
const dashboardHtml = fs.readFileSync(',/index.html', 'utf-8')
const empCardHtml = fs.readFileSync(',/employeeCard.html', 'utf-8')
const data = fs.readFileSync(',/data.json', 'utf-8')

const dataObj = JSON.parse(data)

const replaceTemplate = (template, empData) => {
    let output = temCard.replace(/{%EMPID%}/g, empData.id).replace(/{%NAME%}/g, empData.name).replace(/{%AGE%}/g, empData.age).replace(/{%BLOOD-GROUP%}/g, empData.blood-group).replace(/{%COMPANY%}/g, empData.company-name)
}
const server = http.createServer((req,res) =>{
    const {query, pathname}= url.parse(req.url,true)

    if (pathname === '/profile' || pathname ==='/') {
        res.writeHead(200,{'Content-type':'text/html'})
        const cards = dataObj.map(i => replaceTemplate(empCardHtml,i)).join('')
        const output = dashboardHtml.replace(/{%EMPS%}/g, cards).replace(/{%TOTAL%}/g, dataObj.length)
        res.end(output)
    }else if(pathname ==='/employee'){
        res.writeHead(200,{'Content-type': 'text/html'})
        const emp =dataObj[query.id]
        const output = replaceTemplate(empCardHtml,emp)
        res.end(output)
        console.log(dataObj [0])
    }else{
        res.writeHead(400, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end('<h1>Page not found</h1>')
    }
})
server.listen(3000, '127.0.0.1', () => {
    console.log("listing to request on port 3000")
})