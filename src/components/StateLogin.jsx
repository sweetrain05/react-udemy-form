import Input from './Input';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';
import useInput from '../hooks/useInput';

export default function Login() {
    const {
        value: emailValue,
        handleInputBlur: handleEmailBlur,
        handleInputChange: handleEmailChange,
        handleReset: handleEmailReset,
        hasError: emailHasError,
    } = useInput('', (value) => {
        return isEmail(value) && isNotEmpty(value);
    });

    const {
        value: passwordValue,
        handleInputBlur: handlePasswordBlur,
        handleInputChange: handlePasswordChange,
        handleReset: handlePasswordReset,
        hasError: passwordHasError,
    } = useInput('', (value) => {
        return hasMinLength(value, 6);
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (emailHasError || passwordHasError) return;

        console.log(emailValue, passwordValue);

        // Reset the input fields
        handleReset();
    };

    const handleReset = () => {
        handleEmailReset();
        handlePasswordReset();
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
                    onBlur={handleEmailBlur}
                    onChange={handleEmailChange}
                    value={emailValue}
                    error={emailHasError && 'Enter a valid email address.'}
                />

                <Input
                    label='Password'
                    id='password'
                    type='password'
                    name='password'
                    onBlur={handlePasswordBlur}
                    onChange={handlePasswordChange}
                    value={passwordValue}
                    error={
                        passwordHasError &&
                        'Password should be at least 6 characters long.'
                    }
                />
            </div>

            <p className='form-actions'>
                <button
                    type='button'
                    lassName='button button-flat'
                    onClick={handleReset}
                >
                    Reset
                </button>
                <button className='button'>Login</button>
            </p>
        </form>
    );
}
