import React from 'react';
import {Jumbotron, CardDeck, Card, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {PAGES} from 'configs/routes';

import './Home.scss';
// TODO: Add util or index file for multiple images import
import ill1 from 'static/ill1.jpg';
import ill2 from 'static/ill2.jpg';
import ill5 from 'static/ill5.jpg';
import ill8 from 'static/ill8.jpg';

function Home(props) {
    const history = useHistory();

    const redirectToMap = () => history.push(PAGES.dashboard);

    return (
        <div id="home">
            <Jumbotron>
                <h1>Welcome!</h1>
                <h1>We make task management in a family better</h1>
                <br />
                <Button size="lg" onClick={redirectToMap}>
                    Discover our platform
                </Button>
            </Jumbotron>
            <CardDeck>
                <Card>
                    <Card.Img variant="top" src={ill8} />
                    <Card.Body>
                        <Card.Title>Lorem Ipsum</Card.Title>
                        <Card.Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src={ill5} />
                    <Card.Body>
                        <Card.Title>Lorem Ipsum</Card.Title>
                        <Card.Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src={ill1} />
                    <Card.Body>
                        <Card.Title>Lorem Ipsum</Card.Title>
                        <Card.Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src={ill2} />
                    <Card.Body>
                        <Card.Title>Lorem Ipsum</Card.Title>
                        <Card.Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardDeck>
        </div>
    );
}

export {Home};
