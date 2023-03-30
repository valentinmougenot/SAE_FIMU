//
//  DateViewModel.swift
//  AppFimu
//
//  Created by monnier david on 15/03/2023.
//

import Foundation
import SwiftUI

struct DateResponseModel: Decodable, Encodable {
    var error: Int
    var data: [DateAdapter]
}

struct DateAdapter: Codable, Hashable {
    var date_debut: String
}

@MainActor
class DateViewModel: ObservableObject {

    @Published var dates: [Date] = []

    func getDates() async -> Void {
    
        var response: DateResponseModel
        do {
            response = try await BaseApi().sendRequest(url: BaseApi().searchUrl(by: "concert/date"), responseModel: DateResponseModel.self)
            var i = 1
            for date in response.data {
                dates.append(Date(id: i, date_debut: date.date_debut))
                i += 1
            }
        }
        catch {
            print("Error fetching data: \(error)")
        }
    }

}



