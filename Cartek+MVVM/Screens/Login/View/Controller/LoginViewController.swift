//
//  LoginViewController.swift
//  Cartek+MVVM
//
//  Created by Avaneesh on 26/03/23.
//

import UIKit
import CountryPickerView

class LoginViewController: UIViewController {

    
       // MARK: - Stored Properties
        var loginViewModel: LoginViewModel!
        var pickerView : CountryPickerView!
     
       //MARK: - IBOutlets
    
       @IBOutlet weak var countryTextField: UITextField!
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
           setupCountryPicker()
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
    
    @IBAction func selectCountryPressed(_ sender: UIButton) {
        self.pickerView.showCountriesList(from: self)
    }
    
    func bindData() {
            loginViewModel.credentialsInputErrorMessage.bind { [weak self] in
                self?.loginErrorDescriptionLabel.isHidden = false
                self?.loginErrorDescriptionLabel.text = $0
            }
            
            loginViewModel.isUsernameTextFieldHighLighted.bind { [weak self] in
                if $0 { self?.highlightTextField((self?.usernameTextField)!)}
            }
            
            loginViewModel.isPasswordTextFieldHighLighted.bind { [weak self] in
                if $0 { self?.highlightTextField((self?.passwordTextField)!)}
            }
            
            loginViewModel.errorMessage.bind { [weak self] in
                guard let errorMessage = $0 else { return }
                self?.presentAlertWithTitleAndMessage(title: Constant.AlertTitle, message: errorMessage, options: "Ok") { index in
                }
            }
        }
    
    func setupCountryPicker() {
        pickerView = CountryPickerView(frame:CGRect(origin: self.view.frame.origin, size: self.view.frame.size))
        pickerView.delegate = self
    }
       
       func login() {
           loginViewModel.login { isSuccess, error in
               if isSuccess {
                   let story = UIStoryboard(name: "Main", bundle:nil)
                   let vc = story.instantiateViewController(withIdentifier: "UsersViewController") as! UsersViewController
                   UIApplication.shared.windows.first?.rootViewController = vc
                   UIApplication.shared.windows.first?.makeKeyAndVisible()
               }
               else {
                   presentAlertWithTitleAndMessage(title: Constant.AlertTitle, message: error, options: "Ok") { index in
                   }
               }
           }
       }
}
