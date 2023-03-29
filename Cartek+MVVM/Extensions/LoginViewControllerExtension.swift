//
//  LoginViewControllerExtension.swift
//  Cartek+MVVM
//
//  Created by Avaneesh on 26/03/23.
//

import Foundation
import UIKit


extension LoginViewController : UITextFieldDelegate {
    
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
           usernameTextField.resignFirstResponder()
           passwordTextField.resignFirstResponder()
           return true
       }
       
       func textFieldDidBeginEditing(_ textField: UITextField) {
           loginErrorDescriptionLabel.isHidden = true
           usernameTextField.layer.borderWidth = 0
           passwordTextField.layer.borderWidth = 0
       }
       
       override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
           self.view.endEditing(true)
       }
    
}

extension LoginViewModel {
    enum CredentialsInputStatus {
        case Correct
        case Incorrect
    }
}
