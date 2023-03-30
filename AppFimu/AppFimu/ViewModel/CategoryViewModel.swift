//
//  CategorieViewModel.swift
//  AppFimu
//
//  Created by valentin mougenot on 24/03/2023.
//

import Foundation

struct CategoryResponseModel: Decodable, Encodable {
    var error: Int
    var data: [Category]
}

@MainActor
class CategoryViewModel: ObservableObject {

    @Published var categories: [Category] = []

    func getCategorie() async -> Void {
    
        var response: CategoryResponseModel
        do {
            response = try await BaseApi().sendRequest(url: BaseApi().searchUrl(by: "categorie"), responseModel: CategoryResponseModel.self)
            categories = response.data
        }
        catch {
            print("Error fetching data: \(error)")
        }
    }

}
