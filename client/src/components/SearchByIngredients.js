import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, DropdownButton, Dropdown} from 'react-bootstrap';
import Select from 'react-select';
import '../style/SearchPage.css';
import ReactSearchBox from 'react-search-box'
import { Checkbox } from 'semantic-ui-react'

import { Link } from "react-router-dom";
import { TiHeartFullOutline, TiLocation } from "react-icons/ti";
import { IconContext } from "react-icons";

export default class SearchByIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsOptions: [],
      search: null,
      selectedIngredients: [],
      selectedOptions: [],
      matchedCuisines: [],
      checked: false,
      //value: [],
      displayOptions: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
      ],
      selectedDisplay: 0,
      freq: [],


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
      selectedState: null,
      _selectedState: "",
      selectedCities: [],
      _selectedCities: []
      
    }
  }

  componentDidMount = () => {

    this.getFreq();

  }

  getFreq = () => {
    fetch("http://localhost:8081/freq",{
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(result => {
      let freq = result.rows.map((row, i) => {
        const cuisine = row[0].trim();
        const freq = row[1];
        return ({
          cuisine: cuisine,
          freq: freq
        })
      });
      this.setState({freq});
      console.log(freq);
    }, err => {
      console.log(err);
    });
  }

  getAllIngredients = () => {
    fetch("http://localhost:8081/ingredients/",{
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(result => {
      let ingredientsOptions = result.rows.map((row, i) => {
        const ingredient = row[0].trim();
        return ({
          value: ingredient,
          label: ingredient
        })
      });
      this.setState({ingredientsOptions});
      console.log(ingredientsOptions);
    }, err => {
      console.log(err);
    });
  }

  handleIngredientsChange = (selectedIngredients) => {
    this.setState(
      { selectedIngredients },
      () => console.log('ingredients selected:', this.state.selectedIngredients)
    );
  }
  handleSearchChange = (search) => {
    this.setState(
      { search },
      () => console.log('search:', this.state.search)
    );
  }
  getSearchedIngredient = () => {
    fetch("http://localhost:8081/searchedIngredient/" + this.state.search, {
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(result => {
      let options = result.rows.map((row, i) => {
        const option = row[0].trim();
        return ({
          value: option,
          label: option
        })
      });
      this.setState(
        { ingredientsOptions: options },
      );
      let checked = false;
      this.setState({checked});
      console.log(options);
      console.log('test uncheck', this.state.checked);
    }, err => {
      console.log(err);
    });
  }
  handleSelectedChange = selectedIngredients => {
    this.setState(
      { selectedIngredients },
      () => console.log(`Option selected:`, this.state.selectedIngredients)
    );
  };

  handleCheck = (event) => {
    let checked = event.target.checked;
    this.setState({checked});
    if(checked){
      let update = this.state.selectedIngredients.concat(this.state.ingredientsOptions);
      this.setState(
        { selectedIngredients: update },
        () => console.log(`All Option selected:`, this.state.selectedIngredients)
      )
    }

  };

  getCuisines = () => {
    console.log('selected: ', this.state.selectedIngredients)
    if (this.state.selectedIngredients != null && this.state.selectedIngredients.length) {
      let selection = this.state.selectedIngredients.map(ingredient => {
        return ingredient.value;
      });
      console.log('let lelection:', selection);
      let data = { 
        selection: selection,
        display: this.state.selectedDisplay.value
      }
      console.log('data:', data);
      fetch("http://localhost:8081/matchedCuisines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: data })
      }).then(async res => {
        return res.json();
      }, err => {
        console.warn(err);
      }).then(async result => {
        console.log('matched cuisines', result.rows);
        let matchedCuisines = result.rows.map((cuisine, i) => {
          return (
            <div key={i} className="cuisine">
              <div className="cuisineName">{cuisine[0]}</div>
              <div className="matchingScore">{cuisine[1].toFixed(2)}%</div>
            </div>
          )
        });
        this.setState({ matchedCuisines: matchedCuisines });
      }, err => {
        console.warn(err);
      });
    }
    else {
      let matchedCuisines = [
        <div className="cuisine">
          <div className="cuisineName"></div>
          <div className="matchingScore"></div>
        </div>
      ];
      this.setState({ matchedCuisines: matchedCuisines });
    }
  }

  handleDisplayChange = selectedDisplay => {
    this.setState(
      { selectedDisplay },
      () => console.log(`Display selected:`, this.state.selectedDisplay)
    );
  };

//   onChange(e, i){
//     let value = this.state.value.slice();
//     value[i] = e.target.checked;
//     this.setState({value})
//  }
     
//  unCheck(i){
//     let value = this.state.value.slice();
//     value[i] = !value[i];
//     this.setState({value})
//  }

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
    this.state.matchedCuisines.length > 0
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

  render() {

    return (
      <div>
        <div className="rows">
          <Button type="submit" onClick={this.getSearchedIngredient}>
            Search
              </Button>

          <ReactSearchBox
            placeholder="Search Keyword..."
            onChange={this.handleSearchChange}
            value={this.state.search}
          />

          <div > &nbsp; &nbsp;</div>
          <Select
            isMulti
            styles={selectStyles}
            value={this.state.selectedIngredients}
            isSearchable
            placeholder="Select ingredient(s) ... "
            size={50}
            options={this.state.ingredientsOptions}
            onChange={this.handleSelectedChange}
          />
          <div > &nbsp; &nbsp;</div>
          <div class="Checkbox">
            <Checkbox
              type="checkbox"
              style={{display: 'inline-flex', flexDirection: 'row'}}
              checked={this.state.checked}
              onClick={this.handleCheck}
            /> <label>Select All Types</label>      
          </div>
          <div > &nbsp; &nbsp;</div>
          <Button type="submit" onClick={this.getCuisines}>See Cuisines</Button>

        </div>

        <br></br>
        <br></br>
        <br></br>


        <div className="header-container">
            <div className="headers">
              <div className="header"><strong>Cuisine Type</strong></div>
              <div className="header"><strong>Matching Scores</strong></div>
              <Select
                styles={selectStyles}
                placeholder = {''}
                value={this.state.selectedDisplay}
                size={50}
                options={this.state.displayOptions}
                onChange={this.handleDisplayChange}
              />
              <div>Filter Top Cuisine(s)</div>
            </div>
          </div>

          <div className="results-container" id="results">
            {this.state.matchedCuisines}
          </div>


          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>          
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>




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

          <div > &nbsp; &nbsp;</div>

          <Link
            to={{
              pathname: `/Feature3`,
              state: {// place data you want to send here!
                selectedCities: this.state._selectedCities,
                selectedState: this.state._selectedState,
                selectedCuisines: this.state.matchedCuisines,
              }
            }}><Button type="submit" disabled={!this.validateSearch()} > See Restaurants </Button>
          </Link>

        </div>


        {/* <div>
           {[1,2,3,4,5].map((item,i) => {
             return (
                <div>
                  <input checked={this.state.value[i]} type="checkbox" onChange={(e) => this.onChange(e, i)}/>
                  <button onClick={()=>this.unCheck(i)}>Toggle</button>
                </div>
              )
           })}      
      </div> */}



      </div>




      
    )
  }
}

// style for React components
const selectStyles = {
  container: base => ({
    ...base,
    flex: 1
  })
};