import { AbstractControl, ValidatorFn } from '@angular/forms';
import { DateModel } from '../../timing/models/date.model';
import { DateUtility } from '../../timing/utility/date.utility';

export class DateValidators {
	public static isDate = (control: AbstractControl) => {
		if (control.value && !new DateModel(control.value).date.isValid()) {
			return { notDate: control.value };
		} else {
			return;
		}
	};

	public static mustBeLessThan(otherFormControl: AbstractControl | DateModel): ValidatorFn {
		return (control: AbstractControl) => {
			if (!control || !otherFormControl || !control.value) {
				return;
			}

			const currentField = new DateModel(control.value);
			let otherField;
			if (otherFormControl instanceof DateModel) {
				otherField = otherFormControl;
			} else {
				otherField = new DateModel(otherFormControl.value);
			}

			if (currentField && otherField) {
				if (currentField.date && otherField.date) {
					if (currentField.date.isSameOrAfter(otherField.date)) {
						return {
							notLessThan: true,
						};
					}
				}
			}

			return null;
		};
	}

	public static mustBeLessOrEqualThan(otherFormControl: AbstractControl | DateModel): ValidatorFn {
		return (control: AbstractControl) => {
			if (!control || !otherFormControl || !control.value) {
				return;
			}

			const currentField = new DateModel(control.value);
			let otherField;
			if (otherFormControl instanceof DateModel) {
				otherField = otherFormControl;
			} else {
				otherField = new DateModel(otherFormControl.value);
			}

			if (currentField && otherField) {
				if (currentField.date && otherField.date) {
					if (currentField.date.isAfter(otherField.date)) {
						return {
							notLessOrEqualThan: true,
						};
					}
				}
			}

			return null;
		};
	}

	public static mustBeLessThanCurrent = (control: AbstractControl) => {
		if (!control || !control.value) {
			return;
		}

		const controlDate = new DateModel(control.value);
		const today = DateUtility.TODAY();

		if (controlDate && controlDate.date) {
			if (controlDate.date.isSameOrAfter(today.date)) {
				return {
					notLessThanCurrent: true,
				};
			}
		}

		return null;
	};

	public static mustBeLessOrEqualThanCurrent = (control: AbstractControl) => {
		if (!control || !control.value) {
			return;
		}

		const controlDate = new DateModel(control.value);
		const today = DateUtility.TODAY();

		if (controlDate && controlDate.date) {
			if (controlDate.date.isAfter(today.date)) {
				return {
					notLessOrEqualThanCurrent: true,
				};
			}
		}

		return null;
	};

	// greater
	public static mustBeGreaterThan(otherFormControl: AbstractControl | DateModel): ValidatorFn {
		return (control: AbstractControl) => {
			if (!control || !otherFormControl || !control.value) {
				return;
			}

			const currentField = new DateModel(control.value);
			let otherField;
			if (otherFormControl instanceof DateModel) {
				otherField = otherFormControl;
			} else {
				otherField = new DateModel(otherFormControl.value);
			}

			if (currentField && otherField) {
				if (currentField.date && otherField.date) {
					if (currentField.date.isSameOrBefore(otherField.date)) {
						return {
							notGreaterThan: true,
						};
					}
				}
			}

			return null;
		};
	}

	public static mustBeGreaterOrEqualThan(
		otherFormControl: AbstractControl | DateModel,
	): ValidatorFn {
		return (control: AbstractControl) => {
			if (!control || !otherFormControl || !control.value) {
				return;
			}

			const currentField = new DateModel(control.value);
			let otherField;
			if (otherFormControl instanceof DateModel) {
				otherField = otherFormControl;
			} else {
				otherField = new DateModel(otherFormControl.value);
			}

			if (currentField && otherField) {
				if (currentField.date && otherField.date) {
					if (currentField.date.isBefore(otherField.date)) {
						return {
							notGreaterOrEqualThan: true,
						};
					}
				}
			}

			return null;
		};
	}

	public static mustBeGreaterThanCurrent = (control: AbstractControl) => {
		if (!control || !control.value) {
			return;
		}

		const controlDate = new DateModel(control.value);
		const today = DateUtility.TODAY();

		if (controlDate && controlDate.date) {
			if (controlDate.date.isSameOrBefore(today.date)) {
				return {
					notGreaterThanCurrent: true,
				};
			}
		}

		return null;
	};

	public static mustBeGreaterOrEqualThanCurrent = (control: AbstractControl) => {
		if (!control || !control.value) {
			return;
		}

		const controlDate = new DateModel(control.value);
		const today = DateUtility.TODAY();

		if (controlDate && controlDate.date) {
			if (controlDate.date.isBefore(today.date)) {
				return {
					notGreaterOrEqualThanCurrent: true,
				};
			}
		}

		return null;
	};
}
