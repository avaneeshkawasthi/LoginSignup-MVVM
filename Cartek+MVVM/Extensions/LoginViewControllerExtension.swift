//
//  LoginViewControllerExtension.swift
//  Cartek+MVVM
//
//  Created by Avaneesh on 26/03/23.
//

import Foundation
import UIKit
import CountryPickerView


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
    
       func highlightTextField(_ textField: UITextField) {
            textField.resignFirstResponder()
            textField.layer.borderWidth = 1.0
            textField.layer.borderColor = UIColor.red.cgColor
            textField.layer.cornerRadius = 3
        }
}

extension LoginViewController : CountryPickerViewDelegate {
    
    func countryPickerView(_ countryPickerView: CountryPickerView, didSelectCountry country: Country) {
        // Only countryPickerInternal has it's delegate set
        countryTextField.text = country.name
        let countryImage = UIImageView(frame: CGRect(x: 0, y: 0, width: 20, height: 20))
        countryImage.image = country.flag
        countryTextField.leftView = countryImage
        countryTextField.leftViewMode = .always
    }
    
}

extension LoginViewModel {
    enum CredentialsInputStatus {
        case Correct
        case Incorrect
    }
}
