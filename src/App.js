import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      message: '',
      status: '',
      loading: true,
    }
  }

  getRandomDogPic = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const dogObj = await response.json();

    this.setState({
      message: dogObj.message,
      status: dogObj.status,
      loading: false,
    });
  }

  randomDogImage = () => {
    this.setState(({ loading: load }) => ({ loading: !load }), () => this.getRandomDogPic());
  }

  render() {
    const { message, loading } = this.state;
    const loadingElement = <span>Loading ...</span>
    const dogImageElement = <img src={ message } alt="random dog" />

    return (
      <div className='App-header'>
        { loading ? loadingElement : dogImageElement }
        <button onClick={ this.randomDogImage }>Buscar um doguinho</button>
      </div>
    );
  }

  componentDidMount() {
    this.getRandomDogPic();
  }

  componentDidUpdate() {
    localStorage.setItem('dogImage', this.state.message);
  }

  shouldComponentUpdate(_nextProps, nextState) {
    const { message } = nextState;
    if (message.includes('terrier')) return false;
    return true;
  }

}

export default App;
