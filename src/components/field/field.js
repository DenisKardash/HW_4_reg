import { useEffect, useState } from 'react';
import { validate } from './utils';

import styles from './field.module.css';

export const Field = ({
	value,
	setValue,
	setIsValid,
	validators,
	dependencies = {},
	forceValidation = () => false, // принудительная валидация (для проверки пароля)
	// не флаг а (colback), потому что условие придется задавать на верху
	...props
}) => {
	const [error, setError] = useState(null); // за пределы поля выходить не будет поэтому тут
	const [isDirty, setIsDirty] = useState(); // грязное поле (уже заполнялось)

	const validateField = (currentValue, shouldValidate) => {
		let error = null;
		let isValid = false;

		if (shouldValidate) {
			error = validate(currentValue, validators);
			isValid = error === null;
		}

		setError(error);
		setIsValid(isValid);
	};

	useEffect(() => {
		validateField(value, isDirty);
	}, [...Object.values(dependencies)])

	const onChange = ({ target }) => {
		setIsDirty(true);
		setValue(target.value);

		const isForceValidated = forceValidation(target.value); // свеже введенное значение (а value это из предыдущего рендера)

		validateField(target.value, isForceValidated);
	};

	const onBlur = () => {
		validateField(value, isDirty);
	};

	return (
		<div>
			<input onChange={onChange} onBlur={onBlur} {...props} />
			{error && <span className={styles.errorLabel}>{error}</span>}
		</div>
	);
};
