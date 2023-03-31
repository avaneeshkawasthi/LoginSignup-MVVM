//
//  Constants.swift
//  Cartek+MVVM
//
//  Created by Avaneesh on 26/03/23.
//

import Foundation

enum Constant {
    enum API {
        static let usersURL = "https://jsonplaceholder.typicode.com/users."
    }
    
    enum TABLE {
        static let createTableString = "CREATE TABLE IF NOT EXISTS User(Id INTEGER PRIMARY KEY,username TEXT,password TEXT);"
        static let readAllDataQuery = "SELECT * FROM User;"
    }
    static let AlertTitle = "Error"
    static let errorMessage = "Username & password Error"
    static let noUserError = "No User Found"
}


