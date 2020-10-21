import React from 'react';
import axios from 'axios';
import {
  Card,
  Modal,
  Button,
  ButtonToolbar,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import Deadpool from '../style/deadpool-comics.jpg';
import Marvel from '../style/avangers.jpg';

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

  heroModal = props => {
    const { myhero } = props;
    return (
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            {myhero.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{myhero.description}</p>
        </Modal.Body>
      </Modal>
    );
  };

  detailsButton = myhero => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
      <ButtonToolbar>
        <Button variant='primary' onClick={() => setModalShow(true)}>
          DETAILS
        </Button>
        <this.heroModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          {...myhero}
        />
      </ButtonToolbar>
    );
  };

  renderSearchHeroes = () => {
    const { heroes, isSearchable, loading } = this.state;
    if (loading) {
      return (
        <div>
          <h2 className='title'>LOADING</h2>
          <img src={Marvel} alt='' className='homePageImg' />
        </div>
      );
    }

    if (isSearchable) {
      if (Object.keys(heroes).length && heroes.length) {
        return (
          <div>
            <Container>
              <Row md={4}>
                {heroes.map(result => {
                  return (
                    <div key={result.id}>
                      <Col>
                        <Card className='heroesCards'>
                          <Card.Body>
                            <Card.Img
                              variant='top'
                              src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                              className='thumbnail'
                            />
                            <Card.Title>
                              <h2>{result.name}</h2>
                            </Card.Title>
                          </Card.Body>
                          <Card.Footer>
                            <this.detailsButton myhero={result} />
                          </Card.Footer>
                        </Card>
                      </Col>
                    </div>
                  );
                })}
              </Row>
            </Container>
          </div>
        );
      } else {
        return (
          <div>
            <h2 className='title'>SORRY THERE'S NO RESULTS</h2>
            <img src={Deadpool} alt='' className='noResultImg' />
          </div>
        );
      }
    } else {
      return (
        <div>
          <h2 className='title'>HOME PAGE</h2>
          <img src={Marvel} alt='' className='homePageImg' />
        </div>
      );
    }
  };

  render() {
    const { query } = this.state;
    return (
      <div className='container'>
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
