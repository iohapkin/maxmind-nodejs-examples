const express = require('express')
const app = express()
const port = 3000

const Reader = require('@maxmind/geoip2-node').Reader;
const options = {};


app.get('/', (req, res) => {

  // const checkIP = req.headers['x-real-ip'] || req.connection.remoteAddress;
  const checkIP = '74.6.231.21'

  /**
   * City 
  **/
  Reader.open('../maxminddb/GeoLite2-City.mmdb', options)
  .then(reader => {
    console.log(reader.city(checkIP))

  })

  /**
   * ASN
  **/
  Reader.open('../maxminddb/GeoLite2-ASN.mmdb', options)
  .then(reader => {
    console.log(reader.asn(checkIP))

  })

  /**
   * Country 
  **/
  Reader.open('../maxminddb/GeoLite2-Country.mmdb', options)
  .then(reader => {
    const countryData = reader.country(checkIP)

    console.log(countryData)
    res.send(JSON.stringify(countryData))


  })
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})