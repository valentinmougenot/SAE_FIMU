//
//  ConcertRow.swift
//  FimuApp
//
//  Created by user234247 on 3/8/23.
//


import SwiftUI

struct ConcertRow: View {
    var concert: Concert
    
    var body: some View {
        VStack(alignment: .center) {
            Text(concert.artiste.nom)
                .bold()
                .foregroundColor(.black)

            Text(concert.artiste.pays[0].libelle)
                .bold()
                .foregroundColor(.black)
        }
        .frame(width: calculateWidth(duration: concert.duree), height: 100)
        .background(Color(hex: concert.artiste.categorie.couleur))
    }
    func calculateWidth(duration: Int) -> CGFloat {
        let width = CGFloat(2 * (duration))
        return width
    }

}

//struct ConcertRow_Previews: PreviewProvider {
//    static var previews: some View {
//        ConcertRow(concert: Concert(id: 1, date_debut: "2023-03-02", heure_debut: "14h30", heure_fin: "15h30", duree: 60, nbPersonnes: 600, artiste: ModelData().artists[0], scene: Scenes(id: 1, libelle: "L'arsenal", jauge: 900, latitude: 55.1, longitude: 55.1, type: typeScene(id: 1, libelle: "Intérieur"))))
//    }
//}
