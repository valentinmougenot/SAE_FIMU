//
//  Date.swift
//  AppFimu
//
//  Created by monnier david on 15/03/2023.
//

import Foundation

struct Date: Codable, Identifiable, Hashable {
    var id: Int
    var date_debut: String
    
    init(id: Int, date_debut: String) {
        self.id = id
        self.date_debut = date_debut
    }
}
