//
//  TypeStand.swift
//  AppFimu
//
//  Created by user235496 on 3/6/23.
//


import Foundation
import SwiftUI

struct TypeStand:Identifiable, Codable, Hashable{
    var id: Int
    var libelle: String
    
    var icone: some View {
        Image("\(libelle)")
            .resizable()
            .scaledToFill()
            .frame(width: 30, height: 30)
    }
}

