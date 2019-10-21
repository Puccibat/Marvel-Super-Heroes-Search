import React from 'react';
import axios from 'axios';
import '../style/Search.css';
import {Card, Modal, Button, ButtonToolbar} from 'react-bootstrap';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      heroes: [],
      isSearchable: false,
      loading: false,
      message: ''
    };
    this.cancel = '';
  }

  fetchSearchHeroes = query => {
    const apiKey =
      'dbe0038f839406bd1e69416a03e2d67a&hash=fb974711d8b7728c370ddfe09b191981';
    const APIurl = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=${apiKey}`;

    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();

    axios
      .get(APIurl, {
        cancelToken: this.cancel.token
      })
      .then(res => {
        this.setState({
          heroes: res.data.data.results,
          loading: false
        });
      })
      .catch(error => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false
          });
        }
      });
  };

  handleOnInputChange = event => {
    const query = event.target.value;
    this.setState({ query: query });

    if (!query) {
      this.setState({
        query,
        loading: false,
        heroes: [],
        message: '',
        isSearchable: false
      });
    } else {
      this.setState(
        { query, loading: true, message: '', isSearchable: true },
        () => {
          this.fetchSearchHeroes(query);
        }
      );
    }
  };

  heroModal = (props) => {
  return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  detailsButton = () => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
      <ButtonToolbar>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          DETAILS
        </Button>

        <this.heroModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </ButtonToolbar>
    );
  }


  renderSearchHeroes = () => {
    const { heroes, isSearchable, loading } = this.state;
    if (loading) {
      return (
        <div>
          <h6>loading</h6>
        </div>
      );
    }

    if (isSearchable) {
      if (Object.keys(heroes).length && heroes.length) {
        return (
          <div>
            {heroes.map(result => {
              return (
                <div key={result.id}>
                    <Card className="heroesCards" style={{ width: '15rem' }}>
                      <Card.Body>
                        <Card.Img variant="top" src={`${result.thumbnail.path}.${result.thumbnail.extension}`} className="thumbnail" />
                        <Card.Title><h2>{result.name}</h2></Card.Title>
                        <this.detailsButton />
                      </Card.Body>
                    </Card>
                </div>
              );
            })}
          </div>
        );
      } else {
        return (
          <div>
            <h6>No results</h6>
          </div>
        );
      }
    } else {
      return (
        <div>
          <h6>Home page</h6>
        </div>
      );
    }
  };

  render() {
    const { query } = this.state;
    return (
      <div className='container'>
        <h1 className='title'>MARVEL SUPER-HEROES SEARCH</h1>
        <label className='search-label'>
          <input
            type='text'
            value={query}
            id='search-input'
            onChange={this.handleOnInputChange}
            placeholder='SEARCH HEROES...'
          />
        </label>
        {this.renderSearchHeroes()}
      </div>
    );
  }
}

export default Search;
