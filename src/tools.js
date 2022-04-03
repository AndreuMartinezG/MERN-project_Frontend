export const checkError = (type, value) => {


    switch (type) {

        case 'email':

            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {

                return "Introduce a valid email";
            } else {
                return "ok";
            };


        case 'firstName':

            if (!/[a-z]/gi.test(value)) {
                return "Introduce a valid name";
            } else {
                return "ok";
            };

        case 'password':
            if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/.test(value)) {
                return "the password must contain At least 6 characters, one digit, one upper case and one special character";
            } else {
                return "ok";
            };

        case 'password2':
                if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/.test(value)) {
        
                return "the password must contain At least 6 characters and no more than 10, one digit and one lower case character"
            } else {
                return "ok";
            };
            
        case 'date':
                
            if (/^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/.test(value)) {
                return "the date is wrong"
            } else {
                return "ok";
            };

          


        case 'surname':

            if (!/[a-z]/gi.test(value)) {
                return "Introduce a valid surname";
            } else {
                return "ok";
            };

        case 'userName':

            if (!/[a-z]/g.test(value)) {
                return "Introduce a valid username";
            } else {
                return "ok";
            };

        case 'telefono':

            if (!/[\d()+-]/g.test(value)) {
                return "Introduce un telefono válido";
            } else {
                return "ok";
            };

        default:
            return "ok";


    }
};