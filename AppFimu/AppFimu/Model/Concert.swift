//
//  Concert.swift
//  AppFimu
//
//  Created by valentin mougenot on 08/03/2023.
//

import Foundation

struct Concert: Codable, Identifiable, Hashable{
    var id: Int
    var date_debut: String
    var heure_debut: String
    var heure_fin: String
    var duree: Int
    var nbPersonnes: Int?
    var artiste: ArtistConcert
    var scene: Scenes
}
