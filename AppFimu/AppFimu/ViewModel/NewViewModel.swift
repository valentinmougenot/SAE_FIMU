//
//  NewViewModel.swift
//  AppFimu
//
//  Created by user235496 on 3/6/23.
//

import Foundation

struct NewResponseModel: Decodable, Encodable {
    var error: Int
    var data: [News]
}

@MainActor
class NewViewModel: ObservableObject {
    @Published var news: [News] = []
    
    
    func getNews() async -> Void {
        var response: NewResponseModel
        
        do {
            response = try await BaseApi().sendRequest(url: BaseApi().searchUrl(by: "actualite"), responseModel: NewResponseModel.self)
            
            news = response.data
        }
        catch {
            print("Error fetching data: \(error)")
        }
        
    }
}
