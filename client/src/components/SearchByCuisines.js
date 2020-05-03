import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import { Link } from "react-router-dom";
import '../style/SearchPage.css';
import { TiHeartFullOutline, TiLocation } from "react-icons/ti";
import { IconContext } from "react-icons";

export default class SearchByCuisines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisineOptions: [
        { value: 'American', label: 'American' },
        { value: 'Chinese', label: 'Chinese' },
        { value: 'French', label: 'French' },
        { value: 'Indian', label: 'Indian' },
        { value: 'Korean', label: 'Korean' },
        { value: 'Mexican', label: 'Mexican' },
        { value: 'Spanish', label: 'Spanish' },
      ],
      citiesOptions: [],
      stateOptions: [
        { value: 'CA', label: 'CA' },
        { value: 'CT', label: 'CT' },
        { value: 'DE', label: 'DE' },
        { value: 'HI', label: 'HI' },
        { value: 'NJ', label: 'NJ' },
        { value: 'NY', label: 'NY' },
        { value: 'PA', label: 'PA' },
      ],

      selectedCuisines: [],
      _selectedCuisines: [],
      selectedState: null,
      _selectedState: "",
      selectedCities: [],
      _selectedCities: []

    }
  }

  /**
   * When component mounts: 
   */
  componentDidMount = async () => {
    // await this.getCuisineTypes();
  }
  getCuisineTypes = async () => {
    await fetch("http://localhost:8081/cuisineTypes/",
      {
        method: 'GET'
      }).then(res => {
        return res.json();
      }, err => {
        console.log(err);
      }).then(result => {
        let cuisineOptions = result.rows.map((row, i) => {
          const cuisineType = row[0].trim();
          return ({
            value: cuisineType,
            label: cuisineType
          })
        });
        cuisineOptions.sort((x, y) => {
          const X = x.value.toUpperCase();
          const Y = y.value.toUpperCase();
          return X < Y ? -1 : X > Y ? 1 : 0;
        });
        this.setState({ cuisineOptions });
      }, err => {
        console.log(err);
      });
  }
  fetchCities = async (state) => {
    console.log(state)
    await fetch("http://localhost:8081/cities/" + state,
      {
        method: 'GET'
      }).then(res => {
        return res.json();
      }, err => {
        console.log(err);
      }).then(result => {
        console.log("result: ", result)
        let citiesOptions = result.rows.map((row, i) => {
          const citiesOption = row[0].trim();
          return ({
            value: citiesOption,
            label: citiesOption
          })
        });
        citiesOptions.sort((x, y) => {
          const X = x.value.toUpperCase();
          const Y = y.value.toUpperCase();
          return X < Y ? -1 : X > Y ? 1 : 0;
        });
        this.setState({ citiesOptions });
      }, err => {
        console.log(err);
      });
  }

  /**
   * State handlers
   */

  handleCuisinesChange = (selectedCuisines) => {
    let _selectedCuisines = [];
    if (selectedCuisines) {
      selectedCuisines.map((element) => {
        _selectedCuisines.push(element.value);
      })
    }
    this.setState({ selectedCuisines, _selectedCuisines });
  }
  handleCitiesChange = (selectedCities) => {
    let _selectedCities = [];
    if (selectedCities) {
      selectedCities.map((element) => {
        _selectedCities.push(element.value);
      })
    }
    this.setState({ selectedCities, _selectedCities });
  }
  handleStateChange = (selectedState) => {
    this.setState({ selectedState, _selectedState: selectedState.value, selectedCities: [], _selectedCities: [] });
    this.fetchCities(selectedState.value);
  }
  validateSearch = () => {
    return (
      this.state._selectedCities.length > 0 &&
      this.state._selectedState.length > 0 &&
      this.state._selectedCuisines.length > 0
    )
  }
  handleCurrentLocation = () => {
    this.setState({
      selectedState: [{ value: 'Current Location', label: 'Current Location' }],
      _selectedState: 'Current Location',
      selectedCities: [{ value: 'Current Location', label: 'Current Location' }],
      _selectedCities: ['Current Location'],
    })
  }
  handleLosAngeles = () => {
    this.setState({
      selectedState: [{ value: 'CA', label: 'CA' }],
      _selectedState: 'CA',
      selectedCities: 
      [
        { value: 'Los Angeles', label: 'Los Angeles' },
        { value: 'Anaheim', label: 'Anaheim' },
        { value: 'Garnden Grove', label: 'Garnden Grove' },
        { value: 'Glendale', label: 'Glendale' },
        { value: 'Huntington Beach', label: 'Huntington Beach' },
        { value: 'Irvine', label: 'Irvine' },
        { value: 'Long Beach', label: 'Long Beach' },
        { value: 'Moreno Valley', label: 'Moreno Valley' },
        { value: 'Ontario', label: 'Ontario' },
        { value: 'Oxnard', label: 'Oxnard' },
        { value: 'Pasadena', label: 'Pasadena' },
        { value: 'Rancho Cucamonga', label: 'Rancho Cucamonga' },
        { value: 'Riverside', label: 'Riverside' },
        { value: 'San Bernardino', label: 'San Bernardino' },
        { value: 'Santa Ana', label: 'Santa Ana' },
        { value: 'Santa Clarita', label: 'Santa Clarita' },
        { value: 'Torrance', label: 'Torrance' },
      ],
      _selectedCities: ['Los Angeles', "Anaheim","Garnden Grove","Glendale",
      "Huntington Beach","Irvine", 'Long Beach' ,'Moreno Valley','Ontario','Oxnard', 'Pasadena', 'Rancho Cucamonga','Riverside',
    'San Bernardino', 'Santa Ana', 'Santa Clarita', 'Torrance'  ],
    })
  }
  handleNewYorkCity = () => {
    this.setState({
      selectedState: [{ value: 'NY', label: 'NY' }],
      _selectedState: 'NY',
      selectedCities: [{ value: 'New York', label: 'New York' }, { value: 'New York City', label: 'New York City' }],
      _selectedCities: ['New York','New York City'],
    })
  }
  handlePhiladelphia = () => {
    this.setState({
      selectedState: [{ value: 'PA', label: 'PA' }],
      _selectedState: 'PA',
      selectedCities: 
      [
        { value: 'Philadelphia', label: 'Philadelphia' },
        { value: 'Bucks', label: 'Bucks' },
        { value: 'Chester', label: 'Chester' },
        { value: 'Delaware', label: 'Delaware' },
        { value: 'Montgomery', label: 'Montgomery' },
      ],
      _selectedCities: ['Philadelphia','Bucks','Chester','Delaware','Montgomery'],
    })
  }
  handleSanFrancisco = () => {
    this.setState({
      selectedState: [{ value: 'CA', label: 'CA' }],
      _selectedState: 'CA',
      selectedCities: [{ value: 'San Francisco', label: 'San Francisco' }],
      _selectedCities: ['San Francisco'],
    })
  }

  /**
   * Render function
   */

  render() {
    return (
      <div>

        <div className="rows">
          <IconContext.Provider value={{ style: { color: 'white', marginRight: '5' } }}>
            <TiHeartFullOutline size={35} />
          </IconContext.Provider>
          <Select
            isMulti
            styles={selectStyles}
            value={this.state.selectedCuisines}
            isSearchable
            placeholder="Select you favorite cuisine(s) "
            options={this.state.cuisineOptions}
            onChange={this.handleCuisinesChange}
          />
          <div > &nbsp; &nbsp;</div>
          <Link
            to={{
              pathname: `/Feature3`,
              state: {// place data you want to send here!
                selectedCities: this.state._selectedCities,
                selectedState: this.state._selectedState,
                selectedCuisines: this.state._selectedCuisines,
              }
            }}><Button type="submit" disabled={!this.validateSearch()} > Search </Button>
          </Link>
        </div>

        <div className="rows3">
          <IconContext.Provider value={{ style: { color: 'white', marginRight: '5' } }}>
            <TiLocation size={35} />
          </IconContext.Provider>
          <DropdownButton id="dropdown-item-button" title="☆">
            <Dropdown.Item as="button" onClick={this.handleCurrentLocation}>Current Location</Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handleLosAngeles}>Greater Los Angeles Area</Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handleNewYorkCity}>Greater New York Area</Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handlePhiladelphia}>Greater Philadelphia Area</Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handleSanFrancisco}>Greater San Francisco Bay Area</Dropdown.Item>
          </DropdownButton>
          <div > &nbsp; &nbsp;</div>
          <Select
            styles={selectStyles}
            value={this.state.selectedState}
            placeholder="Select State"
            options={this.state.stateOptions}
            onChange={this.handleStateChange}
          />
          <div > &nbsp; &nbsp;</div>
          <Select
            styles={selectStyles}
            value={this.state.selectedCities}
            isMulti
            placeholder="Select Cities"
            options={this.state.citiesOptions}
            onChange={this.handleCitiesChange}
          />

        </div>

        <div className="rows">

        </div>

      </div>
    );
  }
}

// style for React components
const selectStyles = {
  container: base => ({
    ...base,
    flex: 1,
  }),
};