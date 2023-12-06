export const onFieldBlur = ({ password, setInputError }) => {
	if (password.length < 8) {
		setInputError(`Пароль не должен быть короче 8 символов`);
	}
};
