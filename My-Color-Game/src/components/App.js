import React from "react";
import "../css/App.css"
import { RandomGenerator } from "../logics/Logics"
class Main extends React.Component {
    state = {
        color: '',
        main_color: '',
        box: '',
    }
    render() {
        let newgame = () => {
            let box_count = 3;
            this.setState({ box: box_count })
            const newColor = RandomGenerator(box_count);

            this.setState({ color: newColor });


            const newMain = newColor[Math.floor(Math.random() * box_count)];

            this.setState({ main_color: newMain });

            let hard = document.querySelector(".hard");

            let rgb = document.querySelector(".rgb");

            rgb.innerHTML = ` ${newMain}`

            hard.style.display = "none";

            let byee = document.querySelectorAll(".boxes");

            for (let i = 0; i <= box_count; i++) {
                byee[i].style.backgroundColor = newColor[i]
            }

        }
        let easy = () => {
            let box_count = 3;
            this.setState({ box: box_count })
            const newColor = RandomGenerator(box_count);

            this.setState({ color: newColor });


            const newMain = newColor[Math.floor(Math.random() * box_count)];

            this.setState({ main_color: newMain });

            let hard = document.querySelector(".hard");

            let rgb = document.querySelector(".rgb");

            rgb.innerHTML = ` ${newMain}`

            hard.style.display = "none";

            let byee = document.querySelectorAll(".boxes");

            for (let i = 0; i <= box_count; i++) {
                byee[i].style.backgroundColor = newColor[i]
            }


        }
        let hard = () => {
            let box_count = 6;
            this.setState({ box: box_count })
            const newColor = RandomGenerator(box_count);

            this.setState({ color: newColor });


            const newMain = newColor[Math.floor(Math.random() * box_count)];

            this.setState({ main_color: newMain });


            let rgb = document.querySelector(".rgb");

            rgb.innerHTML = ` ${newMain}`

            let hard = document.querySelector(".hard");
            hard.style.display = "";


            let byee = document.querySelectorAll(".boxes");


            for (let i = 0; i < 6; i++) {
                byee[i].style.backgroundColor = newColor[i]
            }

        }




        return (
            <div>
                <div className="upper-sec">
                    <p className="display-6 text-center pt-3"> The Great <br /> <span className="rgb "></span> <br />Guessing Game</p>
                </div>
                <div className="the-line d-flex justify-content-between">
                    <button className="btn btn-outline-secondary button" style={{ marginLeft: "150px" }} onClick={newgame}>New Game</button>
                    <p className="text-light mt-2 win">Hello</p>
                    <div>
                        <button className="btn btn-outline-success button me-5" onClick={easy}>Easy</button>
                        <button className="btn btn-outline-danger button " style={{ marginRight: "150px" }} onClick={hard}>Hard</button>
                    </div>
                </div>
                <div className="box-main">
                    <div className="easy mt-2">
                        <div className="boxes"></div>
                        <div className="boxes"></div>
                        <div className="boxes"></div>
                    </div>
                    <div className="hard" style={{ display: "none" }}>
                        <div className="boxes"></div>
                        <div className="boxes"></div>
                        <div className="boxes"></div>
                    </div>
                </div>
            </div>

        )

    }
    componentDidUpdate() {

        let main = this.state.main_color;
        let boxe = this.state.box;
        let box = document.querySelectorAll(".boxes");
        let win = document.querySelector(".win");
        for (let i = 0; i < boxe; i++) {
            box[i].addEventListener("click", function () {
                if (box[i].style.backgroundColor === main) {
                    win.innerHTML = "winner";
                    for (let i = 0; i < boxe; i++) {
                        box[i].style.backgroundColor = main;
                    }

                } else {
                    win.innerHTML = "looser";


                }
            })

        }

    }



}

export default Main;