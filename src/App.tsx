import React, { MouseEvent, useState } from 'react';
import './App.css';

const App: React.FC = () => {

  const [result, setResult] = useState<string>("");
  
  type handleClickEvent = React.MouseEvent<HTMLButtonElement>;

  const handleClick = (e: handleClickEvent) => {
    setResult(result.concat((e.target as HTMLElement).id))}

  const clear = (): void => setResult("")

  const deleteEl = (): void => setResult(result.slice(0, -1));


  const calculate = (): void => {
    try {
      setResult(eval(result).toString())
    } catch (error: any) {
      setResult("Error") 
    }
  }

  const numberButtonArray: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '00'];

  const operatorButtonArray: string[] = ['.', '/', '*', '-', '+'];
  

  //add type? is it worth adding an interface here?
  const specialOperators = {
    "AC": clear,
    "DE": deleteEl,
    "=": calculate
  };

  const operatorButtonRenderer = (index1: number, index2: number) => {
    return operatorButtonArray.slice(index1,index2).map((label) => (
      <button id={label} key={label} className="operator" onClick={handleClick}>{label}</button>
      ));
  }
  
  const numberButtonRenderer = (index1: number, index2: number) => {
    return numberButtonArray.slice(index1, index2).map((label) => (
      <button id={label} key={label} className="number" onClick={handleClick}>{label}</button>
    ))
  }

  const specialOperatorButtons = (label: keyof typeof specialOperators) => {
    if (label == "=") {
      return (
      <button className='operator col-span-2' onClick={specialOperators[label]}>{label}</button>
      )
    } else {
    return (
      <button className='operator' onClick={specialOperators[label]}>{label}</button>
    )}
  }

  return (
    <div className='calculator'>
      <input type="text" value={result} disabled />

      <div className='buttons'>

        {specialOperatorButtons("AC")}
        {specialOperatorButtons("DE")}
        {operatorButtonRenderer(0,2)}

        {numberButtonRenderer(0,3)}
        {operatorButtonRenderer(2,3)}

        {numberButtonRenderer(3,6)}
        {operatorButtonRenderer(3,4)}

        {numberButtonRenderer(6,9)}
        {operatorButtonRenderer(4,5)}

        {numberButtonRenderer(9,11)}
        {specialOperatorButtons("=")}
      </div>
    </div>
  )
}

export default App;
