//
//  SceneViewModel.swift
//  AppFimu
//
//  Created by user235496 on 3/7/23.
//

import Foundation

struct SceneResponseModel: Codable {
    var error: Int
    var data: [Scenes]
}

@MainActor
class SceneViewModel: ObservableObject {
    @Published var scenes: [Scenes] = []
    
    func getScenes() async -> Void {
        var response: SceneResponseModel
        
        do {
            response = try await BaseApi().sendRequest(url: BaseApi().searchUrl(by: "scene"), responseModel: SceneResponseModel.self)
            
            scenes = response.data
        }
        catch {
            print("Error fetching data: \(error)")
        }
        
    }
}
