//
//  UsersViewModel.swift
//  Cartek+MVVM
//
//  Created by Avaneesh on 26/03/23.
//

import Foundation

final class UsersViewModel {

    var users: [User] = []
    var eventHandler: ((_ event: Event) -> Void)? // Data Binding Closure

    func fetchUsers() {
        self.eventHandler?(.loading)
        APIManager.shared.request(
            modelType: [User].self,
            type: ProductEndPoint.users) { response in
                self.eventHandler?(.stopLoading)
                switch response {
                case .success(let users):
                    self.users = users
                    self.eventHandler?(.dataLoaded)
                case .failure(let error):
                    self.eventHandler?(.error(error))
                }
            }
    }
}

extension UsersViewModel {

    enum Event {
        case loading
        case stopLoading
        case dataLoaded
        case error(Error?)
    }

}
