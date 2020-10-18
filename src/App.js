import React, { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import Columns from 'react-columns';

import './App.css';

export default function App() {

  const [data, setData] = useState([]);

  const [country_data, setCountryData] = useState([]);

  const [search_country, setCountrySearch] = useState(" ");

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

  const country_filter = country_data.filter(item => {
    return search_country !== "" ?
      item.country.includes(search_country)
      :
      item
  })

  const countries = country_filter.map(
    (data, item) => {
      return (
        <Card key={item} bg="light" text="dark" className="text-center" style={{ margin: '60px' }}>
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

  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  return (
    <div style={{ backgroundColor: '#252930' }}>

      <div class="header">
        <h1>CVtracker</h1>
      </div>

      <CardDeck style={{ backgroundColor: '#252930', margin: '0px' }}>

        <Card bg="danger" text="white" className="text-center" style={{ margin: '15px' }}>
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

        <Card bg="secondary" text="white" className="text-center" style={{ margin: '15px' }}>
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

        <Card bg="success" text="white" className="text-center" style={{ margin: '15px' }}>
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

      <Form style={{ margin: '18px' }}>
        <Form.Group controlId="formGroupSearch">
          <Form.Control type="text" placeholder="Search a Country"
            onChange={e => setCountrySearch(e.target.value)} />
        </Form.Group>
      </Form>

      <Columns queries={queries}>{countries}</Columns>

      <div className="footer">
        <p>Copyright © 2020</p>
      </div>

    </div>
  );
}