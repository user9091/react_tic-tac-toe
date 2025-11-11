import { useState } from "react";
import React from "react";
import * as motion from "motion/react-client";
import Particles from './Particles';
import RotatingText from './RotatingText'

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    // const [isReversed, setIsReversed] = useState(false);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [position, setPosition] = useState(Array(9).fill(null));
    // const [history, setHistory] = useState([Array(9).fill(null)]);
    const [winpos, setWinpos] = useState(Array(9).fill(false));
    let status;

    const winner = calculateWinner(squares);

    function Square({ value, onSquareClick, id }) {
        if (xIsNext && value === null && !winner) {
            return (<motion.button whileHover={{
                scale: 1.2, rotate: 10, backgroundColor: "#2BB95D",
                transition: { duration: 0.2 },
            }}
                whileTap={{ scale: 0.8 }} className="square" onClick={onSquareClick} style={{ backgroundColor: "#ffffff" }}>{value}</motion.button>);
        }

        if (!xIsNext && value === null && !winner) {
            return (<motion.button whileHover={{
                scale: 1.2, rotate: 10, backgroundColor: "#c92bb4ff",
                transition: { duration: 0.2 },
            }}
                whileTap={{ scale: 0.8 }} className="square" onClick={onSquareClick} style={{ backgroundColor: "#ffffffff" }}>{value}</motion.button>);
        }

        if (value === 'X') {
            if (winner && winner.includes(id)) {
                return (<motion.button className="square" onClick={onSquareClick} style={{ backgroundColor: "#2BB95D" }} animate={{ rotate: 360 }}
                    transition={{ duration: 1 }}>{value}</motion.button>);
            }
            return (<button className="square" onClick={onSquareClick} style={{ backgroundColor: "#2BB95D" }}>{value}</button>);
        }

        if (value === 'O') {
            if (winner && winner.includes(id)) {
                return (<motion.button className="square" onClick={onSquareClick} style={{ backgroundColor: "#c92bb4ff" }} animate={{ rotate: 360 }}
                    transition={{ duration: 1 }}>{value}</motion.button>);
            }
            return (<button className="square" onClick={onSquareClick} style={{ backgroundColor: "#c92bb4ff" }}>{value}</button>);
        }

        return (<button className="square" onClick={onSquareClick} >{value}</button>);
    }


    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                // winpos[a] = true;
                // winpos[b] = true;
                // winpos[c] = true;
                return [a, b, c];
            }
        }
        return null;
    }

    function handleClick(i) {
        const nextSquares = squares.slice();
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        nextSquares[i] = xIsNext ? 'X' : 'O';
        for (let j = 0; j < 9; j++) {
            if (position[j] === null) {
                position[j] = i;
                break;
            }
        }
        // setHistory([...history, nextSquares]);
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    // function goToMove(nextMove) {
    //     setSquares(history[nextMove]);
    //     history.splice(nextMove + 1);
    //     setXIsNext((nextMove % 2) === 0);
    //     setBgcolor(Array(9).fill('white'));
    // }

    // const moves = history.map((history, move) => {
    //     let description;
    //     let row = position[move - 1] !== null ? Math.floor(position[move - 1] / 3) + 1 : null;
    //     let col = position[move - 1] !== null ? (position[move - 1] % 3) + 1 : null;
    //     if (move > 0) {
    //         description = "Go to move #" + move + " ( position : " + row + "," + col + " )";
    //     } else {
    //         return null;
    //     }
    //     return (<li key={move}>
    //         <button onClick={() => goToMove(move)}>{description}</button>
    //     </li>);
    // })

    if (winner) {
        status = "Winner : " + (squares[winner[0]]);
    } else {
        status = "Next Player : " + (xIsNext ? 'X' : 'O');
    }

    // const atmove = "You are at move #" + (history.length - 1);

    function Reset() {
        setXIsNext(!xIsNext);
        setSquares(Array(9).fill(null));
        // setHistory([Array(9).fill(null)]);
        // setBgcolor(Array(9).fill('white'));
        setPosition(Array(9).fill(null));
    }


    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const mapped = arr.map((rep) => (
        <React.Fragment key={rep}>
            <Square
                value={squares[rep]}
                onSquareClick={() => handleClick(rep)}
                // bgcolor={bgcolor[rep]}
                id={rep}
            />
        </React.Fragment>
    ));

    const mapRows = [];
    for (let i = 0; i < 3; i++) {
        mapRows.push(
            <div className="board-row" key={i}>
                {mapped.slice(i * 3, i * 3 + 3)}
            </div>
        );
    }

    // const reverse = isReversed ? moves.slice().reverse() : moves;

    // function toggle() {
    //     setIsReversed(!isReversed);
    // }

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RotatingText
                texts={['TIC', 'TAC', 'TOE']}
                mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "20%" }}
                animate={{ y: 0 }}
                exit={{ y: "-20%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
                style={{
                    position: 'absolute', zIndex: 2, top: 80, fontSize: '3rem', fontWeight: 'bold'
                }}
            />
            <Particles
                particleColors={['#000000']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={false}
                alphaParticles={false}
                disableRotation={false}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                }}
            />
            <div style={{ position: 'absolute', zIndex: 1, top: 200, left: 0, width: '100%', height: '100%' }}>
                <>{mapRows}</>
                <p className="temp status">{status}</p>
                <motion.div className="temp" drag dragMomentum={true}>
                    <button className="button" onClick={Reset}>Reset</button>
                </motion.div>
            </div>
        </div>
    );
}
