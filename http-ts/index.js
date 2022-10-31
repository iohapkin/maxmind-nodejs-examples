import http  from 'http'
import { Reader } from '@maxmind/geoip2-node';

const options = {};

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  // const checkIP = req.ip ? req.ip : req.socket.localAddress
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

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end( JSON.stringify(countryData));

  })

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
