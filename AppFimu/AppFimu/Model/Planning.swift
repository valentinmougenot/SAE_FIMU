//
//  Planning.swift
//  AppFimu
//
//  Created by user234247 on 3/14/23.
//

import Foundation

struct Planning: Codable, Identifiable{
    
    var id = UUID()
    var scene: Scenes
    var dateDebut: String 
    var hStart: String
}
