export interface ValueContainer<T> {
  [key: string]: T | undefined;
}

type ErrorContainer = ValueContainer<string>;
type DataFromForm = ErrorContainer;

const mapLogin: DataFromForm = {
  name: "name",
  email: "email",
};

const mapReg: DataFromForm = {
  name: "name",
  email: "email",
  password: "password",
};

const errorMapFrom: ErrorContainer = {
  name: "ErrorMessage",
  email: "ErrorMessage",
  password: "ErrorMessage",
};

function validate<T extends ErrorContainer>(content: T): ErrorContainer {
  if (content.name === "") {
    errorMapFrom.name = "NEW ERROR";
  }
  if (content.password === "") {
    errorMapFrom.password = "NEW ERROR";
  }

  if (content.email?.length === 0) {
    errorMapFrom.email = "NEW ERROR";
  }
  return errorMapFrom;
}

validate<ErrorContainer>(mapLogin);
validate<ErrorContainer>(mapReg);


