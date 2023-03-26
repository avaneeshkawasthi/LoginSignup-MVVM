//
//  UsersModle.swift
//  Cartek+MVVM
//
//  Created by Avaneesh on 26/03/23.
//

import Foundation

//
//  Product.swift
//  Youtube MVVM Products
//
//  Created by Yogesh Patel on 23/12/22.
//

import Foundation

struct User: Codable {
    let id: Int
    let name: String
    let username: Double
    let email: String
    let address: String
    let image: String
    let address: Address
    let phone : String
    let website : String
    let company : Company
}

struct Address: Codable {
    let street: String
    let suite: String
    let city : String
    let zipCode : String
    let geo : Geo
}

struct Geo : Codable {
    let lat: Double
    let long: Double
}

struct Company {
    let name : String
    let catchPhrase : String
    let bs : String
}


