import React, { Component } from 'react';
import Buttons from "./components/Buttons"
import './css/style.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '0',
            previous: '0',
            nextIsReset: false,
            resulted:false
        }

    }

    reset = () => {
        this.setState({ result: '0', previous: '0' });
    }

    addToCurrent = (symbol) => {
        //console.log(symbol);
        if (["/", "+", "-", "*"].indexOf(symbol) > -1 && this.state.nextIsReset === false) {
            let { previous,resulted } = this.state;
            if(previous==="0" || resulted===true)
            {
                previous = (this.state.result + symbol);
            }else
            {
            previous = (previous + this.state.result + symbol);
            }
            this.setState({ previous, nextIsReset: true,resulted:false });

        } else {
            if ((this.state.result === "0" && symbol !== ".") || this.state.nextIsReset || this.state.resulted) {
                this.setState({ result: symbol, nextIsReset: false,resulted:false });
            } else {
                this.setState({ result: this.state.result + symbol });
            }

        }
    }

    calculate = () => {
        let { result,previous } = this.state;
        if(previous!=="0" && previous!==result) 
            {
                result = String(eval(this.state.previous + result));
                previous = "0"
            }
        this.setState({result,previous,resulted:true});
    }

    render() {
        const buttons = [
            { symbol: 'C', cols: 3, action: this.reset },
            { symbol: '/', cols: 1, action: this.addToCurrent },
            { symbol: '7', cols: 1, action: this.addToCurrent },
            { symbol: '8', cols: 1, action: this.addToCurrent },
            { symbol: '9', cols: 1, action: this.addToCurrent },
            { symbol: '*', cols: 1, action: this.addToCurrent },
            { symbol: '4', cols: 1, action: this.addToCurrent },
            { symbol: '5', cols: 1, action: this.addToCurrent },
            { symbol: '6', cols: 1, action: this.addToCurrent },
            { symbol: '-', cols: 1, action: this.addToCurrent },
            { symbol: '1', cols: 1, action: this.addToCurrent },
            { symbol: '2', cols: 1, action: this.addToCurrent },
            { symbol: '3', cols: 1, action: this.addToCurrent },
            { symbol: '+', cols: 1, action: this.addToCurrent },
            { symbol: '0', cols: 2, action: this.addToCurrent },
            { symbol: '.', cols: 1, action: this.addToCurrent },
            { symbol: '=', cols: 1, action: this.calculate }
        ];
        return (
            <div className="App" >
                {this.state.previous!=="0" ? <input className="previous" type="text" value={this.state.previous} /> : null}
                <input className="result" type="text" value={this.state.result} />
                {buttons.map((btn, i) => { return <Buttons key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} /> })}
            </div>
        )
    }
}
export default App;