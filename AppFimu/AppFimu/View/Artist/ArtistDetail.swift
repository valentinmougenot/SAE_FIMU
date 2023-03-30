//
//  ArtistDetail.swift
//  AppFimu
//
//  Created by valentin mougenot on 19/01/2023.
//

import SwiftUI

struct ArtistDetail: View {
    
    @EnvironmentObject var data: ArtistViewModel
    var artist: Artist
    
    var artistIndex: Int {
        data.artistes.firstIndex(where: { $0.id == artist.id })!
    }
    
    var body: some View {
        ScrollView {
            artist.image
            VStack(alignment: .leading) {
                HStack {
                    Text(artist.nom)
                        .font(.title)
                        .bold()
                    Spacer()
                    FavoriteButton(isSet: $data.artistes[artistIndex].isFavorite)
                }
                .padding(.bottom, 10)
                Text(artist.categorie.libelle)
                Text(artist.genres.map {$0.libelle}
                    .joined(separator: ", "))
                Text(artist.pays.map {$0.libelle}
                    .joined(separator: ", "))
                    .font(.system(size: 16, weight: .bold))
                    .padding(.top, 4)
                Divider()
                Text(artist.biographie)
            }
            .padding()
            
            Divider()
            
            VStack {
                HStack {
                    Spacer()
                    ForEach(artist.reseauxSociauxes) { rs in
                        Image(rs.libelle)
                            .resizable()
                            .scaledToFill()
                            .frame(width: 30, height: 30)
                            .onTapGesture {
                                guard let url = URL(string: rs.possede.lien) else { return }
                                UIApplication.shared.open(url)
                            }
                        Spacer()
                    }
                    Image("Youtube")
                        .resizable()
                        .scaledToFill()
                        .frame(width: 30, height: 30)
                        .onTapGesture {
                            guard let url = URL(string: artist.lien_video) else { return }
                            UIApplication.shared.open(url)
                        }
                    Spacer()
                }
                Text("Programme")
                    .font(.system(size: 24, weight: .bold))
                    .padding()
                
                HStack {
                    Spacer()
                    ForEach(artist.concerts) { concert in
                        VStack {
                            Text(concert.date_debut)
                                .font(.system(size: 16, weight: .bold))
                            Text(concert.heure_debut.prefix(5) + " - " + concert.heure_fin.prefix(5))
                            Text(concert.scene.libelle)
                        }
                        Spacer()
                    }
                }
            }
            .padding()
        }
        .navigationTitle(artist.nom)
        .navigationBarTitleDisplayMode(.inline)
    }
}

//struct ArtistDetail_Previews: PreviewProvider {
//    static var previews: some View {
//        ArtistDetail(artist: ModelData().artists[0])
//            .environmentObject(ArtistViewModel())
//    }
//}
