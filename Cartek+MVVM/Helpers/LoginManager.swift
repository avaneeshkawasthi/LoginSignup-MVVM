//
//  LoginManager.swift
//  Cartek+MVVM
//
//  Created by Avaneesh on 26/03/23.
//

import Foundation

class LoginManager {
    
    static let shared = LoginManager()
    private init() {}
    
    func loginWithCredentials(username: String, password: String , success : (Bool) -> Void , Failure : (Error) -> Void) {
        
        
    }
}
