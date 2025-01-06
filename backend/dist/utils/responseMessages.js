"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseMessages = {
    success: 'Success',
    created: 'Created',
    updated: 'Updated',
    noContent: 'No Content',
    badRequest: 'Bad request',
    unauthorized: 'Unauthorized',
    forbidden: 'Forbidden',
    notFound: 'Not Found',
    conflict: 'Conflict',
    internalServerError: 'Internal Server Error',
    incorrectPassword: 'Incorrect Password',
    invalidStartDate: 'Enter valid start date',
    invalidEndDate: 'Enter valid end date',
    exists: 'Already exists',
    notExist: "Doesn't exist",
    notExcelFile: 'Please upload an excel file',
    incompleteFields: 'Please fill all the fields',
    notBothDates: 'You need to enter both dates i.e startDate and endDate',
    noToken: 'No token provided',
    invalidToken: 'Invalid token',
    authorizationError: 'Authorization Error',
};
exports.default = responseMessages;
