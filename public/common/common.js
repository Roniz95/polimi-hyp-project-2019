//collection of useful methods


module.exports = {
    error: function (errorType, parameter) {
        let description;

        switch (errorType) {
            case 'badParameter':
                description = 'bad parameter value for ' + parameter + ' in url';
                break;
            case 'badQuery':
                description = 'bad query parameter value for ' + parameter + ' in url';
                break;
            case 'serverError':
                description = 'internal server error';
                break;
            case 'noExist':
                description = 'the resource does not exist, url: ' + parameter;
                break;
            case 'forbidden':
                description = 'forbidden access to the resource';
            case 'alreadyRegistered':
                description = 'the user with email: ' + parameter + ' is already registered';
                break;
        }
        return {'error': description}

    },

    isParamValid: function (param, value) {
        var hasNumber = /\d/; //check if a string contain at least a number
        var isNum = /^\d+$/;
        //check if a string is a number, string like '-1234' are false
        if (typeof param == "undefined") return false;

        switch (param) {
            case 'isNewRelease':
            case 'isClassic':
            case 'isBestSeller':
            case 'isRecommended':
                return (value == "true" || value == "false");
            case 'isbn':
                return (value.length === 13 && isNum.test(value));
            case 'lettersString':
                return (!hasNumber.test(value) && value.length <= 255);
            case 'id':
                return (isNum.test(value) && parseInt(value) < 2147483647);
            case 'alphanumString':
                return (value.length <= 255)


        }


        return false
    }


};