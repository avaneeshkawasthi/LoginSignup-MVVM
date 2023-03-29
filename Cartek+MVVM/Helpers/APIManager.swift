//
//  APIManager.swift
//  Cartek+MVVM
//
//  Created by Avaneesh on 26/03/23.
//

import Foundation


// Singleton Design Pattern
enum DataError: Error {
    case invalidResponse
    case invalidURL
    case invalidData
    case network(Error?)
}


// typealias Handler = (Result<[Users], DataError>) -> Void
typealias Handler<T> = (Result<T, DataError>) -> Void

final class APIManager {

    static let shared = APIManager()
    private init() {}

    func request<T: Codable>(
        modelType: T.Type,
        type: EndPointType,
        completion: @escaping Handler<T>
    ) {
        guard let url = type.url else {
            completion(.failure(.invalidURL))
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = type.method.rawValue

        if let parameters = type.body {
            request.httpBody = try? JSONEncoder().encode(parameters)
        }

        request.allHTTPHeaderFields = type.headers

        // Background task
        URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data, error == nil else {
                completion(.failure(.invalidData))
                return
            }

            guard let response = response as? HTTPURLResponse,
                  200 ... 299 ~= response.statusCode else {
                completion(.failure(.invalidResponse))
                return
            }
            // JSONDecoder() - to chnage data in to model
            do {
                let products = try JSONDecoder().decode(modelType, from: data)
                completion(.success(products))
            }catch {
                completion(.failure(.network(error)))
            }

        }.resume()
    }


    static var commonHeaders: [String: String] {
        return [
            "Content-Type": "application/json"
        ]
    }
}
