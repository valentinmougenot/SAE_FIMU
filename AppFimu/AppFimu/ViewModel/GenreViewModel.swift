//
//  GenreViewModel.swift
//  AppFimu
//
//  Created by valentin mougenot on 24/03/2023.
//

import Foundation

struct GenreResponseModel: Decodable, Encodable {
    var error: Int
    var data: [Genre]
}

@MainActor
class GenreViewModel: ObservableObject {

    @Published var genres: [Genre] = []

    func getGenre() async -> Void {
    
        var response: GenreResponseModel
        do {
            response = try await BaseApi().sendRequest(url: BaseApi().searchUrl(by: "genre"), responseModel: GenreResponseModel.self)
            genres = response.data
        }
        catch {
            print("Error fetching data: \(error)")
        }
    }

}
