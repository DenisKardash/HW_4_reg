// export const onChangeTarget = ({
// 	target,
// 	updateState,
// 	emailRef,
// 	passwordRef,
// 	confirmPasswordRef,
// 	setInputError,
// }) => {
// 	updateState(target.name, target.value);

// 	let error = null;

// 	if (!/^[\w._@-]*$/.test(target.value)) {
// 		error = `Неверный ${target.name}. Допустимые символы: буквы, цифры, "@", "_", "-"`;
// 	}

// 	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRef.current.value)) {
// 		error = 'поле E-mail не соответствует E-mail адресу ';
// 	}

// 	if (passwordRef.current.value !== confirmPasswordRef.current.value) {
// 		error = `пароли не совпадают`;
// 	}

// 	setInputError(error);
// };

export const onFieldBlur = ({ password, setInputError }) => {
	if (password.length < 8) {
		setInputError(`Пароль не должен быть короче 8 символов`);
	}
};
