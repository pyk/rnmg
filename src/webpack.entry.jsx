// Webpack entry point
// this is where the bundling process starts

// Copy ./index.html to build/index.html
require("file-loader??emitFile=false&name=[name].[ext]!./index.html");

// Copy assets
// CSS
require("file-loader?name=[path][name].[ext]!./css/game.css");
require("file-loader?name=[path][name].[ext]!./css/normalize.css");
require("file-loader?name=[path][name].[ext]!./css/skeleton.css");

// Fonts
require("file-loader?name=[path][name].[ext]!./fonts/firamono/firamono.css");
require("file-loader?name=[path][name].[ext]!./fonts/firamono/firamono-normal-400-cyrillic-ext.woff2");
require("file-loader?name=[path][name].[ext]!./fonts/firamono/firamono-normal-400-cyrillic.woff2");
require("file-loader?name=[path][name].[ext]!./fonts/firamono/firamono-normal-400-greek.woff2");
require("file-loader?name=[path][name].[ext]!./fonts/firamono/firamono-normal-400-latin-ext.woff2");
require("file-loader?name=[path][name].[ext]!./fonts/firamono/firamono-normal-400-latin.woff2");
require("file-loader?name=[path][name].[ext]!./fonts/firamono/firamono-normal-700-cyrillic-ext.woff2");
require("file-loader?name=[path][name].[ext]!./fonts/firamono/firamono-normal-700-cyrillic.woff2");
require("file-loader?name=[path][name].[ext]!./fonts/firamono/firamono-normal-700-greek.woff2");
require("file-loader?name=[path][name].[ext]!./fonts/firamono/firamono-normal-700-latin-ext.woff2");
require("file-loader?name=[path][name].[ext]!./fonts/firamono/firamono-normal-700-latin.woff2");

import React from 'react';
import ReactDOM from 'react-dom';

class GenNumber extends React.Component {
    componentDidUpdate() {
        let time, digit;
        // increase showing time depend on level
        digit = this.props.level.main + 2;
        time = 100 * Math.min(digit, 5) + 400 * Math.max(digit-5, 0);

        let number = document.getElementById('number');
        setTimeout(function() {
                number.innerHTML = number.innerHTML.replace(/\w/gi, '&#183;');
            }, time);

    }
    componentDidMount() {
        let number = document.getElementById('number');
        setTimeout(function() {
            number.innerHTML = number.innerHTML.replace(/\w|\W/gi, '&#183;');
        }, 1200);
    }
    render() {
        return(
            <div className="app__gen-number">
                <div className="app__info">
                    <p className="app__level">Level: {this.props.level.main} - {this.props.level.sub}</p>
                    <p className="app__wrong">Salah: {this.props.wrong}/3</p>
                </div>
                <p className="app__number" id="number">{(this.props.wrong < 3) ? atob(this.props.question) : '????'}</p>
            </div>
        )
    }
}

class InputNumber extends React.Component {
    constructor() {
        super();
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleUserInput(e) {
        e.preventDefault();
        let userNumber = btoa(this.userNumber.value);
        this.userNumber.value = "";
        this.props.compareUserInput(userNumber);
    }
    handleReset() {
        this.props.onReset();
    }
    render() {
        let layout;
        if(this.props.wrong < 3) {
            layout = <div className="app__input">
                        <form onSubmit={this.handleUserInput}>
                            Yang kamu ingat:
                            <input 
                                pattern="[0-9]+"
                                type="text"
                                ref={ (ref) => this.userNumber = ref } 
                                required
                                autoFocus />
                            <br/>
                            <br/>
                        </form>
                        <a className="button" href="#" onClick={this.handleReset}>Mulai Ulang</a>
                    </div>
        } else {
            layout = <div className="app__end">
                        <div className="app__notify">Coba lagi yah ka (✧ω✧)</div><br/><br/><a className="button" href="#" onClick={this.handleReset}>Mulai Ulang</a>
                    </div>;
        }
        
        return(layout)
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.compareUserInput = this.compareUserInput.bind(this);
        this.randomGenerate = this.randomGenerate.bind(this);
        this.resetState = this.resetState.bind(this);
        this.state = {
            question: btoa(this.randomGenerate(2)),
            level: {main: 1, sub: 1},
            wrong: 0        
        }
    }
    resetState() {
        this.setState({
            question: btoa(this.randomGenerate(2)),
            level: {main: 1, sub: 1},
            wrong: 0,
        })
    }
    randomGenerate(digit) {
        let max = Math.pow(10, digit) - 1,
            min = Math.pow(10, digit - 1)

        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    compareUserInput(userNumber) {
        let currQuestion = this.state.question,
            mainLevel = this.state.level.main,
            subLevel = this.state.level.sub,
            wrong = this.state.wrong,
            digit;

        if(userNumber == currQuestion) {
            if(subLevel < 3) {
                ++subLevel;
            } else 
            if(subLevel == 3) {
                ++mainLevel;
                subLevel = 1;
            }
        } else {
            ++wrong;
        }
        digit = mainLevel + 2;

        this.setState({
            question: btoa(this.randomGenerate(digit)),
            level: {main: mainLevel, sub: subLevel},
            wrong: wrong
        });
    }
    render() {
        return(
            <div className="main__app">
                <GenNumber 
                    question={this.state.question}
                    level={this.state.level}
                    wrong={this.state.wrong}/>
                <InputNumber 
                    compareUserInput={this.compareUserInput} 
                    wrong = {this.state.wrong} 
                    onReset = {this.resetState} />
            </div>
        )
    }
}

// class WelcomeMessage extends React.Component {
//     mulaiPermainan() {
//         console.log("TEST");
//     }
//     render() {
//         return (
//             <div id="test">
//             <p> Hello </p>
//             <a onClick={this.mulaiPermainan()} href="#">Mulai Permainan</a>
//             </div>
//         )
//     }
// }

// ReactDOM.render(
//     <WelcomeMessage />,
//     document.getElementById('welcome-message')
// )
// NOTE: harus di mount
//ReactDOM.unmountComponentAtNode(domContainerNode)

// Render <App /> if user click start game


var pesanPembuka = document.getElementById("pesan-pembuka");
var petunjuk = document.getElementById("petunjuk");
var tombolMulai = document.getElementById("tombol-mulai");
var tombolKeluar = document.getElementById("tombol-keluar");
var tombolPetunjuk = document.getElementById("tombol-petunjuk");
var tombolKembali = document.getElementById("tombol-kembali");
var pesanPembukaClassList = pesanPembuka.classList;
var petunjukClassList = petunjuk.classList;
var tombolMulaiClassList = tombolMulai.classList;
var tombolKeluarClassList = tombolKeluar.classList;
var tombolPetunjukClassList = tombolPetunjuk.classList;
var tombolKembaliClassList = tombolKembali.classList;

tombolMulai.addEventListener("click", function() {
    console.log("Hello");
    // render apps
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
    pesanPembukaClassList.add("hide-element");
    tombolMulaiClassList.add("hide-element");
    tombolKeluarClassList.remove("hide-element");
})

tombolKeluar.addEventListener("click", function() {
    console.log("keluar");
    // unmount App component
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    tombolKeluarClassList.add("hide-element");
    tombolMulaiClassList.remove("hide-element");
    pesanPembukaClassList.remove("hide-element");
})

tombolPetunjuk.addEventListener("click", function() {
    pesanPembukaClassList.add("hide-element");
    petunjukClassList.remove("hide-element");
})

tombolKembali.addEventListener("click", function() {
    petunjukClassList.add("hide-element");
    pesanPembukaClassList.remove("hide-element");
})

