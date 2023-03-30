//
//  Artist.swift
//  AppFimu
//
//  Created by valentin mougenot on 19/01/2023.
//

import Foundation
import SwiftUI

struct Artist: Hashable, Codable, Identifiable {
    
    var id: Int
    var nom: String
    var photo: String
    var biographie: String
    var lien_video: String
    var lien_site: String
    var categorie: Category
    var genres: [Genre]
    var pays: [Country]
    var reseauxSociauxes: [SocialNetwork]
    var concerts: [ConcertArtist]
    var isFavorite: Bool
    
    init(id: Int, nom: String, photo: String, biographie: String, lien_video: String, lien_site: String, categorie: Category, genres: [Genre], pays: [Country], reseauxSociauxes: [SocialNetwork], concerts: [ConcertArtist], isFavorite: Bool) {
        self.id = id
        self.nom = nom
        self.photo = photo
        self.biographie = biographie
        self.lien_video = lien_video
        self.lien_site = lien_site
        self.categorie = categorie
        self.genres = genres
        self.pays = pays
        self.reseauxSociauxes = reseauxSociauxes
        self.concerts = concerts
        self.isFavorite = isFavorite
    }
    
    var imageIcon: AnyView {
        AnyView(
            AsyncImage(url: URL(string: photo)) { image in
                       image
                        .resizable()
                        .scaledToFill()
                           
                   } placeholder: {
                       Color.gray
                   }
                   .frame(width: 80, height: 80)
                   .clipped()
        )
    }
    
    var image: AnyView {
        AnyView(
            AsyncImage(url: URL(string: photo)) { image in
                       image
                        .resizable()
                        .scaledToFit()
                           
                   } placeholder: {
                       Color.gray
                   }
        )
    }
}
