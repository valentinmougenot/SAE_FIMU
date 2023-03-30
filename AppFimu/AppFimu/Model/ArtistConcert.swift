//
//  ArtistConcert.swift
//  AppFimu
//
//  Created by valentin mougenot on 23/03/2023.
//

struct ArtistConcert: Hashable, Codable, Identifiable {
    var id: Int
    var nom: String
    var biographie: String
    var categorie: Category
    var genres: [Genre]
    var pays: [Country]
}
