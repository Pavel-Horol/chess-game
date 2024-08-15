import React, { FunctionComponent, useState, useEffect } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import CellComponent from "./CellComponent";
import { Player } from "../models/Player";
interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FunctionComponent<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  function click(cell: Cell) {
    if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell) ){
      selectedCell.moveFigure(cell)
      setSelectedCell(null)
      swapPlayer()
    }else if(cell.figure?.color === currentPlayer?.color){
        setSelectedCell(cell)
      }
  }

  useEffect(() => {
    highlightCells()
  }, [selectedCell, highlightCells])

  function highlightCells () {
    board.highlightCells(selectedCell)
    updateBoard()
  }
  function updateBoard() {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  return (
    <div>
    <h3>Current Player is {currentPlayer?.color}</h3>
    <div className="board">
      {board.cells.map((row, index) => {
        return (
          <React.Fragment key={index}>
            {row.map((cell) => {
              return <CellComponent 
                click = {click}
                cell={cell}
                key = {cell.id}
                selected = {cell.x === selectedCell?.x && cell.y === selectedCell?.y  }
              />;
            })}
          </React.Fragment>
        );
      })}
    </div>
    </div>
  );
};

export default BoardComponent;
