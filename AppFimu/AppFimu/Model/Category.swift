//
//  Category.swift
//  AppFimu
//
//  Created by valentin mougenot on 02/03/2023.
//

import Foundation

struct Category: Identifiable, Hashable, Codable {
    var id: Int
    var libelle: String
    var couleur: String
}
