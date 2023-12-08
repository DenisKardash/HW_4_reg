export const passwordSymbolValidator = (value) =>
	/^\S+$/.test(value) &&
	/[a-zA-z]+/.test(value) &&
	/[0-9]+/.test(value) &&
	/\w+/.test(value)
		? null
		: 'Буквы цифры и символы';

// \S+  - не пробел, больше одного
