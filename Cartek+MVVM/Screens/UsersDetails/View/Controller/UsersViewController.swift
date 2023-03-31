//
//  UsersViewController.swift
//  Cartek+MVVM
//
//  Created by Avaneesh on 26/03/23.
//

import UIKit

class UsersViewController: UIViewController {

    // MARK: - Outlets
    @IBOutlet weak var usersTableView: UITableView!

    // MARK: - Variables
    var viewModel = UsersViewModel()

    override func viewDidLoad() {
        super.viewDidLoad()
        self.configuration()
    }

    @IBAction func LogOutAction(_ sender: UIBarButtonItem) {
        let storyBoard = UIStoryboard(name: "Main", bundle:nil)
        let loginVC = storyBoard.instantiateViewController(withIdentifier: "LoginViewController") as! LoginViewController
        let loginManager = LoginManager.shared
        let databaseManager = DatabaseManager.shared
        let loginViewModel = LoginViewModel(loginManager: loginManager , databseManager: databaseManager)
        loginVC.loginViewModel = loginViewModel
        UIApplication.shared.windows.first?.rootViewController = loginVC
        UIApplication.shared.windows.first?.makeKeyAndVisible()
    }
}
