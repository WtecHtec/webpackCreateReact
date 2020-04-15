import React from 'react';
import { Animate , Button } from '@alifd/next';
import './App.css'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: true };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.handleToggle} > Toggle visible </Button> &nbsp;&nbsp;
                <Animate animation={{
                    enter: 'my-zoom-in',
                    leave: 'my-zoom-out'
                }}>
                    {this.state.visible ?
                        <div className="basic-demo">Next Animate</div> :
                        null}
                </Animate>
            </div>
        );
    }
}

export default App;