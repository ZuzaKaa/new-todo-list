import React,{Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);


    this.state={
      newItem:"",
      list:[]
    }
  }

//incorporating local storage 
componentDidMount() {
  this.hydrateStateWithLocalStorage();

  // add event listener to save state to localStorage
  // when user leaves/refreshes the page
  window.addEventListener(
    "beforeunload",
    this.saveStateToLocalStorage.bind(this)
  );
}

componentWillUnmount() {
  window.removeEventListener(
    "beforeunload",
    this.saveStateToLocalStorage.bind(this)
  );

  // saves if component has a chance to unmount
  this.saveStateToLocalStorage();
}

hydrateStateWithLocalStorage() {
  // for all items in state
  for (let key in this.state) {
    // if the key exists in localStorage
    if (localStorage.hasOwnProperty(key)) {
      // get the key's value from localStorage
      let value = localStorage.getItem(key);

      // parse the localStorage string and setState
      try {
        value = JSON.parse(value);
        this.setState({ [key]: value });
      } catch (e) {
        // handle empty string
        this.setState({ [key]: value });
      }
    }
  }
}

saveStateToLocalStorage() {
  // for every item in React state
  for (let key in this.state) {
    // save to localStorage
    localStorage.setItem(key, JSON.stringify(this.state[key]));
  }
}
  updateInput(key,value){
   this.setState({
     [key]:value
   });
  }

  addItem(){
    // create item uniqe id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    //copy current item list 
    const list = [...this.state.list];

    //add new item 
    list.push(newItem);

    //update list and reset input 
    this.setState({
      list,
      newItem:""
    })
  }
  
  deleteItem(id){
    //copy current list
    const list = [...this.state.list];

    //filter out deleted list of items
    const updatedList = list.filter(item => item.id !== id);

    this.setState({
      list: updatedList
    });
  }
  
  render(){
    return (
      <div className="App">
        <div className="App-conteiner">
          <h1 className="App-title">TO DO LIST</h1>
          <p className="App-header">Write anything in placeholder</p>
          <br/>
          <input
             type="text"
             placeholder="type here"
             value={this.state.newItem}
             onChange={e => this.updateInput("newItem", e.target.value)} 
             />
             <button className="App-btn"
               onClick={()=> this.addItem()}> 
               ADD
             </button>
             <br/> <br/>
             <ul>
               {this.state.list.map(item => {
                 return (
                   <li 
                   className="App-list"
                   key={item.id}>
                     {item.value}
                     <button 
                      className="App-delete-btn"
                      onClick={() => this.deleteItem(item.id)}>
                       X
                     </button>
                   </li>
                 )
               })}
             </ul>
        </div>
      </div>
    )
  }
}


export default App;