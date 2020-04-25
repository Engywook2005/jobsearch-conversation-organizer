import React, { Component } from 'react';
class App extends Component {
    constructor() {
        super();

        // State is mutable.
        this.states = {
            data: [
                {
                    "id": 0,
                    "name": "Foo",
                    "age": 20
                },
                {
                    "id": 1,
                    "name": "Bar",
                    "age": 30
                },
                {
                    "id": 2,
                    "name": "Baz",
                    "age": 40
                }
            ],
            greeting: "The subject was noses!"
        };

        this.setStateHandler = this.setStateHandler.bind(this);
    }

    setStateHandler() {
        const newStateData = [];

        this.states.data.forEach((stateData) => {
            stateData.age += 1;

            newStateData.push(stateData);
        });

        this.setState({
            data: newStateData
        });
    }

    render() {
        return(
            <div>
                <Header greeting = {this.states.greeting} />
                <table>
                    <tbody>
                    {
                        // Here nodes of this.states.data become props in TableRow.
                        this.states.data.map((person, i) => <TableRow
                            key = {i}
                            data = {person}
                        />)
                    }
                    </tbody>
                </table>
                <button onClick = {this.setStateHandler}>UPDATE STATE</button>
                <RandomButton />
            </div>
        );
    }
}

class RandomButton extends Component {
    constructor() {
        super();

        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.clickCount = 1;
    }

    forceUpdateHandler() {
        this.forceUpdate();

        this.clickCount *= 2;
    }

    render() {
        return(
            <div>
                <button onClick = { this.forceUpdateHandler }>FORCE UPDATE</button>
                <p><strong>Random Number</strong> { Math.random() } </p>
                <p>{ this.clickCount }</p>
            </div>
        );
    }
}

class Header extends Component {
    render() {
        return(
            <h1>{this.props.greeting}</h1>
        );
    }
}

class TableRow extends Component {

    // Props are immutable.
    render() {
        return(
            <tr>
                <td>{this.props.data.id}</td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.age}</td>
            </tr>
        );
    }
}

export default App;
