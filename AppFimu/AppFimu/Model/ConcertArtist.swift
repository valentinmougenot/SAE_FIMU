//
//  ConcertArtist.swift
//  AppFimu
//
//  Created by valentin mougenot on 23/03/2023.
//

import Foundation

struct ConcertArtist: Codable, Identifiable, Hashable{
    var id: Int
    var date_debut: String
    var heure_debut: String
    var heure_fin: String
    var duree: Int
    var nbPersonnes: Int?
    var scene: Scenes
}
