import { useState, useRef } from 'react';
import styles from '../app.module.css';

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

export const RegistrationPage = () => {
	const { getState, updateState, resetState } = useStore();
	const [inputError, setInputError] = useState(null);

	const onSubmitButton = (event) => {
		event.preventDefault();
		sendFormData(getState());
	};

	const { email, password, checkPassword } = getState();

	// ------------------------------------
	const submitButtonRef = useRef(null);

	const checkField = () => {
		return Object.values(getState()).every((value) => !!value);
	};

	if (checkField() || inputError === null) {
		// submitButtonRef.current.focus();
	}
	// ------------------------------------

	const onChangeTarget = ({ target }) => {
		updateState(target.name, target.value);

		let error = null;

		if (!/^[\w._@-]*$/.test(target.value)) {
			error = `Неверный ${target.name}. Допустимые символы: буквы, цифры, "@", "_", "-"`;
		}

		// РАБОТАЕТ НЕ КОРРЕКТНО (сравнивает пароли при следующем рендеринге +1 символ)
		// ПОЭТОМУ ОТКЛЮЧИЛ - submitButtonRef.current.focus();
		if (password !== checkPassword) {
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
						onChange={onChangeTarget}
					/>
					<input
						required
						name="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={onChangeTarget}
						onBlur={onFieldBlur}
					/>
					<input
						required
						name="checkPassword"
						type="password"
						placeholder="Confirm Password"
						value={checkPassword}
						onChange={onChangeTarget}
						onBlur={onFieldBlur}
					/>
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

// export const RegistrationPage = () => {
// 	const [formData, setFormData] = useState({
// 		email: '',
// 		password: '',
// 		checkPassword: '',
// 	});

// 	const [inputError, setInputError] = useState(null);

// 	const onSubmitButton = (event) => {
// 		event.preventDefault();
// 		sendFormData(formData);
// 	};

// 	const onChangeTarget = ({ target }) => {
// 		setFormData({ ...formData, [target.name]: target.value });

// 		let error = null;

// 		if (formData.password !== formData.checkPassword) {
// 			error = `пароли не совпадают`;
// 		}

// 		if (!/^[\w._@-]*$/.test(target.value)) {
// 			error = `Неверный ${target.name}. Допустимые символы: буквы, цифры, "@", "_", "-"`;
// 		}

// 		setInputError(error);
// 	};
// 	return (
// 		<div className={styles.app}>
// 			<form onSubmit={onSubmitButton} className={styles.inputArea}>
// 				<input
// 					required
// 					name="email"
// 					type="email"
// 					value={formData.email}
// 					placeholder="E-mail"
// 					onChange={onChangeTarget}
// 				/>
// 				<input
// 					name="password"
// 					type="text"
// 					value={formData.password}
// 					placeholder="Password"
// 					onChange={onChangeTarget}
// 				/>
// 				<input
// 					name="checkPassword"
// 					type="text"
// 					value={formData.checkPassword}
// 					placeholder="Conform Password"
// 					onChange={onChangeTarget}
// 				/>
// 				<button type="submit">Отправить</button>
// 				<button type="button">Reset</button>
// 			</form>
// 			{inputError && <div className={styles.errorLabel}>{inputError}</div>}
// 		</div>
// 	);
// };
