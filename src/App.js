import logo from './logo.svg';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import './App.css';
import HomeComponent from './components/HomeComponent';
import DriverComponent from './components/DriverListComponent';

import { history } from './_helpers';

function App() {
  return (
    <div>
      <Row style={{ marginTop: '64px' }}>
        <Col offset={3} span={18}>
          <Button type="link" onClick={() => history.push("/")}>Home </Button>
          <Button type="link" onClick={() => history.push("/driver")}>Driver  </Button>
        </Col>
      </Row>

      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/driver" component={DriverComponent} />
        </Switch>
      </HashRouter>
    </div>


  );
}

export default App;
