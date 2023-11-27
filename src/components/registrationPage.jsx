// Develop

import { useState, useRef } from 'react';
import styles from '../app.module.css';

// Constants ----------------------------

const sendFormData = (formData) => {
	console.log(formData);
};

const initialState = {
	email: '',
	password: '',
	checkPassword: '',
};

const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
		resetState: () => {
			setState(initialState);
		},
	};
};

// -----------------------------------------

export const RegistrationPage = () => {
	const { getState, updateState, resetState } = useStore();
	const [inputError, setInputError] = useState(null);

	const { email, password, checkPassword } = getState();

	const passwordRef = useRef('');
	const confirmPasswordRef = useRef('');

	const emailRef = useRef('');
	const submitButtonRef = useRef(null);

	const onSubmitButton = (event) => {
		event.preventDefault();
		sendFormData(getState());
	};

	const checkField = () => {
		return Object.values(getState()).every((value) => !!value);
	};

	if (checkField() && inputError === null) {
		submitButtonRef.current.focus();
	}

	const onChangeTarget = ({ target }) => {
		updateState(target.name, target.value);

		let error = null;

		// if (!/^[\w._@-]*$/.test(target.value)) {
		// 	error = `Неверный ${target.name}. Допустимые символы: буквы, цифры, "@", "_", "-"`;
		// }

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRef.current.value)) {
			error = 'поле E-mail не соответствует E-mail адресу ';
		}

		if (passwordRef.current.value !== confirmPasswordRef.current.value) {
			error = `пароли не совпадают`;
		}

		setInputError(error);
	};

	const onFieldBlur = () => {
		if (password.length < 8) {
			setInputError(`Пароль не должен быть короче 8 символов`);
		}
	};

	return (
		<>
			<div className={styles.app}>
				Registration Page
				<form onSubmit={onSubmitButton} className={styles.inputArea}>
					<input
						required
						name="email"
						type="email"
						placeholder="E-mail"
						value={email}
						ref={emailRef}
						onChange={onChangeTarget}
					/>
					<input
						required
						name="password"
						type="password"
						placeholder="Password"
						value={password}
						ref={passwordRef}
						onChange={onChangeTarget}
						onBlur={onFieldBlur}
					/>
					{/* <input
						required
						name="checkPassword"
						type="password"
						placeholder="Confirm Password"
						value={checkPassword}
						ref={confirmPasswordRef}
						onChange={onChangeTarget}
						onBlur={onFieldBlur}
					/> */}
					<button ref={submitButtonRef} type="submit" disabled={inputError !== null}>
						Registration
					</button>
					<button type="button" onClick={resetState}>
						Reset
					</button>
				</form>
				{inputError && <div className={styles.errorLabel}>{inputError}</div>}
			</div>
			<hr />
		</>
	);
};
