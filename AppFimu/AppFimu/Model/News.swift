//
//  SwiftUIView.swift
//  AppFImu
//
//  Created by jobst gaetan on 26/01/2023.
//

import Foundation
import SwiftUI

struct News: Hashable, Codable, Identifiable {
    var id: Int
    var dateEnvoi: String
    var titre: String
    var contenu: String
    var typeactu: TypeActu
    var lienImage: String

    
    var imageIcon: AnyView {
        AnyView(
            AsyncImage(url: URL(string: lienImage)) { image in
                       image
                        .resizable()
                        .scaledToFill()
                           
                   } placeholder: {
                       typeactu.couleurFInal
                   }
                   .frame(width: 100, height: 100)
                   .clipped()
                   .cornerRadius(8)
        )
    }
    
    var image: AnyView {
        AnyView(
            AsyncImage(url: URL(string: lienImage)) { image in
                       image
                        .resizable()
                        .scaledToFit()
                           
                   } placeholder: {
                       typeactu.couleurFInal
                   }
        )
    }
}
