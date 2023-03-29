//
//  LoginViewController.swift
//  Cartek+MVVM
//
//  Created by Avaneesh on 26/03/23.
//

import UIKit

class LoginViewController: UIViewController {

    
    // MARK: - Stored Properties
        var loginViewModel: LoginViewModel!
     
       //MARK: - IBOutlets
       @IBOutlet weak var usernameTextField: UITextField!
       @IBOutlet weak var passwordTextField: UITextField!
       @IBOutlet weak var loginErrorDescriptionLabel: UILabel!
       @IBOutlet weak var loginButton: UIButton!
       
       
       //MARK: - ViewController lifecycle
       override func viewDidLoad() {
           super.viewDidLoad()
           usernameTextField.delegate = self
           passwordTextField.delegate = self
           loginButton.layer.cornerRadius = 5
           bindData()
       }
       
       
    //MARK: - IBActions
       @IBAction func loginButtonPressed(_ sender: UIButton) {
           //Here we ask viewModel to update model with existing credentials from text fields
           loginViewModel.updateCredentials(username: usernameTextField.text!, password: passwordTextField.text!)
           
           //Here we check user's credentials input - if it's correct we call login()
           switch loginViewModel.credentialsInput() {
           case .Correct:
               login()
           case .Incorrect:
               return
           }
       }
    
      func bindData() {
            loginViewModel.credentialsInputErrorMessage.bind { [weak self] in
                self?.loginErrorDescriptionLabel.isHidden = false
                self?.loginErrorDescriptionLabel.text = $0
            }
            loginViewModel.errorMessage.bind {
                guard let errorMessage = $0 else { return }
                let alert = UIAlertController(title: "", message: errorMessage, preferredStyle: .alert)
                let alertAction = UIAlertAction(title: "Ok", style: .cancel)
                alert.addAction(alertAction)
                self.present(alert, animated: true)
            }
        }
       
       func login() {
           loginViewModel.login()
       }
       
}
