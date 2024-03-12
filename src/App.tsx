import { FormEvent, useState } from 'react';
import './App.css';

function App() {
  const [passwordLength, setPasswordLength] = useState('4');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form submit');
  };

  return (
    <>
      <div className="container">
        <h1> Password Generator </h1>
        <h3 className="result">
          <input type="text" readOnly value={'nguyenduynhan123123123'} />
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="form-item">
            <label className="form-label" htmlFor="password-length">
              {' '}
              Password Length{' '}
            </label>

            <input
              id="password-length"
              type="range"
              min="4"
              max="25"
              value={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
            <input
              id="password-length"
              type="number"
              min="4"
              max="25"
              value={passwordLength}
              onChange={(e) => {
                setPasswordLength(e.target.value);
              }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="add-uppercase-letters">
              {' '}
              Add Uppercase Letters{' '}
            </label>
            <input id="add-uppercase-letters" type="checkbox" />
          </div>
          <div className="form-item">
            <label htmlFor="add-lowercase-letters">
              {' '}
              Add Lowercase Letters{' '}
            </label>
            <input id="add-lowercase-letters" type="checkbox" />
          </div>
          <div className="form-item">
            <label htmlFor="include-numbers"> Include Numbers </label>
            <input id="include-numbers" type="checkbox" />
          </div>
          <div className="form-item">
            <label htmlFor="include-symbols"> Include Symbols </label>
            <input className="checkbox" id="include-symbols" type="checkbox" />
          </div>

          <button className="btn-submit" type="submit">
            {' '}
            Generate Password{' '}
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
