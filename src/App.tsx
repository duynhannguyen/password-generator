import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import { arrayCharacterASCII } from "./utilis/arrayCharacterASCII";
import { passwordConditionList } from "./utilis/constants";
import { LuClipboard } from "react-icons/lu";
import { LuClipboardCheck } from "react-icons/lu";
import NotificationBox from "./components/notificationBox/NotificationBox";
type CheckedList = {
  number: boolean;
  upper: boolean;
  symbol: boolean;
  [key: string]: boolean;
};
function App() {
  const [passwordLength, setPasswordLength] = useState(4);
  const [result, setResult] = useState("");
  const [isCoppy, setIsCoppy] = useState(false);
  const [checkedList, setCheckedList] = useState<CheckedList>({
    number: false,
    upper: false,
    lower: false,
    symbol: false,
  });

  const UPPER_CHAR_CODE = arrayCharacterASCII(65, 90);
  const LOWER_CHAR_CODES = arrayCharacterASCII(97, 122);
  const NUMBER_CHAR_CODES = arrayCharacterASCII(48, 57);
  const SYMBOL_CHAR_CODES = arrayCharacterASCII(33, 47)
    .concat(arrayCharacterASCII(58, 54))
    .concat(arrayCharacterASCII(91, 96))
    .concat(arrayCharacterASCII(123, 126));

  const generatePassword = (passwordLength: number) => {
    let charCodes = LOWER_CHAR_CODES;
    if (checkedList.upper) charCodes = charCodes.concat(UPPER_CHAR_CODE);
    if (checkedList.number) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
    if (checkedList.symbol) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
    const passwordCharacter = [];
    for (let i = 0; i < passwordLength; i++) {
      const characterCode =
        charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacter.push(String.fromCharCode(characterCode));
    }
    console.log(passwordCharacter.join(""));
    return passwordCharacter.join("");
  };
  const onCheck = () => (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    if (checked) {
      setCheckedList((prev) => ({ ...prev, [name]: checked }));
    } else {
      setCheckedList((prev) => ({ ...prev, [name]: checked }));
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setResult(generatePassword(passwordLength));
  };
  const coppyGeneratedPassword = () => {
    if (!result) {
      return;
    }
    setIsCoppy(true);
    navigator.clipboard.writeText(result);
  };
  return (
    <>
      <div className="container">
        <h1> Password Generator </h1>
        <h3 className="result">
          {/* <input type="text" readOnly value={result} /> */}
          <div className="password-result">{result}</div>
          <div
            className={`${!result && "icon-disable"} ${result && "icon"} `}
            onClick={() => coppyGeneratedPassword()}
          >
            {isCoppy ? <LuClipboardCheck /> : <LuClipboard />}
          </div>
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="form-item">
            <label className="form-label" htmlFor="password-length">
              {" "}
              Password Length{" "}
            </label>

            <input
              type="range"
              min={4}
              max={25}
              value={passwordLength}
              onChange={(e) => setPasswordLength(+e.target.value)}
            />
            <input
              id="password-length"
              type="number"
              min="4"
              max="25"
              value={passwordLength}
              onChange={(e) => {
                setPasswordLength(+e.target.value);
              }}
            />
          </div>
          {passwordConditionList.map((conditions) => {
            return (
              <div key={conditions.checkName} className="form-item">
                <label htmlFor={conditions.checkName}>
                  {" "}
                  {conditions.CheckLabel}{" "}
                </label>
                <input
                  name={conditions.checkName}
                  id={conditions.checkName}
                  type="checkbox"
                  value={conditions.checkName}
                  checked={checkedList[conditions.checkName]}
                  onChange={onCheck()}
                />
              </div>
            );
          })}

          <button className="btn-submit" type="submit">
            {" "}
            Generate Password{" "}
          </button>
        </form>
      </div>
      <NotificationBox />
    </>
  );
}

export default App;
