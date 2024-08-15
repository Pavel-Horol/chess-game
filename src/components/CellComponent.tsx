import React, { FunctionComponent } from 'react'
import { Cell } from '../models/Cell';
interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) =>  void
}

const CellComponent: FunctionComponent<CellProps> = ({cell, selected, click}) => {
  return (
    <div 
        className={`cell ${cell.color} ${ selected ? "selected" : ""}`}
        onClick = {() => click(cell)}
        style={{background: cell.available && cell.figure ? 'green' : ''}}
        >
        {cell.available && !cell.figure && <div className='avilable'></div>}
        {cell.figure?.logo && <img src={cell.figure.logo} alt=''/>}
    </div>
  )
}

export default CellComponent