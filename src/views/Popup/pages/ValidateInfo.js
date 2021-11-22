export default function ValidateInfo(values) {
  let errors = {};
  let ok = false;
  if (!values.password) {
    errors.password = "*password required";
  } else if (values.password.length < 8) {
    errors.password = "*password need to be 8 character or more";
    ok = false;
  }
  if (!values.password2) {
    errors.password2 = "password required";
    ok = false;
  } else if (values.password2 !== values.password) {
    errors.password2 = "*password donot match";
    ok = false;
  } else {
    ok = true;
  }

  console.log(errors);

  return { errors, ok };
}
