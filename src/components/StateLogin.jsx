import { useState } from 'react';
import Input from './Input';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';

export default function Login() {
    const [enteredValues, setEnteredValues] = useState({
        email: '',
        password: '',
    });

    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false,
    });

    const emailIsInvalid =
        didEdit.email &&
        !isEmail(enteredValues.email) &&
        !isNotEmpty(enteredValues.email);

    const passwordIsInvalid =
        didEdit.password && !hasMinLength(enteredValues.password, 6);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(enteredValues);

        // Reset the input fields
        e.target.reset();
    };

    const handleInputChange = (identifier, value) => {
        setEnteredValues((prev) => ({ ...prev, [identifier]: value }));
        setDidEdit((prev) => ({ ...prev, [identifier]: false }));
    };

    const handleInputBlur = (identifier) => {
        setDidEdit((prev) => ({ ...prev, [identifier]: true }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className='control-row'>
                <Input
                    label='Email'
                    id='email'
                    //type='email'
                    name='email'
                    onBlur={() => handleInputBlur('email')}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    value={enteredValues.email}
                    error={emailIsInvalid && 'Enter a valid email address.'}
                />

                <Input
                    label='Password'
                    id='password'
                    type='password'
                    name='password'
                    onBlur={() => handleInputBlur('password')}
                    onChange={(e) =>
                        handleInputChange('password', e.target.value)
                    }
                    value={enteredValues.password}
                    error={
                        passwordIsInvalid &&
                        'Password should be at least 6 characters long.'
                    }
                />
            </div>

            <p className='form-actions'>
                <button className='button button-flat'>Reset</button>
                <button className='button'>Login</button>
            </p>
        </form>
    );
}
