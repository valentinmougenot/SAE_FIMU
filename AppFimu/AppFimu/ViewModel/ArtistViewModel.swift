//
//  ArtistViewModel.swift
//  AppFimu
//
//  Created by valentin mougenot on 02/03/2023.
//

import Foundation
import SwiftUI

struct ArtistAdapter: Hashable, Codable, Identifiable {
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
}

struct ArtistResponseModel: Decodable, Encodable {
    var error: Int
    var data: [ArtistAdapter]
}

@MainActor
class ArtistViewModel: ObservableObject {

    @Published var artistes: [Artist] = []

    func getArtistes() async -> Void {
    
        var response: ArtistResponseModel
        
        do {
            response = try await BaseApi().sendRequest(url: BaseApi().searchUrl(by: "artiste"), responseModel: ArtistResponseModel.self)
            
            for artiste in response.data {
                artistes.append(Artist(id: artiste.id, nom: artiste.nom, photo: artiste.photo, biographie: artiste.biographie, lien_video: artiste.lien_video, lien_site: artiste.lien_site, categorie: artiste.categorie, genres: artiste.genres, pays: artiste.pays, reseauxSociauxes: artiste.reseauxSociauxes, concerts: artiste.concerts, isFavorite: false))
            }
        }
        catch {
            print("Error fetching data: \(error)")
        }
    }

}
