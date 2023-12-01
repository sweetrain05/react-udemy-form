import { useState } from 'react';

const useInput = (defaultValue, validation) => {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const isValid = validation(enteredValue);

    const handleInputChange = (e) => {
        setEnteredValue(e.target.value);
        setDidEdit(false);
    };

    const handleInputBlur = () => {
        setDidEdit(true);
    };

    const handleReset = () => {
        setEnteredValue(defaultValue);
        setDidEdit(false);
    };

    return {
        value: enteredValue,
        handleInputBlur,
        handleInputChange,
        handleReset,
        hasError: didEdit && !isValid,
    };
};

export default useInput;
