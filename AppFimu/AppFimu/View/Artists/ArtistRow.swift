//
//  ArtistRow.swift
//  AppFimu
//
//  Created by valentin mougenot on 19/01/2023.
//

import SwiftUI

struct ArtistRow: View {
    var artist: Artist
    
    var body: some View {
        HStack {
            artist.imageIcon
            
            HStack {
                VStack(alignment: .leading) {
                    Text(artist.nom)
                        .font(.title2)
                        .foregroundColor(Color(hex: artist.categorie.couleur))
                        .bold()
                        .padding(.bottom, 5)
                    
                    Text(artist.categorie.libelle)
                    
                    Text(artist.pays.map {$0.libelle}
                        .joined(separator: ", "))
                }
                .padding(.leading)
                
                Spacer()
                
                if artist.isFavorite {
                    Image(systemName: "heart.fill")
                        .foregroundColor(.red)
                }
            }
            .frame(height: 100)
        }
    }
}

/*struct ArtistRow_Previews: PreviewProvider {
    static var previews: some View {
        ArtistRow(artist: ModelData().artists[0])
    }
}*/

