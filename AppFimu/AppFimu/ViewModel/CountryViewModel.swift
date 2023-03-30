//
//  PaysViewModel.swift
//  AppFimu
//
//  Created by valentin mougenot on 24/03/2023.
//

import Foundation

struct CountryResponseModel: Decodable, Encodable {
    var error: Int
    var data: [Country]
}

@MainActor
class CountryViewModel: ObservableObject {

    @Published var pays: [Country] = []

    func getPays() async -> Void {
    
        var response: CountryResponseModel
        do {
            response = try await BaseApi().sendRequest(url: BaseApi().searchUrl(by: "pays"), responseModel: CountryResponseModel.self)
            pays = response.data
        }
        catch {
            print("Error fetching data: \(error)")
        }
    }

}
