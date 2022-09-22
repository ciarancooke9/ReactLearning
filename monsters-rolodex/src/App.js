import { Component } from 'react';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: '',     
    }
    console.log('constructor ran');
  }

  componentDidMount() {
    console.log('component mounted');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState(() => {
      return {monsters: users}
    },
    () => {
      console.log(this.state);
    }
    )
    );
  }

  filterItems(arr, query) {
    return arr.filter((el) => 
    el.toLowerCase().includes(query.toLowerCase()));
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();        
    this.setState(() => {
      return { searchField };
    });
  }

  render(){
    console.log('render ran');

    const {monsters, searchField }= this.state;
    const {onSearchChange }= this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <input className='search-box' 
        type='search' placeholder='seach monsters' 
        onChange = {onSearchChange}     
        />
        {
          filteredMonsters.map((monster) => {
            return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
            )
          }
          )
        }
      </div>
    );
}
}
export default App;
