let setInputError = null;

// export const onChangeTarget = ({ target }, emailRef, passwordRef, confirmPasswordRef ) => {

// 	updateState(target.name, target.value);

// 	let error = null;
// 	let setInputError = error;

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

export const onFieldBlur = (password) => {
	if (password.length < 8) {
		return setInputError(`Пароль не должен быть короче 8 символов`);
	}
};
