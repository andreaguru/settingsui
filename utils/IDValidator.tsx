import { customizeValidator } from "@rjsf/validator-ajv8";
import ajvErrors from "ajv-errors";

const validator = customizeValidator();
ajvErrors(validator.ajv);

export default validator;
