//
//  ConcertViewModel.swift
//  AppFimu
//
//  Created by user234247 on 3/14/23.
//

import Foundation
import SwiftUI

struct ConcertResponseModel: Decodable, Encodable {
    var error: Int
    var data: [Concert]
}

@MainActor
class ConcertViewModel: ObservableObject {

    @Published var concerts: [Concert] = []
    
    func getConcerts() async -> Void {
    
        var response: ConcertResponseModel
        
        do {
            response = try await BaseApi().sendRequest(url: BaseApi().searchUrl(by: "concert"), responseModel: ConcertResponseModel.self)
            concerts = response.data
        }
        catch {
            print("Error fetching data: \(error)")
        }
        
    }
}
