//
//  ProductEndPointType.swift
//  Cartek+MVVM
//
//  Created by Avaneesh on 26/03/23.
//

import Foundation

enum ProductEndPoint {
    case users // Module - GET
}


//https://jsonplaceholder.typicode.com/users.

extension ProductEndPoint: EndPointType {

    var path: String {
        switch self {
        case .users:
            return "users"
        }
    }

    var baseURL: String {
        switch self {
        case .users:
            return "https://jsonplaceholder.typicode.com/"
        }
    }

    var url: URL? {
        return URL(string: "\(baseURL)\(path)")
    }

    var method: HTTPMethods {
        switch self {
        case .users:
            return .get
        }
    }

    var body: Encodable? {
        switch self {
        case .users:
            return nil
       }
    }

    var headers: [String : String]? {
        APIManager.commonHeaders
    }
}
