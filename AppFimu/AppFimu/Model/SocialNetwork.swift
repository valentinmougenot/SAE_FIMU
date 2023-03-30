//
//  SocialLink.swift
//  AppFimu
//
//  Created by valentin mougenot on 02/03/2023.
//

import Foundation

struct SocialNetwork: Identifiable, Hashable, Codable {
    var id: Int
    var libelle: String
    var possede: Get
}

struct Get: Hashable, Codable {
    var lien: String
}
