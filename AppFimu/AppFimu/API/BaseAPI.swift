//
//  BaseAPI.swift
//  AppFimu
//
//  Created by valentin mougenot on 02/03/2023.
//

import Foundation

class BaseApi {
    let baseUrl = "http://localhost:3000"
    
    func searchUrl(by category: String) -> URL {    
        return URL(string: "\(baseUrl)/\(category)")!
    }
    
    func sendRequest<T: Codable>(url: URL, responseModel: T.Type, headers: [String: String] = [:]) async throws -> T {
        var request = URLRequest(url: url)
        headers.forEach { key, value in
            request.setValue(value, forHTTPHeaderField: key)
        }
        let (data, response) = try await URLSession.shared.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse, 200..<300 ~= httpResponse.statusCode else {
            throw APIError.invalidResponse
        }
        
        let decoder = JSONDecoder()
        let result = try decoder.decode(T.self, from: data)
        
        return result
    }
}

enum APIError: Error {
    case invalidResponse
}
