const csv = require('csv-parser')
const createCsWriter = require('csv-writer').createObjectCsvWriter
const fs = require('fs')

const results =[]
let sortedData =[]

fs.createReadStream('EuropeRoadData.csv')
    .pipe(csv({}))
    .on('data',(data) =>{ 
        results.push({
            Country:data.Country,Year:"2018",Area:data["Area (thousands of km2)"],Population:data["Population in 2018"],
            GDP:data["GDP per capita in 2018"],Density:data["Population density (inhabitants per km2) in 2017"],
            Vehicle:data["Vehicle ownership (per thousand inhabitants) in 2016"],totalDeaths:data["Total Road Deaths in 2018"],
            deathPerMillion:data["Road deaths per Million Inhabitants in 2018"]})
        })

    .on('end', () =>{
        sortedData = results.sort((a, b) => (a.deathPerMillion < b.deathPerMillion)? 1 : -1)

        const csWriter = createCsWriter({
            path: 'newEuropeRoadData.csv',
            header:[
                {id:'Country',title:'Country'},
                {id:'Year',title:'Year'},
                {id:'Area',title:'Area'},
                {id:'Population',title:'Population'},
                {id:'GDP',title:'GDP per capita'},
                {id:'Density',title:'Population density'},
                {id:'Vehicle',title:'Vehicle ownership'},
                {id:'TotalDeaths',title:'Total road deaths'},
                {id:'DeathPerMillion',title:'Road deaths per Million Inhabitants'},
            ]
        })

        const records = sortedData.map((item) =>{
            return {Country:item.Country,Year:item.Year,Area: item.Area, Population:item.Population,
                GDP:item.GDP,Density:item.Density,Vehicle:item.Vehicle,TotalDeaths:item.totalDeaths,
                DeathPerMillion:item.deathPerMillion}
            }
        )

        csWriter.writeRecords(records)
            .then(() =>{
            console.log("done wrinting")
        })
    })


