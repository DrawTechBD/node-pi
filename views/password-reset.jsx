const React = require('react');
import {Container, Form, FormGroup, Button, Label, Row, Col, Card, CardHeader, CardBody, CardFooter} from 'reactstrap';
const App = (props) => {
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');

    const submit = (e) => {
        console.log(password, e);
    }
    return (
        <Container>
            <Row className="m-2">
                <Col col={6} offset={3}>
                    <Form onSubmit={submit}>
                        <Card>
                            <CardHeader className="text-center">Reset Password</CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" id="password" placeholder="Enter new password"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password2">Password</Label>
                                    <input type="password" id="password2" placeholder="Repeat password"/>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button onClick={submit}>Submit</Button>
                            </CardFooter>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

module.exports = App;