//
//  LoginViewModel.swift
//  Cartek+MVVM
//
//  Created by Avaneesh on 26/03/23.
//

import Foundation


class LoginViewModel {
    
    // MARK: - Stored Properties
    private let loginManager: LoginManager!
    private let databaseManager : DatabaseManager!
    
    //Here our model notify that was updated
    private var credentials = Credentials() {
        didSet {
            username = credentials.username
            password = credentials.password
        }
    }
    
    private var username = ""
    private var password = ""
    
    var credentialsInputErrorMessage: Observable<String> = Observable("")
    var isUsernameTextFieldHighLighted: Observable<Bool> = Observable(false)
    var isPasswordTextFieldHighLighted: Observable<Bool> = Observable(false)
    var errorMessage: Observable<String?> = Observable(nil)
    
    
    init(loginManager: LoginManager , databseManager : DatabaseManager) {
        self.loginManager = loginManager
        self.databaseManager = databseManager
    }
    
    //Here we update our model
    func updateCredentials(username: String, password: String, otp: String? = nil) {
        credentials.username = username
        credentials.password = password
    }
    
    func login(_ Handler: (Bool,String) -> Void ) {
        loginManager.loginWithCredentials(username: credentials.username, password: credentials.password) { isLoginSuccess in
            if (isLoginSuccess) {
                //make the home controller root view controller and give option for logout
                Handler(true,"")
            }
        } Failure: { (error) in
             guard let error = error as? String else {
                 return
             }
             Handler(false,error)
        }
    }
    
    
    func credentialsInput() -> CredentialsInputStatus {
        if username.isEmpty && password.isEmpty {
            credentialsInputErrorMessage.value = "Please provide username and password."
            return .Incorrect
        }
        if username.isEmpty {
            credentialsInputErrorMessage.value = "Username field is empty."
            isUsernameTextFieldHighLighted.value = true
            return .Incorrect
        }
        if password.isEmpty {
            credentialsInputErrorMessage.value = "Password field is empty."
            isPasswordTextFieldHighLighted.value = true
            return .Incorrect
        }
        return .Correct
    }
}
