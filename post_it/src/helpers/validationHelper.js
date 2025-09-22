

// %%%%%%%%%%%%%% VALIDATE TEXT %%%%%%%%%%%%%
export function validateText(text, regex = null){

  if (!regex) regex = /^(?=.*[\p{L}\p{N}])[\p{L}\p{N}\s'’"\-.,!?]{3,50}$/u;

  const regexValidator = RegExp(regex);
  return regexValidator.exec(text) ? true : false;
}
// %%%%%%%%%%%%%% END - VALIDATE TEXT %%%%%%%%%%%%%




// %%%%%%%%%%%%%% VALIDATE NUMBER %%%%%%%%%%%%%
export function validateNumber(number, regex = null){


  if (!regex) regex = /^[0-9.]+$/u;

  const regexValidator = RegExp(regex);
  return regexValidator.exec(number) ? true : false;
}
// %%%%%%%%%%%%%% END - VALIDATE NUMBER %%%%%%%%%%%%%
