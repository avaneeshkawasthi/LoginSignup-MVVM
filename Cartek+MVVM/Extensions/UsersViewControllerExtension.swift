//
//  UserViewControllerExtension.swift
//  Cartek+MVVM
//
//  Created by Avaneesh Kumar on 31/03/23.
//

import Foundation
import UIKit

extension UsersViewController {

    func configuration() {
        usersTableView.register(UINib(nibName: "UserTableViewCell", bundle: nil), forCellReuseIdentifier: "UserTableViewCell")
        initViewModel()
        observeEvent()
    }

    func initViewModel() {
        viewModel.fetchUsers()
    }
    
    func observeEvent() {
        viewModel.eventHandler = { [weak self] event in
            guard let self = self else { return }
            switch event {
            case .dataLoaded:
                print("User Data loaded...")
                DispatchQueue.main.async {
                    // UI Main works well
                    self.usersTableView.reloadData()
                }
            case .error(let error):
                print(error)
            case .loading:
                break
                //loading
            case .stopLoading:
                break
                // stop loader
            }
        }
    }

}

extension UsersViewController: UITableViewDataSource {

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        viewModel.users.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "UserTableViewCell") as? UserTableViewCell else {
            return UITableViewCell()
        }
        let user = viewModel.users[indexPath.row]
        cell.user = user
        return cell
    }
}
