export const validate = (type: string, value: string) => {
    switch (type) {
      case "userName":
      case "name":
      case "firstName":
        if (value.length < 3 || value === "") {
          return "El nombre debe tener mínimo tres carácteres.";
        }
        return "";

      case "lastName":
      case "secondLastName":
        if (value.length < 3 || value === "") {
          return "El apellido debe tener mínimo tres carácteres.";
        }
        return "";

      case "email":
      case "e-mail":
      case "correo":
      case "mail":
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
        if (!emailRegex.test(value)) {
          return "El formato del email debe ser correcto.";
        }
        return "";
  
      case "password":
      case "newPass":
      case "repeatPass":
      case "currentPass":
      case "contraseña":
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,14}$/;
        if (!passwordRegex.test(value)) {
          return "Entre 6/14 carácteres (simbolo, mayús y minús)";
        }
        return "";

      case "phone":
        const phoneRegex = /(6|7)[ -]*([0-9][ -]*){8}/;
        if (!phoneRegex.test(value) || value.length !== 9) {
          return "El teléfono no es válido";
        }
        return "";

      case "address":
        if (value.length < 5) {
          return "La dirección debe tener mínimo cinco carácteres.";
        }
        return "";

      default:
        console.log("You wanted to validate a field that is not implemented.");
    }
  };