//
//  StandViewModel.swift
//  AppFimu
//
//  Created by valentin mougenot on 29/03/2023.
//

import Foundation
import SwiftUI

struct StandResponseModel: Codable {
    var error: Int
    var data: [Stand]
}

@MainActor
class StandViewModel: ObservableObject {
    
    @Published var stands: [Stand] = []
    
    func getStands() async -> Void {
        
        var response: StandResponseModel
        
        do {
            response = try await BaseApi().sendRequest(url: BaseApi().searchUrl(by: "stand"), responseModel: StandResponseModel.self)
            stands = response.data
            
        }
        catch {
            print("Error fetching data: \(error)")
        }
    }
}


