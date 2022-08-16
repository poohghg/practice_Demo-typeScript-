interface Validatable {
  value: string | number | boolean;
  required?: boolean;
  minLen?: number;
  maxLen?: number;
  min?: number;
  max?: number;
}

enum ValidInput {
  "value",
  "minLen",
  "maxLen",
  "min",
  "max",
}

export function validationInput(validObj: Validatable) {
  let isValid = true;
  if (validObj.required) {
    isValid = validObj.value.toString().trim().length !== 0;
    if (!isValid) return ValidInput.value;
  }
  if (validObj.minLen && typeof validObj.value === "string") {
    isValid = validObj.value.toString().trim().length >= validObj.minLen;
    if (!isValid) return ValidInput.minLen;
  }
  if (validObj.maxLen && typeof validObj.value === "string") {
    isValid = validObj.value.toString().trim().length <= validObj.maxLen;
    if (!isValid) return ValidInput.maxLen;
  }
  if (validObj.min && typeof validObj.value === "number") {
    isValid = validObj.value >= validObj.min;
    if (!isValid) return ValidInput.min;
  }
  if (validObj.max && typeof validObj.value === "number") {
    isValid = validObj.value <= validObj.max;
    if (!isValid) return ValidInput.max;
  }
  return isValid;
}
