const express = require('express')
path = require('path')

const app = express()
port = process.eventNames.PORT || 3000

app.get('/api', (_request, response) => {
    response.send({werewolf: 'Aoooooooo!', swampman: "Eeeeeeeerrrrgh!"})
})
app.use(express.static(path.join(path.resolve(), 'dist')))
app.listen(port, () => {
    console.log(`Redo på http://localhost:${port}/`)
})

//PS. Kom ihåg om något krånglar (Vet inte riktigt vad detta gör): 
//npm run --prefix ../frontend build -Detta gör att vi kör frontend delen från backend. det skapas då en distmapp i frontend mappen. 
//rm -Rf dist  -Vi tar bort distmappen i backendmappen (om den finns)
//cp -R ../frontend/dist .   -kopierar distmappen från frontend till backend.
//Dessa kommandon behöver vi köra varje gång vi ändrar i frontenden fast nu behöver vi bara köra:

//npm run build-frontend
//node index.js 