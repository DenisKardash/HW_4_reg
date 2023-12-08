export const passwordMinValidator = (value) =>
	value.length >= 8 ? null : 'Не менее 8 символов';
