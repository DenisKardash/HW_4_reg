import { useRef, useState, useEffect } from 'react';
import { Field } from './components';
import {
	emailValidator,
	passwordMinValidator,
	passwordSymbolValidator,
} from './validators';
import styles from './app.module.css';

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [checkPassword, setCheckPassword] = useState('');

	// 'эти состояния храним тут (и потом передадим ниже)
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [isCheckPasswordValid, setIsCheckPasswordValid] = useState(false);

	const submitButtonRef = useRef(null); // ведет к нашему элементу. submitButtonRef.current

	const onSubmit = (event) => {
		event.preventDefault();
		console.log({ email, password });
	};

	const isFormValid = isEmailValid && isPasswordValid && isCheckPasswordValid;

	// для перемещения фокуса лучше всего использовать useEffect()
	useEffect(() => {
		if (isFormValid) {
			submitButtonRef.current.focus();
		}
	}, [isFormValid]);

	return (
		<>
			<div className={styles.app}>
				<label className={styles.info}>Registration Page</label>
				<form onSubmit={onSubmit} className={styles.inputArea}>
					<Field
						type="text"
						name="email"
						placeholder="E-mail..."
						value={email}
						setValue={setEmail}
						setIsValid={setIsEmailValid}
						validators={[emailValidator]}
					/>
					<Field
						type="password"
						name="password"
						placeholder="Password..."
						value={password}
						setValue={setPassword}
						setIsValid={setIsPasswordValid}
						validators={[passwordMinValidator, passwordSymbolValidator]}
					/>
					<Field
						type="password"
						name="checkPassword"
						placeholder="Check Password..."
						value={checkPassword}
						setValue={setCheckPassword}
						setIsValid={setIsCheckPasswordValid}
						validators={[
							(value) => (value === password ? null : 'Пароли  не  совпадают'),
						]}
						dependencies={{ password }}
						forceValidation={(value) =>
							value.length > 0 && value.length >= password.length
						}
					/>
					<button type="submit" disabled={!isFormValid} ref={submitButtonRef}>
						Регестрация
					</button>
				</form>
			</div>
		</>
	);
};
