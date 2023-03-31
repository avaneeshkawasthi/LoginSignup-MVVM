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
    
    func loginWithCredentials(username: String, password: String , success : (Bool) -> Void , Failure : (String) -> Void) {
        guard let allUsers = DatabaseManager.shared.read() as? [Credentials] else { Failure(Constant.noUserError); return }
        for user in allUsers {
            if (user.username == username) && (user.password == password) {
                 success(true)
            }
            else {
                Failure(Constant.errorMessage)
            }
        }
    }
}
