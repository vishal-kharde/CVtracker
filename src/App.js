import React, { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import Columns from 'react-columns';
import axios from 'axios';

export default function App() {

  const [data, setData] = useState([]);

  const [country_data, setCountryData] = useState([]);

  useEffect(() => {
    axios.all
      ([axios.get('https://disease.sh/v3/covid-19/all'),
      axios.get('https://disease.sh/v3/covid-19/countries')
      ])
      .then(response_data => {
        setData(response_data[0].data);
        setCountryData(response_data[1].data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const date = new Date(parseInt(data.updated));
  const data_value = date.toString();

  const countries = country_data.map(
    (data, item) => {
      return (
        <Card key={item} bg="light" text="dark" className="text-center" style={{ margin: '10px' }}>
          <Card.Img variant="top" src={data.countryInfo.flag} />
          <Card.Body>
            <Card.Title>
              {data.country}
            </Card.Title>
            <Card.Text>Total Cases {data.cases}</Card.Text>
            <Card.Text>Active {data.active}</Card.Text>
            <Card.Text>Recovered {data.recovered}</Card.Text>
            <Card.Text>Deaths {data.deaths}</Card.Text>
          </Card.Body>
        </Card>
      )
    }
  )

  return (
    <div style={{ backgroundColor: 'grey'}}>
      <CardDeck style={{backgroundColor: '#252930'}}>
        <Card bg="danger" text="white" className="text-center">
          <Card.Body>
            <Card.Title>Active</Card.Title>
            <Card.Text>
              {data.active}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {data_value}</small>
          </Card.Footer>
        </Card>
        <Card bg="secondary" text="white" className="text-center">
          <Card.Body>
            <Card.Title>Total Cases</Card.Title>
            <Card.Text>
              {data.cases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {data_value}</small>
          </Card.Footer>
        </Card>
        <Card bg="success" text="white" className="text-center">
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
              {data.recovered}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {data_value}</small>
          </Card.Footer>
        </Card>
      </CardDeck>

      <Columns>{countries}</Columns>

    </div>
  );
}